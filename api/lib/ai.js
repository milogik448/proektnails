import OpenAI from 'openai'
import { getAvailableSlots, checkSlot, createBooking, SERVICE_DURATIONS } from './availability.js'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const LANG_NAMES = { uk: 'українська', en: 'англійська', cs: 'чеська' }

function getSystemPrompt(lang = 'uk') {
  const now = new Date()
  const pragueHour = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Prague' })).getHours()
  const todayISO = now.toLocaleString('sv-SE', { timeZone: 'Europe/Prague' }).split(' ')[0]
  const weekdays = ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п\'ятниця', 'субота']
  const todayName = weekdays[new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Prague' })).getDay()]
  const langName = LANG_NAMES[lang] ?? 'українська'

  const timeGreeting = pragueHour >= 6 && pragueHour < 12
    ? { uk: 'Доброго ранку', en: 'Good morning', cs: 'Dobré ráno' }
    : pragueHour >= 12 && pragueHour < 17
    ? { uk: 'Добрий день',   en: 'Good afternoon', cs: 'Dobré odpoledne' }
    : pragueHour >= 17 && pragueHour < 22
    ? { uk: 'Доброго вечора', en: 'Good evening', cs: 'Dobrý večer' }
    : { uk: 'Доброї ночі',   en: 'Good night',    cs: 'Dobrou noc' }

  return `Ти — AI-асистент Анжеліки, майстра манікюру та педикюру у Празі (Instagram: @anjelikaa_nails).
Твоя задача — записати клієнта на процедуру. Спілкуйся тепло, ввічливо, з турботою та легкою жіночністю. Використовуй доречні емодзі в кожному повідомленні (💅 ✨ 🌸 💕 🙏 😊 📅 💎 🫶) — 1–2 на повідомлення, не перебільшуй. Будь уважною та дружньою, як особистий асистент преміум-салону.

МОВА: Визначай мову за повідомленням клієнта і відповідай нею. Якщо мова незрозуміла — використовуй ${langName}. Підтримувані мови: українська, English, čeština. Якщо клієнт переходить на іншу мову — одразу переходь разом з ним.

СЬОГОДНІ: ${todayISO} (${todayName}). Використовуй цю дату коли клієнт каже "сьогодні", "завтра", "в п'ятницю" тощо.

ПОСЛУГИ ТА ЦІНИ (у чеських кронах):
- manicure (Манікюр): 500–750 Kč, 60 хв
- pedicure (Педикюр): 800–1000 Kč, 80 хв
- gel (Гель-лак): 450–550 Kč, 45 хв
- base (База): 300–350 Kč, 30 хв
- strengthening (Укріплення): 550–750 Kč, 60 хв
- restoration (Реставрація): 100 Kč/ніготь, 30 хв

РОБОЧИЙ ГРАФІК: Пн–Пт 9:00–20:00, Сб 10:00–18:00, Нд — вихідний.
РОЗТАШУВАННЯ: Praha, Česká republika. Точна адреса — в Instagram Direct.

ПРАВИЛА:
1. НІКОЛИ не починай відповідь зі слів "Привіт", "Hello", "Ahoj" — вітання вже надіслано. Але у своїй ПЕРШІЙ відповіді використай привітання за часом доби: "${timeGreeting[lang] ?? timeGreeting.uk}!" — наприклад: "${timeGreeting[lang] ?? timeGreeting.uk}! Як вас звати? 😊".
2. Нарощення НЕ надається — не обіцяй цього.
3. Ніколи не вигадуй вільні слоти — ЗАВЖДИ перевіряй через інструменти.
4. Збирай по черзі: ім'я → контакт (Instagram або телефон) → послуга → дата і час. Як тільки клієнт назвав ім'я — одразу питай контакт, не питай "як можу допомогти".
5. Після збору всіх даних — перевір слот через check_availability, потім запиши через create_booking.
6. Дати передавай у форматі YYYY-MM-DD, час — HH:MM.`
}

// OpenAI format: { type: 'function', function: { name, description, parameters } }
const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'get_available_slots',
      description: 'Отримати всі вільні слоти на конкретну дату. Використовуй коли клієнт називає день але не конкретний час.',
      parameters: {
        type: 'object',
        properties: {
          date:    { type: 'string', description: 'Дата у форматі YYYY-MM-DD' },
          service: { type: 'string', description: 'ID послуги: manicure, pedicure, gel, base, strengthening, restoration' },
        },
        required: ['date'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'check_availability',
      description: 'Перевірити чи вільний конкретний час. Використовуй коли клієнт назвав і день і час.',
      parameters: {
        type: 'object',
        properties: {
          date:    { type: 'string', description: 'Дата у форматі YYYY-MM-DD' },
          time:    { type: 'string', description: 'Час у форматі HH:MM' },
          service: { type: 'string', description: 'ID послуги' },
        },
        required: ['date', 'time'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_booking',
      description: 'Записати клієнта. Викликай тільки після підтвердження клієнтом часу і всіх даних.',
      parameters: {
        type: 'object',
        properties: {
          clientName: { type: 'string', description: "Ім'я клієнта" },
          contact:    { type: 'string', description: 'Instagram (@...) або номер телефону' },
          service:    { type: 'string', description: 'ID послуги' },
          date:       { type: 'string', description: 'Дата YYYY-MM-DD' },
          time:       { type: 'string', description: 'Час HH:MM' },
        },
        required: ['clientName', 'contact', 'service', 'date', 'time'],
      },
    },
  },
]

async function runTool(name, input) {
  try {
    if (name === 'get_available_slots') {
      const duration = SERVICE_DURATIONS[input.service] || 60
      return await getAvailableSlots(input.date, duration)
    }
    if (name === 'check_availability') {
      const duration = SERVICE_DURATIONS[input.service] || 60
      return await checkSlot(input.date, input.time, duration)
    }
    if (name === 'create_booking') {
      return await createBooking(input)
    }
    return { error: 'Unknown tool' }
  } catch (err) {
    return { error: err.message }
  }
}

// messages: [{ role: 'user'|'assistant', content: string }]
export async function chat(messages, lang = 'uk') {
  const fullMessages = [
    { role: 'system', content: getSystemPrompt(lang) },
    ...messages,
  ]

  for (let i = 0; i < 5; i++) {
    const response = await client.chat.completions.create({
      model:       'gpt-4o',
      messages:    fullMessages,
      tools:       TOOLS,
      tool_choice: 'auto',
    })

    const message = response.choices[0].message

    // OpenAI повертає tool_calls якщо хоче викликати функції
    if (message.tool_calls && message.tool_calls.length > 0) {
      // Додаємо повідомлення асистента з tool_calls до контексту
      fullMessages.push(message)

      // Виконуємо всі tool calls паралельно
      // ВАЖЛИВО: в OpenAI arguments — це рядок, треба JSON.parse
      const toolResults = await Promise.all(
        message.tool_calls.map(async tc => ({
          role:         'tool',
          tool_call_id: tc.id,
          content:      JSON.stringify(
            await runTool(tc.function.name, JSON.parse(tc.function.arguments))
          ),
        }))
      )

      fullMessages.push(...toolResults)
      continue
    }

    // Фінальна текстова відповідь
    return message.content ?? ''
  }

  return 'Вибачте, щось пішло не так. Спробуйте ще раз.'
}

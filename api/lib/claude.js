import Anthropic from '@anthropic-ai/sdk'
import { getAvailableSlots, checkSlot, createBooking, SERVICE_DURATIONS } from './availability.js'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Ти — AI-асистент Анжеліки, майстра манікюру та педикюру у Празі (Instagram: @anjelikaa_nails).
Твоя задача — записати клієнта на процедуру. Спілкуйся тепло, коротко та по-діловому.
Відповідай мовою клієнта (українська, чеська або англійська).

ПОСЛУГИ ТА ЦІНИ (у чеських кронах):
- manicure (Манікюр): 500–750 Kč, 60 хв
- pedicure (Педикюр): 800–1000 Kč, 80 хв
- gel (Гель-лак): 450–550 Kč, 45 хв
- base (База): 300–350 Kč, 30 хв
- strengthening (Укріплення): 550–750 Kč, 60 хв
- restoration (Реставрація): 100 Kč/ніготь, 30 хв

РОБОЧИЙ ГРАФІК: Пн–Пт 9:00–20:00, Сб 10:00–18:00, Нд — вихідний.
РОЗТАШУВАННЯ: Praha, Česká republika. Точна адреса — в Instagram Direct.
ЗАПИС: тільки через цей чат або Instagram Direct.

ПРАВИЛА:
1. Нарощення НЕ надається — не обіцяй цього.
2. Ніколи не вигадуй вільні слоти — ЗАВЖДИ перевіряй через інструменти.
3. Збирай по черзі: ім'я → контакт (Instagram або телефон) → послуга → дата і час.
4. Після збору всіх даних — перевір слот, потім запиши і підтверди клієнту.
5. Дати передавай у форматі YYYY-MM-DD, час — HH:MM.`

const TOOLS = [
  {
    name: 'get_available_slots',
    description: 'Отримати всі вільні слоти на конкретну дату. Використовуй коли клієнт називає день але не конкретний час.',
    input_schema: {
      type: 'object',
      properties: {
        date:        { type: 'string', description: 'Дата у форматі YYYY-MM-DD' },
        service:     { type: 'string', description: 'ID послуги: manicure, pedicure, gel, base, strengthening, restoration' },
      },
      required: ['date'],
    },
  },
  {
    name: 'check_availability',
    description: 'Перевірити чи вільний конкретний час. Використовуй коли клієнт назвав і день і час.',
    input_schema: {
      type: 'object',
      properties: {
        date:     { type: 'string', description: 'Дата у форматі YYYY-MM-DD' },
        time:     { type: 'string', description: 'Час у форматі HH:MM' },
        service:  { type: 'string', description: 'ID послуги' },
      },
      required: ['date', 'time'],
    },
  },
  {
    name: 'create_booking',
    description: 'Записати клієнта. Викликай тільки після підтвердження клієнтом часу і всіх даних.',
    input_schema: {
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
]

// Виконує tool call і повертає результат
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

// Головна функція: приймає масив повідомлень, повертає відповідь Claude
export async function chat(messages) {
  let currentMessages = [...messages]

  // Агентний цикл: Claude може кілька разів викликати tools
  for (let i = 0; i < 5; i++) {
    const response = await client.messages.create({
      model:      'claude-sonnet-4-5',
      max_tokens: 1024,
      system:     SYSTEM_PROMPT,
      tools:      TOOLS,
      messages:   currentMessages,
    })

    // Якщо Claude хоче викликати tools
    if (response.stop_reason === 'tool_use') {
      const toolUseBlocks = response.content.filter(b => b.type === 'tool_use')

      // Додаємо відповідь Claude з tool_use до контексту
      currentMessages.push({ role: 'assistant', content: response.content })

      // Виконуємо всі tools паралельно
      const toolResults = await Promise.all(
        toolUseBlocks.map(async block => ({
          type:        'tool_result',
          tool_use_id: block.id,
          content:     JSON.stringify(await runTool(block.name, block.input)),
        }))
      )

      currentMessages.push({ role: 'user', content: toolResults })
      continue
    }

    // Claude дав фінальну текстову відповідь
    const textBlock = response.content.find(b => b.type === 'text')
    return textBlock?.text ?? ''
  }

  return 'Вибачте, щось пішло не так. Спробуйте ще раз.'
}

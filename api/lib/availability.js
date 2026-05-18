import supabase from './supabase.js'

// Робочі години залежно від дня тижня (0=Нд, 1=Пн, ..., 6=Сб)
const WORK_HOURS = {
  1: { start: 9, end: 20 },
  2: { start: 9, end: 20 },
  3: { start: 9, end: 20 },
  4: { start: 9, end: 20 },
  5: { start: 9, end: 20 },
  6: { start: 10, end: 18 },
  0: null, // неділя — вихідний
}

// Тривалість послуг у хвилинах
export const SERVICE_DURATIONS = {
  manicure:     60,
  pedicure:     80,
  gel:          45,
  base:         30,
  strengthening: 60,
  restoration:  30,
}

// Генерує всі слоти по 30 хв для дати
function generateSlots(date) {
  const dayOfWeek = new Date(date).getDay()
  const hours = WORK_HOURS[dayOfWeek]
  if (!hours) return []

  const slots = []
  for (let h = hours.start; h < hours.end; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
    if (h + 0.5 < hours.end) {
      slots.push(`${String(h).padStart(2, '0')}:30`)
    }
  }
  return slots
}

// Перетворює "14:30" на хвилини від початку дня
function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

// Перевіряє чи два інтервали перетинаються
function overlaps(start1, dur1, start2, dur2) {
  return start1 < start2 + dur2 && start1 + dur1 > start2
}

// Повертає всі вільні слоти на дату для заданої тривалості
export async function getAvailableSlots(date, durationMin = 60) {
  const dayOfWeek = new Date(date).getDay()
  const hours = WORK_HOURS[dayOfWeek]
  if (!hours) return { available: [], message: 'Вихідний день' }

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('time_start, duration_min')
    .eq('date', date)
    .eq('status', 'confirmed')

  if (error) throw new Error(error.message)

  const allSlots = generateSlots(date)
  const endMinutes = hours.end * 60

  const freeSlots = allSlots.filter(slot => {
    const slotMin = timeToMinutes(slot)
    if (slotMin + durationMin > endMinutes) return false

    return !bookings.some(b =>
      overlaps(slotMin, durationMin, timeToMinutes(b.time_start), b.duration_min)
    )
  })

  return { available: freeSlots }
}

// Перевіряє конкретний слот
export async function checkSlot(date, time, durationMin = 60) {
  const { available } = await getAvailableSlots(date, durationMin)
  const isFree = available.includes(time)

  if (isFree) return { available: true }

  // Пропонуємо найближчі вільні після запитаного часу
  const requestedMin = timeToMinutes(time)
  const nearby = available
    .filter(s => timeToMinutes(s) > requestedMin)
    .slice(0, 3)

  return { available: false, suggestions: nearby }
}

// Створює клієнта і запис
export async function createBooking({ clientName, contact, service, date, time }) {
  const duration = SERVICE_DURATIONS[service] || 60

  // Захист від подвійного бронювання — перевіряємо слот ще раз перед записом
  const slotCheck = await checkSlot(date, time, duration)
  if (!slotCheck.available) {
    const suggestions = slotCheck.suggestions?.length
      ? ` Найближчі вільні: ${slotCheck.suggestions.join(', ')}.`
      : ''
    throw new Error(`Час ${time} на ${date} вже зайнятий.${suggestions}`)
  }

  // Спочатку шукаємо чи клієнт вже є
  let clientId
  const contactField = contact.startsWith('@') ? 'instagram' : 'phone'

  const { data: existing } = await supabase
    .from('clients')
    .select('id')
    .eq(contactField, contact)
    .maybeSingle()

  if (existing) {
    clientId = existing.id
  } else {
    const { data: newClient, error: clientErr } = await supabase
      .from('clients')
      .insert({ name: clientName, [contactField]: contact })
      .select('id')
      .single()
    if (clientErr) throw new Error(clientErr.message)
    clientId = newClient.id
  }

  // Створюємо запис
  const { data: booking, error: bookingErr } = await supabase
    .from('bookings')
    .insert({
      client_id:    clientId,
      service,
      date,
      time_start:   time,
      duration_min: duration,
      status:       'confirmed',
    })
    .select()
    .single()

  if (bookingErr) throw new Error(bookingErr.message)

  return { bookingId: booking.id, date, time, service, clientName }
}

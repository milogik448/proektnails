import { google } from 'googleapis'

const SERVICE_NAMES = {
  manicure:     'Манікюр',
  pedicure:     'Педикюр',
  gel:          'Гель-лак',
  base:         'База',
  strengthening: 'Укріплення',
  restoration:  'Реставрація',
}

function getCalendar() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })
  return google.calendar({ version: 'v3', auth })
}

export async function addBookingToCalendar({ clientName, contact, service, date, time, durationMin }) {
  if (!process.env.GOOGLE_CALENDAR_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_JSON) return

  try {
    const calendar = getCalendar()
    const serviceName = SERVICE_NAMES[service] || service
    const endTime = addMinutes(time, durationMin)

    await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: {
        summary: `${serviceName} — ${clientName}`,
        description: `Контакт: ${contact}`,
        start: { dateTime: `${date}T${time}:00`, timeZone: 'Europe/Prague' },
        end:   { dateTime: `${date}T${endTime}:00`, timeZone: 'Europe/Prague' },
      },
    })

    console.log(`[Calendar] Event added: ${serviceName} — ${clientName} on ${date} at ${time}`)
  } catch (err) {
    console.error('[Calendar] Failed to add event:', err.message)
  }
}

function addMinutes(time, minutes) {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + minutes
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

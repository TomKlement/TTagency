import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

type ContactBody = {
  name?: string
  email?: string
  message?: string
  _gotcha?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function trimField(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  let body: ContactBody
  try {
    body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as ContactBody
  } catch {
    return res.status(400).json({ error: 'invalid_body' })
  }

  if (body._gotcha?.trim()) {
    return res.status(200).json({ ok: true })
  }

  const name = trimField(body.name, 200)
  const email = trimField(body.email, 320)
  const message = trimField(body.message, 5000)

  if (!name || name.length < 2) {
    return res.status(400).json({ error: 'invalid_name' })
  }
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'invalid_email' })
  }
  if (!message || message.length < 10) {
    return res.status(400).json({ error: 'invalid_message' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !from || !to) {
    console.error('Missing RESEND_API_KEY, CONTACT_FROM_EMAIL, or CONTACT_TO_EMAIL')
    return res.status(503).json({ error: 'not_configured' })
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Kontakt — ${name}`,
    text: [`Jméno: ${name}`, `E-mail: ${email}`, '', message].join('\n'),
  })

  if (error) {
    console.error('Resend error:', error)
    return res.status(502).json({ error: 'send_failed' })
  }

  return res.status(200).json({ ok: true })
}

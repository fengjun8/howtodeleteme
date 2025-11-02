import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceName, websiteUrl, deletionUrl, difficulty, category, steps, notes, submitterEmail } = body

    // Validate required fields
    if (!serviceName || !websiteUrl || !deletionUrl || !difficulty || !category || !steps) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email content
    const emailContent = `
New Guide Submission

Service Name: ${serviceName}
Website URL: ${websiteUrl}
Deletion URL: ${deletionUrl}
Difficulty: ${difficulty}
Category: ${category}

Steps:
${steps}

${notes ? `Additional Notes:\n${notes}` : ''}

${submitterEmail ? `Submitter Email: ${submitterEmail}` : 'Anonymous submission'}

---
Submitted via howtodelete.me contribute form
    `.trim()

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Guide Submission: ${serviceName}`,
      text: emailContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending guide submission:', error)
    return NextResponse.json(
      { error: 'Failed to submit guide' },
      { status: 500 }
    )
  }
}
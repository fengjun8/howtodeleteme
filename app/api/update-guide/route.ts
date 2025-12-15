import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceName, currentGuideUrl, issueType, issueDescription, correctInformation, sourceUrl, submitterEmail } = body

    // Validate required fields
    if (!serviceName || !currentGuideUrl || !issueType || !issueDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email content
    const emailContent = `
Guide Update Request

Service Name: ${serviceName}
Current Guide URL: ${currentGuideUrl}
Issue Type: ${issueType}

Issue Description:
${issueDescription}

${correctInformation ? `Correct Information:\n${correctInformation}` : ''}

${sourceUrl ? `Source URL: ${sourceUrl}` : ''}

${submitterEmail ? `Submitter Email: ${submitterEmail}` : 'Anonymous submission'}

---
Submitted via howtodelete.me contribute form
    `.trim()

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Guide Update Request: ${serviceName}`,
      text: emailContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending guide update request:', error)
    return NextResponse.json(
      { error: 'Failed to submit update request' },
      { status: 500 }
    )
  }
}

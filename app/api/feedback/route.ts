import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { email, subject, message, url } = await request.json()

    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Feedback Received
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Feedback Details</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Guide URL:</strong> <a href="${url}" target="_blank">${url}</a></p>
            ${email ? `<p><strong>User Email:</strong> ${email}</p>` : '<p><strong>User Email:</strong> Not provided</p>'}
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #495057; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #6c757d;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
            <p>This feedback was submitted through the HowToDelete website feedback form.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    }

    // 发送邮件
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: 'Feedback sent successfully' })
  } catch (error) {
    console.error('Error sending feedback email:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send feedback' },
      { status: 500 }
    )
  }
}

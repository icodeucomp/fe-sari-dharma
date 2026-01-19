// app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phoneNumber, message } = await req.json();

    // Validate input
    if (!firstName || !lastName || !email || !phoneNumber || !message) {
      return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });
    }

    // Create transporter with your email service
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com'
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASSWORD, // your email password or app password
      },
    });

    // Email to clinic (you receive this)
    const mailOptionsToClinic = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // clinic email
      subject: `Pesan Baru dari ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #C75000 0%, #A04000 100%); padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Pesan Kontak Baru</h1>
                        <p style="color: #FFE4D6; margin: 10px 0 0 0; font-size: 14px;">Klinik Sari Dharma</p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 30px;">
                        <h2 style="color: #C75000; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Informasi Pengirim</h2>
                        
                        <table width="100%" cellpadding="10" cellspacing="0">
                          <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; width: 35%;">
                              <strong style="color: #374151;">Nama:</strong>
                            </td>
                            <td style="padding: 12px 0; color: #1f2937;">
                              ${firstName} ${lastName}
                            </td>
                          </tr>
                          <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0;">
                              <strong style="color: #374151;">Email:</strong>
                            </td>
                            <td style="padding: 12px 0;">
                              <a href="mailto:${email}" style="color: #C75000; text-decoration: none; font-weight: 500;">${email}</a>
                            </td>
                          </tr>
                          <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0;">
                              <strong style="color: #374151;">Telepon:</strong>
                            </td>
                            <td style="padding: 12px 0;">
                              <a href="tel:${phoneNumber}" style="color: #C75000; text-decoration: none; font-weight: 500;">${phoneNumber}</a>
                            </td>
                          </tr>
                        </table>
                        
                        <div style="margin-top: 30px; padding: 20px; background-color: #FFF5F0; border-left: 4px solid #C75000; border-radius: 4px;">
                          <h3 style="color: #C75000; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Pesan:</h3>
                          <p style="color: #1f2937; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>
                        
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; margin: 0; font-size: 12px;">
                          Email ini dikirim dari form kontak website<br>
                          <strong style="color: #C75000;">Klinik Sari Dharma</strong>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    };

    // Email to user (confirmation)
    const mailOptionsToUser = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Terima kasih telah menghubungi Klinik Sari Dharma",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #C75000 0%, #A04000 100%); padding: 40px; text-align: center;">
                        <div style="font-size: 48px; margin-bottom: 10px;">✓</div>
                        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Terima Kasih!</h1>
                        <p style="color: #FFE4D6; margin: 10px 0 0 0; font-size: 16px;">Pesan Anda telah kami terima</p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 22px; font-weight: 600;">Halo, ${firstName}!</h2>
                        
                        <p style="color: #4b5563; margin: 0 0 20px 0; line-height: 1.6; font-size: 16px;">
                          Terima kasih telah menghubungi <strong style="color: #C75000;">Klinik Sari Dharma</strong>. 
                          Kami telah menerima pesan Anda dan akan segera menghubungi Anda dalam waktu <strong>1x24 jam</strong>.
                        </p>
                        
                        <div style="background: linear-gradient(135deg, #FFF5F0 0%, #FFE8DC 100%); padding: 20px; border-radius: 8px; border-left: 4px solid #C75000; margin: 25px 0;">
                          <h3 style="color: #C75000; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">📝 Ringkasan Pesan Anda:</h3>
                          <p style="color: #8B4000; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>
                        
                        <div style="background-color: #f9fafb; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #e5e7eb;">
                          <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">📍 Informasi Kontak Kami</h3>
                          <table width="100%" cellpadding="5" cellspacing="0">
                            <tr>
                              <td style="color: #6b7280; padding: 5px 0; font-size: 14px;">🏥 Alamat:</td>
                            </tr>
                            <tr>
                              <td style="color: #1f2937; padding: 0 0 15px 0; font-size: 14px;">
                                Jl. Pulau Seram No.1, Dauh Puri Klod,<br>
                                Kec. Denpasar Barat, Kota Denpasar, Bali 80113
                              </td>
                            </tr>
                            <tr>
                              <td style="color: #6b7280; padding: 5px 0; font-size: 14px;">📞 Telepon:</td>
                            </tr>
                            <tr>
                              <td style="padding: 0 0 15px 0;">
                                <a href="tel:03612226866" style="color: #C75000; text-decoration: none; font-weight: 500; font-size: 14px;">(0361) 226866</a>
                              </td>
                            </tr>
                            <tr>
                              <td style="color: #6b7280; padding: 5px 0; font-size: 14px;">📧 Email:</td>
                            </tr>
                            <tr>
                              <td style="padding: 0 0 15px 0;">
                                <a href="mailto:info.saridharma@gmail.com" style="color: #C75000; text-decoration: none; font-weight: 500; font-size: 14px;">
                                  info.saridharma@gmail.com
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td style="color: #6b7280; padding: 5px 0; font-size: 14px;">💬 WhatsApp:</td>
                            </tr>
                            <tr>
                              <td style="padding: 5px 0;">
                                <a href="https://wa.me/628113881248" style="display: inline-block; background-color: #25d366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin-top: 5px; font-weight: 600; font-size: 14px;">
                                  Chat WhatsApp
                                </a>
                              </td>
                            </tr>
                          </table>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #FFF5F0 0%, #FFE8DC 100%); border-radius: 8px;">
                          <p style="color: #8B4000; margin: 0; font-size: 14px; line-height: 1.6;">
                            <strong>Tim kami siap membantu Anda!</strong><br>
                            Mohon periksa email Anda secara berkala untuk respon dari kami.
                          </p>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #1f2937; padding: 25px; text-align: center;">
                        <p style="color: #9ca3af; margin: 0 0 5px 0; font-size: 14px; font-weight: 600;">
                          Klinik Sari Dharma
                        </p>
                        <p style="color: #6b7280; margin: 0; font-size: 12px;">
                          Layanan Kesehatan Terpercaya
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToClinic);
    await transporter.sendMail(mailOptionsToUser);

    return NextResponse.json({ message: "Email berhasil dikirim" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Gagal mengirim email" }, { status: 500 });
  }
}

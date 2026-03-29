import express, { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    'https://hemanth-chakravarthy.netlify.app',
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

// In-memory storage for messages
interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

const messages: Message[] = [];

// Validate environment variables
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!EMAIL_USER || !EMAIL_PASS) {
  console.error('EMAIL_USER and EMAIL_PASS environment variables are required');
}

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Verify transporter connection
transporter.verify((error) => {
  if (error) {
    console.error('Error connecting to email service:', error);
  } else {
    console.log('Email service is ready to send messages');
  }
});

// Contact form endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { id, name, email, message, timestamp } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newMessage: Message = {
      id: id || Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: timestamp || new Date().toISOString(),
    };
    messages.unshift(newMessage);

    // Send email notification if email credentials are configured
    if (EMAIL_USER && EMAIL_PASS) {
      const mailOptions = {
        from: EMAIL_USER,
        to: EMAIL_USER,
        replyTo: email,
        subject: `✦ New message from ${name} — Portfolio Contact`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #0d1117; font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0d1117;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%;">

          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #21B6A8 0%, #2CC4B6 50%, #38D9CB 100%); border-radius: 16px 16px 0 0; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; font-family: 'Space Grotesk', 'Segoe UI', sans-serif; font-size: 24px; font-weight: 700; color: #0d1117; letter-spacing: -0.5px;">
                New Contact Message<span style="color: rgba(13,17,23,0.5)">.</span>
              </h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: rgba(13,17,23,0.7); font-weight: 400;">
                Someone reached out through your portfolio
              </p>
            </td>
          </tr>

          <!-- Main content card -->
          <tr>
            <td style="background-color: #161b22; padding: 0; border-left: 1px solid rgba(255,255,255,0.06); border-right: 1px solid rgba(255,255,255,0.06);">

              <!-- Sender info section -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 32px 40px 24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <!-- Name -->
                      <tr>
                        <td style="padding-bottom: 16px;">
                          <table role="presentation" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width: 36px; height: 36px; background: rgba(33,182,168,0.12); border-radius: 10px; text-align: center; vertical-align: middle;">
                                <span style="font-size: 16px; line-height: 36px;">👤</span>
                              </td>
                              <td style="padding-left: 14px;">
                                <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #6b7280; font-weight: 600;">From</p>
                                <p style="margin: 2px 0 0; font-size: 17px; color: #f0f6fc; font-weight: 600; font-family: 'Space Grotesk', sans-serif;">${name}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- Email -->
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width: 36px; height: 36px; background: rgba(33,182,168,0.12); border-radius: 10px; text-align: center; vertical-align: middle;">
                                <span style="font-size: 16px; line-height: 36px;">✉️</span>
                              </td>
                              <td style="padding-left: 14px;">
                                <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #6b7280; font-weight: 600;">Email</p>
                                <a href="mailto:${email}" style="margin: 2px 0 0; font-size: 15px; color: #21B6A8; text-decoration: none; font-weight: 500; display: block;">${email}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <tr>
                <td style="padding: 0 40px;">
                  <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(33,182,168,0.3), transparent);"></div>
                </td>
              </tr>

              <!-- Message section -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 24px 40px 32px;">
                    <p style="margin: 0 0 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #6b7280; font-weight: 600;">
                      💬 Message
                    </p>
                    <div style="background-color: #0d1117; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px 24px;">
                      <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #c9d1d9; white-space: pre-wrap;">${message}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Reply button -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 0 40px 32px; text-align: center;">
                    <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #21B6A8 0%, #2CC4B6 100%); color: #0d1117; font-size: 14px; font-weight: 600; padding: 12px 32px; border-radius: 50px; text-decoration: none; font-family: 'Outfit', sans-serif; letter-spacing: 0.3px;">
                      Reply to ${name} →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0d1117; border: 1px solid rgba(255,255,255,0.06); border-top: none; border-radius: 0 0 16px 16px; padding: 24px 40px; text-align: center;">
              <p style="margin: 0 0 4px; font-size: 12px; color: #484f58;">
                Received on ${new Date(newMessage.timestamp).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date(newMessage.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p style="margin: 0; font-size: 12px; color: #484f58;">
                Sent from <a href="https://hemanth-chakravarthy.netlify.app" style="color: #21B6A8; text-decoration: none;">hemanth-chakravarthy.netlify.app</a>
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

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again.' 
    });
  }
});

// Authentication endpoint
app.post('/api/auth', (req: Request, res: Response) => {
  const { password } = req.body;
  
  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Admin password not configured' });
  }
  
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Get messages endpoint (protected) - using POST as in original
app.post('/api/messages', (req: Request, res: Response) => {
  const { password } = req.body;
  
  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Admin password not configured' });
  }
  
  if (password === ADMIN_PASSWORD) {
    res.json({ messages });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Delete message endpoint
app.delete('/api/messages/:id', (req: Request, res: Response) => {
  const { password } = req.body;
  const { id } = req.params;
  
  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Admin password not configured' });
  }
  
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const index = messages.findIndex(m => m.id === id);
  if (index !== -1) {
    messages.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
});

// Clear all messages endpoint
app.post('/api/messages/clear', (req: Request, res: Response) => {
  const { password } = req.body;
  
  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Admin password not configured' });
  }
  
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  messages.length = 0;
  res.json({ success: true });
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    messageCount: messages.length 
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', error);
  
  if (error instanceof Error) {
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  } else {
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

const PORT = process.env.PORT || 3001;

// Only start server in development (for Vercel compatibility)
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;
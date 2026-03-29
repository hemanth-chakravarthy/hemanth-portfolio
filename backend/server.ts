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
        subject: `New message from ${name} | Portfolio Contact`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f5; width: 100%; margin: 0 auto;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 30px 40px; background-color: #18181b; text-align: center;">
              <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: -0.5px;">Hemanth Chakravarthy</h2>
              <p style="margin: 5px 0 0 0; color: #a1a1aa; font-size: 14px;">Portfolio Contact Form</p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 40px; text-align: center;">
              <h1 style="margin: 0 0 20px 0; color: #18181b; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">New message received</h1>
              <p style="margin: 0 auto 30px auto; color: #52525b; font-size: 16px; line-height: 1.5; max-width: 400px;">
                You just received a new message from your portfolio website. Here are the details:
              </p>

              <!-- Details Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f5; border-radius: 6px; margin: 0 auto;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    
                    <!-- Name -->
                    <p style="margin: 0 0 6px 0; color: #71717a; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                    <p style="margin: 0 0 20px 0; color: #18181b; font-size: 16px; font-weight: 600;">${name}</p>

                    <!-- Email -->
                    <p style="margin: 0 0 6px 0; color: #71717a; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                    <p style="margin: 0 0 24px 0; color: #0284c7; font-size: 16px; font-weight: 500;">
                      <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a>
                    </p>

                    <!-- Message -->
                    <p style="margin: 0 0 10px 0; color: #71717a; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center">
                          <div style="background-color: #ffffff; padding: 18px; border-radius: 6px; border: 1px solid #e4e4e7; color: #3f3f46; font-size: 15px; line-height: 1.6; white-space: pre-wrap; text-align: left; max-width: 400px; margin: 0 auto;">${message}</div>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Action Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}" style="display: inline-block; background-color: #18181b; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 4px;">Reply to ${name}</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #fafafa; border-top: 1px solid #f4f4f5; text-align: center;">
              <p style="margin: 0; color: #a1a1aa; font-size: 13px;">Sent securely via <a href="https://hemanth-chakravarthy.netlify.app" style="color: #a1a1aa; text-decoration: underline;">hemanth-chakravarthy.netlify.app</a></p>
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
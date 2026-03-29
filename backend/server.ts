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
<body style="margin:0;padding:0;background-color:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#000000;min-height:100vh;">
    <tr>
      <td align="center" style="padding: 100px 20px;">
        
        <!-- Glow Behind Envelope -->
        <div style="position: absolute; left: 50%; top: 120px; transform: translateX(-50%); width: 600px; height: 500px; background: radial-gradient(circle, rgba(234, 66, 27, 0.4) 0%, rgba(234, 66, 27, 0.1) 40%, transparent 70%); filter: blur(40px); z-index: 0; pointer-events: none;"></div>

        <div style="width: 500px; max-width: 100%; position: relative; z-index: 10;">
          
          <!-- Back of Envelope (Pointing UP) -->
          <div style="position: relative; z-index: 1; text-align: center; margin-bottom: -160px; filter: drop-shadow(0 -10px 20px rgba(0,0,0,0.5));">
            <div style="display: inline-block; width: 0; height: 0; border-left: 250px solid transparent; border-right: 250px solid transparent; border-bottom: 180px solid #141414;"></div>
          </div>
          
          <!-- The Glowing Invite Card -->
          <div style="position: relative; z-index: 2; margin: 0 15px; background: linear-gradient(180deg, #ea421b 0%, #f78d22 100%); border-radius: 8px; padding: 60px 40px 100px; text-align: center; box-shadow: 0 15px 50px rgba(234, 66, 27, 0.5), 0 0 120px rgba(234, 66, 27, 0.3);">
            
            <div style="margin-bottom: 35px;">
               <span style="color: #ffffff; font-weight: 700; font-size: 18px; letter-spacing: -0.5px;">Hemanth Chakravarthy</span>
            </div>
            
            <h1 style="color: #ffffff; font-size: 26px; font-weight: 600; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px;">
              New message received.
            </h1>
            <h2 style="color: rgba(255, 255, 255, 0.95); font-size: 22px; font-weight: 400; margin: 0 0 25px 0; letter-spacing: -0.3px;">
              Someone is trying to connect.
            </h2>
            
            <p style="color: rgba(255, 255, 255, 0.85); font-size: 15px; line-height: 1.5; margin: 0 auto; max-width: 90%;">
              Check the details below sent via your portfolio contact form.
            </p>

            <div style="background: rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 25px; text-align: left; margin-top: 35px; box-shadow: inset 0 2px 10px rgba(0,0,0,0.1);">
              
              <div style="margin-bottom: 15px;">
                <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.6); margin-bottom: 4px;">From</span>
                <span style="display: block; font-size: 16px; color: #ffffff; font-weight: 600;">${name}</span>
              </div>
              
              <div style="margin-bottom: 25px;">
                <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.6); margin-bottom: 4px;">Email</span>
                <a href="mailto:${email}" style="display: block; font-size: 16px; color: #ffffff; text-decoration: none; font-weight: 500;">${email}</a>
              </div>

              <div>
                <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.6); margin-bottom: 8px;">Message</span>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: rgba(255,255,255,0.9); white-space: pre-wrap;">${message}</p>
              </div>
            </div>

            <div style="margin-top: 35px;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #ffffff; color: #ea421b; font-weight: 600; font-size: 15px; text-decoration: none; padding: 14px 34px; border-radius: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                Reply to ${name}
              </a>
            </div>
          </div>
          
          <!-- Front of Envelope (V-Shape Overlay) -->
          <div style="position: relative; z-index: 3; margin-top: -100px; text-align: center; line-height: 0; font-size: 0; filter: drop-shadow(0 -10px 20px rgba(0,0,0,0.3));">
            <div style="display: inline-block; width: 0; height: 0; border-left: 250px solid #161616; border-top: 150px solid transparent;"></div><div style="display: inline-block; width: 0; height: 0; border-right: 250px solid #161616; border-top: 150px solid transparent;"></div>
          </div>
          
          <!-- Envelope Body Base -->
          <div style="position: relative; z-index: 3; background-color: #161616; border-radius: 0 0 12px 12px; height: 120px; text-align: center; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 30px;">
             <!-- Subtle center vertical crease -->
             <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 2px; height: 100%; background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%);"></div>
             <!-- Footer -->
             <p style="color: #444444; font-size: 12px; margin: 0; position: relative; z-index: 5;">Sent securely via hemanth-chakravarthy.netlify.app</p>
          </div>

        </div>
        
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
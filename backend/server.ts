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
<body style="margin:0;padding:0;background-color:#080808;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;-webkit-font-smoothing:antialiased;">

<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#080808;min-height:100vh;">
<tr>
<td align="center" style="padding:70px 20px 50px;">

<div style="width:540px;max-width:100%;position:relative;">

  <!-- Ambient glow -->
  <div style="position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:650px;height:550px;background:radial-gradient(ellipse at 50% 55%, rgba(33,182,168,0.28) 0%, rgba(33,182,168,0.12) 30%, rgba(33,182,168,0.04) 50%, transparent 70%);pointer-events:none;z-index:0;"></div>

  <!-- Back envelope flap (triangle pointing UP behind the letter) -->
  <div style="text-align:center;position:relative;z-index:1;margin-bottom:-185px;">
    <div style="display:inline-block;width:0;height:0;border-left:250px solid transparent;border-right:250px solid transparent;border-bottom:210px solid #222222;filter:drop-shadow(0 -8px 25px rgba(33,182,168,0.1));"></div>
  </div>

  <!-- The letter card (teal gradient, emerging from envelope) -->
  <div style="position:relative;z-index:5;margin:0 42px;background:linear-gradient(165deg,#0f9b8e 0%,#1aad9f 20%,#21B6A8 40%,#2cc4b6 60%,#25bfb1 80%,#17a092 100%);border-radius:12px;padding:48px 38px 60px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.4),0 0 70px rgba(33,182,168,0.25),0 0 140px rgba(33,182,168,0.12),0 0 200px rgba(33,182,168,0.06);">
    
    <!-- Brand pill -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
      <tr>
        <td style="background:rgba(0,0,0,0.18);border-radius:50px;padding:7px 22px;">
          <span style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.92);letter-spacing:2px;text-transform:lowercase;">hemanth</span>
        </td>
      </tr>
    </table>

    <!-- Headline -->
    <h1 style="margin:0 0 16px;font-size:26px;font-weight:700;color:#ffffff;line-height:1.35;letter-spacing:-0.3px;">
      You have a new message.<br>Someone wants to connect.
    </h1>

    <!-- Subtitle -->
    <p style="margin:0 auto;font-size:13px;color:rgba(255,255,255,0.55);line-height:1.65;max-width:320px;">
      Check the details below to see who reached<br>out through your portfolio contact form.
    </p>

  </div>

  <!-- Front envelope (V-flap opening + body) -->
  <div style="position:relative;z-index:10;margin-top:-55px;">

    <!-- V-FLAP: separate left and right triangular flaps -->
    <div style="text-align:center;position:relative;z-index:12;line-height:0;font-size:0;margin-bottom:-1px;">
      <div style="display:inline-block;width:0;height:0;border-left:270px solid #1e1e1e;border-right:0px solid transparent;border-top:160px solid transparent;vertical-align:bottom;"></div><div style="display:inline-block;width:0;height:0;border-left:0px solid transparent;border-right:270px solid #1e1e1e;border-top:160px solid transparent;vertical-align:bottom;"></div>
    </div>

    <!-- Envelope body -->
    <div style="position:relative;z-index:11;background:#1e1e1e;border-radius:0 0 16px 16px;overflow:hidden;border:1px solid rgba(255,255,255,0.04);border-top:none;">
      
      <!-- Center fold line -->
      <div style="position:absolute;top:-160px;left:50%;width:1px;height:calc(100% + 160px);background:linear-gradient(to bottom, transparent, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.02) 70%, transparent);pointer-events:none;z-index:20;"></div>

      <!-- Content -->
      <div style="padding:36px 44px 28px;position:relative;z-index:2;">

        <!-- From -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:18px;">
          <tr>
            <td style="width:42px;height:42px;background:linear-gradient(135deg,#21B6A8,#17a092);border-radius:12px;text-align:center;vertical-align:middle;">
              <span style="font-size:18px;font-weight:700;color:#ffffff;line-height:42px;display:block;">${name.charAt(0).toUpperCase()}</span>
            </td>
            <td style="padding-left:16px;vertical-align:middle;">
              <p style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:1.8px;color:#505050;font-weight:700;">From</p>
              <p style="margin:3px 0 0;font-size:17px;color:#e8e8e8;font-weight:600;">${name}</p>
            </td>
          </tr>
        </table>

        <!-- Email -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          <tr>
            <td style="width:42px;height:42px;background:rgba(33,182,168,0.08);border:1px solid rgba(33,182,168,0.15);border-radius:12px;text-align:center;vertical-align:middle;">
              <span style="font-size:17px;font-weight:600;color:#21B6A8;line-height:42px;display:block;">@</span>
            </td>
            <td style="padding-left:16px;vertical-align:middle;">
              <p style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:1.8px;color:#505050;font-weight:700;">Email</p>
              <a href="mailto:${email}" style="margin:3px 0 0;font-size:15px;color:#21B6A8;text-decoration:none;font-weight:500;display:block;">${email}</a>
            </td>
          </tr>
        </table>

        <!-- Divider -->
        <div style="height:1px;background:linear-gradient(90deg,transparent 0%,rgba(33,182,168,0.12) 50%,transparent 100%);margin-bottom:28px;"></div>

        <!-- Message label -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
          <tr>
            <td style="width:3px;height:13px;background:#21B6A8;border-radius:2px;"></td>
            <td style="padding-left:10px;">
              <p style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:1.8px;color:#505050;font-weight:700;">Message</p>
            </td>
          </tr>
        </table>

        <!-- Message box -->
        <div style="background:#111111;border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:22px 24px;margin-bottom:30px;">
          <p style="margin:0;font-size:14.5px;line-height:1.75;color:#a8a8a8;white-space:pre-wrap;">${message}</p>
        </div>

        <!-- Reply CTA -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 8px;">
          <tr>
            <td style="background:linear-gradient(135deg,#21B6A8 0%,#17a092 100%);border-radius:50px;text-align:center;">
              <a href="mailto:${email}" style="display:inline-block;padding:13px 34px;font-size:13.5px;font-weight:600;color:#050505;text-decoration:none;letter-spacing:0.3px;">
                Reply to ${name} &#8594;
              </a>
            </td>
          </tr>
        </table>

      </div>

      <!-- Footer -->
      <div style="padding:0 44px 26px;text-align:center;">
        <div style="height:1px;background:rgba(255,255,255,0.04);margin-bottom:18px;"></div>
        <p style="margin:0 0 4px;font-size:11px;color:#363636;">
          ${new Date(newMessage.timestamp).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} &#183; ${new Date(newMessage.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </p>
        <p style="margin:0;font-size:11px;color:#363636;">
          via <a href="https://hemanth-chakravarthy.netlify.app" style="color:#21B6A8;text-decoration:none;font-weight:500;">hemanth-chakravarthy.netlify.app</a>
        </p>
      </div>

    </div>
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
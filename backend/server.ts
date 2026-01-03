import express, { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
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
        subject: `New Contact Form Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;">
                <strong style="color: #666;">Name:</strong>
                <span style="color: #333;">${name}</span>
              </p>
              <p style="margin: 10px 0;">
                <strong style="color: #666;">Email:</strong>
                <a href="mailto:${email}" style="color: #4F46E5;">${email}</a>
              </p>
            </div>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong style="color: #666;">Message:</strong></p>
              <p style="color: #333; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">
              <em>Sent at: ${new Date(newMessage.timestamp).toLocaleString()}</em>
            </p>
          </div>
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
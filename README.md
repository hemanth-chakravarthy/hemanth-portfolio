# Portfolio | Hemanth Chakravarthy

<div align="center">

![Portfolio Preview]((https://github.com/user-attachments/assets/7d90fbc0-851e-4c25-bbe3-525496cb187e))

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://hemanth-chakravarthy.netlify.app/)
[![GitHub](https://img.shields.io/badge/github-repo-blue?style=for-the-badge&logo=github)](https://github.com/hemanth-chakravarthy/hemanth-portfolio)
[![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)](LICENSE)

A modern, high-performance portfolio website built with React, TypeScript, and Tailwind CSS. Features interactive animations, smooth scrolling, and a custom contact form with email notifications.

**[View Live Demo](https://hemanth-chakravarthy.netlify.app/) · [Report Bug](https://github.com/hemanth-chakravarthy/hemanth-portfolio/issues) · [Request Feature](https://github.com/hemanth-chakravarthy/hemanth-portfolio/issues)**

</div>

---

## 🌟 Overview

This portfolio showcases my software development journey and technical expertise through:

- **🎨 Interactive UI**: Smooth animations and transitions powered by Framer Motion
- **📱 Fully Responsive**: Optimized for all devices from mobile to desktop
- **🚀 High Performance**: Built with Vite for lightning-fast load times
- **💬 Contact System**: Integrated contact form with email notifications
- **🎯 Project Showcases**: Detailed views of full-stack applications with live demos
- **🌓 Theme Support**: Dark/light mode with system preference detection
- **🔒 Admin Panel**: Password-protected messages dashboard
- **♿ Accessible**: WCAG compliant with keyboard navigation

---

## 🛠️ Tech Stack

### Frontend
- **[React 18.3.1](https://react.dev/)** - UI library for building component-based interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript for robust code
- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool
- **[Tailwind CSS 3](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 12.23.26](https://www.framer.com/motion/)** - Production-ready animation library
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautifully designed components built with Radix UI
- **[React Router DOM 6.30.1](https://reactrouter.com/)** - Declarative routing for React
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Perfect dark mode in 2 lines of code
- **[react-helmet-async](https://github.com/staylor/react-helmet-async)** - Document head manager for SEO
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit

### Styling & Design System
- **tailwindcss-animate** - Animation utilities for Tailwind CSS
- **class-variance-authority (CVA)** - Component variant management
- **clsx & tailwind-merge** - Efficient class name utilities
- **Space Grotesk** (Google Fonts) - Modern geometric sans-serif typography

### Animation & Interactions
- **Framer Motion** - Scroll animations, parallax effects, spring animations
- **Custom Cursor** - Interactive cursor with smooth hover effects
- **Scroll-triggered animations** - Elements animate as you scroll

### UI Components (Radix UI Primitives)
Full suite of accessible, unstyled components:
- Accordion, Alert Dialog, Avatar, Badge, Button
- Card, Checkbox, Dialog, Dropdown Menu, Popover
- Progress, Radio Group, Select, Separator, Slider
- Switch, Tabs, Toast, Tooltip, and 20+ more

### Forms & Validation
- **[React Hook Form 7.61.1](https://react-hook-form.com/)** - Performant, flexible forms
- **[Zod 3.25.76](https://zod.dev/)** - TypeScript-first schema validation
- **@hookform/resolvers** - Validation library resolvers

### Backend & API
- **[Express.js](https://expressjs.com/)** - Fast, minimalist web framework
- **[Nodemailer](https://nodemailer.com/)** - Email sending from Node.js
- **[CORS](https://www.npmjs.com/package/cors)** - Cross-origin resource sharing middleware
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Environment variable management

### Data & State Management
- **[TanStack React Query 5.83.0](https://tanstack.com/query/latest)** - Powerful async state management
- **LocalStorage API** - Client-side data persistence with fallback

### Utilities & Tools
- **[date-fns](https://date-fns.org/)** - Modern JavaScript date utility library
- **[Recharts](https://recharts.org/)** - Composable charting library built on React
- **[Sonner](https://sonner.emilkowal.ski/)** - Opinionated toast component for React

### Deployment & Hosting
- **[Vercel](https://vercel.com/)** - Backend API hosting (serverless functions)
- **[Netlify](https://www.netlify.com/)** - Frontend hosting with continuous deployment
- **Git & GitHub** - Version control and collaboration

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** or **Bun**
- **Git**
- **Gmail account** (for email notifications)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/hemanth-chakravarthy/hemanth-portfolio.git
   cd hemanth-portfolio
   ```

2. **Install Frontend Dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   bun install
   # or
   npm install
   cd ..
   ```

4. **Set Up Environment Variables**

   Create `backend/.env`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ADMIN_PASSWORD=your-secure-admin-password
   PORT=3001
   NODE_ENV=development
   ```

   Create `.env` in root (for frontend):
   ```env
   VITE_API_URL=http://localhost:3001
   ```

   > **📌 Gmail App Password Setup:**
   > 1. Go to [Google Account Settings](https://myaccount.google.com/)
   > 2. Security → 2-Step Verification (enable if not already)
   > 3. Search "App passwords"
   > 4. Generate new app password for "Mail"
   > 5. Copy 16-character password to `EMAIL_PASS`

5. **Run Development Servers**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   bun run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   bun run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build & Deploy

### Build for Production
```bash
bun run build
```

### Preview Production Build
```bash
bun run preview
```

### Deploy Backend to Vercel

1. **Prepare Backend**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git push
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Set root directory to `backend`
   - Add environment variables:
     - `EMAIL_USER`
     - `EMAIL_PASS`
     - `ADMIN_PASSWORD`
     - `NODE_ENV=production`
   - Deploy!

3. **Copy your Vercel URL** (e.g., `https://portfolio-backend.vercel.app`)

### Deploy Frontend to Netlify

1. **Update Frontend Environment Variable**
   
   Create `.env` in root:
   ```env
   VITE_API_URL=https://your-backend.vercel.app
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push
   ```

3. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Import your repository
   - Build settings:
     - **Build command:** `bun run build`
     - **Publish directory:** `dist`
   - Add environment variable:
     - `VITE_API_URL=https://your-backend.vercel.app`
   - Deploy!

---

## ✨ Features

### 🎯 Interactive Elements
- Custom animated cursor with smooth hover effects
- Scroll-triggered animations with Framer Motion
- Parallax scrolling sections
- Floating particle background
- Spring-based micro-interactions
- Theme switcher with smooth transitions

### 📧 Contact Form
- Real-time form validation with React Hook Form + Zod
- Email notifications via Nodemailer
- LocalStorage backup for offline functionality
- Toast notifications for user feedback
- Loading states and error handling

### 🔐 Admin Dashboard (`/messages`)
- Password-protected access
- View all contact form submissions
- Delete individual messages
- Clear all messages
- Refresh button to sync with server
- Timestamps and email links
- Fallback to localStorage if server is down

### 🎨 Design System
- Consistent component library with shadcn/ui
- 30+ accessible Radix UI components
- Custom variants with class-variance-authority
- Dark/light mode with next-themes
- Keyboard navigation support
- ARIA labels and semantic HTML

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Touch-optimized interactions
- Adaptive layouts for all screen sizes

### ⚡ Performance Optimizations
- Code splitting with React Router
- Lazy loading components
- Optimized images
- Minimal bundle size
- Fast Time to Interactive (TTI)

---

## 📬 Contact

<div align="center">

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:khchakri@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hemanth-chakravarthy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hemanth-chakravarthy-kancharla-a27b87357)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://hemanth-chakravarthy.netlify.app/)

</div>

---

## 🙏 Acknowledgments

- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Icons:** [Lucide Icons](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Fonts:** [Google Fonts - Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- **Hosting:** [Vercel](https://vercel.com/) & [Netlify](https://netlify.com/)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">


⭐ **Star this repo if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/hemanth-chakravarthy/hemanth-portfolio?style=social)](https://github.com/hemanth-chakravarthy/hemanth-portfolio)
[![GitHub forks](https://img.shields.io/github/forks/hemanth-chakravarthy/hemanth-portfolio?style=social)](https://github.com/hemanth-chakravarthy/hemanth-portfolio/fork)

</div>



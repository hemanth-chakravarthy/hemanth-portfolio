import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check theme on mount and when it changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    // Initial check
    checkTheme();

    // Create a MutationObserver to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      });
    });

    // Start observing the html element for class changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/hemanth-chakravarthy", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/hemanth-chakravarthy-kancharla-a27b87357", label: "LinkedIn" },
    { icon: Mail, href: "mailto:khchakri@gmail.com", label: "Email" },
    { icon: Instagram, href: "https://instagram.com/imperialx.04", label: "Instagram" },
  ];

  // Determine which logo to use based on theme
  const logoPath = isDarkMode 
    ? "src/assets/HCK White Logo.png" 
    : "src/assets/HCK Black Logo.png";

  return (
    <footer className="py-8 border-t border-border relative">
  {/* Added px-8 and md:px-12 for more side spacing */}
  <div className="container mx-auto px-18 md:px-20">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Logo */}
      <a
        href="#home"
        className="font-display font-bold text-2xl text-foreground shrink-0"
      >
        <img 
          src={logoPath}
          alt="HCK Logo" 
          className="h-6 w-auto sm:h-8"
          key={logoPath} 
        />
      </a>

      {/* Social Links - Mobile */}
      <div className="flex md:hidden gap-4">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label={social.label}
          >
            <social.icon className="w-4 h-4" />
          </a>
        ))}
      </div>

      {/* Copyright */}
      {/* Added md:text-right to push the copyright further to the right edge */}
      <p className="text-sm text-muted-foreground md:text-right">
        © {currentYear} Hemanth Chakravarthy Kancharla. All rights reserved.
      </p>
    </div>
  </div>
</footer>
  );
};

export default Footer;
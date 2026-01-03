import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

// 🔗 Google Drive direct download link
const CV_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=1FQGn15VsUWybG0PMHaadzVcaGtMplRsy";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.querySelector(section.href) as HTMLElement;
        if (!el) continue;

        const { offsetTop, offsetHeight } = el;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActive(section.name);
        }
      }

      if (window.scrollY < 100) {
        setActive("Home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine which logo to use based on theme
  const logoPath = isDarkMode 
    ? "src/assets/HCK White Logo.png" 
    : "src/assets/HCK Black Logo.png";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 transition-shadow ${
        scrolled ? "shadow-lg shadow-foreground/5" : ""
      }`}
    >
      <nav className="relative max-w-6xl mx-auto px-6 py-4 flex items-center">
        {/* LEFT: Logo */}
        <a
          href="#home"
          className="font-display font-bold text-2xl text-foreground shrink-0"
        >
          <img 
            src={logoPath} 
            alt="HCK Logo" 
            className="h-6 w-auto sm:h-8"
            key={logoPath} // Force re-render when logo changes
          />
        </a>

        {/* CENTER: Nav links */}
        <ul className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
          {sections.map((link) => (
            <li key={link.name} className="relative">
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active === link.name
                    ? "text-black dark:text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActive(link.name)}
              >
                {link.name}
              </a>

              {active === link.name && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-black dark:bg-white rounded-full" />
              )}
            </li>
          ))}
        </ul>

        {/* RIGHT: Actions */}
        <div className="ml-auto flex items-center gap-4 shrink-0">
          <ThemeToggle />

          {/* Download CV */}
          <a
            href={CV_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary gap-2 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Download className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Download CV</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
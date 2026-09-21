import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoWhite from "@/assets/hcklogowhite.webp";
import logoBlack from "@/assets/hcklogoblack.webp";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const THEMES = {
  dark: {
    bg: "#0c0f14",
    card: "#10141a",
    secondary: "#181e26",
    border: "rgba(255,255,255,0.1)",
    fg: "hsl(0,0%,96%)",
    muted: "hsl(220,10%,58%)",
    primary: "#23dec8",
    primaryFg: "#0c0f14",
    label: "Light",
  },
  light: {
    bg: "#ffffff",
    card: "#ffffff",
    secondary: "#f4f5f7",
    border: "hsl(220,14%,88%)",
    fg: "hsl(220,20%,12%)",
    muted: "hsl(220,10%,46%)",
    primary: "#1cb09f",
    primaryFg: "#ffffff",
    label: "Dark",
  },
};

type Stage = "closed" | "open" | "sent";

const Contact: React.FC = () => {
  const { toast } = useToast();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [stage, setStage] = useState<Stage>("closed");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const t = isDark ? THEMES.dark : THEMES.light;
  const logo = isDark ? logoBlack : logoWhite;

  const openLetter = () => {
    if (stage === "closed") {
      setStage("open");
    }
  };

  const resetLetter = () => {
    setStage("closed");
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newMessage = {
      id: crypto.randomUUID(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      const data = await response.json();

      if (response.ok) {
        const existing = localStorage.getItem("contact-messages");
        const messages = existing ? JSON.parse(existing) : [];
        messages.unshift(newMessage);
        localStorage.setItem("contact-messages", JSON.stringify(messages));

        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon!",
        });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch {
      // Fallback to localStorage
      const existing = localStorage.getItem("contact-messages");
      const messages = existing ? JSON.parse(existing) : [];
      messages.unshift(newMessage);
      localStorage.setItem("contact-messages", JSON.stringify(messages));

      toast({
        title: "Message saved locally",
        description: "Could not send email notification, but your message was saved.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setStage("sent");
    }
  };

  return (
    <section
      id="contact"
      style={{
        background: t.bg,
        transition: "background 0.4s",
        fontFamily: "'Outfit', sans-serif",
      }}
      className="py-16 md:py-20"
    >
      <div className="max-w-[640px] mx-auto px-6 sm:px-8 text-center">
        {/* Header */}
        <div className="text-center mb-3">
          <h2
            className="section-heading text-center"
            style={{
              margin: 0,
              color: t.fg,
            }}
          >
            Get In Touch<span style={{ color: t.primary }}>.</span>
          </h2>
        </div>

        <p
          className="text-center max-w-lg mx-auto"
          style={{
            margin: "0 auto 16px",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "15px",
            color: t.muted,
          }}
        >
          Click the envelope to write me a letter — or email{" "}
          <strong style={{ color: t.fg }}>khchakri@gmail.com</strong> directly.
        </p>

        {/* 3D Envelope & Letter Stage */}
        <div
          style={{
            position: "relative",
            height: stage === "closed" ? "250px" : "440px",
            perspective: "1400px",
            transition: "height 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Envelope Body */}
          <div
            onClick={openLetter}
            style={{
              position: "absolute",
              zIndex: stage === "closed" ? 3 : 1,
              left: "50%",
              bottom: 0,
              transform: "translateX(-50%)",
              width: "min(100%, 440px)",
              height: "230px",
              background: t.card,
              border: `1px solid ${t.border}`,
              borderRadius: "14px",
              boxShadow: "0 30px 60px -30px rgba(0,0,0,0.35)",
              overflow: "hidden",
              cursor: stage === "closed" ? "pointer" : "default",
            }}
          >
            {/* Flap with 3D rotation */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "130px",
                background: t.secondary,
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transformOrigin: "top center",
                transform: `rotateX(${stage === "closed" ? 0 : -160}deg)`,
                transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* Wax Monogram Seal */}
              <div
                style={{
                  position: "absolute",
                  top: "18px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: isDark
                    ? "linear-gradient(135deg, #e6f9f6 0%, #d0f5ee 100%)"
                    : "#10141a",
                  border: isDark
                    ? "1px solid rgba(28, 176, 159, 0.35)"
                    : "1px solid rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isDark
                    ? "0 4px 14px rgba(0,0,0,0.3)"
                    : "0 4px 14px rgba(0,0,0,0.15)",
                  opacity: stage === "closed" ? 1 : 0,
                  transition: "opacity 0.3s, background 0.3s, border 0.3s",
                }}
              >
                <img
                  src={logo}
                  alt="HCK Logo"
                  className="w-6 h-6 object-contain select-none pointer-events-none drop-shadow-sm transition-all duration-300"
                />
              </div>
            </div>

            {/* Closed Face prompt inside envelope */}
            {stage === "closed" && (
              <div
                style={{
                  position: "absolute",
                  bottom: "36px",
                  left: 0,
                  right: 0,
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <div style={{ fontSize: "16px", color: t.primary }}>✉</div>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: t.muted,
                  }}
                >
                  Write me a letter
                </span>
              </div>
            )}
          </div>

          {/* Letter (Slides up when opened) */}
          <div
            onClick={openLetter}
            style={{
              position: "absolute",
              zIndex: stage === "closed" ? 0 : 2,
              left: "50%",
              bottom: stage === "closed" ? "6px" : "8px",
              transform: `translateX(-50%) translateY(${
                stage === "closed" ? "40px" : "-6px"
              }) scale(${stage === "closed" ? 0.94 : 1})`,
              width: "min(100%, 460px)",
              minHeight: stage === "closed" ? "0px" : "360px",
              background: t.bg === "#ffffff" ? "#fffdf8" : t.card,
              border: `1px solid ${t.border}`,
              borderRadius: "10px",
              boxShadow: "0 24px 50px -20px rgba(0,0,0,0.4)",
              padding: stage === "closed" ? "0" : "34px 30px",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              cursor: stage === "closed" ? "pointer" : "default",
              overflow: "hidden",
            }}
          >
            {/* SENT STATE */}
            {stage === "sent" && (
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "40px 10px",
                  animation: "letter-in 0.4s ease both",
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetLetter();
                  }}
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    border: `1px solid ${t.border}`,
                    background: "transparent",
                    color: t.muted,
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.2s",
                  }}
                  className="hover:border-foreground hover:text-foreground"
                  title="Close letter"
                  aria-label="Close letter"
                >
                  <X className="w-4 h-4" />
                </button>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    letterSpacing: "0.2em",
                    color: t.primary,
                    border: `2px solid ${t.primary}`,
                    borderRadius: "8px",
                    padding: "8px 20px",
                    transform: "rotate(-6deg)",
                    marginBottom: "20px",
                  }}
                >
                  SENT
                </div>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "15px",
                    color: t.muted,
                    maxWidth: "320px",
                    margin: "0 0 20px",
                  }}
                >
                  Sealed and on its way — I&apos;ll reply to {name || email || "you"} soon.
                </p>
                <button
                  onClick={resetLetter}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "100px",
                    border: `1px solid ${t.border}`,
                    background: "transparent",
                    color: t.muted,
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Write another
                </button>
              </div>
            )}

            {/* OPEN FORM STATE */}
            {stage === "open" && (
              <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                style={{
                  animation: "letter-in 0.4s ease 0.2s both",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "18px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "26px",
                      color: t.fg,
                      margin: 0,
                    }}
                  >
                    Dear Hemanth,
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStage("closed");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: `1px solid ${t.border}`,
                      background: "transparent",
                      color: t.muted,
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.2s",
                    }}
                    className="hover:border-foreground hover:text-foreground"
                    title="Close letter"
                    aria-label="Close letter"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "10px",
                    borderBottom: `1px solid ${t.border}`,
                    paddingBottom: "8px",
                    marginBottom: "18px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14px",
                      color: t.muted,
                      whiteSpace: "nowrap",
                    }}
                  >
                    My name is
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    required
                    disabled={isSubmitting}
                    style={{
                      flex: 1,
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      fontFamily: "'Caveat', cursive",
                      fontSize: "20px",
                      color: t.fg,
                      padding: "2px 6px",
                      minWidth: 0,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "10px",
                    borderBottom: `1px solid ${t.border}`,
                    paddingBottom: "8px",
                    marginBottom: "18px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14px",
                      color: t.muted,
                      whiteSpace: "nowrap",
                    }}
                  >
                    reach me at
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    disabled={isSubmitting}
                    style={{
                      flex: 1,
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      fontFamily: "'Caveat', cursive",
                      fontSize: "20px",
                      color: t.fg,
                      padding: "2px 6px",
                      minWidth: 0,
                    }}
                  />
                </div>

                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "14px",
                    color: t.muted,
                    margin: "18px 0 8px",
                  }}
                >
                  and I wanted to say —
                </p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Let's build something..."
                  rows={4}
                  required
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: `1px solid ${t.border}`,
                    background: "transparent",
                    outline: "none",
                    fontFamily: "'Caveat', cursive",
                    fontSize: "20px",
                    lineHeight: 1.5,
                    color: t.fg,
                    resize: "none",
                    padding: "2px 6px 10px",
                    boxSizing: "border-box",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "22px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "20px",
                      color: t.muted,
                    }}
                  >
                    Yours,
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: "11px 24px",
                      borderRadius: "100px",
                      border: "none",
                      background: t.fg,
                      color: t.bg,
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "13.5px",
                      fontWeight: 600,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      opacity: isSubmitting ? 0.6 : 1,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {isSubmitting ? "Sealing..." : "Seal & Send"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Envelope Hint */}
        <p
          style={{
            textAlign: "center",
            margin: "20px 0 0",
            fontFamily: "'Space Grotesk', monospace",
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: t.muted,
            opacity: stage === "closed" ? 1 : 0,
            transition: "opacity 0.3s",
            pointerEvents: "none",
          }}
        >
          CLICK TO OPEN
        </p>
      </div>
    </section>
  );
};

export default Contact;
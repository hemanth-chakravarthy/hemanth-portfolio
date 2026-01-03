import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Trash2, ArrowLeft, Mail, User, MessageSquare, Lock, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Try to load from localStorage first
    const stored = localStorage.getItem("contact-messages");
    if (stored) {
      setMessages(JSON.parse(stored));
    }

    // Check for existing token
    const token = localStorage.getItem("admin-token");
    if (token) {
      setAuthToken(token);
      fetchMessagesWithToken(token);
    }
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    try {
      const response = await fetch(`${API_URL}/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setAuthToken(password);
        localStorage.setItem("admin-token", password);
        fetchMessagesFromServer();
        toast({
          title: "Authenticated",
          description: "Access granted to messages.",
        });
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not connect to server. Showing local messages.",
        variant: "destructive",
      });
      setIsAuthenticated(true); // Fallback to local mode
    } finally {
      setIsAuthenticating(false);
    }
  };

  const fetchMessagesFromServer = async () => {
    if (!authToken) return;
    
    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
        // Sync with localStorage
        localStorage.setItem("contact-messages", JSON.stringify(data.messages));
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("admin-token");
        setAuthToken(null);
        setIsAuthenticated(false);
        toast({
          title: "Session Expired",
          description: "Please log in again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const fetchMessagesWithToken = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
        localStorage.setItem("contact-messages", JSON.stringify(data.messages));
        setIsAuthenticated(true);
      } else {
        // Token is invalid
        localStorage.removeItem("admin-token");
        setAuthToken(null);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      if (isAuthenticated && authToken) {
        // Try to delete from server
        const response = await fetch(`${API_URL}/api/messages/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (response.status === 401) {
          // Token expired
          localStorage.removeItem("admin-token");
          setAuthToken(null);
          setIsAuthenticated(false);
          toast({
            title: "Session Expired",
            description: "Please log in again to delete messages.",
            variant: "destructive",
          });
          return;
        }
      }
    } catch (error) {
      console.error('Failed to delete from server:', error);
    }

    // Always delete locally
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("contact-messages", JSON.stringify(updated));
    
    toast({
      title: "Message deleted",
      description: "The message has been removed.",
    });
  };

  const clearAll = async () => {
    if (!confirm("Are you sure you want to clear all messages? This action cannot be undone.")) {
      return;
    }

    try {
      if (isAuthenticated && authToken) {
        // Try to clear from server
        const response = await fetch(`${API_URL}/api/messages`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (response.status === 401) {
          // Token expired
          localStorage.removeItem("admin-token");
          setAuthToken(null);
          setIsAuthenticated(false);
          toast({
            title: "Session Expired",
            description: "Please log in again to clear messages.",
            variant: "destructive",
          });
          return;
        }
      }
    } catch (error) {
      console.error('Failed to clear from server:', error);
    }

    // Always clear locally
    setMessages([]);
    localStorage.removeItem("contact-messages");
    
    toast({
      title: "All messages cleared",
      description: "All messages have been removed.",
    });
  };

  const refreshMessages = () => {
    if (authToken) {
      setIsLoading(true);
      fetchMessagesFromServer().finally(() => setIsLoading(false));
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    setPassword("");
    localStorage.removeItem("admin-token");
    toast({
      title: "Logged out",
      description: "You have been logged out.",
    });
  };

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Messages | Hemanth</title>
        </Helmet>

        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center mb-8">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Protected Area<span className="text-primary">.</span>
              </h1>
              <p className="text-muted-foreground text-center">
                Enter password to view contact messages
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isAuthenticating}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter admin password"
                />
              </div>
              <button
                type="submit"
                disabled={isAuthenticating}
                className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthenticating ? 'Authenticating...' : 'Access Messages'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Messages | Hemanth</title>
      </Helmet>

      <div className="min-h-screen bg-background py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold">
                  Contact Messages<span className="text-primary">.</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Connected to {API_URL}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
              >
                Logout
              </button>
              <button
                onClick={refreshMessages}
                disabled={isLoading}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50"
                title="Refresh messages from server"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              {messages.length > 0 && (
                <button
                  onClick={clearAll}
                  className="px-4 py-2 text-sm bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No messages yet</p>
              <p className="text-sm mt-2">
                Messages will appear here when users submit the contact form.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-foreground font-medium">
                        <User className="w-4 h-4 text-primary" />
                        {msg.name}
                      </div>
                      <a
                        href={`mailto:${msg.email}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {msg.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;
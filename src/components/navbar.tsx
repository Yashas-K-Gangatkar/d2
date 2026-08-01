"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, LogIn, LogOut, Download, Play, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const NAV_LINKS = [
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How It Works" },
  { id: "privacy", label: "Privacy" },
  { id: "faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isLoggedIn = status === "authenticated" && session?.user;
  const isAuthLoading = status === "loading";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
          >
            <img
              src="/icons/icon-192x192.png"
              alt="NotiFetch"
              className="w-8 h-8 rounded-lg"
              width={32}
              height={32}
            />
            <span className="text-lg font-bold tracking-tight">NotiFetch</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Play Store button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.notifetch.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-foreground text-background text-xs font-semibold px-3.5 h-9 rounded-lg hover:bg-foreground/90 transition-colors"
            >
              <Play className="w-3 h-3 fill-current" />
              Get App
            </a>

            {/* Auth */}
            {isAuthLoading ? (
              <div className="hidden sm:block w-8 h-8 rounded-full bg-secondary animate-pulse" />
            ) : isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = "/dashboard"}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {session.user.image ? (
                    <img src={session.user.image} alt="" className="w-6 h-6 rounded-full" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">
                        {(session.user.name || session.user.email || "U")[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="max-w-[80px] truncate text-sm">
                    {session.user.name || session.user.email?.split("@")[0]}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = "/auth/signin"}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => window.location.href = "/auth/signin"}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20"
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-background">
                <SheetTitle className="flex items-center gap-2 mb-6">
                  <img
                    src="/icons/icon-192x192.png"
                    alt="NotiFetch"
                    className="w-8 h-8 rounded-lg"
                    width={32}
                    height={32}
                  />
                  <span className="font-bold">NotiFetch</span>
                </SheetTitle>
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="px-4 py-3 rounded-lg text-sm font-medium text-left text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="mt-4 pt-4 border-t border-border space-y-2">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.notifetch.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-foreground text-background text-sm font-semibold px-4 h-10 rounded-lg hover:bg-foreground/90 transition-colors w-full"
                    >
                      <Download className="w-4 h-4" />
                      Download on Play Store
                    </a>
                    {isLoggedIn ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => { window.location.href = "/dashboard"; setMobileOpen(false); }}
                          className="w-full"
                        >
                          Dashboard
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => { signOut({ callbackUrl: "/" }); setMobileOpen(false); }}
                          className="w-full"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => { window.location.href = "/auth/signin"; setMobileOpen(false); }}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"; // Import NextAuth.js hooks

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession(); // Get session and status
  const router = useRouter();

  const menuVariants = {
    open: { opacity: 1, x: 0, transition: { type: "tween", duration: 0.3 } },
    closed: { opacity: 0, x: "100%", transition: { type: "tween", duration: 0.3 } },
  };

  const closeMenu = () => setIsOpen(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">EduPro</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-gray-600 hover:text-primary transition-colors">
              Courses
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
              Contact
            </Link>
            {status === "authenticated" ? (
              <>
                <Button onClick={() => signOut()} variant="outline" className="mr-2">
                  Log Out
                </Button>
                <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
              </>
            ) : (
              <>
                <Button onClick={() => router.push('/auth/signin')} variant="outline" className="mr-2">
                  Sign In
                </Button>
                <Button onClick={() => router.push("/")}>Get Started</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMenu}
            />

            {/* Menu */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50"
            >
              <div className="pt-20 px-6 space-y-6">
                <Link href="/courses" className="block text-lg text-gray-600 hover:text-primary" onClick={closeMenu}>
                  Courses
                </Link>
                <Link href="/about" className="block text-lg text-gray-600 hover:text-primary" onClick={closeMenu}>
                  About
                </Link>
                <Link href="/contact" className="block text-lg text-gray-600 hover:text-primary" onClick={closeMenu}>
                  Contact
                </Link>
                <div className="space-y-4">
                  {status === "authenticated" ? (
                    <>
                      <Button onClick={() => signOut()} variant="outline" className="w-full">
                        Log Out
                      </Button>
                      <Button onClick={() => router.push("/dashboard")} className="w-full">
                        Dashboard
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => signIn()} variant="outline" className="w-full">
                        Sign In
                      </Button>
                      <Button onClick={() => router.push("/auth/signup")} className="w-full">
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
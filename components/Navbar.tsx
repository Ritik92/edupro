'use client'
import React, { useState } from 'react';
import { Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ScreenReader } from './ScreenReaderComponent';
import VoiceNavigation from './VoiceNavigationcomponent';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const navLinks = [
    { href: '/courses', label: 'Courses' },
    { href: '/leaderboard', label: 'Leaderboard' }
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/signin");
  };

  return (
    <motion.nav 
      className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-indigo-100 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with Gradient */}
          <motion.a 
            href="/" 
            className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Brainiacs
          </motion.a>
          <ScreenReader/>
          <VoiceNavigation/>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <motion.a
                key={href}
                href={href}
                className="relative text-gray-700 hover:text-indigo-600 font-medium px-2 py-1 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            
            {status === "authenticated" ? (
              <motion.div className="flex items-center gap-4 ml-4">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-all"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </button>
                <motion.button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-[1.02] transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </motion.button>
              </motion.div>
            ) : (
              <motion.div className="flex items-center gap-4 ml-4">
                <button
                  onClick={() => router.push("/auth/signin")}
                  className="px-6 py-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Sign In
                </button>
                <motion.button
                  onClick={() => router.push("/auth/signin")}
                  className="px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-[1.02] transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-indigo-600"
            whileHover={{ scale: 1.1 }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="px-6 py-4 border-t border-indigo-50">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="block py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg px-4 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              ))}
              
              {status === "authenticated" ? (
                <>
                  <button
                    onClick={() => {
                      router.push("/dashboard");
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 mt-4 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      router.push("/auth/signin");
                      setIsOpen(false);
                    }}
                    className="w-full py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      router.push("/auth/signin");
                      setIsOpen(false);
                    }}
                    className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
'use client'
import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const navLinks = [
    { href: '/courses', label: 'Courses' },
    { href: '/', label: 'About' },
    { href: '/', label: 'Contact' },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/signin");
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="font-bold text-xl text-black">
            EduPro
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-gray-600 hover:text-black transition-colors"
              >
                {label}
              </a>
            ))}
            {status === "authenticated" ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => router.push("/")}
                  className="px-4 py-2 text-gray-600 hover:text-black"
                >
                  Dashboard
                </button>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => router.push("/auth/signin")}
                  className="px-4 py-2 text-gray-600 hover:text-black"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => router.push("/auth/signin")}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="block py-2 text-gray-600 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </a>
            ))}
            {status === "authenticated" ? (
              <>
                <button
                  onClick={() => {
                    router.push("/");
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-600 hover:text-black"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full mt-2 px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
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
                  className="block w-full py-2 text-gray-600 hover:text-black"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    router.push("/auth/signin");
                    setIsOpen(false);
                  }}
                  className="w-full mt-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
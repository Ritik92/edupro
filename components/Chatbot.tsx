'use client'

import Script from 'next/script'
import { useState, useEffect } from 'react'



// Main Chatbot Component with Screen Reader
export default function ChatbotEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!document.querySelector('zapier-interfaces-chatbot-embed')) {
      const chatbot = document.createElement('zapier-interfaces-chatbot-embed');
      chatbot.setAttribute('is-popup', 'true');
      chatbot.setAttribute('chatbot-id', 'cm6v0y3n0000zma4f68rlcllx');
      document.body.appendChild(chatbot);
    }
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Script
        src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"
        type="module"
        strategy="afterInteractive"
        onLoad={() => setIsLoaded(true)}
      />
       {/* Optional loading indicator */}
      {!isLoaded && (
        <div className="fixed bottom-20 right-4 z-50 px-6 py-3 bg-gray-200 rounded-full shadow-lg">
          Loading...
        </div>
      )}
    </>
  );
}
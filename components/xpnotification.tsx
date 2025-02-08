import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';

interface XPNotificationProps {
  xpAmount: number;
  show: boolean;
  onClose?: () => void;
}

const XPNotification = ({ xpAmount, show, onClose }: XPNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 shadow-lg flex items-center gap-3">
        <div className="bg-yellow-400 rounded-full p-2">
          <Award className="h-6 w-6 text-yellow-700" />
        </div>
        <div>
          <h3 className="font-semibold text-yellow-900">XP Gained!</h3>
          <p className="text-yellow-700">+{xpAmount} experience points</p>
        </div>
      </div>
    </div>
  );
};

export default XPNotification;
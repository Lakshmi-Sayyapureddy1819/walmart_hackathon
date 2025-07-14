
import React, { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';

interface EcoCoinCounterProps {
  totalCoins: number;
  onCoinsUpdate?: (coins: number) => void;
}

const EcoCoinCounter = ({ totalCoins, onCoinsUpdate }: EcoCoinCounterProps) => {
  const [displayCoins, setDisplayCoins] = useState(totalCoins);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (totalCoins !== displayCoins) {
      setIsAnimating(true);
      
      // Animate the counter
      const startCoins = displayCoins;
      const endCoins = totalCoins;
      const duration = 1000; // 1 second
      const steps = 30;
      const increment = (endCoins - startCoins) / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.round(startCoins + (increment * currentStep));
        
        if (currentStep >= steps) {
          setDisplayCoins(endCoins);
          setIsAnimating(false);
          clearInterval(timer);
          onCoinsUpdate?.(endCoins);
        } else {
          setDisplayCoins(newValue);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [totalCoins, displayCoins, onCoinsUpdate]);

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full">
      <Coins className={`w-5 h-5 text-yellow-600 ${isAnimating ? 'animate-spin' : ''}`} />
      <span className={`font-semibold text-yellow-700 ${isAnimating ? 'animate-pulse' : ''}`}>
        {displayCoins.toLocaleString()}
      </span>
    </div>
  );
};

export { EcoCoinCounter };

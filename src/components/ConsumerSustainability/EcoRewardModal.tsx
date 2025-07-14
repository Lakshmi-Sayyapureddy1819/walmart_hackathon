
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, Leaf, Recycle, Shield, Droplets, RotateCcw } from 'lucide-react';

interface EcoReward {
  ecoCoinValue: number;
  messages: string[];
  badges: string[];
  productName: string;
}

interface EcoRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  reward: EcoReward | null;
}

const EcoRewardModal = ({ isOpen, onClose, reward }: EcoRewardModalProps) => {
  if (!reward) return null;

  const getIconForMessage = (message: string) => {
    if (message.includes('plastic-free')) return <Droplets className="w-4 h-4 text-blue-500" />;
    if (message.includes('refill')) return <RotateCcw className="w-4 h-4 text-green-500" />;
    if (message.includes('organic')) return <Leaf className="w-4 h-4 text-green-600" />;
    if (message.includes('chemical-free')) return <Shield className="w-4 h-4 text-purple-500" />;
    if (message.includes('reusable')) return <Recycle className="w-4 h-4 text-teal-500" />;
    return <Leaf className="w-4 h-4 text-green-500" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-green-600">
            🎉 Sustainable Purchase Reward!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Coin Display */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Coins className="w-8 h-8 text-yellow-500 animate-bounce" />
              <span className="text-3xl font-bold text-yellow-600">
                +{reward.ecoCoinValue}
              </span>
              <Coins className="w-8 h-8 text-yellow-500 animate-bounce" />
            </div>
            <p className="text-lg font-semibold text-gray-700">Eco-Coins Earned!</p>
            <p className="text-sm text-gray-500">for purchasing {reward.productName}</p>
          </div>

          {/* Messages */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">Your Impact:</h4>
            {reward.messages.map((message, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                {getIconForMessage(message)}
                <p className="text-sm text-gray-700 flex-1">{message}</p>
              </div>
            ))}
          </div>

          {/* Badges */}
          {reward.badges.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">New Badges Earned:</h4>
              <div className="flex flex-wrap gap-2">
                {reward.badges.map((badge, index) => (
                  <Badge key={index} className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    🏆 {badge}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button onClick={onClose} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { EcoRewardModal };

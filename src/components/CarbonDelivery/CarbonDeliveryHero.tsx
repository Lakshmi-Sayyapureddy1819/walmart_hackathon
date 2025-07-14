import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Leaf, Recycle, ArrowDown } from 'lucide-react';
import Image from '../../assests/carbon6.jpg';

export const CarbonDeliveryHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-600 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="container mx-auto px-4 py-24 relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100/90">
            🌍 Carbon-Aware Delivery
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Choose Your
            <span className="block text-green-300">Carbon Impact</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 animate-fade-in">
            Make climate-conscious delivery choices and earn rewards for returning reusable packaging. 
            Every decision counts toward our net-zero goal.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Button size="lg" className="bg-green-500 text-white hover:bg-green-400 font-semibold">
              <Truck className="mr-2 h-5 w-5" />
              Choose Delivery
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-green-800">
              <Recycle className="mr-2 h-5 w-5" />
              Return Packaging
            </Button>
          </div>
          </div>

          {/* Impact Stats */}
          <div className="relative">
  <div className="bg-white/10 backdrop-blur rounded-2xl w-[90%] h-[70%]  p-8 border border-white/20">
    <img
      src={Image}
      alt="Carbon Delivery"
      className="rounded-2xl shadow-xl  object-contain"
    />
  </div>
</div>


        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Recycle, Trash2, Leaf, ArrowDown } from 'lucide-react';
import Image from "../../assests/mod7.jpg"
export const WasteHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-teal-800 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="container mx-auto px-4 py-24 relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
          <Badge className="mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-100/90">
            ♻️ Zero-Waste Innovation
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            ZWIB System
            <span className="block text-emerald-300">Smart Waste Management</span>
          </h1>
          <p className="text-xl  mb-8 text-emerald-100 animate-fade-in">
            From in-store smart bins to household AI assistance and community compost pickup. 
            Complete waste management ecosystem with real-time analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Button size="lg" className="bg-emerald-500 text-white hover:bg-emerald-400 font-semibold">
              <Recycle className="mr-2 h-5 w-5" />
              Register Item
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white text-emerald-800">
              <Trash2 className="mr-2 h-5 w-5" />
              Smart Sorting
            </Button>
          </div>
          </div>
          {/* Impact Stats */}
          <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <img src={Image} alt="Smart Farming" className="rounded-2xl shadow-xl" />
              </div>
            </div>

          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 mx-auto text-emerald-300" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
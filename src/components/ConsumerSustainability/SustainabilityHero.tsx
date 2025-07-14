import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';
import Image from "../../assests/mod5.jpg"
const SustainabilityHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Consumer Sustainability Scorecard
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Shop with
                <span className="block text-primary">Purpose</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover plastic-free products, track your sustainability impact, 
                and make choices that matter for our planet.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore Plastic-Free Products
              </Button>
              <Button variant="outline" size="lg">
                See Your Impact
              </Button>
            </div>

          </div>
          

          <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <img src={Image} alt="Smart Farming" className="rounded-2xl shadow-xl" />
              </div>
            </div>

          {/* Right Side - Animated Eco Score Meter */}
          </div>
          </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-secondary/5 to-transparent opacity-50" />
    </section>
  );
};

export { SustainabilityHero };
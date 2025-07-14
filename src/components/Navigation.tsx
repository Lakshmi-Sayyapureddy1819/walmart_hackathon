
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from './logo.jpeg';

const solutions = [
  { name: 'Smart Farming', path: '/smart-farming' },
  { name: 'Returns to Resource', path: '/returns-to-resource' },
  { name: 'Eco Packaging', path: '/eco-packaging' },
  { name: 'Energy Management', path: '/energy-management' },
  { name: 'Consumer Sustainability', path: '/consumer-sustainability' },
  { name: 'Carbon-Aware Delivery & Reusable Packaging', path: '/carbon-delivery' },
  { name: 'ZWIB & Community Compost', path: '/waste-management ' },
];


export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <div className="h-8 w-8 rounded bg-walmart-blue flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div> */}
            <img
  src={Logo}
  alt="Logo"
  className="h-8 w-8 rounded bg-walmart-blue object-cover"
/>

            <span className="font-bold text-xl text-walmart-blue">AI Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-walmart-blue ${
                isActive('/') ? 'text-walmart-blue' : 'text-gray-600'
              }`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-walmart-blue transition-colors">
                <span>Solutions</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {solutions.map((solution) => (
                  <DropdownMenuItem key={solution.path} asChild>
                    <Link to={solution.path} className="w-full">
                      {solution.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors hover:text-walmart-blue ${
                isActive('/dashboard') ? 'text-walmart-blue' : 'text-gray-600'
              }`}
            >
              Dashboard
            </Link>

            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-walmart-blue ${
                isActive('/about') ? 'text-walmart-blue' : 'text-gray-600'
              }`}
            >
              About
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                EN
              </Button>
              <Button className="bg-walmart-blue hover:bg-walmart-blue/90">
                Login
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                <Link 
                  to="/" 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium"
                >
                  Home
                </Link>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Solutions</h3>
                  {solutions.map((solution) => (
                    <Link
                      key={solution.path}
                      to={solution.path}
                      onClick={() => setIsOpen(false)}
                      className="block pl-4 text-gray-600 hover:text-walmart-blue"
                    >
                      {solution.name}
                    </Link>
                  ))}
                </div>

                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium"
                >
                  Dashboard
                </Link>

                <Link 
                  to="/about" 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium"
                >
                  About
                </Link>

                <div className="pt-4 border-t space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Language
                  </Button>
                  <Button className="w-full bg-walmart-blue hover:bg-walmart-blue/90">
                    Login
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};


interface ProductData {
  id: string;
  name: string;
  category: string;
  recycledContent: number;
  waterUsage: number;
  chemicalFree: boolean;
  organic: boolean;
  plasticFree: boolean;
  sustainabilityScore: string;
}

interface EcoReward {
  ecoCoinValue: number;
  messages: string[];
  badges: string[];
  productName: string;
}

// User badges storage (in a real app, this would be in a database)
let userBadges = new Set<string>();

export const calculateEcoReward = (product: ProductData): EcoReward => {
  let ecoCoinValue = 10; // Base points
  const messages: string[] = [];
  const badges: string[] = [];

  // General message
  messages.push(`You gained eco-coins for this sustainable purchase!`);

  // Plastic-Free bonus
  if (product.plasticFree) {
    ecoCoinValue += 20;
    messages.push("This product is 98% plastic-free, significantly reducing waste!");
    
    if (!userBadges.has('Plastic-Free Hero')) {
      badges.push('Plastic-Free Hero');
      userBadges.add('Plastic-Free Hero');
    }
  }

  // Organic bonus
  if (product.organic) {
    ecoCoinValue += 10;
    messages.push("You chose an organic product, supporting sustainable farming!");
    
    if (!userBadges.has('Organic Champion')) {
      badges.push('Organic Champion');
      userBadges.add('Organic Champion');
    }
  }

  // Chemical-Free bonus
  if (product.chemicalFree) {
    ecoCoinValue += 5;
    messages.push("Your choice supports a chemical-free lifestyle!");
    
    if (!userBadges.has('Clean Living Advocate')) {
      badges.push('Clean Living Advocate');
      userBadges.add('Clean Living Advocate');
    }
  }

  // High recycled content bonus
  if (product.recycledContent > 80) {
    ecoCoinValue += 15;
    messages.push("By choosing reusable materials, you're helping create a circular economy!");
    
    if (!userBadges.has('Circular Economy Hero')) {
      badges.push('Circular Economy Hero');
      userBadges.add('Circular Economy Hero');
    }
  }

  // Low water usage bonus
  if (product.waterUsage < 2) {
    ecoCoinValue += 8;
    messages.push("This low water-usage product helps conserve our precious water resources!");
  }

  // Additional refillable message for certain categories
  if (product.category === 'Cleaning' || product.category === 'Personal Care') {
    messages.push("To maximize sustainability, remember to refill this product at least once, or return the empty container to a nearby Walmart store for responsible processing.");
  }

  return {
    ecoCoinValue,
    messages,
    badges,
    productName: product.name
  };
};

export const getUserBadges = (): string[] => {
  return Array.from(userBadges);
};

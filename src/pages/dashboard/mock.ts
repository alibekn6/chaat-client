export interface Agent {
  id: string
  name: string
  description: string
  businessInfo: string
}

export const agents: Agent[] = [
  {
    id: '1',
    name: 'Gourmet Burger Bot',
    description: 'Handles online orders and customer inquiries for a burger joint.',
    businessInfo: 'Gourmet Burger is a restaurant dedicated to crafting the most delicious burgers from locally-sourced ingredients. We are open from 11 AM to 10 PM every day.',
  },
  {
    id: '2',
    name: 'Tech Support Pro',
    description: 'Provides first-level technical support for a software company.',
    businessInfo: 'Tech Support Pro provides 24/7 technical assistance for all our software products. Our goal is to resolve your issues as quickly as possible.',
  },
  {
    id: '3',
    name: 'Fashion Finder AI',
    description: 'Helps users find clothing items and provides style advice.',
    businessInfo: 'Fashion Finder AI is your personal stylist. We help you discover the latest trends and find the perfect outfit for any occasion from our curated collection of brands.',
  },
] 
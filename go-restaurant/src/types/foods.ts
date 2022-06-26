export interface Foods {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export type NewFood = Omit<Foods, 'available'>;
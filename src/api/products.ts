export interface Product {
  id: number;
  name: string;
  price: number;
}

const products = [
  { id: 1, name: 'Magnesio (Glicinato)', price: 450 },
  { id: 2, name: 'Creatina Monohidratada', price: 600 },
  { id: 3, name: 'Omega-3 Ultra', price: 850 },
];

export const getProducts = (): Promise<Product[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(products), 500); // Simula latencia de red
  });

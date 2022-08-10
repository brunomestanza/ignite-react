import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "../components/SearchResults";

type Product = {
  id: number;
  title: string;
  price: number;
}

type Results = {
  totalPrice: number;
  data: any[];
}

export default function Home() {
  const [search, setSerch] = useState('');
  const [results, setResults] = useState<Results>({ totalPrice: 0, data: [] });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

    const products = data.map((product: Product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      }
    })

    const totalPrice = data.reduce((total: number, product: { price: number })=> {
      return total + product.price;
    }, 0);

    setResults({ totalPrice, data: products });
  };

  const addToWishList = useCallback((id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={e => setSerch(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults results={results.data} totalPrice={results.totalPrice} onAddToWishlist={addToWishList} />
    </div>
  );
};

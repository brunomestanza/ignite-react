import { List, ListRowRenderer } from 'react-virtualized';
import { ProductItem } from "./ProductItem";

type Products = {
  id: number,
  price: number,
  title: string,
  priceFormatted: string,
}

interface SearchResultsProps {
  results: Array<Products>,
  onAddToWishlist: (id: number) => void;
  totalPrice: number;
}

export function SearchResults({ results, onAddToWishlist, totalPrice }:SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
    // O style abaixo que controla a visibilidade do componente em tela
    <div key={key} style={style}>
      <ProductItem product={results[index]} onAddToWishlist={onAddToWishlist} />
    </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>
      {/* {results.map(product => {
        return (
          <ProductItem product={product} key={product.id} onAddToWishlist={onAddToWishlist} />
        );
      })} */}
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
};

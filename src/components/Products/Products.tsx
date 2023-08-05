import { IProduct } from 'models';
import Product from './Product';

import * as S from './style';
import ReactPaginate from "react-paginate";
import {useState} from "react";

interface IProps {
  products: IProduct[];
}

const Products = ({ products }: IProps) => {
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const pageCount = Math.ceil(products.length / 5);

  function handlePageClick(event: any) {
    const newOffset = (event.selected * 5) % products.length;
    setItemOffset(newOffset);
  }

  return (
    <>
      <S.Container>
        {products?.slice(itemOffset, 5+itemOffset)?.map((p) => (
          <Product product={p} key={p.sku} />
        ))}
      </S.Container>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
};

export default Products;

import {useEffect, useState} from 'react';

import Loader from 'components/Loader';
import Filter from 'components/Filter';
import Products from 'components/Products';
import Cart from 'components/Cart';

import { useProducts } from 'contexts/products-context';

import * as S from './style';
import axios from "axios";

function App() {
  const { isFetching, products, fetchProducts, setProducts, setIsFetching } = useProducts();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setIsFetching(true);
    axios.get(`https://dummyjson.com/products/search?q=${search}`).then(({data}) => {
      setProducts(data.products);
      setIsFetching(false);
    });
  }, [search]);

  return (
    <S.Container>
      {isFetching && <Loader />}
      <S.TwoColumnGrid>
        <S.Side>
          <Filter />
        </S.Side>
        <S.Main>
          <S.MainHeader>
            <div className="mb-3">
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <p>{products?.length} Product(s) found</p>
          </S.MainHeader>
          <Products products={products} />
        </S.Main>
      </S.TwoColumnGrid>
      <Cart />
    </S.Container>
  );
}

export default App;

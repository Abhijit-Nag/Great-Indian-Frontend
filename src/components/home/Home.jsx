import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import { getProducts } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Slide from './Slide';
import MidSlide from './MidSlide';
import MidSection from './MidSection';

const Home = () => {

  const dispatch = useDispatch();
  const get_products = useSelector(state => state.getProducts);
  const { products } = get_products;
  console.log(products);
  // The above one getProducts is object 
  // that is stored in redux which is different 
  // from the function called in useEffect name getProducts()

  useEffect(() => {
    
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Banner />
      {products && (
        <>
          <MidSlide products={products} title="Deal of the Day" timer={true} />
          <MidSection />
          <Slide products={products} title="Best of Electronics" timer={false} />
          <Slide products={products} title="Beauty, Food, Toys & more" timer={false} />
          <Slide products={products} title="Sports, Healthcare & more" timer={false} />
          <Slide products={products} title="Home & Kitchen Essentials" timer={false} />
          <Slide products={products} title="Grooming, Books, Auto & more" timer={false} />
          <Slide products={products} title="Fashion Top Deals" timer={false} />
          <Slide products={products} title="Top Deals" timer={false} />
          <Slide products={products} title="Books, Toys & More" timer={false} />
          <Slide products={products} title="Pick Your Styles" timer={false} />
        </>
      )}

    </>
  )
}

export default Home
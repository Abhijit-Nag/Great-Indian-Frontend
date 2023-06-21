import { Box } from '@mui/material';
import Header from './components/header/Header';
import Home from './components/home/Home';

import DataProvider from './context/DataProvider';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailView from './components/details/DetailView';
import Cart from './components/cart/Cart';
import OrderList from './components/myOrders/OrderList';
import Ai from './components/aiPage/Ai';
import Loader from './components/aiPage/Loader';
import Address from './components/userAddress/Address';

function App() {
  
  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
        <Box style={{ marginTop: 54 }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<DetailView />} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/orders' element={<OrderList/>} />
            <Route path='/aipage' element={<Ai/>} />
            <Route path='/loader' element={<Loader/>} />
            <Route path='/address' element={<Address/>} />
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;

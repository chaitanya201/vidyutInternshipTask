import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ShowAllProducts from './components/products/ShowAllProducts';
import ShowSingleProduct from './components/products/ShowSingleProduct';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowAllProducts />} ></Route>
        <Route path='/show-single-product' element={<ShowSingleProduct />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


import './App.css';
import Nav from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Signup from './components/signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path='/' element={<ProductList/>} />
          <Route path='/add' element={<AddProduct/>} />
          <Route path='/update/:id' element={<UpdateProduct/>} />
          <Route path='/logout' element={"This is header 4"} />
          <Route path='/profile' element={"This is header 5"} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;

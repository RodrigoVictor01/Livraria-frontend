import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalog from './pages/CatalogPage';
import BookDetailsPage from './pages/BookDetailsPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Cart from './pages/CartPage';
import Checkout from './pages/CheckoutPage';
import Account from './pages/AccountPage';


function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/book/:id" element={<BookDetailsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/conta" element={<Account />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App

import React, { useState, useEffect } from 'react';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';
import { Puff } from 'react-loader-spinner';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(true);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
    setLoading(false);
  };

  const fetchCart = async () => {
    setCartLoading(true);
    const cartData = await commerce.cart.retrieve();
    setCart(cartData);
    setCartLoading(false);
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const item = await commerce.cart.update(productId, { quantity });
    setCart(item);
  };

  const handleRemoveFromCart = async (productId) => {
    const item = await commerce.cart.remove(productId);
    setCart(item);
  };

  const handleEmptyCart = async () => {
    const item = await commerce.cart.empty();
    setCart(item);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <div className="loader-container">
                  <Puff color="#00BFFF" height={100} width={100} />
                </div>
              ) : (
                <Products products={products} onAddToCart={handleAddToCart} />
              )
            }
          />
          <Route
            path="/cart"
            element={
              cartLoading ? (
                <div className="loader-container">
                  <Puff color="#00BFFF" height={100} width={100} />
                </div>
              ) : (
                <Cart
                  cart={cart}
                  handleUpdateCartQty={handleUpdateCartQty}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleEmptyCart={handleEmptyCart}
                />
              )
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
                handleEmptyCart={handleEmptyCart} 
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

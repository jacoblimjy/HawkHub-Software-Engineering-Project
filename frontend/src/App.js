import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import SuppliersScreen from "./screens/SuppliersScreen.js";
import ProductsScreen from "./screens/ProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import StocktakingScreen from "./screens/StocktakingScreen.js";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen/>} exact/>
            <Route path='/login' element={<LoginScreen/>}/> 
            <Route path='/register' element={<RegisterScreen/>}/>
            <Route path='/profile' element={<ProfileScreen/>}/>
            <Route path="/stocktaking" element={<StocktakingScreen />} />
            <Route path='/suppliers' element={<SuppliersScreen/>}/>
            <Route path='/suppliers/:supplierId/products' element={<ProductsScreen/>}/>
            <Route path='/suppliers/:supplierId/products/:productId' element={<ProductScreen/>}/>
            <Route path='/cart/:productId?' element={<CartScreen/>}/>
            <Route path='/shipping' element={<ShippingScreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

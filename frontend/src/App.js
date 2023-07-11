import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import StocktakingScreen from "./screens/StocktakingScreen.js";
import SuppliersScreen from "./screens/SuppliersScreen.js";
import ProductsScreen from "./screens/ProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import FinanceScreen from "./screens/FinanceScreen";
import PointOfSalesScreen from "./screens/PointOfSalesScreen";
import NotificationScreen from "./screens/NotificationScreen";
import { WebsocketProvider } from "./components/WebSocketProvider";

const App = () => {
  return (
    <WebsocketProvider>
      <Router>
        <Header />
        <main className="py-4">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/stocktaking" element={<StocktakingScreen />} />
              <Route path="/suppliers" element={<SuppliersScreen />} />
              <Route
                path="/suppliers/:supplierId/products"
                element={<ProductsScreen />}
              />
              <Route
                path="/suppliers/:supplierId/products/:productId"
                element={<ProductScreen />}
              />
              <Route path="/cart/:productId?" element={<CartScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:orderId" element={<OrderScreen />} />
              <Route
                path="/admin/productlist"
                element={<ProductListScreen />}
              />
              <Route
                path="/admin/:supplierId/product/:productId/edit"
                element={<ProductEditScreen />}
              />
              <Route path="/finance" element={<FinanceScreen />} />
              <Route path="/pos" element={<PointOfSalesScreen />} />
              <Route path="/notifications" element={<NotificationScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </WebsocketProvider>
  );
};

export default App;

import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";

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
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

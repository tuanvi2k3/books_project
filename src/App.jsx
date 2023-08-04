import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import ProductList from "./components/product/productlist";
import ProductDetail from "./components/product/ProductDetail";
import AddProductForm from "./components/product/AddProductForm";
import UpdatePhone from "./components/product/UpdatePhone";
import Login from "./components/LoginRegister/Login";
import Register from "./components/LoginRegister/Register";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/AddProductForm" element={<AddProductForm />} />
        <Route path="/UpdatePhone/:id" element={<UpdatePhone />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

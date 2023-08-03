import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "./Products.css";
import "./Grid.css";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/phones")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <>
      <Link
        style={{
          textDecoration: "none",
          backgroundColor: "#007BFF",
          marginLeft: "10px",
          padding: "10px",
          color: "white",
          borderRadius: "5px",
          textTransform: "uppercase",
          fontSize: "15px"
        }}
        to={"/AddProductForm"}
      >
        AddProduct
      </Link>
      <div className="grid wide container">
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col l-2-4 columns">
              <ProductItem
                id={product.id}
                image={product.imageURL}
                name={product.title}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import getdate from "./getdate.jsx";
import "../css/Detail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/phones/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  console.log(id);

  return (
    <div className="app">
      <div className="details" key={product[0].id}>
        <div className="big-img">
          <img src={product[0].imageURL} alt="" />
        </div>
        <div className="box">
          <div className="row">
            <h2>{product[0].title}</h2>
            <span>${product[0].price}</span>
          </div>

          <span>{getdate()}</span>
          <p>{product[0].description}</p>
          <p>{product[0].content}</p>

          <button className="cart">Add to cart</button>
          <button className="cart">
            <Link
              style={{
                textDecoration: "none",
                color: "white"
              }}
              to={"/"}
            >
              Back
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

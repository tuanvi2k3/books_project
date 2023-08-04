import React, { useEffect, useState } from "react";
import "./Products.css";
import "./Grid.css";
import axios from "axios";
import { Link } from "react-router-dom";
import getdate from "./getdate";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [rec, setRec] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/phones")
      .then((response) => {
        setProducts(response.data);
        setRec(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const searchHandle = (e) => {
    setRec(
      products.filter((f) => {
        return (
          f.title.toLowerCase().includes(e.target.value) ||
          f.price.toLowerCase().includes(e.target.value.toLowerCase()) ||
          f.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
          f.imageURL.toLowerCase().includes(e.target.value.toLowerCase())
        );
      })
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      try {
        await axios.delete("http://localhost:3001/deletephone/" + id);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="onchange">
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
        <input
          type=""
          className="search"
          placeholder="Search product"
          onChange={searchHandle}
        />
      </div>
      <div className="grid wide container">
        <div className="row">
          {rec.map((product) => (
            <div key={product.id} className="col l-2-4 columns wapper">
              <div className="product">
                <div className="product__sale">{product.sale || "-20%"}</div>
                <div className="product__img">
                  <img className="product-img" src={product.imageURL} alt="" />
                </div>
                <div className="product__content">
                  <h3 className="product__content-title">{product.title}</h3>
                  <div className="product__content-price">
                    <span>{product.price}</span>
                    <span>{getdate()}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center"
                    }}
                  >
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                        borderRadius: "6px",
                        padding: "10px 12px",
                        border: "1px solid #28a745"
                      }}
                      to={`/detail/${product.id}`}
                    >
                      View
                    </Link>
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                        borderRadius: "6px",
                        padding: "10px 12px",
                        border: "1px solid #28a745"
                      }}
                      to={`/updatephone/${product.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      style={{
                        textDecoration: "none",
                        color: "black",
                        borderRadius: "6px",
                        padding: "10px 12px",
                        border: "1px solid #ffc107"
                      }}
                      onClick={(e) => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          else {<div>Không có sẳn phẩm</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

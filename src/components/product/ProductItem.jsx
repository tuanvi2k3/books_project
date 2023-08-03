import React from "react";
import getdate from "./getdate";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductItem = (props) => {
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
  console.log(props);
  return (
    <>
      <div key={props.id} className="product">
        <div className="product__sale">{props.sale || "-20%"}</div>
        <div className="product__img">
          <img className="product-img" src={props.image} alt="" />
        </div>
        <div className="product__content">
          <h3 className="product__content-title">{props.name}</h3>
          <div className="product__content-price">
            <span>{props.price}</span>
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
              to={`/detail/${props.id}`}
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
              to={`/updatephone/${props.id}`}
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
              onClick={(e) => handleDelete(props.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;

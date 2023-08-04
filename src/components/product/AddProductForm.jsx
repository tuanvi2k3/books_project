import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/reset.css";
import "../css/Form.css";

const AddProductForm = () => {
  const [phones, setPhones] = useState({
    title: "",
    price: "",
    description: "",
    imageURL: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPhones((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        await axios.post("http://localhost:3001/phones", phones);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!phones.title.trim()) {
      errors.title = "Product Name không được để trống";
    }
    if (!phones.price) {
      errors.price = "Product price không được để trống";
    } else if (isNaN(phones.price)) {
      errors.price = "Product price không phải là số";
    }
    if (!phones.imageURL.trim()) {
      errors.imageURL = "Product imageURL không được để trống";
    }
    if (!phones.description.trim()) {
      errors.description = "Product description không được để trống";
    }
    return errors;
  };

  return (
    <div>
      <form action="" method="POST">
        <div className="formbold-input-flex">
          <div>
            <label htmlFor="title" className="formbold-form-label">
              Product Name
            </label>
            <input
              style={{
                marginBottom: "10px"
              }}
              onChange={handleChange}
              name="title"
              type="text"
              id="title"
              placeholder="Your product name"
              className="formbold-form-input"
            />
            {errors.title && (
              <span
                style={{
                  color: "red",
                  fontSize: "14px"
                }}
                className="error-message"
              >
                {errors.title}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="price" className="formbold-form-label">
              Product price
            </label>
            <input
              style={{
                marginBottom: "10px"
              }}
              type="text"
              onChange={handleChange}
              name="price"
              id="price"
              placeholder="Product price"
              className="formbold-form-input"
            />
            {errors.price && (
              <span
                style={{
                  color: "red",
                  fontSize: "14px"
                }}
                className="error-message"
              >
                {errors.price}
              </span>
            )}
          </div>
        </div>

        <div className="formbold-mb-3">
          <label htmlFor="imageURL" className="formbold-form-label">
            Product imageURL
          </label>
          <input
            style={{
              marginBottom: "10px"
            }}
            type="text"
            onChange={handleChange}
            name="imageURL"
            id="imageURL"
            placeholder="Product imageURL"
            className="formbold-form-input"
          />
          {errors.imageURL && (
            <span
              style={{
                color: "red",
                fontSize: "14px"
              }}
              className="error-message"
            >
              {errors.imageURL}
            </span>
          )}
        </div>

        <div className="formbold-mb-3">
          <label htmlFor="description" className="formbold-form-label">
            Description
          </label>
          <textarea
            style={{
              marginBottom: "10px"
            }}
            rows="6"
            onChange={handleChange}
            name="description"
            id="description"
            placeholder="Description "
            className="formbold-form-input"
          ></textarea>
          {errors.description && (
            <span
              style={{
                color: "red",
                fontSize: "14px"
              }}
              className="error-message"
            >
              {errors.description}
            </span>
          )}
        </div>

        <button onClick={handleClick} className="formbold-btn">
          Add Now
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;

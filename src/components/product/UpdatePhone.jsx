import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdatePhone = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the product details using the provided id
    axios
      .get(`http://localhost:3001/phones/${id}`)
      .then((response) => {
        const { title, price, description, imageURL } = response.data[0];
        setTitle(title);
        setPrice(price);
        setDescription(description);
        setImageURL(imageURL);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/updatephone/${id}`, {
        title,
        price,
        description,
        imageURL
      })
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form action="" method="POST">
        <div className="formbold-input-flex">
          <div>
            <label htmlFor="title" className="formbold-form-label">
              Product Name
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              type="text"
              id="title"
              placeholder="Your product name"
              className="formbold-form-input"
              value={title}
            />
          </div>

          <div>
            <label htmlFor="price" className="formbold-form-label">
              Product price
            </label>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              name="price"
              id="price"
              placeholder="Product price"
              className="formbold-form-input"
              value={price}
            />
          </div>
        </div>

        <div className="formbold-mb-3">
          <label htmlFor="imageURL" className="formbold-form-label">
            Product imageURL
          </label>
          <input
            type="text"
            onChange={(e) => setImageURL(e.target.value)}
            name="imageURL"
            id="imageURL"
            placeholder="Product imageURL"
            className="formbold-form-input"
            value={imageURL}
          />
        </div>

        <div className="formbold-mb-3">
          <label htmlFor="description" className="formbold-form-label">
            Cover Letter
          </label>
          <textarea
            rows="6"
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            id="description"
            placeholder="Description"
            className="formbold-form-input"
            value={description}
          ></textarea>
        </div>

        <button onClick={handleSubmit} className="formbold-btn">
          Update Now
        </button>
      </form>
      {/* ... (rest of the JSX code) */}
    </>
  );
};

export default UpdatePhone;

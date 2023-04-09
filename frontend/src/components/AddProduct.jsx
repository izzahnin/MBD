import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault(); //mencegah page reload ketika submit
    try {
      await axios.post("http://localhost:5000/products", {
        productName,
        stock,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    console.log("data disimpan");
  };

  return (
    <div className="columns  mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveProduct}>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input type="text" className="input" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Stock</label>
            <div className="control">
              <input type="text" className="input" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-small is-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProductById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault(); //mencegah page reload ketika submit
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, {
        productName,
        stock,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    console.log("data disimpan");
  };

  //method untuk mengambil data product berdasarkan id
  const getProductById = async () => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    setProductName(response.data.productName);
    setStock(response.data.stock);
  };

  return (
    <div className="columns  mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateProduct}>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

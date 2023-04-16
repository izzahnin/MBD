import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:3000/produk");
    setProduct(response.data);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/produk/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="flex-col">
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={"add"} className="button is-success">
          Add New
        </Link>
        <tabel className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Product Name</th>
              <th>Stock</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((produk, index) => (
              <tr key={produk.id}>
                <td>{index + 1}</td>
                <td>{produk.id}</td>
                <td>{produk.title}</td>
                <td>{produk.stock}</td>
                <td>
                  <figure>
                    <img src={produk.url} alt="" />
                  </figure>
                </td>
                <td>
                  <Link to={`edit/${produk.id}`} className="button is-small is-info">
                    Edit
                  </Link>
                  <button onClick={() => deleteProduct(produk.id)} className="button is-small is-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </tabel>
      </div>
    </div>

    // </div>
  );
};

export default ProductList;

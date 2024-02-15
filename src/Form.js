import React, { useState } from "react";

export default function ProductForm() {
  const [product, setProduct] = useState({
    id: "",
    model: "",
    vendor: "",
    price: "",
    imageUrl: "",
  });

  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((currentProduct) => ({
      ...currentProduct,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    const existingProductIndex = products.findIndex((p) => p.id === product.id);
    if (existingProductIndex >= 0) {
      setProducts((currentProducts) =>
        currentProducts.map((p, index) =>
          index === existingProductIndex ? product : p
        )
      );
    } else {
      setProducts((currentProducts) => [...currentProducts, product]);
    }
    setProduct({
      id: "",
      model: "",
      vendor: "",
      price: "",
      imageUrl: "",
    });
  };

  const handleSelectProduct = (id) => {
    const existingProduct = products.find((p) => p.id === id);
    if (existingProduct) {
      setProduct(existingProduct);
    }
  };

  return (
    <>
      <label>
        ID:
        <input name="id" value={product.id} onChange={handleChange} />
      </label>
      <br />
      <label>
        Model:
        <input name="model" value={product.model} onChange={handleChange} />
      </label>
      <br />
      <label>
        Vendor:
        <input name="vendor" value={product.vendor} onChange={handleChange} />
      </label>
      <br />
      <label>
        Price:
        <input name="price" value={product.price} onChange={handleChange} />
      </label>
      <br />
      <label>
        Image URL:
        <input
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
        />
      </label>
      <br />
      <button onClick={handleAdd}>{product.id ? "Update" : "Add"}</button>
      <h2>Products List</h2>
      <ul>
        {products.map((prod) => (
          <li key={prod.id} onClick={() => handleSelectProduct(prod.id)}>
            {prod.model} - {prod.vendor} - ${prod.price}
          </li>
        ))}
      </ul>
    </>
  );
}

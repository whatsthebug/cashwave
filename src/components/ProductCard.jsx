import React, { useEffect, useState } from "react";
import axios from "axios";
export default function ProductCard() {
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get(
      "http://localhost:8000/Products/getallproducts",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: "include",
      }
    );
    const data = res.data;
    setProducts(data.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxChange = (
    productId,
    productName,
    retailPrice,
    productCategory
  ) => {
    const productIndex = selectedProducts.findIndex(
      (product) => product.productId === productId
    );
    if (productIndex !== -1) {
      const updatedProducts = [...selectedProducts];
      updatedProducts.splice(productIndex, 1);
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts((prev) => [
        ...prev,
        {
          productId,
          productName,
          retailPrice,
          productCategory,
          quantity: 1, // Initialize quantity to 1
        },
      ]);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.productId === productId) {
          return { ...product, quantity: quantity };
        }
        return product;
      });
    });
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <button className="px-4 py-2 mb-4 text-white cursor-pointer bg-aliceblue">
        View Cart
      </button>
      <div className="">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Product"
          className="w-full p-3 mb-4 border border-black border-opacity-70 focus:outline-none rounded-xl"
          value={searchInput}
          onChange={handleSearchInput}
        />
      </div>
      <table className="w-full border border-collapse table-auto ">
        <thead>
          <tr>
            <th className="px-4 py-2">Select</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Retail Price</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2 border">
                <input
                  type="checkbox"
                  onChange={() =>
                    handleCheckboxChange(
                      product.productId,
                      product.productName,
                      product.retailPrice,
                      product.productCategory
                    )
                  }
                  checked={
                    selectedProducts &&
                    selectedProducts.some(
                      (selectedProduct) =>
                        selectedProduct.productId === product.productId
                    )
                  }
                />
              </td>
              <td className="px-4 py-2 border">{product.productName}</td>
              <td className="px-4 py-2 border">{product.retailPrice}</td>
              <td className="px-4 py-2 border">{product.productCategory}</td>
              <td className="px-4 py-2 border">
                <input
                  type="number"
                  min="1"
                  value={
                    (selectedProducts &&
                      selectedProducts.find(
                        (selectedProduct) =>
                          selectedProduct.productId === product.productId
                      )?.quantity) ||
                    1
                  }
                  onChange={(e) =>
                    handleQuantityChange(
                      product.productId,
                      parseInt(e.target.value)
                    )
                  }
                  className="w-16 p-1 border rounded-md"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

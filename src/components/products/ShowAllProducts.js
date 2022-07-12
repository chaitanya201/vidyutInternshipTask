import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ShowAllProducts() {
  // setting state variables.
  const [products, setProducts] = useState(null);
  const [alertMsg, setAlertMsg] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  // getting all the products from the backend.
  const getProducts = async () => {
    document.title = "All Products";
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      setAlertMsg("Server Error. Try again later.");
    }
    setIsLoading(false);
  };

  // use effect hook.
  useEffect(() => {
    getProducts();
  }, []);

  // JSX
  return (
    <div>
      <div>{alertMsg && <div className="text-danger">{alertMsg} </div>}</div>
      <div className="m-4">
        {isLoading && (
          <div className="d-flex justify-content-center ">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
      <nav
        class="navbar navbar-light d-flex justify-content-center"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <input
          type="text"
          placeholder="Search Product"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if(query.trim() === "") {
              console.log("in if")
              getProducts()
              return
            }
            setProducts(
              products.filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase().trim())
              )
            );
          }}
        />
      </nav>
      <div>
        {!isLoading && products && products.length > 0 && (
          <div className="row m-2">
            <div className="display-3 d-flex justify-content-center mb-2 ">
              All Products
            </div>
            {products.map((product) => {
              // Setting rating
              let rating = "⭐";
              if (Math.floor(product.rating.rate) === 5) rating = "⭐⭐⭐⭐⭐";
              else if (Math.floor(product.rating.rate) === 4)
                rating = "⭐⭐⭐⭐";
              else if (Math.floor(product.rating.rate) === 3) rating = "⭐⭐⭐";
              else if (Math.floor(product.rating.rate) === 2) rating = "⭐⭐";
              else rating = "⭐";
              return (
                <div key={product.id} className="col p-3">
                  <div
                    className="card"
                    style={{ width: "18rem", height: "30rem" }}
                  >
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ width: "15rem" }}
                    >
                      <img
                        src={product.image}
                        className="card-img-top w-50 "
                        alt="..."
                      />
                    </div>
                    <div className="card-body ">
                      <div className="d-flex justify-content-center align-items-center">
                        <h5 className="card-title">{product.title} </h5>
                      </div>
                      <p className="card-text">
                        {product.description.slice(0, 20)}...{" "}
                      </p>
                      <div>
                        <div className="h4">${product.price}</div>
                        <div>
                          {rating}, {product.rating.count}
                        </div>
                        <div className="d-flex justify-content-center p-2">
                          <Link
                            className="btn btn-primary"
                            to={"/show-single-product"}
                            state={{ product: product }}
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

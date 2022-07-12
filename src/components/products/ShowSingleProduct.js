import React from "react";
import { Link, useLocation } from "react-router-dom";
export default function ShowSingleProduct() {
  const location = useLocation();

  try {
    // extracting product from the link
    var { product } = location.state;
  } catch (error) {
    // If user directly visits this page then showing this message.
    return (
      <div className="text-danger">
        VISIT THIS PAGE THROUGH PROPER STEPS ONLY....
      </div>
    );
  }

  // Setting document title to title of the product.
  document.title = product.title;

  // Setting rating
  let rating = "⭐";
  if (Math.floor(product.rating.rate) === 5) rating = "⭐⭐⭐⭐⭐";
  else if (Math.floor(product.rating.rate) === 4) rating = "⭐⭐⭐⭐";
  else if (Math.floor(product.rating.rate) === 3) rating = "⭐⭐⭐";
  else if (Math.floor(product.rating.rate) === 2) rating = "⭐⭐";
  else rating = "⭐";

  return (
    <div className="m-5">
    <div className="m-2">
        <Link to={'/'} className='bg-info text-white p-2 rounded '>BACK</Link>
    </div>
      <div className="d-flex me-5 pe-5">
        <div className="d-flex justify-content-center border border-2 flex-fill">
          <img src={product.image} alt="product-img" className="w-50" />
        </div>
        <div className="border border-2 flex-fill">
          <div className="m-4">
            <div className="d-flex justify-content-center h2 p-4">
              {product.title}
            </div>
            <div
              style={{ paddingRight: "15%" }}
              className="d-flex justify-content-between"
            >
              <h5>About this item </h5>
              <text className="bg-primary text-white p-2 rounded">
                {product.category}
              </text>
            </div>
            <div>{product.description}</div>
            <div className="h4 mt-3 me-3">Price: ${product.price}</div>

            <div style={{ paddingRight: "15%" }} className="d-flex">
              <div className="h5">Ratings:</div>
              <div>
                {rating} {product.rating.count}
              </div>
            </div>
            <div>
              <div className="center">
                <div className="buttons d-flex flex-row">
                  <div className="cart">
                    <i className="fa fa-shopping-cart"></i>
                  </div>
                  <button className="btn btn-success cart-button px-5">
                    <span className="dot"></span>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
            <div className="center pt-2">
              <div className="buttons d-flex flex-row">
                <div className="cart">
                  <i className="fa fa-shopping-cart"></i>
                </div>
                <button className="btn btn-info cart-button px-5">
                  <span className="dot"></span>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

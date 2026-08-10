import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  toggleWishlist,
  applyCoupon,
} from "./store";

export default function App() {
  const dispatch = useDispatch();

  const { products, cart, wishlist, discount } = useSelector(
    (state) => state.shop
  );

  const [coupon, setCoupon] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal - (subtotal * discount) / 100;

  return (
    <div className="container">
      <h1>Shopping Cart App</h1>

      <div className="grid">
        {/* PRODUCTS */}
        <div>
          <h2>Products</h2>

          {products.map((product) => (
            <div key={product.id} className="card">
              <h3>{product.name}</h3>
              <p>${product.price}</p>

              <button onClick={() => dispatch(addToCart(product))}>
                Add to Cart
              </button>

              <button
                onClick={() => dispatch(toggleWishlist(product))}
              >
                {wishlist.find((w) => w.id === product.id)
                  ? "Remove Wishlist"
                  : "Add Wishlist"}
              </button>
            </div>
          ))}
        </div>

        {/* CART */}
        <div>
          <h2>Cart</h2>

          {cart.length === 0 && <p>Cart is empty</p>}

          {cart.map((item) => (
            <div key={item.id} className="card">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>

              <div className="qty">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                >
                  +
                </button>
              </div>

              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}

          <div className="coupon">
            <input
              type="text"
              placeholder="Enter coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />

            <button onClick={() => dispatch(applyCoupon(coupon))}>
              Apply Coupon
            </button>
          </div>

          <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
          <h3>Discount: {discount}%</h3>
          <h2>Total: ${total.toFixed(2)}</h2>
        </div>
      </div>

      {/* WISHLIST */}
      <div style={{ marginTop: 30 }}>
        <h2>Wishlist</h2>

        {wishlist.length === 0 && <p>Wishlist is empty</p>}

        {wishlist.map((item) => (
          <div key={item.id} className="card">
            <h3>{item.name}</h3>
            <p>${item.price}</p>

            <button onClick={() => dispatch(toggleWishlist(item))}>
              Remove Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
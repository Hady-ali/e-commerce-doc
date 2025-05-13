// import { useDispatch, useSelector } from "react-redux";
// import "./CSS/Card.css";
// import {
//   clearCart,
//   Decrement,
//   Increment,
//   RemoveItem,
// } from "../../redux/SapSlice";

// const Card = () => {
//   const products = useSelector((state) => state.appReducer.products);
//   const dispatch = useDispatch();

//   return (
//     <>
//       <div className="cart container">
//         <h1 className="Cart-header">Your Cart</h1>
//         <div className="cart-products">
//           {products.length > 0 ? (
//             <>
//               {products.map((item) => (
//                 <div key={item.id} className="cart-item">
//                   <img
//                     src={item.img}
//                     alt={item.title}
//                     className="cart-item-img"
//                   />
//                   <div>
//                     <h2 className="cart-item-title">
//                       {item.title.substring(0, 20)}
//                     </h2>
//                     <p className="cart-item-dosc">
//                       {item.dec.substring(0, 100)}
//                     </p>
//                     <p className="cart-item-price">${item.price}</p>
//                     <div className="cart-item-actions">
//                       <button onClick={() => dispatch(Increment(item.id))}>
//                         +
//                       </button>
//                       <span>{item.quanitity}</span>
//                       <button
//                         style={{ background: "red" }}
//                         onClick={() => dispatch(Decrement(item.id))}
//                       >
//                         -
//                       </button>
//                     </div>
//                     <p className="cart-item-total">
//                       ${item.quantity * item.price}
//                     </p>
//                     <button
//                       className="cart-item-remove"
//                       onClickCapture={() => dispatch(RemoveItem(item.id))}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                   <div>
//                     <button onClick={() => dispatch(clearCart())}>
//                       Clear All Products
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </>
//           ) : (
//             <>
//               <h2 className="empty-cart">No Products in Cart</h2>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Card;

// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import "./CSS/Card.css";
// import {
//   clearCart,
//   Decrement,
//   Increment,
//   RemoveItem,
// } from "../../redux/SapSlice";

// const Card = () => {
//   const products = useSelector((state) => state.appReducer.products);
//   const dispatch = useDispatch();

//   // حساب الإجمالي
//   const total = products.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="cart-container">
//       <h1 className="cart-header">Your Cart</h1>

//       {products.length > 0 ? (
//         <div className="cart-with-items">
//           <div className="cart-items-list">
//             {products.map((item) => (
//               <div key={item.id} className="cart-item">
//                 <div className="item-image-container">
//                   <img
//                     src={item.img}
//                     alt={item.title}
//                     className="cart-item-img"
//                   />
//                 </div>

//                 <div className="item-details">
//                   <h2 className="item-title">
//                     {item.title.substring(0, 20)}
//                     {item.title.length > 20 && "..."}
//                   </h2>
//                   <p className="item-description">
//                     {item.dec.substring(0, 100)}
//                     {item.dec.length > 100 && "..."}
//                   </p>
//                   <p className="item-price">${item.price.toFixed(2)}</p>

//                   <div className="quantity-controls">
//                     <button
//                       className="quantity-btn decrement"
//                       onClick={() => dispatch(Decrement(item.id))}
//                       disabled={item.quantity <= 1}
//                     >
//                       -
//                     </button>
//                     <span className="quantity-value">{item.quantity}</span>
//                     <button
//                       className="quantity-btn increment"
//                       onClick={() => dispatch(Increment(item.id))}
//                     >
//                       +
//                     </button>
//                   </div>

//                   <p className="item-total">
//                     Subtotal: ${(item.quantity * item.price).toFixed(2)}
//                   </p>

//                   <button
//                     className="remove-item-btn"
//                     onClick={() => dispatch(RemoveItem(item.id))}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="cart-summary">
//             <h3>Order Summary</h3>
//             <div className="summary-row">
//               <span>Items:</span>
//               <span>{products.length}</span>
//             </div>
//             <div className="summary-row total">
//               <span>Total:</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//             <button
//               className="clear-cart-btn"
//               onClick={() => dispatch(clearCart())}
//             >
//               Clear All Products
//             </button>
//             <button className="checkout-btn">Proceed to Checkout</button>
//           </div>
//         </div>
//       ) : (
//         <div className="empty-cart">
//           <div className="empty-cart-content">
//             <img
//               src="/empty-cart-icon.png"
//               alt="Empty cart"
//               className="empty-cart-icon"
//             />
//             <h2>Your cart is empty</h2>
//             <p>Looks like you haven&apos;t added any items to your cart yet.</p>
//              <Link to="/">
//               <button className="continue-shopping-btn">Continue Shopping</button>
//              </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;




import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CSS/Card.css";
import {
  clearCart,
  Decrement,
  Increment,
  RemoveItem,
} from "../../redux/SapSlice";
import { FiShoppingBag, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";

const Card = () => {
  const products = useSelector((state) => state.appReducer.products);
  const dispatch = useDispatch();

  const total = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="creative-cart">
      <div className="cart-header-section">
        <h1 className="cart-title">
          <FiShoppingBag className="cart-icon" /> Your Shopping Cart
        </h1>
        {products.length > 0 && (
          <span className="cart-count">{products.length} {products.length === 1 ? 'Item' : 'Items'}</span>
        )}
      </div>

      {products.length > 0 ? (
        <>
          <div className="cart-grid-container">
            <div className="products-grid">
              {products.map((item) => (
                <div key={item.id} className="cart-product-card">
                  <div className="product-badge">{item.quantity}x</div>
                  <button 
                    className="remove-product-btn"
                    onClick={() => dispatch(RemoveItem(item.id))}
                  >
                    <FiTrash2 />
                  </button>
                  
                  <div className="product-image-container">
                    <img src={item.img} alt={item.title} />
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn dec"
                        onClick={() => dispatch(Decrement(item.id))}
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus />
                      </button>
                      <button 
                        className="quantity-btn"
                        onClick={() => dispatch(Increment(item.id))}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-title">{item.title.substring(0, 20)}</h3>
                    <p className="product-description">{item.dec.substring(0, 60)}...</p>
                    <div className="price-section">
                      <span className="product-price">${item.price.toFixed(2)}</span>
                      <span className="product-total">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary-panel">
              <div className="summary-content">
                <h3>Order Summary</h3>
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link to="/">
                <button className="checkout-btn pulse-effect">
                  Proceed to Checkout
                </button>
                </Link>
                
                <button 
                  className="clear-cart-btn"
                  onClick={() => dispatch(clearCart())}
                >
                  <FiTrash2 /> Clear Cart
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-cart-creative">
          <div className="empty-cart-animation">
            <div className="empty-bag"></div>
            <div className="shopping-cart"></div>
          </div>
          <h2>Your Cart Feels Lonely</h2>
          <p>Your shopping cart is waiting. Give it some company!</p>
          <Link to="/">
            <button className="explore-btn">Explore Products</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Card;
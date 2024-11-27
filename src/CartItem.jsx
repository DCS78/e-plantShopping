import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onRemoveFromCart }) => {
    const cart = useSelector(({ cart }) => cart.items);
    const dispatch = useDispatch();

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem({ name: item.name }));
            onRemoveFromCart(item.name); // Enable 'Add to Cart' button when item is removed
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
        onRemoveFromCart(item.name); // Enable 'Add to Cart' button when item is removed
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping();
    };

    const handleCheckoutShopping = (e) => {
        e.preventDefault();
        alert('Functionality to be added for future reference');
    };

    // Calculate total amount for all items in the cart
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => {
            return total + parseFloat(item.cost.replace('$', '')) * item.quantity;
        }, 0).toFixed(2);
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        return (parseFloat(item.cost.replace('$', '')) * item.quantity).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h2 className="total-cart-amount">Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ textAlign: 'center' }}>
                <button className="continue-shopping-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="checkout-button" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;
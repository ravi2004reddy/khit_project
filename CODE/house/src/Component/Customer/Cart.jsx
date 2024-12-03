import React, { useState } from 'react';
import Customernavbar from './Customernavbar';

// Dummy cart data
const cartItems = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 10.99,
        quantity: 2,
        image: '/path/to/book1.png', // Replace with actual image path
    },
    {
        id: 2,
        title: '1984',
        author: 'George Orwell',
        price: 8.99,
        quantity: 1,
        image: '/path/to/book2.png', // Replace with actual image path
    },
    {
        id: 3,
        title: 'Moby Dick',
        author: 'Herman Melville',
        price: 12.99,
        quantity: 1,
        image: '/path/to/book3.png', // Replace with actual image path
    },
];

const Cart = () => {
    const [shippingDetails, setShippingDetails] = useState({
        username: '',
        phone: '',
        address: '',
        pincode: '',
        state: '',
        deliveryMethod: 'Standard Shipping',
    });

    const [paymentDetails, setPaymentDetails] = useState({
        cardType: '',
        cardNumber: '',
        cardHolderName: '',
        cvv: '',
        expiryDate: '',
    });

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleShippingChange = (e) => {
        setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the checkout logic here
        console.log('Shipping Details:', shippingDetails);
        console.log('Payment Details:', paymentDetails);
    };

    return (
    
        <div className="">
        <Customernavbar/>
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Cart Items */}
                <div className="md:col-span-1 p-2  ">
                    <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center border-b py-4">
                                <img src={item.image} alt={item.title} className="w-24 h-36 rounded-md mr-4" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold">{item.title}</h3>
                                    <p className="text-sm text-gray-600">Author: {item.author}</p>
                                    <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Total Price */}
                    <div className="mt-4">
                        <h2 className="text-xl font-bold">Total Price</h2>
                        <p className="text-lg text-gray-800">${totalPrice.toFixed(2)}</p>
                    </div>
                </div>

                {/* Shipping Information Form */}
                <div className="md:col-span-1 p-3">
                    <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block mb-1">Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={shippingDetails.username}
                                    onChange={handleShippingChange}
                                    className="w-full p-2 border border-gray-400 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Phone:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={shippingDetails.phone}
                                    onChange={handleShippingChange}
                                    className="w-full p-2 border border-gray-400 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={shippingDetails.address}
                                    onChange={handleShippingChange}
                                    className="w-full p-2 border border-gray-400 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Pincode:</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={shippingDetails.pincode}
                                    onChange={handleShippingChange}
                                    className="w-full p-2 border border-gray-400 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">State:</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={shippingDetails.state}
                                    onChange={handleShippingChange}
                                    className="w-full p-2 border border-gray-400 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Delivery Method:</label>
                                <select
                                    name="deliveryMethod"
                                    value={shippingDetails.deliveryMethod}
                                    onChange={handleShippingChange}
                                    className="w-full p-2 border border-gray-400 rounded"
                                >
                                    <option value="Standard Shipping">Standard Shipping</option>
                                    <option value="Express Shipping">Express Shipping</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Payment Method Form */}
                <div className="md:col-span-1 p-3">
                    <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block mb-1">Card Type:</label>
                            <select
                                name="cardType"
                                value={paymentDetails.cardType}
                                onChange={handlePaymentChange}
                                className="w-full p-2 border border-gray-400 rounded"
                            >
                                <option value="">Select Card Type</option>
                                <option value="Visa">Visa</option>
                                <option value="MasterCard">MasterCard</option>
                                <option value="American Express">American Express</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Card Number:</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={paymentDetails.cardNumber}
                                onChange={handlePaymentChange}
                                className="w-full p-2 border border-gray-400 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Cardholder Name:</label>
                            <input
                                type="text"
                                name="cardHolderName"
                                value={paymentDetails.cardHolderName}
                                onChange={handlePaymentChange}
                                className="w-full p-2 border border-gray-400 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">CVV:</label>
                            <input
                                type="text"
                                name="cvv"
                                value={paymentDetails.cvv}
                                onChange={handlePaymentChange}
                                className="w-full p-2 border border-gray-400 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Expiry Date:</label>
                            <input
                                type="text"
                                name="expiryDate"
                                value={paymentDetails.expiryDate}
                                onChange={handlePaymentChange}
                                placeholder="MM/YY"
                                className="w-full p-2 border border-gray-400 rounded"
                                required
                            />
                        </div>
                    </form>
                </div>

                {/* Checkout Button */}
                <div className="col-span-1 md:col-span-3 text-center mt-6">
                    <button 
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
        </div>


    );
};

export default Cart;

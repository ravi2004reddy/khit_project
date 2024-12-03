import React from 'react';
import Customernavbar from './Customernavbar';

// Dummy order data
const orders = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 10.99,
        quantity: 2,
        status: 'Shipped',
        image: '/path/to/book1.png', // Replace with actual image path
    },
    {
        id: 2,
        title: '1984',
        author: 'George Orwell',
        price: 8.99,
        quantity: 1,
        status: 'Processing',
        image: '/path/to/book2.png', // Replace with actual image path
    },
    {
        id: 3,
        title: 'Moby Dick',
        author: 'Herman Melville',
        price: 12.99,
        quantity: 1,
        status: 'Delivered',
        image: '/path/to/book3.png', // Replace with actual image path
    },
];

const ViewMyOrder = () => {
    return (
        <div className="">
        <Customernavbar/>
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
                {orders.map((order) => (
                    <div key={order.id} className="flex items-center border-b py-4">
                        <img src={order.image} alt={order.title} className="w-24 h-36 rounded-md mr-4" />
                        <div className="flex-1">
                            <h2 className="text-lg font-bold">{order.title}</h2>
                            <p className="text-sm text-gray-600">Author: {order.author}</p>
                            <p className="text-sm text-gray-600">Price: ${order.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                            <p className={`text-sm font-bold ${order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}`}>
                                Status: {order.status}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default ViewMyOrder;

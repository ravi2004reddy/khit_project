import React, { useState } from 'react';

// Dummy order data
const initialOrders = [
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

const AdminViewOrders = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [filterStatus, setFilterStatus] = useState('All');

    const handleStatusChange = (id, newStatus) => {
        setOrders(orders.map(order => 
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    const filteredOrders = orders.filter(order => 
        filterStatus === 'All' || order.status === filterStatus
    );

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Admin View Orders</h1>
            
            {/* Filter Options */}
            <div className="flex justify-between mb-4">
                <div className="w-1/4">
                    <label className="block mb-1">Filter by Status:</label>
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)} 
                        className="w-full p-2 border border-gray-400 rounded"
                    >
                        <option value="All">All</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
            </div>

            {/* Order Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOrders.map(order => (
                    <div key={order.id} className="bg-white rounded-lg shadow-lg p-4">
                        <img src={order.image} alt={order.title} className="w-full h-36 rounded-md mb-4" />
                        <h2 className="text-lg font-bold">{order.title}</h2>
                        <p className="text-sm text-gray-600">Author: {order.author}</p>
                        <p className="text-sm text-gray-600">Price: ${order.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                        <p className={`text-sm font-bold ${order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}`}>
                            Status: {order.status}
                        </p>
                        <div className="mt-4">
                            <label className="block mb-1">Change Status:</label>
                            <select 
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)} 
                                className="w-full p-2 border border-gray-400 rounded"
                            >
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminViewOrders;

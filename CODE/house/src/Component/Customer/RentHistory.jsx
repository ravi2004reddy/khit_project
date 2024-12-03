import React , {useState,useEffect}from 'react';
import Customernavbar from './Customernavbar';
import { useDispatch,useSelector } from 'react-redux';
import {ViewBooking} from '../Actions/Customer';





const RentHistory = () => {
    // Dummy data for rental history with images
    // const rentHistory = [
    //     {
    //         id: 1,
    //         houseName: "1BHK Apartment in Mumbai",
    //         rentDate: "2023-08-15",
    //         duration: "6 months",
    //         location: "Mumbai",
    //         price: "₹20,000/month",
    //         image: "/images/mumbai-apartment.jpg", // Add image path
    //     },
    //     {
    //         id: 2,
    //         houseName: "Luxury Apartment in Delhi",
    //         rentDate: "2022-12-01",
    //         duration: "1 year",
    //         location: "Delhi",
    //         price: "₹30,000/month",
    //         image: "/images/delhi-apartment.jpg", // Add image path
    //     },
    //     {
    //         id: 3,
    //         houseName: "Cozy Studio in Bangalore",
    //         rentDate: "2021-06-20",
    //         duration: "1 year",
    //         location: "Bangalore",
    //         price: "₹15,000/month",
    //         image: "/images/bangalore-studio.jpg", // Add image path
    //     },
    //     {
    //         id: 4,
    //         houseName: "Spacious Villa in Pune",
    //         rentDate: "2022-05-10",
    //         duration: "1 year",
    //         location: "Pune",
    //         price: "₹50,000/month",
    //         image: "/images/pune-villa.jpg", // Add image path
    //     },
    // ];


    const dispatch = useDispatch();

    const customer = JSON.parse(sessionStorage.getItem('customer') || '{}');


    useEffect(()=>{
        dispatch(ViewBooking(customer?.data._id) )
    },[]);

    const booking = useSelector((state)=>state.Customer.bookings);

    console.log(booking);


    const d = (date) => {
        const dateObj = new Date(date);
        return dateObj.toDateString();
    }




    return (
        <div className="">
        <Customernavbar />
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Rent History</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {booking && booking.map((history) => (
                    <div key={history.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                        {/* Display house image */}
                        <img 
                            src={`http://localhost:4000/uploads/houses/${history?.apartment?.images[0]}`} 
                            alt={history.houseName} 
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">{history?.apartment.title}</h3>
                        <p className="text-gray-600 mb-1">
                            <strong>Rent Date:</strong> {d(history.createdAt)}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Mobile No:</strong> {history?.apartment.contact}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Location:</strong> {history?.apartment.location}
                        </p>
                        <p className="text-gray-600">
                            <strong>Rent Price:</strong> {history?.apartment.price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default RentHistory;

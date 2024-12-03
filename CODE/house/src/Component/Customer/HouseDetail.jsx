import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Customernavbar from './Customernavbar';
import { useSelector, useDispatch } from 'react-redux';
import { ViewHouseDetails, BookHouse } from '../Actions/Customer';
import { useParams } from 'react-router-dom';

const HouseDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // Get the house ID from the URL

    useEffect(() => {
        // Fetch house details when component mounts or when the house ID changes
        if (id) {
            dispatch(ViewHouseDetails(id) );
        }
    }, [dispatch, id]);

    // Select the house details from the Redux store
    const housess = useSelector((state) => state.Customer.detailshouse);

    console.log(housess, 'House details');

    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({
        customerName: "",
        email: "",
        phone: "",
        paymentMethod: "",
        cardHolderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const handleBookingClick = () => {
        setIsBookingModalOpen(true);
    };

    const handleBookingClose = () => {
        setIsBookingModalOpen(false);
    };

    const handleInputChange = (e) => {
        setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
    };

    const user = JSON.parse(sessionStorage.getItem('customer') || '{}');
    const userid = user?.data?._id;

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(BookHouse(
            userid,
            {
                customerName: bookingDetails.customerName,
                email: bookingDetails.email,
                phone: bookingDetails.phone,
                paymentMethod: bookingDetails.paymentMethod,
                cardholder: bookingDetails.cardHolderName,
                cardnumber: bookingDetails.cardNumber,
                expiry: bookingDetails.expiryDate,
                cvv: bookingDetails.cvv,
                apartment: housess?._id,
                rental: housess?.rental
            }
        ) );

        setIsBookingModalOpen(false); // Close the modal after submission
    };

    return (
        <div className="container mx-auto p-4">
            <Customernavbar />
            <div>
                <h2 className="text-2xl font-bold mb-4">{housess?.title}</h2>

                {/* Slick carousel for house images */}
                <Slider {...sliderSettings}>
                    {housess?.images.map((image, index) => (
                        <div key={index}>
                            <img
                                src={`http://localhost:4000/uploads/houses/${image}`}
                                alt={housess?.title}
                                className="w-full h-40 sm:h-72 object-cover p-2 "
                            />
                        </div>
                    ))}
                </Slider>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong>Location:</strong> {housess?.location}</p>
                        <p><strong>Price:</strong> ₹{housess?.price}</p>
                        <p><strong>Type:</strong> {housess?.type}</p>
                        <p><strong>Facilities:</strong> {housess?.facilities.join(", ")}</p>
                        <p><strong>Description:</strong> {housess?.description}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong>Bedrooms:</strong> {housess?.bedrooms}</p>
                        <p><strong>Bathrooms:</strong> {housess?.bathrooms}</p>
                        <p><strong>Square Footage:</strong> {housess?.squareFootage} sqft</p>
                        <p><strong>Available From:</strong> {housess?.availableFrom}</p>
                        <p><strong>Parking Available:</strong> {housess?.parkingAvailable}</p>
                        <p><strong>Pet Policy:</strong> {housess?.petPolicy}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Utilities and Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong>Heating:</strong> {housess?.heating}</p>
                        <p><strong>Cooling:</strong> {housess?.cooling}</p>
                        <p><strong>Deposit:</strong> ₹{housess?.deposit}</p>
                        <p><strong>Lease Term:</strong> {housess?.leaseTerm}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Nearby Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong>Nearby Schools:</strong> {housess?.nearbySchools}</p>
                        <p><strong>Public Transport:</strong> {housess?.publicTransport}</p>
                        <p><strong>Shopping Centers:</strong> {housess?.shoppingCenters}</p>
                        <p><strong>Grocery Stores:</strong> {housess?.groceryStores}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong className='font-serif'>Security:</strong> {housess?.security}</p>
                        <p><strong>Contact:</strong> {housess?.contact}</p>
                        <p><strong>Website:</strong> <a href={`https://${housess?.website}`} className="text-blue-600">{housess?.website}</a></p>
                    </div>
                </div>

                <div className="mt-6">
                    <button onClick={handleBookingClick} className="text-xl w-full md:w-1/4 border p-2 rounded-lg bg-blue-700 text-white font-serif">Book</button>
                </div>
            </div>

            {/* Booking Modal */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="flex flex-col space-y-4">
                                <div>
                                    <label className="block text-gray-700">Customer Name:</label>
                                    <input
                                        type="text"
                                        name="customerName"
                                        value={bookingDetails.customerName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={bookingDetails.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Phone:</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={bookingDetails.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Card Holder Name:</label>
                                    <input
                                        type="text"
                                        name="cardHolderName"
                                        value={bookingDetails.cardHolderName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Card Number:</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={bookingDetails.cardNumber}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="flex space-x-3">
                                    <div className="w-1/2">
                                        <label className="block text-gray-700">Expiry Date:</label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            placeholder="MM/YY"
                                            value={bookingDetails.expiryDate}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-700">CVV:</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={bookingDetails.cvv}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={handleBookingClose}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HouseDetail;

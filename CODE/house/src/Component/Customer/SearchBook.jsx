import React, { useState, useEffect } from 'react';
import Customernavbar from './Customernavbar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux';
import { searchHousess } from '../Actions/Customer'; 

const SearchRentHouse = () => {
    const [location, setLocation] = useState('');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(100000);
    const [type, setType] = useState('');
    const [facility, setFacility] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchHousess(location, minPrice, maxPrice, type, facility));
    }, [location, minPrice, maxPrice, type, facility, dispatch]);

    const houses = useSelector((state) => state.Customer.search); 

    console.log(houses, "houses");

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };


    const viewDetails = (id) => {
        window.location.href = `/housedetail/${id}`;
    }

    return (
        <div>
            <Customernavbar />
            <div className="flex flex-col md:flex-row mt-16">
                {/* Sidebar for filtering */}
                <div className="w-full md:w-1/4 p-4 bg-gray-200 h-auto md:h-screen mt-1">
                    <h2 className="text-xl font-bold mb-4">Filter Options</h2>
                    
                    {/* Filter by location */}
                    <div className="mb-4">
                        <label className="block mb-1">Search by Location:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded"
                        />
                    </div>

                    {/* Filter by price range */}
                    <div className="mb-4">
                        <label className="block mb-1">Price Range:</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-400 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-400 rounded"
                            />
                        </div>
                    </div>

                    {/* Filter by house type */}
                    <div className="mb-4">
                        <label className="block mb-1">Select House Type:</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded"
                        >
                            <option value="">All Types</option>
                            <option value="1BHK">1BHK</option>
                            <option value="2BHK">2BHK</option>
                            <option value="3BHK">3BHK</option>
                        </select>
                    </div>

                    {/* Filter by facility */}
                    <div className="mb-4">
                        <label className="block mb-1">Select Facility:</label>
                        <select
                            value={facility}
                            onChange={(e) => setFacility(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded"
                        >
                            <option value="">All Facilities</option>
                            <option value="Parking">Parking</option>
                            <option value="Gym">Gym</option>
                            <option value="Swimming Pool">Swimming Pool</option>
                            <option value="Garden">Garden</option>
                        </select>
                    </div>
                </div>

                {/* Main content for displaying filtered houses */}
                <div className="w-full md:w-3/4 p-4">
                    <h2 className="text-2xl font-bold mb-4">Rent Houses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {houses?.map((house) => (
                            <div key={house.id} className="bg-white border rounded-lg p-4 shadow">
                                {/* Slick carousel for house images */}
                                <Slider {...sliderSettings}>
                                    {house.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={`http://localhost:4000/uploads/houses/${image}`} alt={house.title} className="w-full h-48 object-cover" onClick={()=>viewDetails(house._id)} />
                                        </div>
                                    ))}
                                </Slider>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold">{house.title}</h3>
                                    <p className="text-sm">Location: {house.location}</p>
                                    <p className="text-sm">Price: ₹{house.price}</p>
                                    <p className="text-sm">Type: {house.type}</p>
                                    <p className="text-sm">Facilities: {house.facilities.join(", ")}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchRentHouse;

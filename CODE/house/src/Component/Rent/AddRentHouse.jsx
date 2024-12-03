import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddHouse,UpdateHouse } from '../Actions/Rental';
import {  useParams } from 'react-router-dom';

const AddRentHouse = () => {
    const [houseDetails, setHouseDetails] = useState({
        title: "",
        price: "",
        location: "",
        type: "",
        facilities: "",
        description: "",
        bedrooms: "",
        bathrooms: "",
        squareFootage: "",
        availableFrom: "",
        parkingAvailable: "",
        petPolicy: "",
        heating: "",
        cooling: "",
        deposit: "",
        leaseTerm: "",
        nearbySchools: "",
        publicTransport: "",
        shoppingCenters: "",
        groceryStores: "",
        security: "",
        contact: "",
        website: ""
    });

    const handleInputChange = (e) => {
        setHouseDetails({ ...houseDetails, [e.target.name]: e.target.value });
    };


    const [images, setImages] = useState<FileList | null>(null);

    const hadleImageChange = (e) => {
        setImages(e.target.files);
    };


    const dispatch = useDispatch();

    const rental = sessionStorage.getItem('rentals');

    const ids = rental ? JSON.parse(rental) : null; 

    

   const {id} = useParams();



    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', houseDetails.title);
        data.append('price', houseDetails.price);
        data.append('location', houseDetails.location);
        data.append('type', houseDetails.type);
        data.append('facilities', houseDetails.facilities);
        images && Array.from(images).map((image) => data.append('images', image)); 
        data.append('images', images );  
        data.append('description', houseDetails.description);
        data.append('bedrooms', houseDetails.bedrooms);
        data.append('bathrooms', houseDetails.bathrooms);
        data.append('squareFootage', houseDetails.squareFootage);
        data.append('availableFrom', houseDetails.availableFrom);
        data.append('parkingAvailable', houseDetails.parkingAvailable);
        data.append('petPolicy', houseDetails.petPolicy);
        data.append('heating', houseDetails.heating);
        data.append('cooling', houseDetails.cooling);
        data.append('deposit', houseDetails.deposit);
        data.append('leaseTerm', houseDetails.leaseTerm);
        data.append('nearbySchools', houseDetails.nearbySchools);
        data.append('publicTransport', houseDetails.publicTransport);
        data.append('shoppingCenters', houseDetails.shoppingCenters);
        data.append('groceryStores', houseDetails.groceryStores);
        data.append('security', houseDetails.security);
        data.append('contact', houseDetails.contact);
        data.append('website', houseDetails.website);

        if(id){
            dispatch(UpdateHouse(data,id) );
        }else{
            dispatch(AddHouse(data,ids._id) );
        }
    };



    const title = id ? "Update Rent House" : "Add Rent House";



    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6"
            
            >
                {/* Column 1 */}
                <div>
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={houseDetails.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="1BHK Apartment in Mumbai"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Price (₹)</label>
                    <input
                        type="number"
                        name="price"
                        value={houseDetails.price}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="20000"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={houseDetails.location}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Mumbai"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Type</label>
                    <input
                        type="text"
                        name="type"
                        value={houseDetails.type}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="1BHK"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Facilities (comma-separated)</label>
                    <input
                        type="text"
                        name="facilities"
                        value={houseDetails.facilities}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Parking, Gym, Swimming Pool"
                    />
                </div>

                <div>
                    <label className="block mb-2">Images </label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={hadleImageChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="/house1.png, /house2.png"
                    />
                </div>

                <div>
                    <label className="block mb-2">Description</label>
                    <textarea
                        name="description"
                        value={houseDetails.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Description of the house"
                        rows={4}
                    />
                </div>

                <div>
                    <label className="block mb-2">Bedrooms</label>
                    <input
                        type="number"
                        name="bedrooms"
                        value={houseDetails.bedrooms}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="1"
                    />
                </div>

                {/* Column 2 */}
                <div>
                    <label className="block mb-2">Bathrooms</label>
                    <input
                        type="number"
                        name="bathrooms"
                        value={houseDetails.bathrooms}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="1"
                    />
                </div>

                <div>
                    <label className="block mb-2">Square Footage (sqft)</label>
                    <input
                        type="number"
                        name="squareFootage"
                        value={houseDetails.squareFootage}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="600"
                    />
                </div>

                <div>
                    <label className="block mb-2">Available From</label>
                    <input
                        type="date"
                        name="availableFrom"
                        value={houseDetails.availableFrom}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2">Parking Available</label>
                    <select
                        name="parkingAvailable"
                        value={houseDetails.parkingAvailable}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2">Pet Policy</label>
                    <select
                        name="petPolicy"
                        value={houseDetails.petPolicy}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="Allowed">Allowed</option>
                        <option value="Not Allowed">Not Allowed</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2">Heating</label>
                    <input
                        type="text"
                        name="heating"
                        value={houseDetails.heating}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Central Heating"
                    />
                </div>

                <div>
                    <label className="block mb-2">Cooling</label>
                    <input
                        type="text"
                        name="cooling"
                        value={houseDetails.cooling}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Air Conditioning"
                    />
                </div>

                <div>
                    <label className="block mb-2">Deposit (₹)</label>
                    <input
                        type="number"
                        name="deposit"
                        value={houseDetails.deposit}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="30000"
                    />
                </div>

                <div>
                    <label className="block mb-2">Lease Term</label>
                    <input
                        type="text"
                        name="leaseTerm"
                        value={houseDetails.leaseTerm}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="1 year"
                    />
                </div>

                <div>
                    <label className="block mb-2">Nearby Schools</label>
                    <input
                        type="text"
                        name="nearbySchools"
                        value={houseDetails.nearbySchools}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="XYZ School, ABC High School"
                    />
                </div>

                <div>
                    <label className="block mb-2">Public Transport</label>
                    <input
                        type="text"
                        name="publicTransport"
                        value={houseDetails.publicTransport}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Bus stop 5 minutes away"
                    />
                </div>

                <div>
                    <label className="block mb-2">Shopping Centers</label>
                    <input
                        type="text"
                        name="shoppingCenters"
                        value={houseDetails.shoppingCenters}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Local mall within 10 minutes"
                    />
                </div>

                <div>
                    <label className="block mb-2">Grocery Stores</label>
                    <input
                        type="text"
                        name="groceryStores"
                        value={houseDetails.groceryStores}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Nearby grocery store"
                    />
                </div>

                <div>
                    <label className="block mb-2">Security</label>
                    <input
                        type="text"
                        name="security"
                        value={houseDetails.security}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="24/7 Security"
                    />
                </div>

                <div>
                    <label className="block mb-2">Contact</label>
                    <input
                        type="text"
                        name="contact"
                        value={houseDetails.contact}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="(123) 456-7890"
                    />
                </div>

                <div>
                    <label className="block mb-2">Website</label>
                    <input
                        type="text"
                        name="website"
                        value={houseDetails.website}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="www.example.com"
                    />
                </div>

                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add House</button>
                </div>
            </form>
        </div>
    );
};

export default AddRentHouse;

import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Customernavbar from './Customernavbar';

// Static book data
const book = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 10.99,
    publisher: 'Scribner',
    publication_year: 1925,
    genre: 'Classic',
    isbn: '978-0743273565',
    language: 'English',
    page_count: 180,
    available_copies: 5,
    description: 'A novel set in the Roaring Twenties that examines themes of wealth, love, and the American Dream.',
    image: '/path/to/image.jpg', // Replace with actual image path
};

const ViewBookDetails = () => {
    const read = [
        '/read1.png',
        '/read2.png',
        '/read3.png',
        '/read4.png',
        '/read5.png',
        '/read.png',
        '/read6.png',
        '/read7.png'
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        slidesToShow: 7,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div>
            <Customernavbar />
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-5 max-w-full mx-auto">
                    {/* Book Image */}
                    <div className="md:w-1/3 mb-4 md:mb-0">
                        <img src='/read1.png' alt={book.title} className="w-full h-auto rounded-md" />
                    </div>

                    {/* Book Details */}
                    <div className="md:w-2/3 md:pl-5">
                        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                        <p className="text-lg text-gray-700 mb-2">Author: {book.author}</p>
                        <p className="text-lg text-gray-700 mb-2">Price: ${book.price.toFixed(2)}</p>
                        <p className="text-lg text-gray-700 mb-2">Publisher: {book.publisher}</p>
                        <p className="text-lg text-gray-700 mb-2">Publication Year: {book.publication_year}</p>
                        <p className="text-lg text-gray-700 mb-2">Genre: {book.genre}</p>
                        <p className="text-lg text-gray-700 mb-2">ISBN: {book.isbn}</p>
                        <p className="text-lg text-gray-700 mb-2">Language: {book.language}</p>
                        <p className="text-lg text-gray-700 mb-2">Page Count: {book.page_count}</p>
                        <p className="text-lg text-gray-700 mb-2">Available Copies: {book.available_copies}</p>
                        <p className="text-gray-600 mb-4">{book.description}</p>

                        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Recommended Books Section */}
            <div className="mt-4">
                <h3 className='text-sm sm:text-2xl font-serif uppercase underline ml-4'>Recommended Books</h3>
                <Slider {...settings}>
                    {read.map((image, index) => (
                        <div key={index} className="flex justify-center items-center">
                            <img src={image} alt={`Slide ${index + 1}`} className='img w-[300px] h-32 sm:w-[300px] sm:h-[300px] sm:p-4' />
                        </div>
                    ))}
                </Slider>
            </div>
            <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold">Company Name</h3>
                        <p className="text-sm">Your tagline or slogan here.</p>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-md font-semibold">Links</h4>
                        <ul className="text-sm">
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Services</a></li>
                            <li><a href="#" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:underline">Facebook</a>
                            <a href="#" className="hover:underline">Twitter</a>
                            <a href="#" className="hover:underline">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-600 pt-4 text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
        </div>
    );
};

export default ViewBookDetails;

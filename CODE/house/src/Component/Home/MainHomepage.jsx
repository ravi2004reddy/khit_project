import React, { useRef, useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Navbar from './Navbar';
import 'animate.css'; // Import Animate.css
import { useSpring, animated } from 'react-spring';

const MainHomepage = () => {
    // const sliderRef = useRef(null);
    const [animateBooks, setAnimateBooks] = useState(false);
    const [showBooks, setShowBooks] = useState(false);

  

    const books = [
        '/rent5.png',
        '/rent6.png',
        '/rent7.png',
        '/rent8.png'
    ];

    useEffect(() => {
        const handleMouseEnter = () => {
            if (!animateBooks) {
                setAnimateBooks(true);
                setShowBooks(true);
            }
        };

        const booksSection = document.querySelector('.books-section');
        if (booksSection) {
            booksSection.addEventListener('mouseenter', handleMouseEnter);
        }

        return () => {
            if (booksSection) {
                booksSection.removeEventListener('mouseenter', handleMouseEnter);
            }
        };
    }, [animateBooks]);

    const props = useSpring({
        from: { value: 0 },
        to: { value: 500 },
        config: { tension: 120, friction: 14 },
    });

    return (
        <div className="m-0 p-0">
            <Navbar />
            <div className="relative">
                <div className="mt-24 flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 px-4">
                    <div className="text-center sm:text-left">
                        <h4 className="text-black font-serif text-4xl sm:text-6xl">A lifestyle tailor-made for you</h4>
                        <p className="mt-4 text-gray-700 text-lg max-w-md">With diverse housing options, you're not just choosing a home; you're crafting a lifestyle that reflects your individuality. Beyond mere renting, we're here to support your everyday living, hassle-free.</p>
                    </div>
                    <img src="/app7.png" className="mt-8 sm:mt-0 w-full max-w-xs sm:max-w-md sm:max-h-[500px] rounded-2xl object-cover p-4" alt="Lifestyle" />
                </div>

                <div className="mt-24 flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 px-4 bg-gradient-to-r from-sky-100 to-sky-100 max-h-screen">
                    <img src="/app1.png" className="mt-8 mr-0 sm:mr-8 w-full max-w-xs sm:max-w-[700px] sm:max-h-[900px] rounded-2xl object-cover p-4" alt="House" />
                    <div className="text-center sm:text-left grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-12 sm:gap-y-8">
                        <div>
                            <animated.p className="text-gray-700 font-semibold text-6xl">
                                {props.value.to((val) => Math.floor(val))}
                            </animated.p>
                            <p className="mt-2 text-gray-700 text-md">Happy customers</p>
                        </div>
                        <div>
                            <p className="text-gray-700 font-semibold text-6xl">1,00,000+</p>
                            <p className="mt-2 text-gray-700 text-md">Houses across India</p>
                        </div>
                        <div>
                            <p className="text-gray-700 font-semibold text-6xl">9+</p>
                            <p className="mt-2 text-gray-700 text-md">Cities in India</p>
                        </div>
                        <div>
                            <p className="text-gray-700 font-semibold text-6xl">₹38+ Cr</p>
                            <p className="mt-2 text-gray-700 text-md">Savings made on brokerage</p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto mt-10 p-7">
                    <div className="books-section">
                        <h2 className="text-2xl font-serif uppercase">Our House</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {showBooks && books.map((image, index) => (
                            <div key={index} className="flex justify-center items-center">
                                <img
                                    src={image}
                                    alt={`Book ${index + 1}`}
                                    className={`book w-full h-auto rounded-lg shadow-lg min-h-[300px] max-h-[300px] sm:max-h-[500px] p-3 hover:shadow-xl hover:scale-105  
                                        ${animateBooks && (index % 2 === 0 ? 'animate__animated animate__backInLeft slow-animation' : 'animate__animated animate__backInRight slow-animation')}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className=" mt-24 flex h-[500px] mb-5 flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 px-4">
                    <div className=" hidden md:block text-center sm:text-left">
                        <h4 className="text-black font-serif text-4xl sm:text-6xl">A lifestyle tailor-made for you</h4>
                        <p className="mt-4 text-gray-700 text-lg max-w-md">With diverse housing options, you're not just choosing a home; you're crafting a lifestyle that reflects your individuality. Beyond mere renting, we're here to support your everyday living, hassle-free.</p>
                    </div>
                    <img src="/app3.png" className="mt-8 sm:mt-0 w-full max-w-xs sm:max-w-[800px] sm:max-h-[500px] rounded-2xl object-cover p-4" alt="Lifestyle 3" />
                </div>

                <div className="mt-24 flex h-[500px] mb-5 flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 px-4 bg-gradient-to-r from-purple-500 to-purple-500">
                    <div className=" hidden md:block text-center sm:text-left">
                        <h4 className="text-black font-serif text-4xl sm:text-6xl">A lifestyle tailor-made for you</h4>
                        <p className="mt-4 text-gray-700 text-lg max-w-md">With diverse housing options, you're not just choosing a home; you're crafting a lifestyle that reflects your individuality. Beyond mere renting, we're here to support your everyday living, hassle-free.</p>
                    </div>
                    <img src="/app2.png" className="mt-8 sm:mt-0 w-full max-w-xs sm:max-w-[600px] sm:max-h-[500px] rounded-2xl object-cover p-4" alt="Lifestyle 2" />
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
        </div>
    );
};

export default MainHomepage;

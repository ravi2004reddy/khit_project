import React, { useState } from 'react';

// Sample book data
const bookData = [
    {
        id: 1,
        title: "Book Title 1",
        author: "Author 1",
        price: "$19.99",
        publisher: "Publisher 1",
        publication_year: "2021",
        genre: "Fiction",
        isbn: "123-456-789",
        language: "English",
        page_count: 300,
        available_copies: 5,
        description: "This is a description of Book Title 1.",
        image: "https://via.placeholder.com/150",
    },
    {
        id: 2,
        title: "Book Title 2",
        author: "Author 2",
        price: "$29.99",
        publisher: "Publisher 2",
        publication_year: "2020",
        genre: "Non-Fiction",
        isbn: "987-654-321",
        language: "English",
        page_count: 250,
        available_copies: 2,
        description: "This is a description of Book Title 2.",
        image: "https://via.placeholder.com/150",
    },
    // Add more book objects as needed...
];

const BookGrid = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');

    // Get unique authors, prices, and languages for the dropdowns
    const authors = [...new Set(bookData.map(book => book.author))];
    const languages = [...new Set(bookData.map(book => book.language))];
    const prices = [...new Set(bookData.map(book => book.price))];

    // Filter books based on the search term and selected filters
    const filteredBooks = bookData.filter((book) => {
        const matchesTitle = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAuthor = selectedAuthor ? book.author === selectedAuthor : true;
        const matchesPrice = selectedPrice ? book.price === selectedPrice : true;
        const matchesLanguage = selectedLanguage ? book.language === selectedLanguage : true;

        return matchesTitle && matchesAuthor && matchesPrice && matchesLanguage;
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Book Collection</h1>

            {/* Add Book Button */}
            <div className="mb-4 text-right">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Add Book
                </button>
            </div>

            {/* Search Filter and Select Filters */}
            <div className="mb-4 flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="w-56 p-2 border border-gray-300 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="">Select Author</option>
                    {authors.map((author, index) => (
                        <option key={index} value={author}>{author}</option>
                    ))}
                </select>
                <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="">Select Price</option>
                    {prices.map((price, index) => (
                        <option key={index} value={price}>{price}</option>
                    ))}
                </select>
                <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="">Select Language</option>
                    {languages.map((language, index) => (
                        <option key={index} value={language}>{language}</option>
                    ))}
                </select>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.map((book) => (
                    <div
                        key={book.id}
                        className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200"
                    >
                        <img src={book.image} alt={book.title} className="w-full h-40 object-cover mb-4 rounded" />
                        <h2 className="font-bold text-lg">{book.title}</h2>
                        <p className="text-gray-700">Author: {book.author}</p>
                        <p className="text-gray-700">Price: {book.price}</p>
                        <p className="text-gray-700">Publisher: {book.publisher}</p>
                        <p className="text-gray-700">Year: {book.publication_year}</p>
                        <p className="text-gray-700">Genre: {book.genre}</p>
                        <p className="text-gray-700">ISBN: {book.isbn}</p>
                        <p className="text-gray-700">Language: {book.language}</p>
                        <p className="text-gray-700">Pages: {book.page_count}</p>
                        <p className="text-gray-700">Available: {book.available_copies}</p>
                        <p className="text-gray-600 mt-2">{book.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookGrid;

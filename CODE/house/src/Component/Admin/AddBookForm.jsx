import React, { useState } from 'react';

const AddBookForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        publisher: '',
        publication_year: '',
        genre: '',
        isbn: '',
        language: '',
        page_count: '',
        available_copies: '',
        description: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Book Data:', formData);
        // Here you can add the logic to submit the form data to your API
    };

    return (
        <div className="container mx-auto p-5 ">
            <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="author">Author</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="publisher">Publisher</label>
                    <input
                        type="text"
                        name="publisher"
                        id="publisher"
                        value={formData.publisher}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="publication_year">Publication Year</label>
                    <input
                        type="number"
                        name="publication_year"
                        id="publication_year"
                        value={formData.publication_year}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="genre">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        id="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="isbn">ISBN</label>
                    <input
                        type="text"
                        name="isbn"
                        id="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="language">Language</label>
                    <input
                        type="text"
                        name="language"
                        id="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="page_count">Page Count</label>
                    <input
                        type="number"
                        name="page_count"
                        id="page_count"
                        value={formData.page_count}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="available_copies">Available Copies</label>
                    <input
                        type="number"
                        name="available_copies"
                        id="available_copies"
                        value={formData.available_copies}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        required
                    ></textarea>
                </div>
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="col-span-2">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                        Add Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBookForm;

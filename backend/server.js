const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://madhugoud:Madhu162@mern.ogz9oev.mongodb.net/';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors()); // Use the cors middleware

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    price: Number,
    image: String,
});

const Book = mongoose.model('Book', bookSchema);

// Function to seed initial data into the database
const seedDatabase = async () => {
    try {
        await Book.deleteMany(); // Clear existing data

        const books = [
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American Dream', price: 20, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011815/sutterlin-1362879_640-(1).jpg' },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A powerful story of racial injustice and moral growth', price: 15, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011854/reading-925589_640.jpg' },
            { title: '1984', author: 'George Orwell', genre: 'Dystopian', description: 'A dystopian vision of a totalitarian future society', price: 25, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' }
        ];

        await Book.insertMany(books);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// Seed the database on server startup
seedDatabase();

// Define API endpoint for fetching all books
app.get('/api/books', async (req, res) => {
    try {
        // Fetch all books from the database
        const allBooks = await Book.find();

        // Send the entire books array as JSON response
        res.json(allBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

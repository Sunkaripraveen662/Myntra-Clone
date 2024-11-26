const express = require('express');
const bodyParser = require('body-parser');
const { getStoredItems, storeItems } = require('./data/item'); // Correct path to item.js

const app = express(); // Renamed variable from appendFile to app for clarity

// Middleware
app.use(bodyParser.json());

// POST endpoint to add a new item
app.post('/items', async (req, res) => {
    try {
        const { newItem } = req.body;
        if (!newItem) {
            return res.status(400).json({ message: 'Invalid input: newItem is required' });
        }

        // Get existing items and add the new item
        const items = await getStoredItems();
        const updatedItems = [...items, newItem];

        // Save updated items to the JSON file
        await storeItems(updatedItems);

        // Respond with success message
        res.status(201).json({ message: 'stored new item:', item: newItem });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET endpoint to fetch all stored items
app.get('/items', async (req, res) => {
    try {
        const items = await getStoredItems();
        res.status(200).json({ items });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to fetch items' });
    }
});

// Server setup
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});

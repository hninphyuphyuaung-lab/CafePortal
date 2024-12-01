// server.js or backend server file

const express = require('express');
const cors = require('cors');
const path = require('path');
const { console } = require('inspector');

const app = express();

// Enable CORS for all routes (or specify origin if you need)
app.use(cors());  // This will allow all origins to access your API

app.use(express.static(path.join(__dirname, 'build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
})
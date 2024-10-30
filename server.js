// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://bader:blehaj@cluster0.txyjrdn.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Reservation schema
const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String,
  guests: Number,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// API endpoint to create a reservation
app.post('/api/reservations', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API endpoint to get all reservations
app.get('/api/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).send(reservations);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

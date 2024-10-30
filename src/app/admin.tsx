import React, { useEffect, useState } from 'react';

interface Reservation {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
}

function AdminDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/reservations')
      .then(response => response.json())
      .then(data => setReservations(data))
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <ul className="space-y-4">
        {reservations.map((reservation: Reservation, index) => (
          <li key={index} className="p-4 bg-white shadow rounded">
            <p><strong>Name:</strong> {reservation.name}</p>
            <p><strong>Email:</strong> {reservation.email}</p>
            <p><strong>Date:</strong> {reservation.date}</p>
            <p><strong>Time:</strong> {reservation.time}</p>
            <p><strong>Guests:</strong> {reservation.guests}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;

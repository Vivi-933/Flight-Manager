import React from 'react'
import PayPalButton from '../components/Paypal/PaypalButton'
import { useLocation } from "react-router-dom"

function getBookingType(booking) {
  if (booking.type === 'type') {
    return 'Hotel'
  } else {
    return 'Flight'
  }
}

export default function PaypalPayment() {
  const { state } = useLocation()
  const booking = state?.booking

  // If user navigates here directly
  if (!booking) {
    return (
      <div>
        <h2>No Booking Found</h2>
        <p>You must select a flight/hotel before paying.</p>
      </div>
    )
  }

  const bookingType = getBookingType(booking)

  return (
    <div>
      <h2>Book {bookingType}</h2>
      <PayPalButton booking={booking} />
    </div>
  )
}

import React, { useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext'

export default function OnSuccessfulPayment() {
  const { state } = useLocation()
  const auth = useAuth()
  const { addBooking } = auth || {}

  const booking = state?.booking
  const addedRef = useRef(false) // track if booking was already added

  useEffect(() => {
    if (booking && !addedRef.current) {
      addBooking(booking)
      addedRef.current = true // mark as added
    }
  }, [booking, addBooking])

  if (!booking) {
    return (
      <div>
        <h2>No booking found</h2>
      </div>
    )
  }

  let price
  let bookingId
  if (booking.type == "hotel") {
    price = booking.offer.price.total
    bookingId = booking.id
  } else {
    price = booking.price.total
    bookingId = booking._bookingId
  }

  console.log(booking)
  return (
    <div>
      <h2>Booking Successful</h2>
      <p>Booking id: {bookingId}</p>
      <p>Price: {price}</p>
    </div>
  )
}

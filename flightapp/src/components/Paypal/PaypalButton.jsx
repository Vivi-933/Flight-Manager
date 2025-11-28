import React, { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const paypalclientid = import.meta.env.VITE_PAYPAL_CLIENT_ID;

const PayPalButton = ({ booking }) => {
  const navigate = useNavigate();
  const price = booking.price.total

  return (
    <PayPalScriptProvider
      options={{
        "client-id": paypalclientid,
        currency: "USD",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price.toString(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(() => {
            navigate("../OnSuccessfulPayment", {
              state: {
                booking
              }
            });
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
          navigate("../OnFailedPayment");
        }}
      />
    </PayPalScriptProvider>
  );
};



export default PayPalButton;

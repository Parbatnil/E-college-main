import React, { useState } from "react";
import phone from "../../../public/phonepe.png";

const Payment = ({ handleSubscription }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    // Validate card number (16 digits)
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumber.match(cardNumberRegex)) {
      return "Card number must be 16 digits.";
    }

    // Validate card holder name (non-empty and alphabetic)
    if (!cardHolderName.trim()) {
      return "Card holder name is required.";
    }

    // Validate expiry date (MM/YY format)
    const expireDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expireDate.match(expireDateRegex)) {
      return "Expiry date must be in MM/YY format.";
    }

    // Check if the expiry date is in the future
    const [month, year] = expireDate.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString().slice(-2); // Get last two digits of the current year
    if (
      parseInt(year) < parseInt(currentYear) ||
      (parseInt(year) === parseInt(currentYear) &&
        parseInt(month) < currentDate.getMonth() + 1)
    ) {
      return "Expiry date must be in the future.";
    }

    // Validate CVV (3 digits)
    const cvvRegex = /^\d{3}$/;
    if (!cvv.match(cvvRegex)) {
      return "CVV must be 3 digits.";
    }

    return ""; // No error
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    const error = validateForm();
    if (error) {
      setErrorMessage(error); // Show error message
      return;
    } else {
      handleSubscription(e);
    }
    // If no error, pass the data to the parent handler
    setErrorMessage("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* PhonePay Logo */}
        <div className="flex justify-center mb-6">
          <img src={phone} alt="PhonePay Logo" className="w-32 h-auto" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Payment Information
        </h2>

        {/* Error message */}
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Card Number */}
          <div className="mb-4">
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>

          {/* Card Holder Name */}
          <div className="mb-4">
            <label
              htmlFor="cardHolderName"
              className="block text-sm font-medium text-gray-700"
            >
              Card Holder Name
            </label>
            <input
              type="text"
              id="cardHolderName"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              required
            />
          </div>

          {/* Expiry Date and CVV */}
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="expireDate"
                className="block text-sm font-medium text-gray-700"
              >
                Expire Date
              </label>
              <input
                type="text"
                id="expireDate"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;

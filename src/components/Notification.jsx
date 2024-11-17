import React from "react";

const Notification = ({ message, type, onClose }) => {
  if (!message) return null; // Don't render anything if no message

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-${type}-500 text-white p-4 rounded-md shadow-md`}
    >
      <div className="flex justify-between items-center">
        <div>{message}</div>
        <button
          onClick={onClose}
          className="ml-4 text-xl font-bold"
          aria-label="Close Notification"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;

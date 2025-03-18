import React from "react";
import Button from "../Button";
import { FaTimes } from "react-icons/fa";

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
      onClick={handleOutsideClick}
    >
      <div className="relative bg-gray-900 p-6 rounded-lg w-96 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-gray-700 hover:bg-gray-600 rounded-full p-1"
        >
          <FaTimes />
        </button>

        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export const DeleteModal = ({ isOpen, onClose, onDelete, data }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
      onClick={handleOutsideClick}
    >
      <div
        className="relative bg-gray-900 p-6 rounded-lg w-96 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-gray-700 hover:bg-gray-600 rounded-full p-1"
        >
          <FaTimes />
        </button>

        <h3 className="text-xl font-bold text-white mb-4">
          Delete Confirmation
        </h3>
        <p className="text-white mb-4">
          Are you sure you want to delete <strong>{data?.name}</strong>?
        </p>

        <div className="flex justify-end space-x-2">
          <Button onClick={onDelete} color="red">
            Delete
          </Button>
          <Button onClick={onClose} color="gray">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

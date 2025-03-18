import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { Modal, DeleteModal } from "../../components/Modal";
import { getUsers, createUser, updateUser, deleteUser } from "../../api";

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const columns = [
    {
      label: "No",
      field: "index",
      render: (_, __, rowIndex) => startIndex + rowIndex + 1,
    },
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { 
      label: "Role", 
      field: "role",
      render: (value) => (
        <span
          className={`px-1 text-white text-xs font-semibold rounded ${
            value === "admin" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          {value === "admin" ? "Admin" : "User"}
        </span>
      ),
    },
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
  
    const sortedData = data.sort((a, b) => {
      if (a.role === "admin" && b.role !== "admin") return -1;
      if (a.role !== "admin" && b.role === "admin") return 1;
      return a.name.localeCompare(b.name);
    });
  
    setUsers(sortedData);
  };
  

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openModal = (user = null) => {
    setSelectedUser(user);
    setFormData(
      user
        ? {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
          }
        : { id: null, name: "", email: "", password: "", role: "" }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const openDeleteConfirm = (user) => {
    setSelectedUser(user);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setSelectedUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      alert("User email cannot be empty!");
      return;
    }

    try {
      if (selectedUser) {
        await updateUser(
          formData.id,
          formData.name,
          formData.email,
          formData.password,
          formData.role
        );
      } else {
        await createUser(
          formData.name,
          formData.email,
          formData.password,
          formData.role
        );
      }

      loadUsers();
      closeModal();
    } catch (error) {
      console.error("Error saving User:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUser.id);
      loadUsers();
    } catch (error) {
      console.error("Error deleting User:", error);
    }
    closeDeleteConfirm();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Table</h2>
        <Button
          onClick={() => openModal()}
          color="blue"
          className="flex items-center"
        >
          <FaPlus className="mr-2" /> Create
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={displayedUsers}
        actions={(row) => (
          <>
            <Button onClick={() => openModal(row)} color="yellow">
              <FaEdit />
            </Button>
            <Button onClick={() => openDeleteConfirm(row)} color="red">
              <FaTrash />
            </Button>
          </>
        )}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedUser ? "Edit User" : "Create User"}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <Input
            label="Password"
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            {...(!selectedUser && { required: true })}
          />
          <Select
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
            ]}
            required
          />

          <div className="flex justify-end mt-4 space-x-2">
            <Button type="submit" color="green">
              Save
            </Button>
            <Button onClick={closeModal} color="gray">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        onDelete={handleDelete}
        data={selectedUser}
      />
    </div>
  );
};

export default User;

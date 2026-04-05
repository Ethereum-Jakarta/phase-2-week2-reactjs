import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { Modal, DeleteModal } from "../../components/Modal";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
  });

  const columns = [
    {
      label: "No",
      field: "index",
      render: (_, __, rowIndex) => startIndex + rowIndex + 1,
    },
    { label: "Name", field: "name" },
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
    setCategories(sortedData);
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCategories = categories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openModal = (category = null) => {
    setSelectedCategory(category);
    setFormData(
      category
        ? {
            id: category.id,
            name: category.name,
          }
        : { id: null, name: "" }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const openDeleteConfirm = (category) => {
    setSelectedCategory(category);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setSelectedCategory(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedCategory) {
        await updateCategory(formData.id, formData.name);
      } else {
        await createCategory(formData.name);
      }

      loadCategories();
      closeModal();
    } catch (error) {
      console.error("Error saving Category:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(selectedCategory.id);
      loadCategories();
    } catch (error) {
      console.error("Error deleting Category:", error);
    }
    closeDeleteConfirm();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Category Table</h2>
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
        data={displayedCategories}
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
        title={selectedCategory ? "Edit Category" : "Create Category"}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
        data={selectedCategory}
      />
    </div>
  );
};

export default Category;

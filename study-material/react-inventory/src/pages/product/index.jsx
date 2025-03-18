import { useCallback, useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { Modal, DeleteModal } from "../../components/Modal";
import {
  getCategories,
  getCategory,
  getUsers,
  getUser,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: 10.0,
    quantityInStock: 10,
    categoryId: "",
    userId: "",
  });

  const columns = [
    {
      label: "No",
      field: "index",
      render: (_, __, index) => startIndex + index + 1,
    },
    {
      label: "Category",
      field: "categoryId",
      render: (value) =>
        categories.find((c) => c.id === value)?.name || "Loading...",
    },
    { label: "Product Name", field: "name" },
    { label: "Description", field: "description" },
    { label: "Price", field: "price", render: (value) => `$${value}` },
    {
      label: "Stock",
      field: "quantityInStock",
      render: (value) => `${value} pcs`,
    },
    {
      label: "Created By",
      field: "userId",
      render: (value) =>
        users.find((u) => u.id === value)?.name || "Loading...",
    },
  ];

  const loadCategoryAndUser = async (products) => {
    const categoryMap = {};
    const userMap = {};

    for (const product of products) {
      if (!categoryMap[product.categoryId]) {
        categoryMap[product.categoryId] = await getCategory(product.categoryId);
      }
      if (!userMap[product.userId]) {
        userMap[product.userId] = await getUser(product.userId);
      }
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const loadProducts = useCallback(async () => {
    const data = await getProducts();
    setProducts(data);
    await loadCategoryAndUser(data);
  }, []);

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadUsers();
  }, [loadProducts]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openModal = (product = null) => {
    setSelectedProduct(product);
    setFormData(
      product
        ? {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            quantityInStock: product.quantityInStock,
            categoryId: product.categoryId,
            userId: product.userId,
          }
        : {
            id: null,
            name: "",
            description: "",
            price: 10.0,
            quantityInStock: 10,
            categoryId: "",
            userId: "",
          }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const openDeleteConfirm = (product) => {
    setSelectedProduct(product);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Product name cannot be empty!");
      return;
    }

    try {
      if (selectedProduct) {
        await updateProduct(formData.id, formData.name);
      } else {
        await createProduct(formData.name);
      }

      loadCategories();
      closeModal();
    } catch (error) {
      console.error("Error saving Product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(selectedProduct.id);
      loadProducts();
    } catch (error) {
      console.error("Error deleting Product:", error);
    }
    closeDeleteConfirm();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product Table</h2>
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
        data={displayedProducts}
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
        title={selectedProduct ? "Edit Product" : "Create Product"}
      >
        <form onSubmit={handleSubmit}>
          <Select
            label="Category"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
            required
          />
          <Input
            label="Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Description"
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <Input
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
            required
          />
          <Input
            label="Stock"
            type="number"
            value={formData.quantityInStock}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantityInStock: parseInt(e.target.value),
              })
            }
            required
          />
          <Select
            label="Created By"
            value={formData.userId}
            onChange={(e) =>
              setFormData({ ...formData, userId: e.target.value })
            }
            options={users.map((u) => ({ value: u.id, label: u.name }))}
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
        data={selectedProduct}
      />
    </div>
  );
};

export default Product;

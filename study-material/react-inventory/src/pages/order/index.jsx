import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { Modal } from "../../components/Modal";
import {
  getOrders,
  getOrder,
  getOrderItemsByOrderId,
  getUsers,
  getProducts,
} from "../../api";

const Order = () => {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      label: "No",
      field: "index",
      render: (_, __, index) => startIndex + index + 1,
    },
    {
      label: "Actions",
      field: "actions",
      render: (_, row) => (
        <Button onClick={() => loadOrderDetails(row.id)}>Details</Button>
      ),
    },
    { label: "Order ID", field: "id" },
    { label: "Customer Name", field: "customerName" },
    { label: "Customer Email", field: "customerEmail" },
    {
      label: "Total Price",
      field: "totalPrice",
      render: (value) => `$${value}`,
    },
  ];

  useEffect(() => {
    loadOrders();
    loadUsers();
    loadProducts();
  }, []);

  const loadOrders = async () => {
    const data = await getOrders();

    const sortedData = data.sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt);
      const dateB = new Date(b.updatedAt || b.createdAt);

      return dateB - dateA;
    });

    setOrders(sortedData);
  };

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const getProductName = (productId) => {
    const product = products.find((prod) => prod.id === productId);
    return product ? product.name : "Unknown Product";
  };

  const loadOrderDetails = async (orderId) => {
    try {
      const orderData = await getOrder(orderId);
      const orderItemsData = await getOrderItemsByOrderId(orderId);
      setSelectedOrder(orderData);
      setSelectedOrderItems(orderItemsData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order Table</h2>

      {/* Table */}
      <Table columns={columns} data={displayedOrders} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Modal Detail */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Order Details"
      >
        {selectedOrder && (
          <>
            <p className="text-white mb-2">
              <strong>Name:</strong> {selectedOrder.customerName}
            </p>
            <p className="text-white mb-2">
              <strong>Email:</strong> {selectedOrder.customerEmail}
            </p>

            <h4 className="text-lg font-semibold text-white mt-4">
              Order Items:
            </h4>
            <ol className="text-white list-decimal list-inside">
              {selectedOrderItems.map((item) => (
                <li key={item.id} className="mb-2">
                  {getProductName(item.productId)} - {item.quantity} x $
                  {item.unitPrice}
                </li>
              ))}
            </ol>
            <hr className="border-t border-gray-400 my-4" />

            <p className="text-white mb-2">
              <strong>Total:</strong> ${selectedOrder.totalPrice}
            </p>
            <Button onClick={() => setIsModalOpen(false)} color="gray">
              Close
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Order;

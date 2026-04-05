import React, { useState, useEffect } from "react";
import { FaUsers, FaTag, FaBox, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  getUsers,
  getCategories,
  getProducts,
  getOrders,
} from "../api";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const categoriesData = await getCategories();
        const productsData = await getProducts();
        const ordersData = await getOrders();

        setUsers(usersData);
        setCategories(categoriesData);
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: "Users",
      path: "/users",
      value: users.length || 0,
      icon: <FaUsers className="sm:text-2xl md:text-3xl" />,
      color: "bg-blue-600",
    },
    {
      title: "Categories",
      path: "/categories",
      value: categories.length || 0,
      icon: <FaTag className="sm:text-2xl md:text-3xl" />,
      color: "bg-green-600",
    },
    {
      title: "Products",
      path: "/products",
      value: products.length || 0,
      icon: <FaBox className="sm:text-2xl md:text-3xl" />,
      color: "bg-red-600",
    },
    {
      title: "Orders",
      path: "/orders",
      value: orders.length || 0,
      icon: <FaShoppingCart className="sm:text-2xl md:text-3xl" />,
      color: "bg-yellow-600",
    },
  ];

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {cards.map((card, index) => (
          <Link
            to={card.path}
            key={index}
            className={`p-6 rounded-lg shadow-md flex flex-col items-center ${card.color}`}
          >
            <div className="sm:text-xl md:text-2xl font-bold mb-2">
              {card.title}
            </div>
            <div className="sm:text-3xl md:text-4xl font-bold">
              {card.value}
            </div>
            <div className="mt-4">{card.icon}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

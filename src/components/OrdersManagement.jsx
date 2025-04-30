import { useState } from "react";
import * as XLSX from "xlsx";
import OrderStats from "./OrderStats";
import OrderFilters from "./OrderFilters";
import OrderTable from "./OrderTable";

export default function OrdersManagement({ orders, setOrders }) {
    const [exportType, setExportType] = useState("pending");
    const [selectedYear, setSelectedYear] = useState(2025);
    const [selectedMonth, setSelectedMonth] = useState(3);
    const [filterStatus, setFilterStatus] = useState("all");

    // Tính số đơn hàng đã giao và chưa giao
    const getOrderStats = () => {
        const delivered = orders.filter((order) => {
            const orderDate = new Date(order.date);
            return (
                orderDate.getFullYear() === selectedYear &&
                orderDate.getMonth() === selectedMonth &&
                (order.status === "Completed" || order.status === "Shipped")
            );
        }).length;

        const pending = orders.filter((order) => {
            const orderDate = new Date(order.date);
            return (
                orderDate.getFullYear() === selectedYear &&
                orderDate.getMonth() === selectedMonth &&
                (order.status === "pending" || order.status === "Processing")
            );
        }).length;

        return { delivered, pending };
    };

    const { delivered, pending } = getOrderStats();

    // Xuất đơn hàng ra Excel
    const exportToExcel = () => {
        let filteredOrders;
        let fileName;
        let sheetName;

        if (exportType === "only_pending") {
            filteredOrders = orders.filter(
                (order) =>
                    order.status === "pending" &&
                    new Date(order.date).getFullYear() === selectedYear &&
                    new Date(order.date).getMonth() === selectedMonth
            );
            fileName = `only_pending_orders_${selectedYear}-${selectedMonth + 1}.xlsx`;
            sheetName = "Only Pending Orders";
        } else if (exportType === "pending") {
            filteredOrders = orders.filter(
                (order) =>
                    (order.status === "pending" || order.status === "Processing") &&
                    new Date(order.date).getFullYear() === selectedYear &&
                    new Date(order.date).getMonth() === selectedMonth
            );
            fileName = `pending_orders_${selectedYear}-${selectedMonth + 1}.xlsx`;
            sheetName = "Pending Orders";
        } else {
            filteredOrders = orders.filter(
                (order) =>
                    (order.status === "Shipped" || order.status === "Completed") &&
                    new Date(order.date).getFullYear() === selectedYear &&
                    new Date(order.date).getMonth() === selectedMonth
            );
            fileName = `delivered_orders_${selectedYear}-${selectedMonth + 1}.xlsx`;
            sheetName = "Delivered Orders";
        }

        const data = filteredOrders.map((order) => ({
            "Order ID": order.id,
            Customer: order.customerName,
            Date: order.date,
            Total: `$${order.total.toFixed(2)}`,
            Status: order.status,
            Products: order.items
                ? order.items
                    .map((item) => `${item.name} (${item.quantity} x $${item.price.toFixed(2)}, Size: ${item.selectedSize})`)
                    .join(", ")
                : "No products",
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        XLSX.writeFile(workbook, fileName);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Orders Management</h2>
            <OrderStats
                delivered={delivered}
                pending={pending}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
            />
            <OrderFilters
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                exportType={exportType}
                setExportType={setExportType}
                exportToExcel={exportToExcel}
            />
            <OrderTable
                orders={orders}
                setOrders={setOrders}
                filterStatus={filterStatus}
            />
        </div>
    );
}
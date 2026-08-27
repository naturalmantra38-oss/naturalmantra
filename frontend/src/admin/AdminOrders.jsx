import React, { useState } from 'react';
import { DEFAULT_CURRENCY } from '../config';
import { Truck, Eye } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    {
      _id: 'ORD-984210',
      customer: { name: 'Rahul Sharma', mobile: '9876543210', city: 'Mohali', state: 'Punjab' },
      totalAmount: 520,
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      orderStatus: 'Shipped',
      trackingNumber: 'DEL-NM-9823412',
      createdAt: '2026-08-26T10:00:00.000Z',
      itemsCount: 2
    },
    {
      _id: 'ORD-984209',
      customer: { name: 'Priya Patel', mobile: '9812345678', city: 'Zirakpur', state: 'Punjab' },
      totalAmount: 340,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      orderStatus: 'Processing',
      trackingNumber: '',
      createdAt: '2026-08-27T08:30:00.000Z',
      itemsCount: 1
    }
  ]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o)));
  };

  const handleTrackingUpdate = (orderId, trackingNo) => {
    setOrders(orders.map((o) => (o._id === orderId ? { ...o, trackingNumber: trackingNo } : o)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif-heading text-white">Order Management</h2>
        <p className="text-xs text-gray-400">View customer orders, update order status & add shipment tracking numbers.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-soft">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-800/80 text-gray-300 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Order Status</th>
              <th className="p-4">AWB Tracking #</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-800/40">
                <td className="p-4 font-mono font-bold text-white">{order._id}</td>
                <td className="p-4">
                  <span className="font-bold block text-white">{order.customer.name}</span>
                  <span className="text-[11px] text-gray-400">{order.customer.city}, {order.customer.mobile}</span>
                </td>
                <td className="p-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4 font-bold text-brand-gold">{DEFAULT_CURRENCY}{order.totalAmount}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    order.paymentStatus === 'Paid' ? 'bg-green-950 text-green-300' : 'bg-amber-950 text-amber-300'
                  }`}>
                    {order.paymentMethod} ({order.paymentStatus})
                  </span>
                </td>
                <td className="p-4">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="p-1.5 bg-gray-800 border border-gray-700 rounded-lg text-xs text-white font-bold cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-4">
                  <input
                    type="text"
                    placeholder="Enter AWB #"
                    value={order.trackingNumber}
                    onChange={(e) => handleTrackingUpdate(order._id, e.target.value)}
                    className="p-1.5 bg-gray-800 border border-gray-700 rounded-lg text-xs text-white font-mono w-36"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;

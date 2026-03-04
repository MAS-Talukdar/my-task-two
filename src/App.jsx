import React, { useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
// Removed lucide-react import to resolve external dependency error

// Component to load external CSS via CDN link (including Font Awesome icons)
const ExternalStyles = () => (
  <>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/react-toastify/9.1.3/ReactToastify.css"
    />
    {/* Font Awesome for icons, replacing lucide-react, loaded via CDN */}
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      xintegrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  </>
);

// --- INITIAL DATA ---
const initialTicketsData = [
  {
    id: 1001,
    title: "Login Issues - Can't Access Account",
    description:
      "Customer is unable to log in to their account. They've tried resetting their password multiple times but still...",
    customer: "John Smith",
    priority: "High",
    status: "Open",
    createdAt: "1/15/2024",
  },
  {
    id: 1002,
    title: "Payment Failed - Card Declined",
    description:
      "Customer attempted to pay using Visa ending 1234 but the payment keeps failing despite sufficient balance.",
    customer: "Sarah Johnson",
    priority: "High",
    status: "Open",
    createdAt: "1/16/2024",
  },
  {
    id: 1003,
    title: "Unable to Download Invoice",
    description:
      "Customer cannot download their January invoice from the billing section. The download button is...",
    customer: "Michael Brown",
    priority: "Medium",
    status: "Open",
    createdAt: "1/17/2024",
  },
  {
    id: 1004,
    title: "Incorrect Billing Address",
    description:
      "Customer's billing address shows a different city. They updated it but it still displays the old one.",
    customer: "Emily Davis",
    priority: "Low",
    status: "Open",
    createdAt: "1/18/2024",
  },
  {
    id: 1005,
    title: "App Crash on Launch",
    description:
      "Customer reports that the mobile app crashes immediately upon trying to launch it. Tried re-installing several times.",
    customer: "David Wilson",
    priority: "High",
    status: "Open",
    createdAt: "1/19/2024",
  },
  {
    id: 1006,
    title: "Refund Not Processed",
    description:
      "Customer requested a refund two weeks ago but has not received any confirmation or money back.",
    customer: "Sophia Taylor",
    priority: "Medium",
    status: "Open",
    createdAt: "1/20/2024",
  },
  {
    id: 1007,
    title: "Two-Factor Authentication Issue",
    description:
      "Customer is not receiving 2FA codes on their registered phone number. Verified phone number is correct.",
    customer: "James Anderson",
    priority: "High",
    status: "Open",
    createdAt: "1/21/2024",
  },
  {
    id: 1008,
    title: "Unable to Update Profile Picture",
    description:
      'Customer tries to upload a new profile picture but gets "Upload failed" error. Image size is within limits.',
    customer: "Olivia Martinez",
    priority: "Low",
    status: "Open",
    createdAt: "1/22/2024",
  },
  {
    id: 1009,
    title: "Subscription Auto-Renewal",
    description:
      "Customer wants to enable auto-renewal for their subscription but the toggle is disabled in their settings.",
    customer: "Liam Thomas",
    priority: "Medium",
    status: "Open",
    createdAt: "1/23/2024",
  },
  {
    id: 1010,
    title: "Missing Order Confirmation Email",
    description:
      "Customer placed an order but didn't receive a confirmation email even though payment succeeded.",
    customer: "Isabella Garcia",
    priority: "Medium",
    status: "Open",
    createdAt: "1/24/2024",
  },
];
// --- COMPONENTS ---

// Navbar Component
const Navbar = () => (
  <nav className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        {/* Logo/Name */}
        <div className="flex-shrink-0 flex items-center">
          <span className="text-xl font-bold text-gray-900">CS</span>
          <span className="text-xl font-normal text-gray-700 ml-1">
            — Ticket System
          </span>
        </div>

        {/* Menu Items and New Ticket Button */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:ml-6 sm:flex sm:space-x-4 lg:space-x-8 text-sm font-medium">
            {["Home", "FAQ", "Changelog", "Blog", "Download", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md transition duration-150"
                >
                  {item}
                </a>
              ),
            )}
          </div>
          <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-300">
            <i className="fas fa-plus w-4 h-4 mr-1"></i>{" "}
            {/* Replaced Plus icon */}
            New Ticket
          </button>
          <button className="sm:hidden text-gray-500 hover:text-indigo-600 p-2 rounded-md">
            <i className="fas fa-bars w-6 h-6"></i> {/* Replaced Menu icon */}
          </button>
        </div>
      </div>
    </div>
  </nav>
);

// Banner Component
const Banner = ({ inProgressCount, resolvedCount }) => (
  <section className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-32">
        <p className="text-3xl font-bold">{inProgressCount}</p>
        <p className="text-lg mt-1 font-medium">In-Progress</p>
      </div>
      <div className="bg-green-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-32">
        <p className="text-3xl font-bold">{resolvedCount}</p>
        <p className="text-lg mt-1 font-medium">Resolved</p>
      </div>
    </div>
  </section>
);

// Ticket Card Component (Left Grid)
const TicketCard = ({ ticket, onSelectTicket }) => {
  const priorityClasses = {
    High: "bg-red-500 text-white", // Changed High to red for emphasis
    Medium: "bg-orange-500 text-white", // Changed Medium to orange
    Low: "bg-yellow-500 text-gray-800", // Changed Low to yellow
  };

  // Use a clearer mapping for High/Critical tickets (if we had Critical, it would be red/dark red)
  const priorityDisplay = ticket.priority.toUpperCase();

  const statusClasses = {
    Open: "bg-green-100 text-green-700",
    "InProgress-Queue": "bg-yellow-100 text-yellow-700",
    Resolved: "bg-gray-100 text-gray-700",
  };

  const displayStatus =
    ticket.status === "InProgress-Queue" ? "In-Progress" : ticket.status;

  // Use priorityClasses for background color, default to a neutral gray if priority not found
  const priorityBadgeClasses =
    priorityClasses[ticket.priority] || "bg-gray-400 text-white";

  return (
    <div
      // Only allow selection if the status is 'Open'
      onClick={() => ticket.status === "Open" && onSelectTicket(ticket.id)}
      className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition duration-300 flex flex-col ${
        // Apply visual distinction and restrict cursor if it's in the queue
        ticket.status === "Open"
          ? "hover:shadow-md cursor-pointer"
          : "opacity-80 cursor-not-allowed"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        {/* Priority element is at the top */}
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded ${priorityBadgeClasses}`}
        >
          {priorityDisplay} PRIORITY
        </span>

        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusClasses[ticket.status] || statusClasses["Open"]}`}
        >
          {displayStatus}
        </span>
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">
        {ticket.title}
      </h3>
      <p className="text-gray-500 text-sm mb-3 line-clamp-2">
        {ticket.description}
      </p>
      <div className="mt-auto flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <p className="font-semibold text-gray-700">#{ticket.id}</p>
          <div className="w-px h-3 bg-gray-300"></div>
          <p>{ticket.customer}</p>
        </div>
        <p>{ticket.createdAt}</p>
      </div>
    </div>
  );
};
// Task Status Component (Right Sidebar)
const TaskStatus = ({
  inProgressTickets,
  onCompleteTicket,
  onRemoveTicket,
  recentlyResolvedTicket,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 sticky top-4 border border-gray-200">
    <h2 className="text-lg font-bold text-gray-800 mb-2">Task Status</h2>
    <p className="text-sm text-gray-500 mb-6">
      Select a ticket to Add to Task Status
    </p>

    {inProgressTickets.length === 0 ? (
      <div className="text-center py-4 text-gray-400 bg-gray-50 rounded-md mb-6 border border-dashed border-gray-200">
        <p className="text-sm">No tasks in progress.</p>
        <p className="text-xs mt-1">Add tickets from the left to start.</p>
      </div>
    ) : (
      <ul className="space-y-3 mb-6">
        {inProgressTickets.map((ticket) => (
          <li
            key={ticket.id}
            className="border border-gray-100 p-3 rounded-md bg-white shadow-sm flex justify-between items-center"
          >
            <div className="flex flex-col flex-grow">
              <p className="font-semibold text-gray-800 text-sm line-clamp-1">
                {ticket.title}
              </p>
              <p className="text-xs text-gray-500">
                #{ticket.id} - {ticket.customer}
              </p>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onCompleteTicket(ticket.id)}
                className="flex items-center bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-green-600 transition duration-150"
              >
                <i className="fas fa-check-circle w-3 h-3 mr-1" />{" "}
                {/* Replaced CheckCircle icon */}
                Complete
              </button>
              <button
                onClick={() => onRemoveTicket(ticket.id)}
                className="text-gray-400 hover:text-gray-600 transition duration-150"
                title="Remove from queue"
              >
                <i className="fas fa-times-circle w-4 h-4" />{" "}
                {/* Replaced XCircle icon */}
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}

    <h2 className="text-lg font-bold text-gray-800 mb-2 mt-8 border-t pt-6">
      Resolved Task
    </h2>
    {recentlyResolvedTicket ? (
      <div className="bg-green-50 p-4 rounded-md border border-green-200 flex items-center shadow-sm">
        <i className="fas fa-check-circle w-5 h-5 text-green-600 mr-3 flex-shrink-0" />{" "}
        {/* Replaced CheckCircle icon */}
        <div>
          <p className="font-semibold text-green-800 text-sm">
            #{recentlyResolvedTicket.id} {recentlyResolvedTicket.title}
          </p>
          <p className="text-xs text-green-700">Resolved by you!</p>
        </div>
      </div>
    ) : (
      <div className="text-center py-4 text-gray-400 bg-gray-50 rounded-md border border-dashed border-gray-200">
        <p className="text-sm">No resolved tasks yet.</p>
      </div>
    )}
  </div>
);

export default App;

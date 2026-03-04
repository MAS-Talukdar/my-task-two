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
export default App;

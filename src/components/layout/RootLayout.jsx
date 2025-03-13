import React from "react";
import Navbar from "../header/Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { useNetworkState } from "react-use";
import NetworkStatus from "../../utils/NetworkStatus";

// createa a header on this page
const RootLayout = () => {
  const { online } = useNetworkState();
  if (!online) {
    return <NetworkStatus />;
  }
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default RootLayout;

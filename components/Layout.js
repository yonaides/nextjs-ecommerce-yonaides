import React from "react";
import Navbar from "./Navbar";
import Notify from "./Notify";
import Modal from './Modal';

export default function Layout({ children }) {
  return (
    <div className="container">
      <Navbar />
      <Notify/>
      <Modal/>
      {children}
    </div>
  );
}

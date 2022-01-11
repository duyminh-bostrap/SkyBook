import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import Footer from '../components/footer/footer';


const LayoutWebsite: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default LayoutWebsite;

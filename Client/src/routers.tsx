import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/layoutAdmin";
import LayoutWebsite from "./layouts/layoutWebSite";
import Addauthor from "./pages/admin/author/addauthor";
import Author from "./pages/admin/author/author";
import Addbook from "./pages/admin/book/addbook";
import Book from "./pages/admin/book/book";
import Home from "./pages/home/home";
import AuthorPage from './pages/author/authorPage';

import ProductDetail from "./components/productDetail/productDetail";
import Editbook from "./pages/admin/book/editbook";
import Login from "./pages/auth/login";
import Editauthor from "./pages/admin/author/editauthor";
import User from './pages/admin/user/user';
import Register from "./pages/auth/register";
import Blog from "./pages/blog/blog";
import Shop from "./pages/shop/shop";
import Audiobook from "./pages/audiobook/audiobook";
import ChilrenBooks from "./pages/chilren-books/chilren-books";
import Usedbooks from './pages/usedbooks/usedbooks';
import Concact from "./pages/concact/concact";
import About from "./pages/about/about";
import Cart from "./pages/cart/cart";
import CartAdmin from './pages/admin/cart/cartAdmin';
import CartDetail from './pages/admin/cart/cartDetail';
import History from "./pages/user/history/history";
import HistoryDetail from "./pages/user/history/historyDetail";
import UserPage from './pages/user/user';
import Profile from "./pages/user/profile/profile";



type Props = {

};

const Router: React.FC<Props> = (props) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<Home />} />
          <Route path=":slugCate/*">
            <Route index element={<AuthorPage />} />
            <Route path=":slugProduct" element={<ProductDetail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/audiobooks" element={<Audiobook />} />
          <Route path="/chilren-books" element={<ChilrenBooks />} />
          <Route path="/usedbooks" element={<Usedbooks />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Concact />} />
          
          <Route path="/user/*" element={<UserPage />}>
            <Route index element={<Navigate to="profile" />}/>
            <Route path="profile" element={<Profile />} />
            <Route path="history" element={<History />} />
            <Route path="history/:id" element={<HistoryDetail />} />
          </Route>    
        </Route>

        <Route path="admin/*" element={<LayoutAdmin />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="cart" element={<CartAdmin />} />
          <Route path="cartDetail/:id" element={<CartDetail />} />
          <Route path="dashboard" element={<div>Admin Dashboard</div>} />
          <Route path="user" element={<User />} />
          <Route path="authors" element={<Author />} />
          <Route path="addauthor" element={<Addauthor />} />
          <Route path="editauthor/:slug" element={<Editauthor />} />
          <Route path="books" element={<Book />} />
          <Route path="addbook" element={<Addbook />} />
          <Route path="editbook/:slug" element={<Editbook />} />
        </Route>
      </Routes>
    </div>
  );
};
export default Router;

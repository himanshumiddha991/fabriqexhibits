import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import About from "./pages/About";
import Clients from "./pages/Clients";
import Process from "./pages/Process";
import Login from "./pages/admin/Login";
import AdminHome from "./pages/admin/AdminHome";
import Blogs from "./pages/admin/Blogs";
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogEdit from "./pages/admin/BlogEdit";
import BlogDetail from "./pages/BlogDetail";
import Gallary from "./pages/admin/Gallary";
import GallaryCreate from "./pages/admin/GallaryCreate";
import Testimonial from "./pages/admin/Testimonial";
import TestimonialCreate from "./pages/admin/TestimonialCreate";
import ContactCollection from "./pages/admin/ContactCollection";
import GetContact from "./pages/admin/GetContact";
import ExihibitionStands from "./pages/ExihibitionStands";
import Portfolio from "./pages/Portfolio";
import Gallery from "./pages/Gallery";
import ServiceDetail from "./pages/ServiceDetail";
import { loadGalleryWithCache } from "./redux/services/galleryService";
import { loadTestimonialWithCache } from "./redux/services/testimonialService";
import Career from "./pages/Career";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGalleryWithCache());
    dispatch(loadTestimonialWithCache());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/process" element={<Process />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/exhibition-stands" element={<ExihibitionStands />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Route>

      {/* Login without header/footer */}
      <Route path="/login" element={<Login />} />

      {/* Admin Layout */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/blogs" element={<Blogs />} />
        <Route path="/admin/blog/:slug" element={<BlogEdit />} />
        <Route path="/admin/blog/create-blog" element={<BlogEdit />} />
        <Route path="/admin/gallary" element={<Gallary />} />
        <Route path="/admin/gallary/create" element={<GallaryCreate />} />
        <Route path="/admin/gallary/:id" element={<GallaryCreate />} />

        <Route path="/admin/testimonial" element={<Testimonial />} />
        <Route
          path="/admin/testimonial/create"
          element={<TestimonialCreate />}
        />
        <Route path="/admin/testimonial/:id" element={<TestimonialCreate />} />
        <Route path="/admin/contact" element={<ContactCollection />} />
        <Route path="/admin/contact/:id" element={<GetContact />} />
      </Route>
    </Routes>
  );
}

export default App;


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import AdminLayout2 from "layouts/Admin/Admin2.js";
import RTLLayout from "layouts/RTL/RTL.js";
import Login from "layouts/Login/Login.js";
import Signup from "layouts/Signup/Signup";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";




const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
<ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
    
        <Routes>
          <Route path="Login" element={<Login/>} /> 
          <Route path="Signup" element={<Signup/>} /> 
          <Route path="/admin/*" element={<AdminLayout/>} />     
                 
          <Route path="/rtl/*" element={<RTLLayout />} />
         
          </Routes> 
          </BrowserRouter>
        </BackgroundColorWrapper>
</ThemeContextWrapper> 
  
  )


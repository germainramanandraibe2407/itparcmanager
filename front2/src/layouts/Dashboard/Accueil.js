import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import AdminLayout2 from "layouts/Admin/Admin2.js";
import RTLLayout from "layouts/RTL/RTL.js";
import Login from "layouts/Login/Login.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


import BackgroundColorWrapper from "../../components/BackgroundColorWrapper/BackgroundColorWrapper";
/*../../components/BackgroundColorWrapper */


export function Acceuil(){
    return(
        <BackgroundColorWrapper>
        <BrowserRouter>
      
          <Routes>
                <Route path="/admin/*" element={<AdminLayout2 />} />     
             
            <Route path="/rtl/*" element={<RTLLayout />} />
            <Route
              path="*"
              element={<Navigate to="/admin/dashboard" replace />}
            />
         
            </Routes> 
            </BrowserRouter>
          </BackgroundColorWrapper>
   
    )
}
 export default Acceuil;
   
   
    /* <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
    
        <Routes>
              <Route path="/admin/*" element={<AdminLayout2 />} />     
           
          <Route path="/rtl/*" element={<RTLLayout />} />
          <Route
            path="*"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          admin/dashboard
          </Routes> 
          </BrowserRouter>
        </BackgroundColorWrapper>
      </ThemeContextWrapper> */
   
  
  


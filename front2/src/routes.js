
import Dashboard from "views/Dashboard.js";
import Icons from "views/AfficheMateriels";
import AjoutMateriels from "views/AjoutMateriels";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import AfficheMateriels from "views/AfficheMateriels";
import Login from "layouts/Login/Login";
import Signup from "layouts/Signup/Signup";
import Acceuil from "layouts/Dashboard/Accueil";


    if (localStorage.getItem("token")){
      let tokenLocal = JSON.parse(localStorage.getItem("token"))
    


  if (tokenLocal.role !="administrateur"  ){
    
var routes = [
  {
    path: "/dashboard",
    name: "materiels",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <AfficheMateriels />,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "demande de materiel",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: <Notifications />,
    layout: "/admin",
  },
   {
    path: "/user-profile",
    name: "mes demandes",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },

] 
  
  }else{
    
var routes = [
  

  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/AfficheMateriels",
    name: "Inventaire des Materiels",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: <AfficheMateriels />,
    layout: "/admin",
  },
  {
    path: "/AjoutMateriels",
    name: "Entrée de materiel",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: <AjoutMateriels/>,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Sortie des materiels",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: <Notifications />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Suivi des mouvements",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
  
  {
    path: "/tables",
    name: "Gestion des utilisateurs",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "historiques",
    rtlName: "طباعة",
    icon: "tim-icons icon-align-center",
    component: <Typography />,
    layout: "/admin",
  }
  
];
  }}
 
export default routes;



// nodejs library that concatenates classes
import classNames from "classnames";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API_IP from "views/config";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
let materiel = JSON.parse(localStorage.getItem("materiels")), tokenLocal = JSON.parse(localStorage.getItem("token"))
function AdminNavbar(props) {
  const navigate = useNavigate();
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  useEffect(() => {
    axios.get(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/nbrdemande`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [])

  axios.get(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/statut`)
  .then(res => setData2(res.data))
  .catch(err => console.log(err));
 
    

  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  function handleclick() {
   localStorage.removeItem("token")
    
    navigate('../Login', { replace: true })
  }

  function handleclick2() {
    navigate('../admin/user-profile', { replace: true })
  }

  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>

              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                >
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">

                    </DropdownItem>
                  </NavLink>

                </DropdownMenu>
              </UncontrolledDropdown>


              {data.map((mouvements, index) => {
                return (
                  <>
                     {tokenLocal.role == "administrateur" &&
                          (
                    <UncontrolledDropdown nav>
                      <DropdownToggle
                        caret
                        color="default"
                        nav
                        onClick={(e) => e.preventDefault()}
                      >

                       <div className="photo">
                            {
                              mouvements.nbr ?
                                (<img alt="..." style={{height:"100%"}} src={require("assets/img/Z17w.gif")} />

                                ) :
                                (<img alt="..." src={require("assets/img/bell-black.gif")} />)}
                          </div>
                        <b className="caret d-none d-lg-block d-xl-block" />
                        <p className="d-lg-none">demande d'aquisition de materiel</p>
                      </DropdownToggle>

                      <DropdownMenu className="dropdown-navbar" right tag="ul">
                        <DropdownItem divider tag="li" />
                        <NavLink tag="li">
                        
                          <DropdownItem className="nav-item" onClick={handleclick2}>demande d'aquisition de materiel</DropdownItem>
                        </NavLink>
                      </DropdownMenu>
                    </UncontrolledDropdown>)
                        }
                   </> 
                    )})}
                   
                  
                
                    <UncontrolledDropdown nav>
                      
                    {tokenLocal.role == "administrateur" &&
                          (
                      <DropdownToggle
                        caret
                        color="default"
                        nav
                        onClick={(e) => e.preventDefault()}
                      >
                        {data2.map ((mouv,index)=>{ return(
                         <div className="photo">
                            {
                              mouv.statut?
                                (<img style={{height:"100%"}} alt="..." src={require("assets/img/Z17w.gif")} />

                                ) :
                                (<img alt="..." src={require("assets/img/bell-black.gif")} />)}
                          </div>)
                            })}

                        <b className="caret d-none d-lg-block d-xl-block" />
                        <p className="d-lg-none">demande retour de materiel</p>
                      </DropdownToggle>)}
          
                      <DropdownMenu className="dropdown-navbar" right tag="ul">
                        <DropdownItem divider tag="li" />
                        <NavLink tag="li">
                          <DropdownItem className="nav-item" onClick={handleclick2}>demande retour de materiel</DropdownItem>
                        </NavLink>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  
                   
               


              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img alt="..." src={require("assets/img/anime3.png")} />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  
                  
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>

                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" >{tokenLocal.nom} {tokenLocal.prenom}</DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" onClick={handleclick}>se deconnecter</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder="rechercher materiel" type="text" />
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
}

export default AdminNavbar;

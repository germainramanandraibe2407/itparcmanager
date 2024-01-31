

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import Swal from "sweetalert2";
import API_IP from "./config";
 
if (!localStorage.getItem("materiels")){
  localStorage.materiels= JSON.stringify({
    categorie: "",
    code: "",
    marque: "", 
     })
}


{/*ajout de mouvement dse sortie*/ }
let materiel= JSON.parse(localStorage.getItem("materiels")),tokenLocal = JSON.parse(localStorage.getItem("token"))
function UserProfile() {
 
 
  
 


  const [values, setValues] = useState({
    Nom: tokenLocal.nom,
    Prenom: tokenLocal.prenom,
    occupation: '',
    Categorie: materiel.categorie,
    Marque: materiel.marque,
    IdentifiantMat:materiel.code,
    dateutilisation: ''

        })
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    

    axios.post(`http://${API_IP}:3000/api/Mouvement`, values)
      .then(
        res => console.log(res));
        let tokenLocal = JSON.parse(localStorage.getItem("token")
      
      )
      if(tokenLocal && values.IdentifiantMat){
        axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/ajouthistoriques`,
        ({ nom:tokenLocal.nom,prenom:tokenLocal.prenom,action:`demande de materiels ${values.IdentifiantMat}`}))
      }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'demande de materiel envoyé',
          showConfirmButton: false,
          timer: 150000
        })
        localStorage.removeItem("materiels")
        navigate('../user-profile', { replace: true }) 
      //atao eto redirection  
      window.location.reload();
      
      
  }
  
  return (


    
      <>
      {(localStorage.getItem("materiels") )?(
        
          
        
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                  <Row>
                        <Col className="pr-md-1" md="6">
                            <h5 className="title">Demandeur</h5>
                        </Col>
                        <Col className="pr-md-1" md="6">
                            <h5 className="title">Materiel</h5>
                        </Col>
                  </Row>      
               </CardHeader>
               <CardBody>
                     <Row>
                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label>Nom</label>
                              <Input
                              required
                                defaultValue={tokenLocal.nom}
                                placeholder=""
                                type="text"
                                onChange={e => setValues({ ...values, Nom: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-1" md="6">
                            <FormGroup>
                              <label>nom du materiel</label>
                              <Input
                              required
                                defaultValue= {materiel.categorie}
                            
                                type="text"
                                onChange={e => setValues({ ...values, Categorie: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                      </Row>
                      <Row>
                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label>prenom</label>
                              <Input
                              required
                                defaultValue={tokenLocal.prenom}
                                placeholder=""
                                type="text"
                                onChange={e => setValues({ ...values, Prenom: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-1" md="6">
                            <FormGroup>
                              <label>Marque</label>
                              <Input
                              required
                                defaultValue={materiel.marque}
                                placeholder=""
                                type="text"
                                onChange={e => setValues({ ...values,Marque : e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                      </Row>
                      <Row>
                          <Col className="pr-md-1" md="6">
                            
                          <FormGroup>
                              <label>date d'utilisation</label>
                              <Input
                                defaultValue=""
                                placeholder=""
                                type="date"
                                required
                                onChange={e => setValues({ ...values,dateutilisation: e.target.value })}
                              />
                            </FormGroup>


                          </Col>
                          <Col className="pl-md-1" md="6">
                            <FormGroup>
                              <label>identification du materiel</label>
                              <Input
                              required
                                defaultValue={materiel.code}
                                placeholder="xxx"
                                type="text"
                                onChange={e => setValues({ ...values, IdentifiantMat: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                      </Row>
                      <Row>
                          <Col className="pr-md-1" md="6">
                          
                          </Col>
                         
                      </Row>
              </CardBody>
              <CardFooter>
             
                 
                
                <button class="btn btn-success btn-rounded" type="submit">
                  Valider 
                </button>
              </CardFooter>
            </form>
            </Card>
          </Col>

          {/*materiel*/}

          
        </Row>
      </div>
      ):     
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                  <Row>
                        <Col className="pr-md-1" md="6">
                            <h5 className="title">Demandeur</h5>
                        </Col>
                        <Col className="pr-md-1" md="6">
                            <h5 className="title">Materiel</h5>
                        </Col>
                  </Row>      
               </CardHeader>
               <CardBody>
                     <Row>
                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label>Nom</label>
                              <Input
                              required
                                defaultValue={tokenLocal.nom}
                                placeholder=""
                                type="text"
                                onChange={e => setValues({ ...values, Nom: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-1" md="6">
                            <FormGroup>
                              <label>nom du materiel</label>
                              <Input
                             
                              required
                                type="text"
                                onChange={e => setValues({ ...values, Categorie: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                      </Row>
                      <Row>
                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label>prenom</label>
                              <Input
                              required
                                defaultValue={tokenLocal.prenom}
                                placeholder=""
                                type="text"
                                onChange={e => setValues({ ...values, Prenom: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-1" md="6">
                            <FormGroup>
                              <label>Marque</label>
                              <Input
                               required
                                placeholder=""
                                type="text"
                                onChange={e => setValues({ ...values,Marque : e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                      </Row>
                      <Row>
                          <Col className="pr-md-1" md="6">
                            
                          <FormGroup>
                              <label>date d'utilisation</label>
                              <Input
                              
                                defaultValue=""
                                placeholder=""
                                type="date"
                                required
                                onChange={e => setValues({ ...values,dateutilisation: e.target.value })}
                              />
                            </FormGroup>


                          </Col>
                          <Col className="pl-md-1" md="6">
                            <FormGroup>
                              <label>identification du materiel</label>
                              <Input
                              required
                                placeholder="xxx"
                                type="text"
                                onChange={e => setValues({ ...values, IdentifiantMat: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                      </Row>
                      <Row>
                          <Col className="pr-md-1" md="6">
                          
                          </Col>
                         
                      </Row>
              </CardBody>
              <CardFooter>
             
                 
                
                <button class="btn btn-success btn-rounded"   type="submit">
                  Valider 
                </button>
              </CardFooter>
            </form>
            </Card>
          </Col>

          {/*materiel*/}

          
        </Row>
      </div>  

      
      
}
    </>
    



   
    
  );
}

export default UserProfile;

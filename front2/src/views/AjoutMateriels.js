
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
import { Aos } from "aos";
import { backgroundColors } from "contexts/BackgroundColorContext";
import { height } from "@mui/system";

let tokenLocal = JSON.parse(localStorage.getItem("token"));
function AjoutMateriels() {

  const [values, setValues] = useState({
    groupe: 'E',
    famille: 'AUDIOVISUEL',
    categorie: 'Ecran',
    marque: '',
    status: 'libre',
    etat: 'actif',
    fournisseur: '',
    prixmateriel: '',
    dateinventaire: '',
    numerofacture: '',
    region: 'RALM',
    nomconsommable: '',
    numero:'',
    texte:''

  })

  
 
 

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://${API_IP}:3000/api/ajoutmateriel`, values)
      .then(
        res => console.log(res));
        let tokenLocal = JSON.parse(localStorage.getItem("token")
      
      )
      if(tokenLocal){
        axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/ajouthistoriques`,
        ({ nom:tokenLocal.nom,prenom:tokenLocal.prenom,action:`ajout materiels`}))
      }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'materiel ajouté avec succes',
          showConfirmButton: false,
          timer: 150000
        })
        
        navigate('../AfficheMateriels', { replace: true })
        window.location.reload();
  }

  return (
    <>

      <div className="content">

        <Row>
          <Col md="6">
            <Card>
              <CardHeader>

                <h5 className="title">Ajout de nouveau materiel</h5>
               
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardBody>

               
                      
                  <label>famille</label><br />
                  <select onChange={e => setValues({ ...values, famille: e.target.value })}  >
                    <option value="ORDINATEUR">ORDINATEUR</option>
                    <option value="TELECOMMUNICATION">TELECOMMUNICATION</option>
                    <option selected value="RESEAUX">RESEAUX</option>
                    <option value="ACCESSOIRE">ACCESSOIRE</option>
                    <option value="LOGICIEL">LOGICIEL</option>
                    <option selected value="AUDIOVISUEL">AUDIOVISUEL</option>
                    <option value="CONSOMMABLE">CONSOMMABLE</option>
                  </select>

                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <option>materiel</option>
                          <select onChange={e => setValues({ ...values, categorie: e.target.value })}>
                           <optgroup label='Ordinateur'>
                            <option selected value="Ecran">Ecran</option>
                            <option value="Uc">Uc</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Onduleur">Onduleur</option>
                            <option value="Imprimante">Imprimante</option>
                            <option value="Videoprojecteur">Videoprojecteur</option>
                           
                          </optgroup>
                          <optgroup label='accessoire'>
                              <option value="Souris">Souris</option>
                              <option value="Clavier">Clavier</option>
                              <option value="Micro casque">Micro casque</option>
                              <option value="Micro">Micro</option>
                              <option value="Tapis souris">Tapis souris</option>
                          </optgroup>
                          <optgroup label='telecommunication'>
                              <option value="Telephone fixe">Telephone fixe</option>
                              <option value="Telephone">Telephone</option>
                              <option value="Tablette">Tablette</option>
                              <option value="Smartphone">Smartphone</option>
                              <option value="PABX">PABX</option>
                              <option value="GPS">GPS</option>
                          </optgroup>
                          <optgroup label='reseau'>
                              <option value="SW">SW</option>
                              <option value="AP">AP</option>
                              <option value="RT">RT</option>
                              <option value="Box Internet">Box Internet</option>
                          </optgroup>
                          <optgroup label='audiovisuel'>
                              <option value="Camera Compact">Camera Compact</option>
                          </optgroup>
                          <optgroup label='consommable'>
                              <option value="License">LICENSE</option>
                              <option value="Cartouche d'encre">Cartouche d'encre</option>
                              <option value="Ecouteur">Ecouteur</option>
                          </optgroup>
                       </select>
                      </FormGroup>
                      <label>numero</label>
                      <Input
                        defaultValue="null"
                        placeholder="xxx"
                        type="number"
                        onChange={e => setValues({ ...values, numero: e.target.value })}
                      />
                       
                        <label>Groupe</label> <br/ >
                        <select onChange={e => setValues({ ...values, groupe: e.target.value })}>
                            <option value="C">radio et télécommunication</option>
                            <option value="I">Enginneering</option>
                            <option selected value="E">information et technologie </option>
                           
                       </select>

                      {<br/>}
                      <label>marque</label>
                      
                      <Input
                        defaultValue=""
                        placeholder="sony,hp,..."
                        type="text"
                        onChange={e => setValues({ ...values, marque: e.target.value })}
                      />
                     


                    </Col>
                    <Col md="12" >
                    </Col>
                  </Row>

                      <label>état</label><br />
                      <select required onChange={e => setValues({ ...values, etat: e.target.value })}>
                        <option selected value="bon">bon</option>
                        <option value="moyen">moyen</option>
                        <option value="hors usage">hors usage</option>
                      </select>
                    <div>
                     <label>localisation</label><br />
                      <select onChange={e => setValues({ ...values, region: e.target.value })}>
                        <option value="RALM">Alaotra Mangoro</option>
                        <option value="RAMM">Amoron'i Mania</option>
                        <option value="RANA">Analamanga</option>
                        <option value="RANJ">Analanjorofo</option>
                        <option value="RAND">Androy</option>
                        <option value="RANO">Anosy</option>
                        <option value="RATN">Atsimo Andrefana</option>
                        <option value="RATA">Atsimo Atsinanana</option>
                        <option value="RATS">Atsinanana</option>
                        <option value="RBET">Betsiboka</option>
                        <option value="RBOE">Boeny</option>
                        <option value="RBON">Bongolava</option>
                        <option value="RDIA">Diana</option>
                        <option value="RIHO">Ihorombe</option>
                        <option value="RITA">Itasy</option>
                        <option value="RHAM">Mahatsiatra Ambony</option>
                        <option value="RMEL">Melaky</option>
                        <option value="RMEN">Menabe</option>
                        <option value="RSAV">Sava</option>
                        <option value="RSOF">SOFIA</option>
                        <option value="RVAK">Vakinakaratra</option>
                        <option value="VATO">Vatovavy</option>
                        <option value="FITO">FITOVINANY</option>
                      </select>

                    </div>
                      
                </CardBody>
                <CardFooter>
                  <button className="btn" style={{backgroundColor:'red'}} type="submit">
                    enregistrer
                  </button>

                </CardFooter>
              </form>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardBody>
          <label>date inventaire</label>
                      <Input
                        defaultValue=""
                        placeholder=""
                        type="date"
                        onChange={e => setValues({ ...values, dateinventaire: e.target.value })}
                      />
                      <div>
                           <label>status</label><br></br>
                           <select onChange={e => setValues({ ...values, status: e.target.value })}>
                                <option value="libre">libre</option>
                                <option value="utilisé">utilisé</option>     
                          </select>
                      </div>
                     
                       {<br/>}
                      <label>nom consommable</label>
                      <Input
                        defaultValue=""
                        placeholder="encre,..."
                        type="text"
                        onChange={e => setValues({ ...values, nomconsommable: e.target.value })}
                      />

                      <label>fournisseur</label>
                      <Input
                        defaultValue=""
                        placeholder="don chine,achat,..."
                        type="text"
                        onChange={e => setValues({ ...values, fournisseur: e.target.value })}
                      />

                      <label>prix du materiel en ariary</label>
                      <Input
                        defaultValue="0"
                        placeholder="en ariary"
                        type="number"
                        onChange={e => setValues({ ...values, prixmateriel: e.target.value })}
                      />

                      <label>numero bon de livraison</label>
                      <Input
                        defaultValue="null"
                        placeholder=""
                        type="number"
                        onChange={e => setValues({ ...values, numerofacture: e.target.value })}
                      />
                      <label>commentaire</label>
                      <Input
                        style={{height:100}}
                        defaultValue=""
                        placeholder=""
                        type="text"
                        onChange={e => setValues({ ...values, texte: e.target.value })}
                      />
            </CardBody>
          </Card>
          </Col>

        </Row>
      </div>
    </>
  );
}

export default AjoutMateriels;

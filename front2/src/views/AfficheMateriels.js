
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// reactstrap components

import {   Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Input, } from "reactstrap";
import Swal from "sweetalert2";
import API_IP from "./config";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import { read, utils, writeFile } from 'xlsx';
//import
import XLSX from 'xlsx';

import dayjs, { Dayjs } from "dayjs";
import { alertClasses } from "@mui/material";
import { CardFooter, FormGroup, Modal } from "react-bootstrap";
import { Public } from "@mui/icons-material";
import './style.css'

// function Changer (){
//   Swal.fire({
//     title: 'Do you want to save the changes?',
//     showDenyButton: true,
//     showCancelButton: true,
//     confirmButtonText: 'Save',
//     denyButtonText: `Don't save`,
//   }).then((result) => {
//     /* Read more about isConfirmed, isDenied below */
//     if (result.isConfirmed) {
//       Swal.fire('Saved!', '', 'success')
//     } else if (result.isDenied) {
//       Swal.fire('Changes are not saved', '', 'info')
//     }
//   })
// }


let tokenLocal = JSON.parse(localStorage.getItem("token"));
let a="";
let totalmat = JSON.parse(localStorage.getItem("totalmat"))
function videur1(){

  if (totalmat && totalmat.groupe){
    let a=totalmat.groupe
    return a}
    else{
    return ""
  }
} 
function videur2(){

  if (totalmat && totalmat.famille){
    a=totalmat.famille
    return a}
    else{
    return ""
  }
} 
function videur3(){

  if (totalmat && totalmat.categorie){
    a=totalmat.categorie
    return a}
    else{
    return ""
  }
} 
function videur4(){

  if (totalmat && totalmat.marque){
    a=totalmat.marque
    return a}
    else{
    return ""
  }
} 
function videur5(){

  if (totalmat && totalmat.statuse){
    a=totalmat.statuse
    return a}
    else{
    return ""
  }
} 
function videur6(){

  if (totalmat && totalmat.etat){
    a=totalmat.etat
    return a}
    else{
    return ""
  }
} 
function videur7(){

  if (totalmat && totalmat.fournisseur){
    a=totalmat.fournisseur
    return a}
    else{
    return ""
  }
} 
function videur8(){

  if (totalmat && totalmat.prixmateriel){
    a=totalmat.prixmateriel
    return a}
    else{
    return ""
  }
} 
function videur9(){

  if (totalmat && totalmat.dateinventaire){
    a=dayjs(totalmat.dateinventaire).format("YYYY/MM/DD")
    return a}
    else{
    return ""
  }
} 
function videur10(){

  if (totalmat && totalmat.numerofacture){
    a=totalmat.numerofacture
    return a}
    else{
    return ""
  }
} 
function videur11(){

  if (totalmat && totalmat.region){
    a=totalmat.region
    return a}
    else{
    return ""
  }
} 
function videur12(){

  if (totalmat && totalmat.numero){
    a=totalmat.numero
    return a}
    else{
    return ""
  }
} 
function videur13(){

  if (totalmat && totalmat.texte){
    a=totalmat.texte
    return a}
    else{
    return ""
  }
} 
function videur14(){

  if (totalmat && totalmat.idmat){
    a=totalmat.idmat
    return a}
    else{
    return ""
  }
} 

function MyVerticallyCenteredModal(props) {
  let totalmat = JSON.parse(localStorage.getItem("totalmat"))  

  

  const [values, setValues] = useState({
    groupe: videur1(),
    famille: videur2(),
    categorie:videur3(),
    marque: videur4(),
    status: videur5(),
    etat: videur6(),
    fournisseur:videur7(),
    prixmateriel:videur8(),
    dateinventaire: videur9(),
    numerofacture: videur10(),
    region: videur11(),
    nomconsommable: '',
    numero:videur12(),
    texte:videur13(),
    id :videur14()
  })
 
//alert(`${values.id}`)

  const navigate = useNavigate();
  let tokenLocal = JSON.parse(localStorage.getItem("token"));
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://${API_IP}:3000/api/ajoutmateriel/edit`, values)
      .then(
        
        Swal.fire ({
          position: 'center',
          icon: 'success',
          title: 'materiel modifié avec succes',
          showConfirmButton: false,
          timer: 15000
        }),
        
        axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/ajouthistoriques`,
        ({ nom:tokenLocal.nom,prenom:tokenLocal.prenom,action:`modification materiels ${totalmat.code}`}),
      
      )
      )
  
   
      
        navigate('../AfficheMateriels', { replace: true })
        localStorage.removeItem("totalmat");
            window.location.reload();
          
      
  }
  return (


   (localStorage.getItem("totalmat"))&&( <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      top
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
    
      <Row>
          <Col md="6">
            <Card>
              <CardHeader>

                <h5 className="title">Ajout de nouveau materiel</h5>
               
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardBody>

               
                      
                  <label>famille</label><br />
                  <select defaultValue={totalmat.famille}  onChange={e =>{{ setValues({ ...values,
                  region: totalmat.region,
                  groupe: totalmat.groupe,
                  famille: e.target.value,
                  categorie:totalmat.categorie,
                  marque: totalmat.marque,
                  status: totalmat.statuse,
                  etat: totalmat.etat,
                  fournisseur:totalmat.fournisseur,
                  prixmateriel:totalmat.prixmateriel,
                  dateinventaire: totalmat.dateinventaire,
                  numerofacture: totalmat.numerofacture,     
                  nomconsommable: '',
                  numero:totalmat.numero,
                  texte:totalmat.texte,
                  id :totalmat.idmat})
                    
                  let credential = {
                    idmat:totalmat.idmat,
                    code: totalmat.code,
                    groupe: totalmat.groupe,
                    famille: e.target.value,
                    categorie:totalmat.categorie,
                    marque:totalmat.marque,
                    statuse:totalmat.statuse,
                    etat:totalmat.etat,
                    fournisseur:totalmat.fournisseur,
                    prixmateriel:totalmat.prixmateriel,
                    dateinventaire:totalmat.dateinventaire,
                    region:totalmat.region,
                    numerofacture:totalmat.numerofacture,
                    numero:totalmat.numero,
                    texte:totalmat.texte
                  }
                  localStorage.totalmat = JSON.stringify(credential)
                  };
                   
                   //setValues({ ...values, groupe:groupe })
                 
             
                    
                }
                  
                  } required>
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
                          <select defaultValue={totalmat.categorie} onChange={e =>{setValues({ ...values,
                          region: totalmat.region,
                       groupe: totalmat.groupe,
                       famille: totalmat.famille,
                       categorie:e.target.value,
                       marque: totalmat.marque,
                       status: totalmat.statuse,
                       etat: totalmat.etat,
                       fournisseur:totalmat.fournisseur,
                       prixmateriel:totalmat.prixmateriel,
                       dateinventaire: totalmat.dateinventaire,
                       numerofacture: totalmat.numerofacture,     
                       nomconsommable: '',
                       numero:totalmat.numero,
                       texte:totalmat.texte,
                       id :totalmat.idmat })
                       
                    
                       let credential = {
                         idmat:totalmat.idmat,
                         code: totalmat.code,
                         groupe: totalmat.groupe,
                         famille: totalmat.famille,
                         categorie:e.target.value,
                         marque:totalmat.marque,
                         statuse:totalmat.statuse,
                         etat:totalmat.etat,
                         fournisseur:totalmat.fournisseur,
                         prixmateriel:totalmat.prixmateriel,
                         dateinventaire:totalmat.dateinventaire,
                         region:totalmat.region,
                         numerofacture:totalmat.numerofacture,
                         numero:totalmat.numero,
                         texte:totalmat.texte
                       }
                       localStorage.totalmat = JSON.stringify(credential)
                       }}>
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
                        defaultValue= {totalmat.numero}
                        value= {totalmat.numero}
                        placeholder="xxx"
                        type="number"
                        onChange={e =>{ setValues({ ...values, 
                          region: totalmat.region,
                          groupe: totalmat.groupe,
                          famille: totalmat.famille,
                          categorie:totalmat.categorie,
                          marque: totalmat.marque,
                          status: totalmat.statuse,
                          etat: totalmat.etat,
                          fournisseur:totalmat.fournisseur,
                          prixmateriel:totalmat.prixmateriel,
                          dateinventaire: totalmat.dateinventaire,
                          numerofacture: totalmat.numerofacture,     
                          nomconsommable: '',
                          numero:e.target.value,
                          texte:totalmat.texte,
                          id :totalmat.idmat})
                          let credential = {
                            idmat:totalmat.idmat,
                            code: totalmat.code,
                            groupe: totalmat.groupe,
                            famille:totalmat.famille,
                            categorie:totalmat.categorie,
                            marque:totalmat.marque,
                            statuse:totalmat.statuse,
                            etat:totalmat.etat,
                            fournisseur:totalmat.fournisseur,
                            prixmateriel:totalmat.prixmateriel,
                            dateinventaire:totalmat.dateinventaire,
                            region:totalmat.region,
                            numerofacture:totalmat.numerofacture,
                            numero:e.target.value,
                            texte:totalmat.texte
                          }
                          localStorage.totalmat = JSON.stringify(credential)
                          }}
                      />
                       
                        <label>Groupe</label> <br/ >
                        <select defaultValue={totalmat.groupe} onChange={e => {setValues({ ...values, 
                        region: totalmat.region,
                        groupe: e.target.value,
                        famille: totalmat.famille,
                        categorie:totalmat.categorie,
                        marque: totalmat.marque,
                        status: totalmat.statuse,
                        etat: totalmat.etat,
                        fournisseur:totalmat.fournisseur,
                        prixmateriel:totalmat.prixmateriel,
                        dateinventaire: totalmat.dateinventaire,
                        numerofacture: totalmat.numerofacture,     
                        nomconsommable: '',
                        numero:totalmat.numero,
                        texte:totalmat.texte,
                        id :totalmat.idmat })
                        let credential = {
                          idmat:totalmat.idmat,
                          code: totalmat.code,
                          groupe:e.target.value,
                          famille: totalmat.famille,
                          categorie:totalmat.categorie,
                          marque:totalmat.marque,
                          statuse:totalmat.statuse,
                          etat:totalmat.etat,
                          fournisseur:totalmat.fournisseur,
                          prixmateriel:totalmat.prixmateriel,
                          dateinventaire:totalmat.dateinventaire,
                          region:totalmat.region,
                          numerofacture:totalmat.numerofacture,
                          numero:totalmat.numero,
                          texte:totalmat.texte
                        }
                        localStorage.totalmat = JSON.stringify(credential)
                        }}>
                            <option value="C">radio et télécommunication</option>
                            <option value="I">Enginneering</option>
                            <option selected value="E">information et technologie </option>
                           
                       </select>

                      {<br/>}
                      <label>marque</label>
                      
                      <Input
                        defaultValue={totalmat.marque}
                        placeholder="sony,hp,..."
                        type="text"
                        onChange={e =>{ setValues({ ...values,
                           region: totalmat.region,
                          groupe: totalmat.groupe,
                          famille: totalmat.famille,
                          categorie:totalmat.categorie,
                          marque: e.target.value,
                          status: totalmat.statuse,
                          etat: totalmat.etat,
                          fournisseur:totalmat.fournisseur,
                          prixmateriel:totalmat.prixmateriel,
                          dateinventaire: totalmat.dateinventaire,
                          numerofacture: totalmat.numerofacture,     
                          nomconsommable: '',
                          numero:totalmat.numero,
                          texte:totalmat.texte,
                          id :totalmat.idmat})
                          let credential = {
                            idmat:totalmat.idmat,
                            code: totalmat.code,
                            groupe: totalmat.groupe,
                            famille: totalmat.famille,
                            categorie:totalmat.categorie,
                            marque:e.target.value,
                            statuse:totalmat.statuse,
                            etat:totalmat.etat,
                            fournisseur:totalmat.fournisseur,
                            prixmateriel:totalmat.prixmateriel,
                            dateinventaire:totalmat.dateinventaire,
                            region:totalmat.region,
                            numerofacture:totalmat.numerofacture,
                            numero:totalmat.numero,
                            texte:totalmat.texte
                          }
                          localStorage.totalmat = JSON.stringify(credential)
                        }}
                      />
                     


                    </Col>
                    <Col md="12" >
                    </Col>
                  </Row>

                      <label>état</label><br />
                      <select defaultValue={totalmat.etat} onChange={e => {setValues({ ...values,
                       region: totalmat.region,
                       groupe: totalmat.groupe,
                       famille: totalmat.famille,
                       categorie:totalmat.categorie,
                       marque: totalmat.marque,
                       status: totalmat.statuse,
                       etat: e.target.value,
                       fournisseur:totalmat.fournisseur,
                       prixmateriel:totalmat.prixmateriel,
                       dateinventaire: totalmat.dateinventaire,
                       numerofacture: totalmat.numerofacture,     
                       nomconsommable: '',
                       numero:totalmat.numero,
                       texte:totalmat.texte,
                       id :totalmat.idmat})
                       let credential = {
                        idmat:totalmat.idmat,
                        code: totalmat.code,
                        groupe: totalmat.groupe,
                        famille: totalmat.famille,
                        categorie:totalmat.categorie,
                        marque:totalmat.marque,
                        statuse:totalmat.statuse,
                        etat:e.target.value,
                        fournisseur:totalmat.fournisseur,
                        prixmateriel:totalmat.prixmateriel,
                        dateinventaire:totalmat.dateinventaire,
                        region:totalmat.region,
                        numerofacture:totalmat.numerofacture,
                        numero:totalmat.numero,
                        texte:totalmat.texte
                      }
                      localStorage.totalmat = JSON.stringify(credential)
                    }}>
                        <option value="bon">bon</option>
                        <option value="moyen">moyen</option>
                        <option value="hors usage">hors usage</option>
                      </select>
                    <div>
                     <label>localisation</label><br />
                      <select defaultValue={totalmat.region} onChange={e => {setValues({ ...values, 
                          region: e.target.value ,
                          groupe: totalmat.groupe,
                          famille: totalmat.famille,
                          categorie:totalmat.categorie,
                          marque: totalmat.marque,
                          status: totalmat.statuse,
                          etat: totalmat.etat,
                          fournisseur:totalmat.fournisseur,
                          prixmateriel:totalmat.prixmateriel,
                          dateinventaire: totalmat.dateinventaire,
                          numerofacture: totalmat.numerofacture,     
                          nomconsommable: '',
                          numero:totalmat.numero,
                          texte:totalmat.texte,
                          id :totalmat.idmat
                      })
                      let credential = {
                        idmat:totalmat.idmat,
                        code: totalmat.code,
                        groupe: totalmat.groupe,
                        famille: totalmat.famille,
                        categorie:totalmat.categorie,
                        marque:totalmat.marque,
                        statuse:totalmat.statuse,
                        etat:totalmat.etat,
                        fournisseur:totalmat.fournisseur,
                        prixmateriel:totalmat.prixmateriel,
                        dateinventaire:totalmat.dateinventaire,
                        region:e.target.value,
                        numerofacture:totalmat.numerofacture,
                        numero:totalmat.numero,
                        texte:totalmat.texte
                      }
                      localStorage.totalmat = JSON.stringify(credential)
                    }}>
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
          <label>date changement</label>
                      <Input
                        
                        defaultValue={totalmat.dateinventaire}
                        placeholder=""
                        type="date"
                        required
                        onChange={e => setValues({ ...values, dateinventaire: e.target.value ,id:totalmat.idmat })}
                      />
                      <div>
                           <label>status</label><br></br>
                           <select defaultValue={totalmat.statuse} onChange=
                           {e => {setValues({ ...values, 
                            region: totalmat.region ,
                            groupe: totalmat.groupe,
                            famille: totalmat.famille,
                            categorie:totalmat.categorie,
                            marque: totalmat.marque,
                            status: e.target.value,
                            etat: totalmat.etat,
                            fournisseur:totalmat.fournisseur,
                            prixmateriel:totalmat.prixmateriel,
                            dateinventaire: totalmat.dateinventaire,
                            numerofacture: totalmat.numerofacture,     
                            nomconsommable: '',
                            numero:totalmat.numero,
                            texte:totalmat.texte,
                            id :totalmat.idmat
                        })
                        let credential = {
                          idmat:totalmat.idmat,
                          code: totalmat.code,
                          groupe: totalmat.groupe,
                          famille: totalmat.famille,
                          categorie:totalmat.categorie,
                          marque:totalmat.marque,
                          statuse:e.target.value,
                          etat:totalmat.etat,
                          fournisseur:totalmat.fournisseur,
                          prixmateriel:totalmat.prixmateriel,
                          dateinventaire:totalmat.dateinventaire,
                          region:totalmat.region,
                          numerofacture:totalmat.numerofacture,
                          numero:totalmat.numero,
                          texte:totalmat.texte
                        }
                        localStorage.totalmat = JSON.stringify(credential)
                      }}>
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
                        onChange={e => setValues({ ...values, nomconsommable: e.target.value ,id:totalmat.idmat })}
                      />

                      <label>fournisseur</label>
                      <Input
                        defaultValue={totalmat.fournisseur}
                        placeholder="don chine,achat,..."
                        type="text"
                        onChange=
                        {e => {setValues({ ...values, 
                          region: totalmat.region ,
                          groupe: totalmat.groupe,
                          famille: totalmat.famille,
                          categorie:totalmat.categorie,
                          marque: totalmat.marque,
                          status: totalmat.statuse,
                          etat: totalmat.etat,
                          fournisseur:e.target.value,
                          prixmateriel:totalmat.prixmateriel,
                          dateinventaire: totalmat.dateinventaire,
                          numerofacture: totalmat.numerofacture,     
                          nomconsommable: '',
                          numero:totalmat.numero,
                          texte:totalmat.texte,
                          id :totalmat.idmat
                      })
                      let credential = {
                        idmat:totalmat.idmat,
                        code: totalmat.code,
                        groupe: totalmat.groupe,
                        famille: totalmat.famille,
                        categorie:totalmat.categorie,
                        marque:totalmat.marque,
                        statuse:totalmat.statuse,
                        etat:totalmat.etat,
                        fournisseur:e.target.value,
                        prixmateriel:totalmat.prixmateriel,
                        dateinventaire:totalmat.dateinventaire,
                        region:totalmat.region,
                        numerofacture:totalmat.numerofacture,
                        numero:totalmat.numero,
                        texte:totalmat.texte
                      }
                      localStorage.totalmat = JSON.stringify(credential)
                    }}
                      />

                      <label>prix du materiel en ariary</label>
                      <Input
                        defaultValue={totalmat.prixmateriel}
                        placeholder="en ariary"
                        type="number"
                        onChange=
                        {e => {setValues({ ...values, 
                          region: totalmat.region ,
                          groupe: totalmat.groupe,
                          famille: totalmat.famille,
                          categorie:totalmat.categorie,
                          marque: totalmat.marque,
                          status: totalmat.statuse,
                          etat: totalmat.etat,
                          fournisseur:totalmat.fournisseur,
                          prixmateriel:e.target.value,
                          dateinventaire: totalmat.dateinventaire,
                          numerofacture: totalmat.numerofacture,     
                          nomconsommable: '',
                          numero:totalmat.numero,
                          texte:totalmat.texte,
                          id :totalmat.idmat
                      })
                      let credential = {
                        idmat:totalmat.idmat,
                        code: totalmat.code,
                        groupe: totalmat.groupe,
                        famille: totalmat.famille,
                        categorie:totalmat.categorie,
                        marque:totalmat.marque,
                        statuse:totalmat.statuse,
                        etat:totalmat.etat,
                        fournisseur:totalmat.fournisseur,
                        prixmateriel:e.target.value,
                        dateinventaire:totalmat.dateinventaire,
                        region:totalmat.region,
                        numerofacture:totalmat.numerofacture,
                        numero:totalmat.numero,
                        texte:totalmat.texte
                      }
                      localStorage.totalmat = JSON.stringify(credential)
                    }}
                      />

                      <label>numero bon de livraison</label>
                      <Input
                        defaultValue={totalmat.numerofacture}
                        placeholder=""
                        type="number"
                        onChange=
                        {e => {setValues({ ...values, 
                          region: totalmat.region ,
                          groupe: totalmat.groupe,
                          famille: totalmat.famille,
                          categorie:totalmat.categorie,
                          marque: totalmat.marque,
                          status: totalmat.statuse,
                          etat: totalmat.etat,
                          fournisseur:totalmat.fournisseur,
                          prixmateriel:totalmat.prixmateriel,
                          dateinventaire: totalmat.dateinventaire,
                          numerofacture: e.target.value,     
                          nomconsommable: '',
                          numero:totalmat.numero,
                          texte:totalmat.texte,
                          id :totalmat.idmat
                      })
                      let credential = {
                        idmat:totalmat.idmat,
                        code: totalmat.code,
                        groupe: totalmat.groupe,
                        famille: totalmat.famille,
                        categorie:totalmat.categorie,
                        marque:totalmat.marque,
                        statuse:totalmat.statuse,
                        etat:totalmat.etat,
                        fournisseur:totalmat.fournisseur,
                        prixmateriel:totalmat.prixmateriel,
                        dateinventaire:totalmat.dateinventaire,
                        region:totalmat.region,
                        numerofacture:e.target.value,
                        numero:totalmat.numero,
                        texte:totalmat.texte
                      }
                      localStorage.totalmat = JSON.stringify(credential)
                    }}
                      />
                      <label>commentaire</label>
                      <Input
                        style={{height:100}}
                        defaultValue={totalmat.texte}
                        placeholder=""
                        type="text"
                        onChange=
                        {e => {setValues({ ...values, 
                          region: totalmat.region ,
                          groupe: totalmat.groupe,
                          famille: totalmat.famille,
                          categorie:totalmat.categorie,
                          marque: totalmat.marque,
                          status: totalmat.statuse,
                          etat: totalmat.etat,
                          fournisseur:totalmat.fournisseur,
                          prixmateriel:totalmat.prixmateriel,
                          dateinventaire: totalmat.dateinventaire,
                          numerofacture: totalmat.numerofacture,     
                          nomconsommable: '',
                          numero:totalmat.numero,
                          texte:e.target.value,
                          id :totalmat.idmat
                      })
                      let credential = {
                        idmat:totalmat.idmat,
                        code: totalmat.code,
                        groupe: totalmat.groupe,
                        famille: totalmat.famille,
                        categorie:totalmat.categorie,
                        marque:totalmat.marque,
                        statuse:totalmat.statuse,
                        etat:totalmat.etat,
                        fournisseur:totalmat.fournisseur,
                        prixmateriel:totalmat.prixmateriel,
                        dateinventaire:totalmat.dateinventaire,
                        region:totalmat.region,
                        numerofacture:totalmat.numerofacture,
                        numero:totalmat.numero,
                        texte:e.target.value
                      }
                      localStorage.totalmat = JSON.stringify(credential)
                    }}
                      />
            </CardBody>
          </Card>
          </Col>

        </Row>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

  )

  );
}
function AfficheMateriels() {
  

  
  let token = localStorage.getItem("token")
 
  const [selectedFilter, setSelectedFilter] = useState({
    gro: '',
    fam: '',
    reg: '',
    sta: '',
    eta: ''
  });
  const [data2, setdata2] = useState({
    idsup: ''})
    axios.post(`http://${API_IP}:3000/api/ajoutmateriel/supprimer`, data2)

  let movies = [];

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  let totalmat = JSON.parse(localStorage.getItem("totalmat"))
  const navigate = useNavigate();
  let [data, setData] =useState([]);
  useEffect(()=>{
          axios.get(`http://${API_IP}:3000/api/materiels/materiels`)
          .then(res =>{setData(res.data)
          }
          )
          .catch(err => console.log(err)); },[])
          
          
  
          
          
          
        {/*const [data, setData] =useState([])
  useEffect(()=>{
        axios.get(`http://${API_IP}:3000/api/materiels/materiels/tri`)
        .then(res =>setData(res.data))
        .catch(err => console.log(err)); },[])
   */}
   
   const [searchterm,setsearchterm]=useState("")

   function rechercher(){
    let rech = document.getElementById("texte").value
    setsearchterm(rech)
  }


   const handleExport = () => {
   
    const headings = [[
      'Numero',
      'groupe',
      'categorie',
      'marque',
      'état',
      'date',
      'status',
      'localisation',
      'commentaire'
  ]];
  

  const wb = utils.book_new();
  const ws = utils.json_to_sheet([]);
  utils.sheet_add_aoa(ws, headings);
  utils.sheet_add_json(ws, movies, { origin: 'A2', skipHeader: true });
  utils.book_append_sheet(wb, ws, 'Report');
  writeFile(wb, 'listeMateriels.xlsx');
   }
function afficher(idmat,code,groupe,famille,categorie,marque,statuse,etat,fournisseur,
    prixmateriel,dateinventaire,region,numerofacture,numero,texte){

      const credential = {
        idmat:idmat,
        code: code,
        groupe: groupe,
        famille: famille,
        categorie:categorie,
        marque:marque,
        statuse:statuse,
        etat:etat,
        fournisseur:fournisseur,
        prixmateriel:prixmateriel,
        dateinventaire: dayjs(dateinventaire).format("DD/MM/YYYY"),
        region:region,
        numerofacture:numerofacture,
        numero:numero,
        texte:texte

      };
       
       //setValues({ ...values, groupe:groupe })
     
        localStorage.totalmat = JSON.stringify(credential)

      Swal.fire({
        title: categorie,
        text: idmat,
        label:'dfsdf',
        showDenyButton: true,
        imageUrl: `https://source.unsplash.com/random?${categorie}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonText: "modifier",
        denyButtonText: `supprimer`
      }).then((result) => {
     
        if (result.isConfirmed) {
        //MODIFIEE
      
     
        
        setModalShow(true)

   


          /*Swal.fire("modifié!", "", "success");*/
        } else if (result.isDenied) {
          //ETO NO ATAO SUPPRIMER
          
          Swal.fire({
            title: "etes vous sur?",
            text: "c'est irreversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "oui, supprimer!",
            cancelButtonText:"retour"
          }).then((result) => {
            if (result.isConfirmed) {
              setdata2({ ...data2, idsup: idmat })
             
                axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/ajouthistoriques`,
                ({ nom:tokenLocal.nom,prenom:tokenLocal.prenom,action:`suppression materiels ${code}`}))
                localStorage.removeItem("totalmat")
              Swal.fire({
                title: "Supprimé!",
                text: "cette materiel va etre supprimé.",
                icon: "success"
              });
              window.location.reload();
            }
          });

          
        }
      })};
      function edit(idmat,code,groupe,famille,categorie,marque,statuse,etat,fournisseur,
        prixmateriel,dateinventaire,region,numerofacture){


        }
/*const credential = res.data;
console.log(credential)
localStorage.totalmat = JSON.stringify(credential)
let totalmat = JSON.parse(localStorage.getItem("totalmat")*/
      function prendre(idmat,code,groupe,famille,categorie,marque,statuse,etat,fournisseur,
        prixmateriel,dateinventaire,region,numerofacture){

        
          

          if (statuse=="libre"){
            Swal.fire({
              title: categorie,
              text: categorie,
              label:'dfsdf',
              showDenyButton: true,
              imageUrl: 'https://source.unsplash.com/random?ordinateur',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
              confirmButtonText: "demander",
              denyButtonText: `annuler`
            }).then((result) => {
           
              if (result.isConfirmed) {
              //itiliser 
              const materiels={categorie,marque,code};
              console.log(materiels)
              localStorage.materiels = JSON.stringify(materiels)
              let materiel= JSON.parse(localStorage.getItem("materiels"))
             navigate('../notifications', { replace: true }) 
             window.location.reload();
              } else if (result.isDenied) {
              }
            })}else{
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "materiel utilisé!",
                footer: '<a href="#">veuillez demander d"autre?</a>'
              });
            };
    

          }  
       
      let tokenLocal = JSON.parse(localStorage.getItem("token"))
  
  // Appeler la fonction pour jouer le "beep"
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <div className="content">
      <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Liste des Materiels</CardTitle>
                      {tokenLocal.role == "administrateur" && (
                          <div>
                            <button onClick={handleExport} className="btn btn-danger float-top">
                             Exporter en csv <i className="fa fa-download"></i>
                            </button>
                          </div>
                        )}

                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />

                      
                    <div>   
                           <label className="form-label" for="datatable-search-input">Rechercher Materiel</label>
                          <Input type="text" id="texte" placeholder="Rechercher"  style={{width:200}} onChange={()=>rechercher()}/>
                         
                    </div>
 
                
              
                </CardHeader>
                <form>
                        <label>TRIER PAR</label><br/>{/* 
                             <select  onChange={e => setValues({ ...values,gro: e.target.value })} >
                             <option  selected="selected" value="">--Groupe--</option>
                              <option value="C">Radio et Télécommunication</option>
                              <option value="E">Engineering</option>
                              <option value="I">Information et technologie </option>
                            </select>
                             </select>
                            <select onChange={e => setValues({ ...values,sta: e.target.value })} >
                              <option  selected="selected" value="">--Status--</option>
                              <option value="libre">libre</option>
                              <option value="utilisé">utilisé</option>
                            </select>
                            <select  onChange={e => setValues({ ...values,eta: e.target.value })} >
                              <option  selected="selected" value="">--etat--</option>
                              <option value="actif">actif</option>
                              <option value="en panne">en panne</option>
                            </select>
                            <button className="btn btn-default" type="submit">
                                 Appliquer
                            </button>
                            */}
                            <select value={selectedFilter.fam} onChange={e => setSelectedFilter({ ...selectedFilter,fam: e.target.value })}>
                              <option  selected="selected" value="">--Famille--</option>
                              <option value="ORDINATEUR">ORDINATEUR</option>
                              <option value="TELECOMMUNICATION">TELECOMMUNICATION</option>
                              <option value="RESEAUX">RESEAUX</option>
                              <option value="ACCESSOIRE">ACCESSOIRE</option>
                              <option value="LOGICIEL">LOGICIEL</option>
                              <option value="AUDIOVISUEL">AUDIOVISUEL</option>
                              <option value="CONSOMMABLE">CONSOMMABLE</option>
                            </select>
                            {tokenLocal.role == "administrateur" && (
                            <select value={selectedFilter.sta} onChange={e => setSelectedFilter({ ...selectedFilter,sta: e.target.value })}>
                              <option  selected="selected" value="">--Status--</option>
                              <option value="libre">libre</option>
                              <option value="utilisé">utilisé</option>
                            </select>)}
                            <select value={selectedFilter.gro} onChange={e => setSelectedFilter({ ...selectedFilter,gro: e.target.value })}>
                              <option  selected="selected" value="">--Groupe--</option>
                                  <option value="C">radio et télécommunication</option>
                                  <option value="I">Enginneering</option>
                                  <option selected value="E">information et technologie </option>
                            </select>
                            <select value={selectedFilter.eta} onChange={e => setSelectedFilter({ ...selectedFilter,eta: e.target.value })}>
                              <option  selected="selected" value="">--état--</option>
                                  <option selected value="bon">BON</option>
                                 <option value="moyen">MOYEN</option>
                                 <option value="hors usage">HORS USAGE</option>
                            </select>
                            <select  value={selectedFilter.reg} onChange={e => setSelectedFilter({ ...selectedFilter,reg: e.target.value })} >
                               <option  selected="selected" value="">--Localisation--</option>
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
                           
                    </form>     
              <CardBody>
             
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>

                      <th>n°</th>
                      <th>groupe</th>
                      <th>categorie</th>
                      <th>marque</th>
                      <th>état</th>
                      <th>date inventaire</th>
                      <th>statut</th>
                     
                    
                      <th>localisation</th>
                      <th>commentaire</th>
                      <th></th>
                    </tr>
                  </thead>
                  {tokenLocal.role == "administrateur" && (
                  <tbody >
                    {
                   
                   
                    data
                    .filter((materiels)=>{return (materiels.codemateriel.includes(searchterm) || materiels.codemateriel.includes(searchterm).toUpperCase || materiels.marque.includes(searchterm) || materiels.marque.includes(searchterm).toUpperCase ||
                     
                      materiels.marque.includes(searchterm) || materiels.marque.includes(searchterm).toUpperCase ||
                      materiels.categorie.includes(searchterm) || materiels.categorie.includes(searchterm).toUpperCase ||
                     
                      materiels.commentaireMateriel.includes(searchterm) || materiels.commentaireMateriel.includes(searchterm).toUpperCase 
                     
 )}

                    )
                    .map((materiels,index)=>{
           
                    
                    movies.push([`${materiels.codemateriel}`,`${materiels.groupe}`,`${materiels.categorie}`,
                                `${materiels.marque}`,
                                 `${materiels.etat}`,
                                 `${materiels.dateinventaire}`,
                                 `${materiels.statuse}`,
                                 `${materiels.region}`,
                                 `${materiels.commentaireMateriel}`]
                    )

                    /*,`${materiels.groupe}`,
                      `${materiels.categorie}`,`${materiels.marque}`,`${materiels.etat}`,`${materiels.dateinventaire}`,
                        `${materiels.statuse}`,
                          `${materiels.region}`,`${materiels.commentaireMateriel}` */
   


                  if ((selectedFilter.fam === '' || selectedFilter.fam === materiels.famille) 
                      &&
                      (selectedFilter.reg === '' || selectedFilter.reg === materiels.region)
                      &&
                      (selectedFilter.sta === '' || selectedFilter.sta === materiels.statuse)
                      &&
                      (selectedFilter.eta === '' || selectedFilter.eta === materiels.etat)
                      &&
                      (selectedFilter.gro === '' || selectedFilter.gro === materiels.groupe)
                      )
                            { 
                            return <tr key={index} >
                            
                            <td>{materiels.codemateriel}</td>
                            <td>{materiels.groupe}</td>
                            <td>{materiels.categorie}</td>
                            
                            <td>{materiels.marque}</td>
                            <td>{materiels.etat}</td>
                            <td>{dayjs(`${materiels.dateinventaire}`).format("DD/MM/YYYY")}</td>
                            <td>{materiels.statuse}</td>
                           
                            
                            <td>
                                {materiels.region}

                            </td>   
                            <td>{materiels.commentaireMateriel}</td>    
                            {tokenLocal.role == "administrateur" && (
                            
                            <button onClick={()=>{afficher(materiels.idMateriels,materiels.codemateriel,materiels.groupe,
                            materiels.famille,materiels.categorie,materiels.marque,materiels.statuse,materiels.etat,materiels.fournisseur,
                            materiels.prixmateriel,materiels.dateinventaire,materiels.region,materiels.numerofacture,materiels.numero,materiels.commentaireMateriel) 
                                
                          }}class="btn btn-danger btn-rounded" data-mdb-ripple-init sty  style={{fontSize:"14px",width:"150px",height:"40px"}} >editer</button>              
                            ) }
                            <button onClick={()=>{prendre(materiels.idMateriels,materiels.codemateriel,materiels.groupe,
                            materiels.famille,materiels.categorie,materiels.marque,materiels.statuse,materiels.etat,materiels.fournisseur,
                            materiels.prixmateriel,materiels.dateinventaire,materiels.region,materiels.numerofacture
                            
                            )}
                            } class="btn btn-success btn-rounded" >voir</button>                   
                                                   
                       </tr> 
                           }  
                           return null;               
                                }                             
                                                                          
)}
                     
                  </tbody>)}


                  {tokenLocal.role != "administrateur" && (
                  <tbody >
                    {
                   
                   
                    data
                    .filter((materiels)=>{return (materiels.codemateriel.includes(searchterm) || materiels.codemateriel.includes(searchterm).toUpperCase || materiels.marque.includes(searchterm) || materiels.marque.includes(searchterm).toUpperCase ||
                     
                      materiels.marque.includes(searchterm) || materiels.marque.includes(searchterm).toUpperCase ||
                      materiels.categorie.includes(searchterm) || materiels.categorie.includes(searchterm).toUpperCase ||
                     
                      materiels.commentaireMateriel.includes(searchterm) || materiels.commentaireMateriel.includes(searchterm).toUpperCase 
                     
 )}

                    )
                    .map((materiels,index)=>{
           
                    
                    movies.push([`${materiels.codemateriel}`,`${materiels.groupe}`,`${materiels.categorie}`,
                                `${materiels.marque}`,
                                 `${materiels.etat}`,
                                 `${materiels.dateinventaire}`,
                                 `${materiels.statuse}`,
                                 `${materiels.region}`,
                                 `${materiels.commentaireMateriel}`]
                    )

                    /*,`${materiels.groupe}`,
                      `${materiels.categorie}`,`${materiels.marque}`,`${materiels.etat}`,`${materiels.dateinventaire}`,
                        `${materiels.statuse}`,
                          `${materiels.region}`,`${materiels.commentaireMateriel}` */
   


                  if ((selectedFilter.fam === '' || selectedFilter.fam === materiels.famille) 
                      &&
                      (selectedFilter.reg === '' || selectedFilter.reg === materiels.region)
                      &&
                      ('libre' === materiels.statuse)
                      &&
                      (selectedFilter.eta === '' || selectedFilter.eta === materiels.etat)
                      &&
                      (selectedFilter.gro === '' || selectedFilter.gro === materiels.groupe)
                      )
                            { 
                            return <tr key={index} >
                            
                            <td>{materiels.codemateriel}</td>
                            <td>{materiels.groupe}</td>
                            <td>{materiels.categorie}</td>
                            
                            <td>{materiels.marque}</td>
                            <td>{materiels.etat}</td>
                            <td>{dayjs(`${materiels.dateinventaire}`).format("DD/MM/YYYY")}</td>
                            <td>{materiels.statuse}</td>
                           
                            
                            <td>
                                {materiels.region}

                            </td>   
                            <td>{materiels.commentaireMateriel}</td>    
                            {tokenLocal.role == "administrateur" && (
                            
                            <button onClick={()=>{afficher(materiels.idMateriels,materiels.codemateriel,materiels.groupe,
                            materiels.famille,materiels.categorie,materiels.marque,materiels.statuse,materiels.etat,materiels.fournisseur,
                            materiels.prixmateriel,materiels.dateinventaire,materiels.region,materiels.numerofacture,materiels.numero,materiels.commentaireMateriel) 
                                
                          }}class="btn btn-danger btn-rounded" data-mdb-ripple-init sty  style={{fontSize:"14px",width:"150px",height:"40px"}} >editer</button>              
                            ) }
                            <button onClick={()=>{prendre(materiels.idMateriels,materiels.codemateriel,materiels.groupe,
                            materiels.famille,materiels.categorie,materiels.marque,materiels.statuse,materiels.etat,materiels.fournisseur,
                            materiels.prixmateriel,materiels.dateinventaire,materiels.region,materiels.numerofacture
                            
                            )}
                            } class="btn btn-success btn-rounded" >voir</button>                   
                                                   
                       </tr> 
                           }  
                           return null;               
                                }                             
                                                                          
)}
                     
                  </tbody>)}

                </Table>
              </CardBody>
            </Card>
          </Col>
          
        </Row>

      </div>
    </>
  );
}

export default AfficheMateriels;
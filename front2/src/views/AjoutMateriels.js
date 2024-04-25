
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
  Alert,
} from "reactstrap";
import Swal from "sweetalert2";
import API_IP from "./config";
import { Aos } from "aos";
import { backgroundColors } from "contexts/BackgroundColorContext";
import { height } from "@mui/system";
import * as XLSX from 'xlsx';
import { Tab } from "@mui/icons-material";

let tab=[]


let tokenLocal = JSON.parse(localStorage.getItem("token"));
function AjoutMateriels() {
  const [typeError, setTypeError] = useState(null);

  const [excelFile, setExcelFile] = useState(null);

  const [excelData, setExcelData] = useState({

  });

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

  /*const handleFileUpload = (event) => {
    let selectedfile = event.target.files[0];

    /*
    const reader = new FileReader();
   
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      // Accédez aux feuilles du classeur et traitez les données ici
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      //long 
     // ${jsonData.length}  
     //-ligne0
     //data  1->(${jsonData.length}-1)
     /*
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
     */ 
  
   // setValues({ ...values, famille:${jsonData[0]})

      /*
      i>0
      ${jsonData[i][0]}==numero
      ${jsonData[i][1]}==groupe
      ${jsonData[i][2]}==categorie
      ${jsonData[i][3]}==marque
      ${jsonData[i][4]}==etat
      ${jsonData[i][5]}==date
      ${jsonData[i][6]}==status
      ${jsonData[i][7]}==localisation
      ${jsonData[i][8]}==commentaire
    
   let i=0;
   
     for (i=1;i++;i<=(jsonData.length)){
      setValues({ ...values, 
        groupe: jsonData[i][1],
        famille: 'sans',
        categorie: jsonData[i][2],
        marque:jsonData[i][3],
        status:jsonData[i][6],
        etat: jsonData[i][4],
        fournisseur:'chine',
        prixmateriel:1,
        dateinventaire:jsonData[i][5],
        numerofacture: '111',
        region:jsonData[i][7],
        nomconsommable:'sans c',
        numero:'111',
        texte:jsonData[i][8]})
        alert(jsonData[3][4]);
     }


    };
  
    reader.readAsArrayBuffer(blob);

  };
*/
// onchange event
const handleFile=(e)=>{
  let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
  let selectedFile = e.target.files[0];
  if(selectedFile){
    if(selectedFile&&fileTypes.includes(selectedFile.type)){
      setTypeError(null);
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload=(e)=>{
        setExcelFile(e.target.result);
       
      }
    }
    else{
      setTypeError('fichier Excel uniquement');
      setExcelFile(null);
    }
  }
  else{
    console.log('Please select your file');
  }
}

// submit event
const handleFileSubmit=(e)=>{
e.preventDefault();
  if(excelFile!==null){
    const workbook = XLSX.read(excelFile,{type: 'buffer'});
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    setExcelData(data);
    let i=0
    
    data.forEach((row) => {
   
   
      Object.values(row).forEach((value) => {
      tab.push(value)
   }
 )
    
     
  }
    );
   let j=0
    while(j<tab.length){
      //alert(`${tab[j]} - ${tab[j+1]} - ${tab[j+2]}-${tab[j+3]} - ${tab[j+4]} - ${tab[j+5]} ${tab[j]+6} - ${tab[j+7]} - ${tab[j+8]}  - ${tab[j+9]}- ${tab[j+10]}- ${tab[j+11]}- ${tab[j+12]}`)
      const excelDateValue =tab[j+8]; // La valeur de date provenant d'Excel

      // Convertir la valeur de date Excel en nombre de millisecondes depuis l'époque d'Excel
      const excelEpochStart = new Date('1900-01-01');
      const excelDateMilliseconds = excelEpochStart.getTime() + (excelDateValue - 1) * 24 * 60 * 60 * 1000;
    
      // Créer un objet Date à partir de la valeur de millisecondes
      const dateObj = new Date(excelDateMilliseconds);
        // Obtenir les composants de la date
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  // Format de la date pour la base de données
  const formattedDate = `${year}-${month}-${day}`;

      const newValues = {
        groupe: tab[j],
        famille: tab[j + 1],
        categorie: tab[j + 2],
        marque: tab[j + 3],
        status: tab[j + 4],
        etat: tab[j + 5],
        fournisseur: tab[j + 6],
        prixmateriel:tab[j + 7].toString(),
        dateinventaire: formattedDate,
        numerofacture: '',
        region: tab[j + 10],
        nomconsommable: '',
        numero: tab[j + 11].toString(),
        texte: tab[j + 12]
      };
       j+=13
      //setValues({ ...values, ...newValues });
      const updatedValues = { ...values, ...newValues };
      axios.post(`http://${API_IP}:3000/api/ajoutmateriel`,  updatedValues)
        .then(response => {
          // La requête POST a été effectuée avec succès
          console.log(response.data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'materiel importé avec succes',
            showConfirmButton: false,
            timer: 30000
          })
          
          navigate('../AfficheMateriels', { replace: true })
          window.location.reload();
        })
        .catch(error => {
          // Une erreur s'est produite lors de la requête POST
          console.error(error);
        });
      
     
    }
      
    
      
  
  
       

       


   }
}
  return (
    <>

      <div className="content">

        <Row>
          <Col md="6">
            <Card>
              <CardHeader>

                <h5 className="title">Ajout de nouveau materiel</h5>
                
                      <Input type="file" className="form-control" required onChange={handleFile} />
                      <Button type="submit" onClick={handleFileSubmit} className="btn btn-success btn-md">UPLOAD</Button>
                      {typeError&&(
                             <div className="alert alert-danger" role="alert">{typeError}</div>
                             )}
                
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
                      required
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
                      required
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

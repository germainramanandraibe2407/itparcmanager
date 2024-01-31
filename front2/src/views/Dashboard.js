
import React from "react";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import  { useEffect, useState } from "react";
import API_IP from "./config";

import { BarChart } from '@mui/x-charts/BarChart';

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
// core components


import Swal from "sweetalert2";
import Sidebar from "components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import { height, style } from "@mui/system";




 

function Dashboard(props) {
  const [marque, setmarque] = useState([])
  

  useEffect(() => {
    axios.get(`http://${API_IP}:3000/api/materiels/marquemateriel`)
      .then(res => setmarque(res.data))
      .catch(err => console.log(err));
  }, [])
  

 


    
  
  const navigate = useNavigate();
  const [values, setValues] = useState({
  
    fam: '',
   
    reg: '',

  })
  const [selectedFilter, setSelectedFilter] = useState({
    gro: '',
    fam: '',
    reg: '',
    sta: '',
    eta: ''
  });
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  
  
  let mar=[], nbre=[],etat=[],netat=[];
  let [data, setData] =useState([]);
  let [nbr, setnbr] =useState([]);
  let [etat1, setetat1] =useState([]);
  useEffect(()=>{
          axios.get(`http://${API_IP}:3000/api/materiels/materiels`)
          .then(res =>setData(res.data))
          .catch(err => console.log(err)); },[])
  useEffect(()=>{
            axios.get(`http://${API_IP}:3000/api/materiels/nombremateriels`)
            .then(res =>setnbr(res.data))
            .catch(err => console.log(err)); },[])  
            
  useEffect(()=>{
              axios.get(`http://${API_IP}:3000/api/materiels//etatmateriel`)
              .then(res =>setetat1(res.data))
              .catch(err => console.log(err)); },[])      
            
  let [data3, setData3] =useState([]);
    useEffect(()=>{
                    axios.get(`http://${API_IP}:3000/api/materiels/nbrmateriel`)
                    .then(res =>setData3(res.data))
                    .catch(err => console.log(err)); },[])
 
        {/*const [data, setData] =useState([])
  useEffect(()=>{
        axios.get(`http://${API_IP}:3000/api/materiels/materiels/tri`)
        .then(res =>setData(res.data))
        .catch(err => console.log(err)); },[])
   */}
   
  function afficher(nom,id){
      Swal.fire({
        title: nom,
        text: id,
        label:'dfsdf',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
  }
marque.map((marque,index)=>{
                mar.push(marque.marque)
                nbre.push(marque.nbrmarque)})
                //alert(mar[2]) 
etat1.map((marque,index)=>{
                etat.push(marque.etat)
                netat.push(marque.netat)})
               // alert(etat[2]) 

  return (
    <>
     
      <div className="content">
        <Row>
          <Col xs="6" class="h-100">
          <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">materiel disponible</h5>
               
       
                <CardTitle tag="h3">
              
                        {data3.map((materiels,index)=>{
                  return  <h3>{materiels.nbr}</h3>
                })}{" "}
                  <h3></h3> 
                  
               
                </CardTitle>
              </CardHeader>
              

                 <BarChart
              series={[
                { data: [nbre[0],nbre[1],nbre[2], nbre[3]], },
              
              ]}
              height={380}
              xAxis={[{ data: [mar[0],mar[1], mar[2],mar[3] ], scaleType: 'band' }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              
            />

            </Card>
           
          </Col>
          <Col xs="6"  class="mh-100">
          <Card className="card-chart" >
              <CardHeader>
                <h5 className="card-category">etat materiel </h5>

                <CardTitle tag="h3">
                    {<br/>}
                       
             
                  <h3></h3> 
                  
               
                </CardTitle>
              </CardHeader>
              <BarChart
                series={[
                  { data: [netat[0], netat[2],netat[1]], },
                
                ]}
                height={380}
                xAxis={[{ data: [etat[0], etat[2], etat[1] ], scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        
      />

            </Card>
           
          </Col>
        </Row>
        
        
      </div>
    </>
  );
}

export default Dashboard;

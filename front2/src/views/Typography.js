
// reactstrap components
import Swal from "sweetalert2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {   Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button } from "reactstrap";
import API_IP from "./config";
import dayjs, { Dayjs } from "dayjs";  
import { read, utils, writeFile } from 'xlsx';

function Typography() {
  let movies = [];
  const handleExport = () => {
   
    const headings = [[
      'id',
      'nom',
      'prenom',
      'occupation',
      'action',
      'date'
  ]];
  

  const wb = utils.book_new();
  const ws = utils.json_to_sheet([]);
  utils.sheet_add_aoa(ws, headings);
  utils.sheet_add_json(ws, movies, { origin: 'A2', skipHeader: true });
  utils.book_append_sheet(wb, ws, 'Report');
  writeFile(wb, 'historique.xlsx');
   }
 

let [datahis, setDatahis] =useState([]);
  useEffect(()=>{
          axios.get(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/affichehistoriques`)
          .then(res =>{setDatahis(res.data)
          }
          )
          .catch(err => console.log(err)); },[])
    

   
      
  return (
    <>
      <div className="content">
                          <div>
                            <button onClick={handleExport} className="btn btn-danger float-right">
                             Exporter en csv <i className="fa fa-download"></i>
                            </button>
                          </div>
      <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>id</th>
                      <th>nom</th>
                      <th>prenom</th>
                      <th>occupation</th>
                      <th>role</th>
                      <th>action</th>
                      <th>date</th>
                     
                
                    </tr>
                  </thead>
                  <tbody >
                    
                       
                    {datahis.map((historique,index)=>{
                       movies.push([
                        historique.idhistoriques,
                        historique.nomutilisateur,
                        historique.prenomutilisateur,
                        historique.occupation,
                        historique.action,
                        dayjs(`${historique.date}`).format("DD/MM/YYYY")
                       ])
                      return (
                        <tr>
                        <td>{historique.idhistoriques}</td>
                        <td>{historique.nomutilisateur}</td>
                        <td>{historique.prenomutilisateur}</td>
                        <td>{historique.occupation}</td>
                        <td>{historique.role}</td>
                        <td>{historique.action}</td>
                        <td>{dayjs(`${historique.date}`).format("DD/MM/YYYY")}</td>
                                        
                  </tr>
                      )})
                    }
                             
                    

                    
                     
                  </tbody>
        </Table> 
      </div>
   </>
  
  )  
}

export default Typography;

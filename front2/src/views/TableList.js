
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import { CSVLink } from "react-csv";

// reactstrap components
import {   Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button, } from "reactstrap";
import API_IP from "./config";
import Swal from "sweetalert2";

function Tables() {
  const [values, setValues] = useState({
    id: ''
  })

if (values.id){
  axios.post(`http://${API_IP}:3000/api/AfficheUser/supprimer`, values)
}

  const [data, setData] =useState([])
  useEffect(()=>{
        axios.get(`http://${API_IP}:3000/api/AfficheUser`)
        .then(res =>setData(res.data))
        .catch(err => console.log(err)); },[])

   const handleSubmit = (a,nom,prenom) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'etes vous sur de vouloir supprimer?',
      text: "la suppression est irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'oui,supprimer!',
      cancelButtonText: 'Non, retourner!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        setValues({ ...values, id:a}) 

        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        
        let tokenLocal = JSON.parse(localStorage.getItem("token"));
        axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/ajouthistoriques`,
        ({ nom:tokenLocal.nom,prenom:tokenLocal.prenom,action:`suppression de l"utilisateur ${nom} ${prenom}`}))  
      

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
      window.location.reload()  
    })
   }        

  return (
    <>
      <div className="content">
      <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">liste des utilisateurs</CardTitle>
                <button>imprimer</button>
                </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>id</th>
                      <th>nom</th>
                      <th>prenom</th>
                      <th>occupation</th>
                      <th>role</th>
                      <th>localisation</th>
                      <th>telephone</th>
                
                    </tr>
                  </thead>
                  <tbody >
                    {data.map((utilisateurs,index)=>{
                        return (
                        < >    
                              <tr key={index}  >
                                    <td>{utilisateurs.idutilisateurs} </td>
                                    <td>{utilisateurs.nomutilisateur}</td>
                                    <td>{utilisateurs.prenomutilisateur}</td>
                                    <td>{utilisateurs.occupation}</td>
                                    <td>{utilisateurs.role}</td>
                                    <td>{utilisateurs.region}</td>
                                    <td>{utilisateurs.telephone}</td>
                                    
                                    <td><button type="Submit" onClick={()=>handleSubmit(utilisateurs.idutilisateurs,utilisateurs.nomutilisateur,utilisateurs.prenomutilisateur)}
                                    class="btn btn-danger btn-rounded"> supprimer</button>
                                  </td>                          
                              </tr>
                        </>  )    
                    })

                    }
                     
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          
        </Row>

      </div>
    </>
  );
}

export default Tables;

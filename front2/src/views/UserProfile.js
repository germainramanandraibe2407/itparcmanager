
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
import API_IP from "./config";
import Swal from "sweetalert2";
import dayjs, { Dayjs } from "dayjs";
import { color } from "@mui/system";
import ico1 from "../assets/img/coche.png"
import ico2 from "../assets/img/effacer.png"
import ico3 from "../assets/img/encours.png"
import ico4 from "../assets/img/bleu.jpg"
function UserProfile() {
  let materiel = JSON.parse(localStorage.getItem("materiels")), tokenLocal = JSON.parse(localStorage.getItem("token"))
  const [data, setData] = useState([])
  const [date, setdate] = useState({
    id: '',
    Date: ''
  })
  const [com, setcom] = useState({
    id: '',
    com: ''
  })

  const [val, setval] = useState({
    id: ''
  })
  const [sup, setsup] = useState({
    id: ''
  })
  const [changestat, setchangestat] = useState({
    id: ''
  })

  if (com.com) {
    axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/comretour`, com)
    
  }
  if (date.Date) {
    axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/retour`, date)
  }
  if (val.id) {
    axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/valider`, val)

  }
  if (sup.id) {
    axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/supprimer`,sup)
  }
  if (changestat.id) {
    axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/changerstatutretour`,changestat)
  }


  function comset(id1, com1) {
    setcom({ ...com, com: com1, id: id1 },
    )
  }
  function dateset(id1, date) {
    setdate({ ...date, Date: date, id: id1 },
    )
  }

  function retourner() {

  }
  function supprimer(id,nom,prenom,code){

    Swal.fire({
      title: "êtes vous sur?",
      text: "cet action est irreversible!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText:"retour",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "oui,annuler cette demande!"
    }).then((result) => {
      if (result.isConfirmed) {
        setsup({ ...sup, id:id})
        axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/ajouthistoriques`,
        ({ nom:nom,prenom:prenom,action:`demande materiel ${code} non validé`}))
        Swal.fire({
          title: "supprimé!",
          text: "cette demande a été supprimé.",
          icon: "success"
        })
        window.location.reload();
      }
    });

   
  }

  function valset(id) {
    setval({ ...val, id: id }) 
  }



  useEffect(() => {
    axios.get(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [])

  function valider(id,nom,prenom,code) {

    {


      const { value: text } = Swal.fire({
        title: "validation acquisition materiel",
        showCancelButton: true,
        cancelButtonText:"retour",
        confirmButtonText: "valider demande",
     
        inputValue: text,
    
      })
  
  
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
  
          if (result.isConfirmed) {
         
           valset(id)
           axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/ajouthistoriques`,
           ({ nom:nom,prenom:prenom,action:`demande materiel ${code} validé`}))
           axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/changerstatutmateriel`,
        ({ statut:"utilisé",code:code}))
            window.location.reload();
  
          }
  
  
        });
  
  
    }
  
  }

  function retour(id,value,date){
    comset(id, value)
    dateset(id, date)
  } 
  
  function handlepush(id){

    setchangestat({ ...changestat,id: id })
    window.location.reload();

  }

  function handleClick(id,nom,prenom,code) {


    const { value: text } = Swal.fire({
      title: "Activité de retour de materiel",
  
      showCancelButton: true,
      cancelButtonText:"annuler",
      confirmButtonText: "ajouter commentaire",
      denyButtonText: `confirmer retour`,
      inputValue: text,
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "entrer votre commentaire sur l'emprunt...",
      
    })


      .then((result) => {
        /* Read more about isConfirmed, isDenied below */

        if (result.isConfirmed) {

          
          const today = (new Date()).toISOString();
          retour(id,result.value,today.slice(0, 10))
         
          axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/ajouthistoriques`,
        ({ nom:nom,prenom:prenom,action:`demande retour materiel ${code}validé`}))
        axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/changerstatutmateriel`,
        ({ statut:"libre",code:code}))
          
          window.location.reload();

        } 
         
        


      });


  }

  return (

    <>
      {tokenLocal.role == "administrateur" && (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">liste des demandes</CardTitle>
                  <button>
                    Exporter en CSV
                  </button>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>n°</th>
                        <th>categorie</th>
                        <th>numero identification materiel</th>
                        <th>Nom et Prenom de l'emprunteur</th>
                        <th>localisation</th>
                        <th>date utilisation</th>
                        <th>date retour</th>
                        <th>commentaire retour</th>
                        <th>status</th>

                      </tr>
                    </thead>
                    <tbody>
                      {data.map((mouvement, index) => {
                        return <tr key={index}  >
                          <td>{mouvement.idmouvements}</td>

                          <td>{mouvement.categorie}</td>

                          <td>{mouvement.codemateriel}</td>
                          <td>{mouvement.nompreneur + ' ' + mouvement.prenompreneur}</td>
                          <td>{mouvement.region}</td>

                          <td>{dayjs(`${mouvement.dateutilisation}`).format("DD/MM/YYYY")}</td>
                          {mouvement.dateretour ? (<td> {dayjs(`${mouvement.dateretour}`).format("DD/MM/YYYY")}</td>) :
                            <td style={{ color: 'red' }}>materiel non retourné</td>
                          }

                          <td >{mouvement.commentaireretour}</td>
                          {(mouvement.statututilisation == "retourné") && (<td>retourné<img src={ico4} alt="Logo" width={45} /></td>)}
                          {(mouvement.statututilisation == "utilisé" ) && (mouvement.statutretour) && (<td>utilisé<br/><img src={ico2} width={45} alt="Logo" /><br/><button 
                          onClick={() => { handleClick(mouvement.idmouvements,mouvement.nompreneur,mouvement.prenompreneur,mouvement.codemateriel)}} class="btn btn-success btn-rounded">demande de retour
                         </button></td>)
                         }
                          {(mouvement.statututilisation == "utilisé" ) && (!mouvement.statutretour) && (<td>utilisé<br/><img src={ico1} width={45} alt="Logo" /><br/><button 
                          onClick={() => { handleClick(mouvement.idmouvements,mouvement.nompreneur,mouvement.prenompreneur,mouvement.codemateriel) }}class="btn btn-success btn-rounded">retourner
                         </button></td>)
                         }

                          {(mouvement.statututilisation == "demandé") && (<td>demandé<img src={ico3} width={40} alt="Logo" /><br/><button
                          onClick={() => { valider(mouvement.idmouvements,mouvement.nompreneur,mouvement.prenompreneur,mouvement.codemateriel) }}class="btn btn-success btn-rounded">valider
                         </button> {(mouvement.statututilisation == "demandé") && (<button
                          onClick={() => { supprimer(mouvement.idmouvements,mouvement.nompreneur,mouvement.prenompreneur,mouvement.codemateriel) }} class="btn btn-danger btn-rounded">annuler
                         </button>
                           
                          )}</td>
                           
                          )}
                          



                        </tr>
                      })

                      }

                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

          </Row>

        </div>)}
      
     {tokenLocal.role != "administrateur" && (             
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">liste des demandes</CardTitle>
                <button>
                  Exporter en CSV
                </button>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>n°</th>
                      <th>categorie</th>
                      <th>numero identification materiel</th>


                      <th>date utilisation</th>
                      <th>date retour</th>


                    </tr>
                  </thead>
                  <tbody>
                    {data.filter((mouvement)=>{return (mouvement.prenompreneur==tokenLocal.prenom && mouvement.nompreneur==tokenLocal.nom)}).map((mouvement, index) => {


                      return (<tr key={index} onClick={() => { retourner(mouvement.idmouvements) }} >
                        <td>{mouvement.idmouvements}</td>

                        <td>{mouvement.categorie}</td>

                        <td>{mouvement.codemateriel}</td>
                       


                        <td>{dayjs(`${mouvement.dateutilisation}`).format("DD/MM/YYYY")}</td>
                        <td>{dayjs(`${mouvement.dateretour}`).format("DD/MM/YYYY")}</td>
                        {(mouvement.statututilisation == "retourné") && (<td>retourné<br/><img src={ico4} alt="Logo" width={45} /></td>)}
                          
                          {((mouvement.statututilisation == "utilisé") && (((mouvement.statututilisation == "utilisé") && mouvement.statutretour )?<td>retour en attente<br/><img src={ico1} width={45} alt="Logo" /><br/>
                          </td>:<td>validé<br/><img src={ico1} width={45} alt="Logo" /><br/><button 
                          onClick={() => { handlepush(mouvement.idmouvements) }} class="btn btn-success btn-rounded">retourner
                         </button></td>))}
                         
                          {(mouvement.statututilisation == "demandé") && (<td>en attente de validation<br/><img src={ico3} width={40} alt="Logo" /><br/><button
                          onClick={() => { supprimer(mouvement.idmouvements) }} class="btn btn-danger btn-rounded">annuler
                         </button></td>
                           
                          )}
                      </tr>)



                    })

                    }

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

        </Row>

      </div>


     )}
    </>
     );
}

export default UserProfile;

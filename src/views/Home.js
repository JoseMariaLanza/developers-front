import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button, Nav, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useEffect, useState } from 'react'
const Home = () => {

  const [datos, setDatos] = useState([])


  useEffect(() => {
    fetch('http://localhost:3000/desarolladores')
      .then(response => response.json())
      .then(respuesta => setDatos(respuesta))
  }, [])

  const columnas = [
    {
      name: "ID",
      selector: "id",
      sortable: true
    },
    {
      name: "NOMBRE",
      selector: "name",
      sortable: true
    },
    {
      name: "PROFESION",
      selector: "profesion",
      sortable: true
    },
    { 
     
      name: "PUESTO",
      selector: "puesto",
      sortable: true
      
    },
    {
      name: "TECNOLOGIA",
      selector: "tecnologia",
      sortable: true
    },
    {
      name: "ACTIONS",
      selector: "id",
      sortable: true
    }
  ]


  return (
    <div>
      <div className="container">
        <Breadcrumb className="mb-2">
          <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
          <BreadcrumbItem active>Desarroladores</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <CardHeader>
            <CardTitle tag='h4'>Tabla de Desarrolladores</CardTitle>
            <Link to="/second-page"><Button.Ripple color='primary'> + Agregar</Button.Ripple></Link>
          </CardHeader>
          <CardBody>
            <DataTable
              className="p-3"
              columns={columnas}
              data={datos}
            />
            <b-pagination
              v-model="currentPage"
              hide-goto-end-buttons
            />

          </CardBody>
        </Card>
      </div>

    </div>
  )
}

export default Home

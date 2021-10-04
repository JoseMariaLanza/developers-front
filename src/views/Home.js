import {
  Card, CardHeader, CardBody, CardTitle, CardText, CardFooter,
  Button, Breadcrumb, BreadcrumbItem, Pagination, PaginationItem, PaginationLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import DataTable from 'react-data-table-component'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { Circle, MoreVertical } from 'react-feather'

const Home = () => {

  const [datos, setDatos] = useState([])

  useEffect(() => {
    fetch('http://192.168.1.141:8000/api/v1/developers')
      .then(response => response.json())
      .then(respuesta => setDatos(respuesta))
  }, [])

  const columnas = [
    {
      name: "NOMBRE",
      selector: "name",
      sortable: true
    },
    {
      name: "PROFESION",
      selector: "profession",
      sortable: true
    },
    {

      name: "PUESTO",
      selector: "position",
      sortable: true

    },
    {
      name: "TECNOLOGIA",
      selector: "technology",
      sortable: true
    },
    {
      name: "ACTIONS",
      selector: 'id',
      button: true,
      cell: () => {
        return (
          <UncontrolledDropdown >
            <DropdownToggle className="nav-link" color="flat" >
              <MoreVertical />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link to="/editar">Editar</Link>
              </DropdownItem>
              <DropdownItem>Eliminar</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )
      }
    }
  ]


  return (
    <div>
      <div className="container">
        <Breadcrumb className="mb-2">
          <BreadcrumbItem><a href="home"><Circle /></a></BreadcrumbItem>
          <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
          <BreadcrumbItem active>Desarroladores</BreadcrumbItem>
        </Breadcrumb>
        <Card >
          <CardHeader className="border">
            <CardTitle>Tabla de Desarrolladores</CardTitle>
            <Link to="/second-page"><Button.Ripple color='primary'> + Agregar</Button.Ripple></Link>
          </CardHeader>
          <CardBody className="border">
            <DataTable
              columns={columnas}
              data={datos.data}
              selectableRows
            />
            <b-pagination
              v-model="currentPage"
              hide-goto-end-buttons
            />

          </CardBody>
          <CardFooter className="d-flex justify-content-between border
          ">
            <div><CardText className="text-muted">Mostrando 1 to 3 entradas</CardText></div>

            <Pagination >
              <PaginationItem disabled>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink href="#">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem disabled>
                <PaginationLink next href="#" />
              </PaginationItem>
            </Pagination>
          </CardFooter>
        </Card>
      </div>

    </div>
  )
}

export default Home

import {
  Card, CardHeader, CardBody, CardTitle, CardText, CardFooter,
  Form, Button, Breadcrumb, BreadcrumbItem, Pagination, PaginationItem, PaginationLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import DataTable from 'react-data-table-component'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { Home as HomeIcon, MoreVertical } from 'react-feather'

const Home = () => {

  const [datos, setDatos] = useState([])

  useEffect(() => {
    fetch('http://192.168.1.141:8000/api/v1/developers')
      .then(response => response.json())
      .then(respuesta => setDatos(respuesta))
  }, [])

  const columnas = [
    {
      name: "id",
      selector: 'id',
      sortable: true,
      cell: row => row.id
    },
    {
      name: "NOMBRE",
      selector: 'name',
      sortable: true,
      cell: row => row.name
    },
    {
      name: "PROFESIÓN",
      selector: "profession",
      sortable: true,
      cell: row => row.profession
    },
    {

      name: "PUESTO",
      selector: "position",
      sortable: true,
      cell: row => row.position

    },
    {
      name: "TECNOLOGÍA",
      selector: "technology",
      sortable: true,
      cell: row => row.technology
    },
    {
      name: "ACTIONS",
      selector: 'id',
      button: true,
      cell: (row) => {
        const developer = {
          id: row.id,
          name: row.name,
          profession: row.profession,
          position: row.position,
          technology: row.technology
        }

        const handlerDelete = (id) => {
          fetch(`http://192.168.1.141:8000/api/v1/developers/${id}`, {
            method: 'DELETE' // or 'PUT'
          }).then(res => res.json())
        }

        return (
          <UncontrolledDropdown >
            <DropdownToggle className="nav-link" color="flat" >
              <MoreVertical />
            </DropdownToggle>
            <DropdownMenu>
                <Link className="dropdown-item"
                  to={{
                    pathname: `/editar/${developer.id}`,
                    state: developer
                  }}
                >
                  Editar
                </Link>

              <DropdownItem href="/" onClick={(e) => {
                e.preventDefault()
                handlerDelete(row.id)
              }}>
                Eliminar
              </DropdownItem>
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
          <BreadcrumbItem><a href="home"><HomeIcon size={20}/></a></BreadcrumbItem>
          <BreadcrumbItem><a href="home">Home</a></BreadcrumbItem>
          <BreadcrumbItem active>Desarroladores</BreadcrumbItem>
        </Breadcrumb>
        <Card >
          <CardHeader className="border">
            <CardTitle>Tabla de Desarrolladores</CardTitle>
            <Link to="/agregar-desarrollador"><Button.Ripple color='primary'> + Agregar</Button.Ripple></Link>
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

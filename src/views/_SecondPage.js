
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Form, Button, Input, Label, Row, FormGroup, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import { Circle } from 'react-feather'


const SecondPage = () => {

  const [puesto, setPuesto] = useState([])

  useEffect(() => {
    fetch('http://localhost:3003/Puestos')
      .then(response => response.json())
      .then(pues => setPuesto(pues))
  }, [])

  const [tecno, setTecno] = useState([])

  useEffect(() => {
    fetch('http://localhost:3004/Tecnologia')
      .then(response => response.json())
      .then(tec => setTecno(tec))
  }, [])

  const { register, errors, handleSubmit } = useForm()

  const tabla = (data) => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    // fetch('https://reqres.in/api/posts', requestOptions)
    //   .then(response => response.json())
    //   .then(data => setState({ postId: data.id }))
  }

  return (
    <div className="container">
      <Breadcrumb className="mb-2">
        <BreadcrumbItem><a href="home"><Circle /></a></BreadcrumbItem>
        <BreadcrumbItem><a href="home">Home</a></BreadcrumbItem>
        <BreadcrumbItem active><a href="#">Desarrolladores</a></BreadcrumbItem>
        <BreadcrumbItem active>Editar</BreadcrumbItem>
      </Breadcrumb>
      <Card >
        <CardHeader className="border">
          <CardTitle tag='h4'>Agregar nuevo Desarrollador</CardTitle>
        </CardHeader>
        <Form onSubmit={handleSubmit(tabla)}>
          <CardBody className="border">
            <div className="d-flex justify-content-center mr-4 mb-4">
              <div className="col-4 mr-5 mt-2">
                <FormGroup>
                  <Label for="name">Nombre</Label>
                  <Input type="text" name="name" id="exampleEmail" placeholder="Nombre" />
                </FormGroup>
                <FormGroup>
                  <Label for="name">Profesion</Label>
                  <Input type="text" name="name" id="exampleEmail" placeholder="Profesion" />
                </FormGroup>
                <FormGroup>
                  <Label for="name">Tecnologia</Label>
                  <Select options={tecno} placeholder="Tecnologia" />
                </FormGroup>
                <FormGroup>
                  <Label for="name">Puesto</Label>
                  <Select options={puesto} placeholder="Puestos" />
                </FormGroup>
              </div>
              <div className="d-flex justify-content-around">
                <Link to="/home"><Button.Ripple className="border border-primary" color="flat-primary">Cancelar</Button.Ripple></Link>
                <Button.Ripple color='primary' type="submit">Agregar</Button.Ripple>
              </div>
            </div>
          </CardBody>
        </Form>
      </Card>
    </div>
  )
}

export default SecondPage
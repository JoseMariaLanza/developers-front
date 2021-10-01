
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Form, Button, Input, Label, Row, FormGroup, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'

const SecondPage = () => {

  const [puesto, setPuesto] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/Puesto')
      .then(response => response.json())
      .then(pues => setPuesto(pues))
  }, [])

  const [tecno, setTecno] = useState([])

  useEffect(() => {
    fetch('http://localhost:3002/tecnologia')
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
        <BreadcrumbItem><a href="home">Home</a></BreadcrumbItem>
        <BreadcrumbItem active><a href="#">Desarrolladores</a></BreadcrumbItem>
        <BreadcrumbItem active>Editar</BreadcrumbItem>
      </Breadcrumb>
      <Card >
        <CardHeader>
          <CardTitle tag='h4'>Agregar nuevo Desarrollador</CardTitle>
        </CardHeader>
          <Form onSubmit={handleSubmit(tabla)}>
        <CardBody>
            <div className="d-flex justify-content-center mr-4 mb-4">
              <div className="col-4 mr-5 mt-2">
                <FormGroup>
                  <Label for="name">Nombre</Label>
                  <Input type="text" name="name" id="exampleEmail" placeholder="Nombre" />
                </FormGroup>
              </div>
              <div className="col-4 mt-2">
                <FormGroup>
                  <Label for="name">Profesion</Label>
                  <Input type="text" name="name" id="exampleEmail" placeholder="Profesion" />
                </FormGroup>
              </div>
            </div>
            <div className="d-flex mt-3 justify-content-center mr-4">
              <div className="col-4">
                <FormGroup>
                  <Label for="name">Tecnologia</Label>
                  <Select options={tecno} placeholder="Tecnologia" />
                </FormGroup>
              </div>
              <div className="col-4 ml-5">
                <FormGroup>
                  <Label for="name">Puesto</Label>
                  <Select options={puesto} placeholder="Puestos" />
                </FormGroup>
              </div>
            </div>
      <Row className="d-flex justify-content-around">
        <Link to="/home"><Button.Ripple className="border border-primary" color="flat-primary">Cancelar</Button.Ripple></Link>
        <Button.Ripple color='primary' type="submit">Agregar</Button.Ripple>
      </Row>
        </CardBody>
          </Form>
      </Card>
    </div>
  )
}

export default SecondPage
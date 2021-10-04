
import { Card, CardHeader, CardBody, CardTitle, Form, Button, Input, Label, Row, FormGroup, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Circle } from 'react-feather'

const Editar = () => {

  const [position, setPuesto] = useState([])

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

  const { register, handleSubmit, setValue } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    axios.post('http://192.168.1.141:8000/api/v1/developers', data)
    .then(res => {
      console.log(res)
      console.log(res.data)
    })
  }

  return (
    <div className="container">
      <Breadcrumb className="mb-2">
      <BreadcrumbItem><a href="home"><Circle /></a></BreadcrumbItem>
        <BreadcrumbItem><a href="home">Home</a></BreadcrumbItem>
        <BreadcrumbItem active><a href="#">Desarrolladores</a></BreadcrumbItem>
        <BreadcrumbItem active>Editar</BreadcrumbItem>
      </Breadcrumb>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="border">
          <Breadcrumb>
        <BreadcrumbItem>Editar</BreadcrumbItem>
        <BreadcrumbItem active>Max</BreadcrumbItem>
      </Breadcrumb>
          </CardHeader>
          <CardBody className="border">
            <div className="justify-content-center container">
              <div className="d-flex flex-wrap justify-content-center my-2">
                <FormGroup className="col-6 my-2">
                  <Label for="name">Nombre</Label>
                  <Input type="text" name="name" placeholder="Nombre" />
                </FormGroup>
                <FormGroup className="col-6 my-2">
                  <Label for="name">Profesion</Label>
                  <Input type="text" name="name" placeholder="Profesion" />
                </FormGroup>
                <FormGroup className="col-6 ms-auto">
                  <Label for="name">Tecnologia</Label>
                  <Select options={tecno} placeholder="Tecnologia" />
                </FormGroup>
                <FormGroup className="col-6 ms-auto">
                  <Label for="name">Puesto</Label>
                  <Select options={position} placeholder="Puestos" />
                </FormGroup>
              </div>
              <div className="d-flex justify-content-between mx-1">
                <Link to="/home"><Button.Ripple className="border border-primary" color="flat-primary">Cancelar</Button.Ripple></Link>
                <Button.Ripple color='primary' type="submit">Editar</Button.Ripple>
              </div>
            </div>
          </CardBody>
        </Card>
      </Form>
    </div>
  )
}

export default Editar

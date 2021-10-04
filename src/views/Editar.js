
import { Card, CardHeader, CardBody, CardTitle, Form, Button, Input, Label, Row, FormGroup, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Circle } from 'react-feather'

const Editar = (props) => {
  const developer = props.location.state

  const [datos, setDatos] = useState([])

  useEffect((id) => {
    fetch(`http://192.168.1.141:8000/api/v1/developers/${id}`)
      .then(response => response.json())
      .then(respuesta => setDatos(respuesta))
  }, [])

  const [position, setPuesto] = useState([])

  useEffect(() => {
    fetch('http://localhost:3003/Puestos')
      .then(response => response.json())
      .then(pues => setPuesto(pues))
  }, [])

  const [technology, setTechnology] = useState([])

  useEffect(() => {
    fetch('http://localhost:3004/Tecnologia')
      .then(response => response.json())
      .then(tech => setTechnology(tech))
  }, [])
  //console.log('technology', technology)
  const { register, handleSubmit, setValue } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    // axios.post('http://192.168.1.141:8000/api/v1/developers', data)
    //   .then(res => {
    //     console.log(res)
    //     console.log(res.data)
    //   })
  }

  return (
    <div>
      <div className="container">
        <Breadcrumb className="mb-2">
          <BreadcrumbItem><a href="home"><Circle /></a></BreadcrumbItem>
          <BreadcrumbItem><a href="home">Home</a></BreadcrumbItem>
          <BreadcrumbItem active><a href="#">Desarrolladores</a></BreadcrumbItem>
          <BreadcrumbItem active>Editar</BreadcrumbItem>
        </Breadcrumb>
        <Form>
          <Card>
            <CardHeader className="border">
              <Breadcrumb >
                <BreadcrumbItem>Editar</BreadcrumbItem>
                <BreadcrumbItem active>{developer.name}</BreadcrumbItem>
              </Breadcrumb>
            </CardHeader>
            <CardBody className="border">
              <div className="justify-content-center container">
                <div className="d-flex flex-wrap justify-content-center my-2">
                  <FormGroup className="col-6 my-2">
                    <Label for="name">Nombre</Label>
                    <Input type="text" name="name" placeholder="Nombre" value={developer.name} />
                  </FormGroup>
                  <FormGroup className="col-6 my-2">
                    <Label for="name">Profesion</Label>
                    <Input type="text" name="name" placeholder="Profesion" value={developer.profession} />
                  </FormGroup>
                  <FormGroup className="col-6 ms-auto">
                    <Label for="name">Tecnologia</Label>
                    <Select options={technology} placeholder="Tecnologia" name="technology"
                      ref={
                        register('technology')
                      }
                      defaultValue={() => {
                        setValue('technology', developer.technology)
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="col-6 ms-auto">
                    <Label for="name">Puesto</Label>
                    <Select options={position} placeholder="Puestos" name="position" />
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
    </div>
  )
}

export default Editar

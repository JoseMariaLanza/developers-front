
import { Card, CardHeader, CardBody, CardTitle, Form, Button, Input, Label, Row, FormGroup, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import {
  BrowserRouter as Router, Switch, Route, Link, useHistory
} from "react-router-dom"
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Circle } from 'react-feather'

const Editar = (props) => {
  const developer = props.location.state
  const currentPosition = {
    value: developer.position,
    label: developer.position
  }
  const currentTechnology = {
    value: developer.technology,
    label: developer.technology
  }

  const [datos, setDatos] = useState([])

  useEffect((id) => {
    fetch(`http://192.168.1.141:8000/api/v1/developers/${id}`)
      .then(response => response.json())
      .then(respuesta => setDatos(respuesta))
  }, [])

  const [position, setPuesto] = useState([])

  useEffect(() => {
    fetch('http://localhost:3003/positions')
      .then(response => response.json())
      .then(data => setPuesto(data))
  }, [])

  const [technology, setTechnology] = useState([])

  useEffect(() => {
    fetch('http://localhost:3004/technologies')
      .then(response => response.json())
      .then(data => setTechnology(data))
  }, [])

  const history = useHistory()
  const { register, handleSubmit, setValue } = useForm()

  const onSubmit = () => {
    console.log(developer)
    axios.put(`http://192.168.1.141:8000/api/v1/developers/${developer.id}`, developer)
      .then(res => {
        console.log("res: ", res)
        console.log("res.data: ", res.data)
        if (res.data.success) {
          history.push('/home')
        }
      })
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
        <Form onSubmit={handleSubmit(onSubmit)}>
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
                    <Input type="text" name="name" placeholder="Nombre"
                    ref={
                      register('name')
                    }
                    defaultValue={developer.name}
                    onChange={(e) => {
                      developer.name = e.target.value
                    }}
                    />
                  </FormGroup>
                  <FormGroup className="col-6 my-2">
                    <Label for="name">Profesion</Label>
                    <Input type="text" name="name" placeholder="Profesion"
                    ref={
                      register('profession')
                    }
                    defaultValue={developer.profession}
                    onChange={(e) => {
                      developer.profession = e.target.value
                      // setValue('profession', e.target.value)
                    }}
                    />
                  </FormGroup>
                  <FormGroup className="col-6 ms-auto">
                    <Label for="name">Puesto</Label>
                    <Select options={position} placeholder="Puestos" name="position"
                      ref={
                        register('position')
                      }
                      defaultValue={currentPosition}
                      onChange={(e) => {
                        developer.position = e.label
                        setValue('position', e.label)
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="col-6 ms-auto">
                    <Label for="name">Tecnologia</Label>
                    <Select options={technology} placeholder="Tecnología" name="technology"
                      ref={
                        register('technology')
                      }
                      defaultValue={currentTechnology}
                      onChange={(e) => {
                        developer.technology = e.label
                        setValue('technology', e.label)
                      }}
                    />
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

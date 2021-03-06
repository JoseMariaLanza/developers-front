
import { Card, CardHeader, CardBody, CardTitle, Form, Button, Input, Label, Row, FormGroup, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import {
  BrowserRouter as Router, Switch, Route, Link, useHistory
} from "react-router-dom"
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Circle } from 'react-feather'
import { CustomReactSelect } from './CustomReactSelect'

const SecondPage = () => {

  const [position, setPuesto] = useState([])

  useEffect(() => {
    fetch('http://localhost:3003/positions')
      .then(response => response.json())
      .then(position => setPuesto(position))
  }, [])

  const [tech, setTecno] = useState([])

  useEffect(() => {
    fetch('http://localhost:3004/technologies')
      .then(response => response.json())
      .then(tech => setTecno(tech))
  }, [])

  const history = useHistory()
  const { register, handleSubmit, setValue } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    axios.post('http://localhost:8000/api/v1/developers', data)
      .then(res => {
        console.log("res: ", res)
        console.log("res.data: ", res.data)
        if (res.data.success) {
          history.push('/home')
        }
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
            <CardTitle className="">Agregar nuevo Desarrollador</CardTitle>
          </CardHeader>
          <CardBody className="border">
            <div className="justify-content-center container">
              <div className="d-flex flex-wrap justify-content-center my-2">
                <FormGroup className="col-6 my-2">
                  <Label for="name">Nombre</Label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nombre"
                    ref={
                      register({
                        required: { value: true, message: 'Este campo es obligatorio' }
                      })
                    }
                  />
                </FormGroup>
                <FormGroup className="col-6 my-2">
                  <Label for="profession">Profesion</Label>
                  <input
                    className="form-control"
                    type="text"
                    name="profession"
                    id="profession"
                    placeholder="profession"
                    ref={
                      register({
                        required: { value: true, message: 'Este campo es obligatorio' }
                      })
                    } />
                </FormGroup>
                <FormGroup className="col-6 ms-auto">
                  <Label for="position">Puesto</Label>
                  <CustomReactSelect
                    options={position}
                    placeholder="Puesto"
                    id="position"
                    ref={
                      register('position')
                    }
                    onChange={(e) => {
                      setValue('position', e.label)
                    }}
                  />
                </FormGroup>
                <FormGroup className="col-6 ms-auto">
                  <Label for="technology">Tecnologia</Label>
                  <CustomReactSelect
                    options={tech}
                    placeholder="Tecnolog??a"
                    id="technology"
                    ref={
                      register('technology')
                    }
                    onChange={(e) => {
                      setValue('technology', e.label)
                    }}
                  />
                </FormGroup>
              </div>
              <div className="d-flex justify-content-between mx-1">
                <Link to="/home"><Button.Ripple className="border border-primary" color="flat-primary">Cancelar</Button.Ripple></Link>
                <Button.Ripple color='primary' type="submit">Agregar</Button.Ripple>
              </div>
            </div>
          </CardBody>
        </Card>
      </Form>
    </div>
  )
}

export default SecondPage

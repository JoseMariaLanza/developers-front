
import { Card, CardHeader, CardBody, CardTitle, Form, Button, Input, Label, Row, FormGroup, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Circle } from 'react-feather'

const SecondPage = () => {

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
                  <Label for="technology">Tecnologia</Label>
                  <Select
                    options={tecno}
                    placeholder="Tecnologia"
                    id="technology"
                    ref={
                      register('technology')
                    }
                    onChange={(e) => {
                      setValue('technology', e.label)
                    }

                    }
                  />
                </FormGroup>
                <FormGroup className="col-6 ms-auto">
                  <Label for="position">Puesto</Label>
                  <Select
                    options={position}
                    placeholder="position"
                    id="position"
                    ref={
                      register('position')
                    }
                    onChange={(e) => {
                      setValue('position', e.label)
                    }
                    }
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

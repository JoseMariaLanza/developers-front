
import { Card, CardHeader, CardBody, CardTitle, Form, Button, Input, Label, Row, FormGroup, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const SecondPage = () => {

  const [position, setPuesto] = useState([])

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
        <BreadcrumbItem><a href="home">Home</a></BreadcrumbItem>
        <BreadcrumbItem active><a href="#">Desarrolladores</a></BreadcrumbItem>
        <BreadcrumbItem active>Editar</BreadcrumbItem>
      </Breadcrumb>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card >
          <CardHeader>
            <CardTitle tag='h4'>Agregar nuevo Desarrollador</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="d-flex justify-content-center mr-4 mb-4">
              <div className="col-4 mr-5 mt-2">
                <FormGroup>
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
              </div>
              <div className="col-4 mt-2">
                <FormGroup>
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
              </div>
            </div>
            <div className="d-flex mt-3 justify-content-center mr-4">
              <div className="col-4">
                <FormGroup>
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
              </div>
              <div className="col-4 ml-5">
                <FormGroup>
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
            </div>
          </CardBody>
        </Card>
        <Row className="d-flex justify-content-around">
          <Link to="/home"><Button.Ripple className="border border-primary" color="flat-primary">Cancelar</Button.Ripple></Link>
          <Button.Ripple color='primary' type="submit">Agregar</Button.Ripple>
        </Row>
      </Form>
    </div>
  )
}

export default SecondPage
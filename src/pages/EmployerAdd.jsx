import React, { useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Modal, Segment, Table } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import * as Yup from "yup"
import { Formik, useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import EmployerService from '../services/EmployerService'


export default function EmployerAdd() {

    const [open, setOpen] = useState(false)

    const [invalid, setInvalid] = useState(false)

    const [message, setMessage] = useState("")

    let employerService = new EmployerService()

    const initialValues = {
        id: 0,
        email: "",
        password: "",
        companyName: "",
        webSite: "",
        phoneNumber: "",
        confirmed: false
    }

    const validationSchema = Yup.object({
        email: Yup.string().required("Zorunlu Alan"),
        password: Yup.string().required("Zorunlu Alan"),
        companyName: Yup.string().required("Zorunlu Alan"),
        webSite: Yup.string().required("Zorunlu Alan"),
        phoneNumber: Yup.string().required("Zorunlu Alan")
    })

    const onSubmit = (values) => {
        employerService.add(values).then((result) => {
            if (result.data.success) {
                setOpen(true)
                window.location.replace("/")
            }
            else {
                setInvalid(true)
                setMessage(result.data.message)
            }
        })
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit
    })

    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value)
    }



    return (
        <div>
            <Container className='content'>
                <div style={{ marginTop: "10%" }}>
                    <Headline content="Kayıt ol" />
                </div>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width="6" >
                            <Table color='orange' >
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Formik>
                                                <Form onSubmit={formik.handleSubmit}>
                                                  
                                                    <div style={{ margin: "2%" }}>
                                                        <Form.Input
                                                            name="email"
                                                            label="Email"
                                                            onChange={(event, data) => handleChange("email", data.value)}
                                                            value={formik.values.email}
                                                        />
                                                        {
                                                            formik.errors.email && formik.touched.email &&
                                                            <div style={{ margin: "2%" }}>
                                                                <Label basic color='red' pointing content={formik.errors.email} />
                                                            </div>
                                                        }
                                                        <Form.Input
                                                            name="password"
                                                            label="Parola"
                                                            type='password'
                                                            onChange={(event, data) => handleChange("password", data.value)}
                                                            value={formik.values.password}
                                                        />
                                                        {
                                                            formik.errors.password && formik.touched.password &&
                                                            <div style={{ margin: "2%" }}>
                                                                <Label basic color='red' pointing content={formik.errors.password} />
                                                            </div>
                                                        }
                                                        <Form.Input
                                                            name="companyName"
                                                            label="Firma Adı"
                                                            onChange={(event, data) => handleChange("companyName", data.value)}
                                                            value={formik.values.companyName}
                                                        />
                                                        {
                                                            formik.errors.companyName && formik.touched.companyName &&
                                                            <div style={{ margin: "2%" }}>
                                                                <Label basic color='red' pointing content={formik.errors.companyName} />
                                                            </div>
                                                        }
                                                        <Form.Input
                                                            name="webSite"
                                                            label="Website"
                                                            onChange={(event, data) => handleChange("webSite", data.value)}
                                                            value={formik.values.webSite}
                                                        />
                                                        {
                                                            formik.errors.webSite && formik.touched.webSite &&
                                                            <div style={{ margin: "2%" }}>
                                                                <Label basic color='red' pointing content={formik.errors.webSite} />
                                                            </div>
                                                        }
                                                        <Form.Input
                                                            name="phoneNumber"
                                                            label="Telefon"
                                                            onChange={(event, data) => handleChange("phoneNumber", data.value)}
                                                            value={formik.values.phoneNumber}
                                                        />
                                                        {
                                                            formik.errors.phoneNumber && formik.touched.phoneNumber &&
                                                            <div style={{ margin: "2%" }}>
                                                                <Label basic color='red' pointing content={formik.errors.phoneNumber} />
                                                            </div>
                                                        }
                                                    </div>
                                                    <div style={{ textAlign: "center" }}>
                                                        <Button type="submit" color='green' content="Kayıt Ol" />
                                                        <Button color='facebook' content="Sıfırla" onClick={() => window.location.reload()} />
                                                    </div>
                                                    {
                                                        invalid &&
                                                        <div style={{ margin: "5%", textAlign: "center" }} >
                                                            <Label basic color='red' content={message} />
                                                        </div>

                                                    }
                                                </Form>
                                            </Formik>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Modal
                    basic
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    size='small'
                >
                    <Segment textAlign='center'>
                        <Header>
                            <Icon name='check' color='green' />
                        </Header>
                        <Modal.Content>
                            <Segment textAlign='center'>
                                <Header as="h2" content="Kayıt Olundu. Giriş Yapın" />
                            </Segment>
                        </Modal.Content>
                    </Segment>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={() => setOpen(false)} as={NavLink} to="/login" >
                            <Icon name='remove' /> Kapat
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Container>
        </div>
    )
}

import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import { Button, Container, Form, Grid, Header, Icon, Label, Modal, Segment, Table } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import * as Yup from "yup"
import { NavLink } from 'react-router-dom'
import StaffService from '../services/StaffService'

export default function StaffAdd() {

    const [open, setOpen] = useState(false)

    let staffService = new StaffService()

    const initialValues = {
        id: 0,
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().required("Zorunlu Alan"),
        password: Yup.string().required("Zorunlu Alan"),
        firstName: Yup.string().required("Zorunlu Alan"),
        lastName: Yup.string().required("Zorunlu Alan")
    })

    const onSubmit = (values) => {
        staffService.add(values).then()
        setOpen(true)
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
                    <Headline content="Kayıt Ol" />
                </div>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width="6">
                            <Table color="yellow" >
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
                                                            <div style={{ margin: "" }}>
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
                                                            name="firstName"
                                                            label="Ad"
                                                            onChange={(event, data) => handleChange("firstName", data.value)}
                                                            value={formik.values.firstName}
                                                        />
                                                        {
                                                            formik.errors.firstName && formik.touched.firstName &&
                                                            <div style={{ margin: "" }}>
                                                                <Label basic color='red' pointing content={formik.errors.firstName} />
                                                            </div>
                                                        }
                                                        <Form.Input
                                                            name="lastName"
                                                            label="Soyad"
                                                            onChange={(event, data) => handleChange("lastName", data.value)}
                                                            value={formik.values.lastName}
                                                        />
                                                        {
                                                            formik.errors.lastName && formik.touched.lastName &&
                                                            <div style={{ margin: "" }}>
                                                                <Label basic color='red' pointing content={formik.errors.lastName} />
                                                            </div>
                                                        }
                                                    </div>
                                                    <div style={{ textAlign: "center" }}>
                                                        <Button type="submit" color='green' content="Kayıt Ol" />
                                                        <Button color='facebook' content="Sıfırla" onClick={() => window.location.reload()} />
                                                    </div>
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

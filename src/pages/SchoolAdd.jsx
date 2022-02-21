import React from 'react'
import SchoolService from '../services/SchoolService'
import * as Yup from "yup"
import { useState } from 'react'
import { Formik, useFormik } from 'formik'
import { Button, Container, Form, Grid, Header, Icon, Label, Modal, Segment, Table } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export default function () {

    let { candidateId } = useParams()

    const initialValues = {
        id: 0,
        schoolName: "",
        department: "",
        yearOfStart: "",
        graduationYear: "",
        candidate: {
            id: 0
        },
        completed: true
    }

    const [open, setOpen] = useState(false)

    const [schools, setSchools] = useState([])
    let schoolService = new SchoolService()

    useEffect(() => {
        schoolService.getByCandidateIdSorted(candidateId).then((result) => setSchools(result.data.data))
    }, [])


    const handleModel = (value) => {
        setOpen(value)
    }


    const validationSchema = Yup.object({
        schoolName: Yup.string().required("Zorunlu alan"),
        department: Yup.string().required("Zorunlu alan"),
        yearOfStart: Yup.string().required("Zorunlu alan")
    })

    const onSubmit = (values) => {
        values.candidate.id = candidateId
        schoolService.add(values).then()
        handleModel(true)
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
                <div style={{ paddingTop: "12%" }}>
                    <Headline content="Eğitim Bilgisi Ekle" />
                </div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width="6">
                        <Header content="Daha Önce Eklenilen Okullar" as="h4"/>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Okul Adı</Table.HeaderCell>
                                        <Table.HeaderCell>Bölüm</Table.HeaderCell>
                                        <Table.HeaderCell>Giriş Yılı</Table.HeaderCell>
                                        <Table.HeaderCell>Mezuniyet</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {schools.map((school) => (
                                        <Table.Row key={school.id}>
                                            <Table.Cell>{school.schoolName}</Table.Cell>
                                            <Table.Cell>{school.department}</Table.Cell>
                                            <Table.Cell>{school.yearOfStart}</Table.Cell>
                                            <Table.Cell>{school.graduationYear}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                        <Grid.Column width="8">
                            <Formik>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Group widths="two">
                                        <Form.Input
                                            name="schoolName"
                                            label="Okul Adı"
                                            onChange={(event, data) => handleChange("schoolName", data.value)}
                                            value={formik.values.schoolName}
                                        />
                                        {formik.errors.schoolName && formik.touched.schoolName &&
                                            <span>
                                                <Label basic pointing="left" color='red' content={formik.errors.schoolName} />
                                                <br /><br />
                                            </span>

                                        }
                                        <Form.Input
                                            name="department"
                                            label="Bölüm"
                                            onChange={(event, data) => handleChange("department", data.value)}
                                            value={formik.values.department}
                                        />
                                        {
                                            formik.errors.department && formik.touched.department &&
                                            <span>
                                                <Label basic pointing="left" color='red' content={formik.errors.department} />
                                                <br /><br />
                                            </span>
                                        }
                                    </Form.Group>
                                    <Form.Group widths="equal">

                                        <Form.Input
                                            name="yearOfStart"
                                            label="Başlangıç Yılı"
                                            onChange={(event, data) => handleChange("yearOfStart", data.value)}
                                            value={formik.values.yearOfStart}
                                        />
                                        {
                                            formik.errors.yearOfStart && formik.touched.yearOfStart &&
                                            <span>
                                                <Label basic pointing="left" color='red' content={formik.errors.yearOfStart} />
                                                <br /><br />
                                            </span>
                                        }
                                        <Form.Input
                                            name="graduationYear"
                                            label="Mezuniyet Yılı"
                                            placeholder="Tamamlanmadıysa boş bırakın"
                                            onChange={(event, data) => handleChange("graduationYear", data.value)}
                                            value={formik.values.graduationYear}
                                        />
                                    </Form.Group>
                                    <Button circular type="submit" color="orange" content="Ekle" />
                                    <Button circular color='facebook' content="Sıfırla" onClick={() => window.location.reload()} />
                                </Form>
                            </Formik>
                        </Grid.Column>
                        <Grid.Column width="2">
                            <Button style={{marginTop:"10%"}} color='violet' compact content="Profile Dön" as={NavLink} to={`/candidates/${candidateId}`} />
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
                                <Header as="h2" content="Eklendi" />
                            </Segment>
                        </Modal.Content>
                    </Segment>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={() => setOpen(false)} as={NavLink} to={`/candidates/${candidateId}`}>
                            <Icon name='remove' /> Kapat
                        </Button>
                    </Modal.Actions>
                </Modal>

            </Container>
        </div>
    )
}

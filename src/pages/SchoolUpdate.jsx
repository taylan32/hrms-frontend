import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import SchoolService from '../services/SchoolService'
import * as Yup from "yup"
import { Formik, useFormik } from 'formik'
import { Button, Container, Form, Grid, Header, Icon, Modal, Segment } from 'semantic-ui-react'
import Headline from '../layouts/Headline'


export default function () {


    let { id } = useParams()

    const [open, setOpen] = useState(false)
    const [school, setSchool] = useState({})

    let schoolService = new SchoolService()

    useEffect(() => {
        schoolService.getById(id).then((result) => setSchool(result.data.data))
    }, [])

    const initialValues = {
        id:0,
        schoolName: school.schoolName,
        department: school.department,
        yearOfStart: school.yearOfStart,
        graduationYear: school.graduationYear,
        candidate: {
            id:0
        },
        completed: true
    }

    const validationSchema = Yup.object({
        schoolName: Yup.string().required("Zorunlu Alan"),
        department: Yup.string().required("Zorunlu Alan"),
        yearOfStart: Yup.string().required("Zorunlu Alan")
    })

    const onSubmit = (values) => {
        if (values.schoolName == null) {
            values.schoolName = school.schoolName
        }
        if (values.department == null) {
            values.department = school.department
        }
        if (values.yearOfStart == null) {
            values.yearOfStart = school.yearOfStart
        }
        if (values.graduationYear == null) {
            values.graduationYear = school.graduationYear
        }
        values.id = school.id
        values.candidate.id = school.candidate.id
        schoolService.update(values).then()
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
        <Container className='content'>
            <div style={{ paddingTop: "12%" }}>
                <Headline content="Eğitim Bilgisi Güncelle" />
            </div>

            <Grid>
                <Grid.Row>
                    <Grid.Column width="4" >
                        <div style={{ marginTop: "20%" }}>
                            <Button color='violet' content="Profile Dön" as={NavLink} to={`/candidates/${school.candidate?.id}`} />
                        </div>
                    </Grid.Column>
                    <Grid.Column width="8">
                        <Formik>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group widths="equal">
                                    <Form.Input
                                        name="schoolName"
                                        label="Okul Adı"
                                        placeholder={school.schoolName}
                                        onChange={(event, data) => handleChange("schoolName", data.value)}
                                        value={formik.values.schoolName}
                                    />
                                    <Form.Input
                                        name="department"
                                        label="Bölüm"
                                        placeholder={school.department}
                                        onChange={(event, data) => handleChange("department", data.value)}
                                        value={formik.values.department}
                                    />
                                </Form.Group>
                                <Form.Group widths="two">
                                    <Form.Input
                                        name="yearOfStart"
                                        label="Başlangıç Yılı"
                                        placeholder={school.yearOfStart}
                                        onChange={(event, data) => handleChange("yearOfStart", data.value)}
                                        value={formik.values.yearOfStart}
                                    />
                                    <Form.Input
                                        name="graduationYear"
                                        label="Menuniyet Yılı"
                                        placeholder="Tamamlamadıysanız boş bırakın"
                                        onChange={(event, data) => handleChange("graduationYear", data.value)}
                                        value={formik.values.graduationYear}
                                    />
                                </Form.Group>
                                <Button  circular type="submit"  color='orange'>Güncelle</Button>
                                <Button  circular  color='facebook' content="Sıfırla" onClick={()=>window.location.reload()} />
                            </Form>
                        </Formik>
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
                            <Header as="h2" content="Güncellendi" />
                        </Segment>
                    </Modal.Content>
                </Segment>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpen(false)} >
                        <Icon name='remove' /> Kapat
                    </Button>
                </Modal.Actions>
            </Modal>
        </Container>
    )
}

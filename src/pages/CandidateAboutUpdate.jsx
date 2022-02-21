import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Button, Container, Form, Grid, Header, Icon, Label, Modal, Segment } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import CandidateAboutService from '../services/CandidateAboutService'
import * as Yup from "yup"
import { Formik, useFormik } from 'formik'

export default function CandidateAboutUpdate() {

    let { id } = useParams()

    const [open, setOpen] = useState(false)

    const [candidateAbout, setCandidateAbout] = useState([])
    let candidateAboutServicer = new CandidateAboutService()

    useEffect(() => {
        candidateAboutServicer.getById(id).then(result => setCandidateAbout(result.data.data))
    }, [])

    const initialValues = {
        id: 0,
        candidate: {
            id: 0
        },
        description: ""
    }

    const validationSchema = Yup.object({
        description: Yup.string().required("Zorunlu Alan")
    })

    const onSubmit = (values) => {
        if (values.description == null) {
            values.description = candidateAbout.description
        }
        values.id = id
        values.candidate.id = candidateAbout.candidate.id
        console.log(values)
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
                <Headline content="Açıklama Güncelle" />
            </div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="4">
                        <Button color='violet' content="Profile Dön" as={NavLink} to={`/candidates/${candidateAbout.candidate?.id}`} />
                    </Grid.Column>
                    <Grid.Column width="8">
                        <Formik>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.TextArea
                                    name="description"
                                    label="Açıklama"
                                    placeholder = "Açıklama girin..."
                                    onChange={(event, data) => handleChange("description",data.value)} 
                                    value = {formik.values.description}                                   
                                />
                                {
                                    formik.errors.description && formik.touched.description &&
                                    <span>
                                        <Label basic color='red' pointing content={formik.errors.description} />
                                        <br/><br/>
                                    </span>
                                }
                                <Button circular color='orange' type="submit">Güncelle</Button>
                                <Button circular color='facebook' onClick={()=>window.location.reload()}>Sıfırla</Button>
                            </Form>
                        </Formik>
                    </Grid.Column>
                    <Grid.Column width="4"/>
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
                    <Button basic color='red' inverted onClick={() => setOpen(false), ()=>window.location.reload()} >
                        <Icon name='remove' /> Kapat
                    </Button>
                </Modal.Actions>
            </Modal>
        </Container>

    )
}

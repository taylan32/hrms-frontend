import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { Button, Container, Form, Grid, Header, Icon, Label, Modal, Segment } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import LanguageService from '../services/LanguageService'
import * as Yup from "yup"
import { Formik, useFormik } from 'formik'
import { NavLink } from 'react-router-dom'


export default function LanguageUpdate() {

    let { id } = useParams()

    const [open, setOpen] = useState(false)

    const [language, setLanguage] = useState({})
    let languageService = new LanguageService()

    useEffect(() => {
        languageService.getById(id).then((result) => setLanguage(result.data.data))
    }, [])

    const initialValues = {
        id: 0,
        candidate: {
            id: 0
        },
        language: language.language,
        level: language.level
    }

    const validationSchema = Yup.object({

    })

    const onSubmit = (values) => {
        if (values.language == null) {
            values.language = language.language
        }
        if (values.level == 0) {
            values.level = language.level
        }
        values.id = language.id
        values.candidate.id = language.candidate.id
        languageService.update(values).then()
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



    const languageLevelOptions = [
        { key: 1, text: "Başlangıç Seviyesi", value: 1 },
        { key: 2, text: "Orta Seviye", value: 2 },
        { key: 3, text: "Profesyonel Çalışma Yetkinliği", value: 3 },
        { key: 4, text: "İkinci Dil", value: 4 },
        { key: 5, text: "Ana dil", value: 5 },

    ]

    return (
        <div>
            <Container className='content'>
                <div style={{ marginTop: "12%" }}>
                    <Headline content="Dil Bilgisi Güncelleme" />
                </div>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width="4">
                            <Button content="Profile Dön" color='violet' as={NavLink} to={`/candidates/${language.candidate?.id}`} />
                        </Grid.Column>
                        <Grid.Column width="8">
                            <Formik>
                                <Form onSubmit={formik.handleSubmit}>

                                    <div style={{margin:"2%", width:"40%",marginLeft:"30%"}} >
                                        <Form.Select
                                            name="level"
                                            label={language.language}
                                            options={languageLevelOptions}
                                            placeholder="Dil Seviyesi"
                                            onChange={(event, data) => handleChange("level", data.value)}
                                            value={formik.values.level}
                                        />
                                    </div>
                                    <Button type="submit" color="orange">Güncelle</Button>
                                    <Button color='facebook' content="Sıfırla" onClick={() => window.location.reload()} />
                                </Form>
                            </Formik>
                        </Grid.Column>
                        <Grid.Column />
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
                        <Button basic color='red' inverted onClick={() => setOpen(false), () => window.location.reload()} >
                            <Icon name='remove' /> Kapat
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Container>
        </div>
    )
}

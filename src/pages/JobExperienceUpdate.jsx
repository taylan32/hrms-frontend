import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Button, Container, Form, Grid, Header, Icon, Label, Modal, Segment } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import JobExperienceService from '../services/JobExperienceService'
import * as Yup from "yup"
import { Formik, useFormik } from 'formik'
import JobTitleService from '../services/JobTitleService'

export default function JobExperienceUpdate() {

    let { id } = useParams()

    const [open, setOpen] = useState(false)
    const [jobExperience, setJobExperience] = useState({})
    let jobExperienceService = new JobExperienceService()

    const [jobTitles, setJobTitles] = useState([])
    let jobTitleService = new JobTitleService()

    useEffect(() => {
        jobExperienceService.getById(id).then((result) => setJobExperience(result.data.data))
        jobTitleService.getAll().then((result) => setJobTitles(result.data.data))
    }, [])

    const initialValues = {
        id: 0,
        candidate: {
            id: 0
        },
        workPlaceName: jobExperience.workPlaceName,
        jobTitle: {
            id: 0,
            jobTitle:jobExperience.jobTitle?.jobTitle
        },
        yearOfStart: jobExperience.yearOfStart,
        releaseYear: jobExperience.releaseYear,
        continued: true
    }

    const validationSchema = Yup.object({
    })

    const onSubmit = (values) => {
        if (values.workPlaceName == null) {
            values.workPlaceName = jobExperience.workPlaceName
        }
        if (values.jobTitle.id == 0) {
            values.jobTitle.jobTitle = jobExperience.jobTitle.id
        }
        if (values.yearOfStart == null) {
            values.yearOfStart = jobExperience.yearOfStart
        }
        if (values.releaseYear == null) {
            values.releaseYear = jobExperience.releaseYear
        }
        values.id = jobExperience.id
        values.candidate.id = jobExperience.candidate.id
        jobExperienceService.update(values)
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

    const jobTitleOptions = [{ value: 0, text: "Title" }]
    jobTitles.map((title) => jobTitleOptions.push({
        key: title.id,
        text: title.jobTitle,
        value: title.id
    }))


    return (

        <Container className='content'>
            <div style={{ marginTop: "12%" }}>
                <Headline content="İş Tecrübesi Güncelle" />
            </div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="4">
                        <Button color='violet' content="Profile Dön" as={NavLink} to={`/candidates/${jobExperience.candidate?.id}`} />
                    </Grid.Column>
                    <Grid.Column width="8">
                        <Formik>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group widths="equal">
                                    <Form.Input
                                        name="workPlaceName"
                                        label="Firma Adı"
                                        placeholder={jobExperience.workPlaceName}
                                        onChange={(event, data) => handleChange("workPlaceName", data.value)}
                                        value={formik.values.workPlaceName}
                                    />    
                                    <Form.Select
                                        name="jobTitle"
                                        label="Title"
                                        onChange={(event, data) => handleChange("jobTitle", data.value)}
                                        options={jobTitleOptions}
                                        value={formik.values.jobTitle.id}
                                    /> 
                                </Form.Group>
                                        {
                                            formik.errors.jobTitle?.id && formik.touched.jobTitle && 
                                            <span>
                                                <Label basic color='red' pointing content={formik.errors.jobTitle} />
                                            </span>
                                        }  
                                <Form.Group widths="two">
                                    <Form.Input
                                        name="yearOfStart"
                                        label="Başlangıç Yılı"
                                        placeholder={jobExperience.yearOfStart}
                                        onChange={(event, data) => handleChange("yearOfStart", data.value)}
                                        value={formik.values.yearOfStart}
                                    />
                                    <Form.Input
                                        name="releaseYear"
                                        label="İşten Çıkış Yılı"
                                        onChange={(event, data) => handleChange("releaseYear", data.value)}
                                        placeholder="Devam ediyorsanız boş bırakın"
                                        value={formik.values.releaseYear}
                                    />
                                </Form.Group>
                                <Button  circular type="submit"  color='orange'>Güncelle</Button>
                                <Button  circular  color='facebook' content="Sıfırla" onClick={()=>window.location.reload()} />
                            </Form>
                        </Formik>
                    </Grid.Column>
                    <Grid.Column width="4" />
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

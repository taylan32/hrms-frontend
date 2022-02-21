import React from 'react'
import { useState } from 'react'
import { Button, Container, Divider, Form, Grid, Header, Icon, Label, List, Modal, Segment } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import JobTitleService from '../services/JobTitleService'
import * as Yup from "yup"
import { Formik, useFormik } from 'formik'
import { useEffect } from 'react'

export default function JobTitleAdd() {

    const [open, setOpen] = useState(false)

    const [jobTitles, setJobTitles] = useState([])
    let jobTitleService = new JobTitleService()

    useEffect(() => {
        jobTitleService.getAll().then((result) => setJobTitles(result.data.data))
    }, [])

    const initialValues = {
        id: 0,
        jobTitle: ""
    }

    const validationSchema = Yup.object({
        jobTitle: Yup.string().required("Zorunlu alan")
    })


    const onSubmit = (value) => {

        jobTitleService.add(value).then()
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

    const handleDeleteTitle = (value) => {
        jobTitleService.delete(value).then()
        window.location.reload()
    }



    return (
        <div>
            <Container className='content'>
                <div style={{ paddingTop: "12%" }}>
                    <Headline content="Title Ekle" />
                </div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width="5">
                            <Segment>
                                Daha Önce Eklenmiş Ünvanlar<br />
                                <Divider />
                                <List>
                                    {
                                        jobTitles.map((jobTitle) => (
                                            <List.Item key={jobTitle.id}>
                                                <div style={{paddingBottom:"2%", textAlign:"left"}}>
                                                {jobTitle.jobTitle}
                                                    <Button circular size='mini' floated='right' color='red' content="Sil" onClick={() => handleDeleteTitle(jobTitle)}/>
                                                </div>
                                                     <Divider />
                                            </List.Item>
                                            
                                        ))
                                    }
                                </List>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width="6">
                            <Formik>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Input
                                        name="title"
                                        label="Title"
                                        onChange={(event, data) => handleChange("jobTitle", data.value)}
                                        value={formik.values.jobTitle}
                                    />
                                    {
                                        formik.errors.jobTitle && formik.touched.jobTitle &&
                                        <span>
                                            <Label basic pointing color='red' content={formik.errors.jobTitle} />
                                            <br /><br />
                                        </span>
                                    }
                                    <Button type="submit" color='green' content="Ekle" />
                                    <Button color='facebook' content="Sıfırla" onClick={() => window.location.reload()} />
                                </Form>
                            </Formik>
                        </Grid.Column>
                        <Grid.Column width="5" />
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
                        <Button basic color='red' inverted onClick={() => setOpen(false)} onClick={() => window.location.reload()}>
                            <Icon name='remove' /> Kapat
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Container>
        </div>
    )
}

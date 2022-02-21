import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Container, Divider, Form, Grid, Header, Icon, Label, List, Modal, Segment } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import CityService from '../services/CityService'
import * as Yup from "yup"
import { Formik, useFormik } from 'formik'

export default function CityAdd() {

    const [open, setOpen] = useState(false)

    const [cities, setCities] = useState([])
    let cityService = new CityService()

    useEffect(() => {
        cityService.getAll().then((result) => setCities(result.data.data))
    })

    const initalValues = {
        id: 0,
        cityName: ""
    }

    const validationSchema = Yup.object({
        cityName: Yup.string().required("Zorunlu Alan")
    })

    const onSubmit = (values) => {
        cityService.add(values).then()
        setOpen(true)
    }
    const formik = useFormik({
        initialValues: initalValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit
    })


    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value)
    }

    const handleDeleteCity = (values) => {
        cityService.delete(values).then()
        window.location.reload()
    }


    return (
        <Container className='content'>
            <div style={{marginTop:"12%"}}>
                <Headline content="Şehir Ekle" />
            </div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="4">
                        <Segment style={{marginTop:"8%"}}>
                            Daha Önce Eklenmiş Şehirler
                            <Divider />
                            <List>
                                {cities.map((city) => (
                                    <List.Item key={city.id}>
                                        <div style={{ paddingBottom: "2%", textAlign: "left" }}>
                                            {city.cityName}
                                            <Button circular size='mini' floated='right' color='red' content="Sil" onClick={() => handleDeleteCity(city)} />
                                        </div>
                                        <Divider />
                                    </List.Item>
                                ))
                                }
                            </List>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width="1" />
                    <Grid.Column width="5">
                        <Formik>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Input
                                    name="cityName"
                                    label="Şehir"
                                    placeHolder="Şehir adı..."
                                    onChange={(event, data) => handleChange("cityName", data.value)}
                                    value={formik.values.cityName}
                                />
                                {
                                    formik.errors.cityName && formik.touched.cityName &&
                                    <div>
                                        <Label basic color='red' pointing content={formik.errors.cityName} />
                                    </div>
                                }
                                <Button type="submit" color='green' content="Ekle" />
                                <Button color='facebook' content="Sıfırla" onClick={() => window.location.reload()} />
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
    )
}

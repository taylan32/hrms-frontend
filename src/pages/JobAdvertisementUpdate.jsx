import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Button, Container, Form, Grid, Header, Icon, Label, Modal, Segment } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import JobAdvertisementService from '../services/JobAdvertisementService'
import * as Yup from "yup"
import CityService from '../services/CityService'
import JobTitleService from '../services/JobTitleService'
import WorkingTimeService from '../services/WorkingTimeService'
import WorkingTypeService from '../services/WorkingTypeService'
import { Formik, useFormik } from 'formik'

export default function JobAdvertisementUpdate() {

    let { id } = useParams()

    const [open, setOpen] = useState(false)
    const [jobAdvertisement, setJobAdvertisement] = useState({})
    let jobAdvertisementService = new JobAdvertisementService()

    const [cities, setCities] = useState([])
    let cityService = new CityService()

    const [jobTitles, setJobTitles] = useState([])
    let jobTitleService = new JobTitleService()

    const [workingTimes, setWorkingTimes] = useState([])
    let workingTimeService = new WorkingTimeService()

    const [workingTypes, setWorkingTypes] = useState([])
    let workingTypeService = new WorkingTypeService()

    useEffect(() => {
        jobAdvertisementService.getById(id).then((result) => setJobAdvertisement(result.data.data))
        cityService.getAll().then((result) => setCities(result.data.data))
        jobTitleService.getAll().then((result) => setJobTitles(result.data.data))
        workingTimeService.getAll().then((result) => setWorkingTimes(result.data.data))
        workingTypeService.getAll().then((result) => setWorkingTypes(result.data.data))
    }, [])

    const initialValues = {
        id: 0,
        employer: {
            id: 0
        },
        city: {
            id: 0
        },
        jobTitle: {
            id: 0
        },
        description: jobAdvertisement.description,
        minSalary: jobAdvertisement.minSalary,
        maxSalary: jobAdvertisement.maxSalary,
        amount: jobAdvertisement.amount,
        deadLine: jobAdvertisement.deadLine,
        workingTime: {
            id: 0
        },
        workingType: {
            id: 0
        }
    }

    const validationSchema = Yup.object({
        deadLine: Yup.date().required("Zorunlu Alan")
    })

    const onSubmit = (values) => {
        if (values.cityName == null) {
            values.city.id= jobAdvertisement.city.id
        }
        if (values.jobTitle == null) {
            values.jobTitle.id = jobAdvertisement.jobTitle.id
        }
        if (values.description == null) {
            values.description = jobAdvertisement.description
        }
        if (values.amount == null) {
            values.amount = jobAdvertisement.amount
        }
        if (values.deadLine == null) {
            values.deadLine = jobAdvertisement.deadLine
        }
        if (values.workingTime == null) {
            values.workingTime.id = jobAdvertisement.workingTime.id
        }
        if (values.workingType == null) {
            values.workingType.id = jobAdvertisement.workingType.id
        }
        values.id = jobAdvertisement.id
        values.employer.id = jobAdvertisement.employer.id
        jobAdvertisementService.update(values).then()
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

    const cityOptions = [{ id: 0, text: "Şehirler" }]
    cities.map((city) => cityOptions.push({
        key: city.id,
        text: city.cityName,
        value: city.id
    }))

    const jobTitleOptions = [{ id: 0, text: "Title" }]
    jobTitles.map((title) => jobTitleOptions.push({
        key: title.id,
        text: title.jobTitle,
        value: title.id
    }))

    const workingTypeOptions = [{ id: 0, text: "Çalışma Şekli" }]
    workingTypes.map((type) => workingTypeOptions.push({
        key: type.id,
        text: type.type,
        value: type.id
    }))

    const workingTimesOptions = [{ id: 0, text: "Çalışma Tipi" }]
    workingTimes.map((time) => workingTimesOptions.push({
        key: time.id,
        text: time.time,
        value: time.id
    }))


    return (
        <div>
            <Container className='content'>
                <div style={{ marginTop: "12%" }} >
                    <Headline content="İlan Bilgilerini Güncelle" />
                </div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width="4">
                            <div style={{ marginTop: "9%" }}>
                                <Button color='violet' content="İlan Detayına Dön" as={NavLink} to={`/jobadvertisements/${id}`} />

                            </div>
                        </Grid.Column>
                        <Grid.Column width="9" >
                            <Formik>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Group widths="equal">
                                        <Form.Select
                                            name="city"
                                            label="Şehir"
                                            placeholder={jobAdvertisement.city?.cityName}
                                            options={cityOptions}
                                            onChange={(event, data) => handleChange("city.id", data.value)}
                                            value={formik.values.city.id}
                                        />
                                        <Form.Select
                                            name="jobTitle"
                                            label="Title"
                                            placeholder={jobAdvertisement.jobTitle?.jobTitle}
                                            options={jobTitleOptions}
                                            onChange={(event, data) => handleChange("jobTitle.id", data.value)}
                                            value={formik.values.jobTitle.id}
                                        />
                                    </Form.Group>
                                    <Form.Group widths="three">
                                        <Form.Input
                                            name="minSalary"
                                            label="Minimum Maaş (opsiyonel)"
                                            placeholder={jobAdvertisement.minSalary}
                                            onChange={(event, data) => handleChange("minSalary", data.value)}
                                            value={formik.values.minSalary}
                                        />
                                        <Form.Input
                                            name="maxSalary"
                                            label="Maximum Maaş (opsiyonel)"
                                            placeholder={jobAdvertisement.maxSalary}
                                            onChange={(event, data) => handleChange("maxSalary", data.value)}
                                            value={formik.values.maxSalary}
                                        />
                                        <Form.Input
                                            name="amount"
                                            label="Açık Pozisyon Sayısı"
                                            placeholder={jobAdvertisement.amount}
                                            onChange={(event, data) => handleChange("amount", data.value)}
                                            value={formik.values.amount}
                                        />
                                    </Form.Group>
                                    <Form.Group widths="three">
                                        <Form.Select
                                            name="workingTime"
                                            label="Çalışma Tipi"
                                            placeholder={jobAdvertisement.workingTime?.time}
                                            options={workingTimesOptions}
                                            onChange={(event, data) => handleChange("workingTime.id", data.value)}
                                            value = {formik.values.workingTime.id}
                                        />
                                        <Form.Select
                                            name = "workingType"
                                            label="Çalışma Şekli"
                                            placeholder={jobAdvertisement.workingType?.type}
                                            options={workingTypeOptions}
                                            onChange={(event, data) => handleChange("workingType.id", data.value)}
                                            value = {formik.values.workingType.id}
                                        />
                                        <Form.Input 
                                            name="deadLine"
                                            label="Son Başvuru"
                                            type='date'
                                            onChange={(event, data) => handleChange("deadLine", data.value)}
                                            value = {formik.values.deadLine}
                                        />
                                        {
                                            formik.errors.deadLine && formik.touched.deadLine &&
                                            <div style={{marginTop:"4%"}}>
                                                <Label basic pointing="left" color='red' content={formik.errors.deadLine} />
                                            </div>
                                        }
                                    </Form.Group>
                                    <Form.TextArea
                                        name="description"
                                        label="Açıklama"
                                        placeholder={jobAdvertisement.description}
                                        onChange={(event, data) => handleChange("description", data.value)}
                                        value={formik.values.description}
                                    />
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
                                <Header as="h2" content="Güncellendi" />
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

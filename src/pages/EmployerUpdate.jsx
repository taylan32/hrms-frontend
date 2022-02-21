import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Button, Container, Form, Grid, Header, Icon, Image, Input, Label, Modal, Segment } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import EmployerService from '../services/EmployerService'
import * as Yup from "yup"
import { Formik, useFormik } from 'formik'
import ImageService from '../services/ImageService'
import EmployerUpdateService from '../services/EmployerUpdateService'

export default function EmployerUpdate() {

    let { id } = useParams()

    const [open, setOpen] = useState(false)

    const [employer, setEmployer] = useState({})
    let employerService = new EmployerService()
    let employerUpdateService= new EmployerUpdateService()

    useEffect(() => {
        employerService.getById(id).then((result) => setEmployer(result.data.data))
    }, [])

    const initialValues = {
        id:0,
        email: employer.email,
        password: employer.password,
        companyName: employer.companyName,
        webSite: employer.webSite,
        phoneNumber: employer.phoneNumber,
        employer:{
            id:0
        }
    }

    const validationSchema = Yup.object({
        //email:Yup.string().required("Zorunlu Alan"),
        password: Yup.string().required("Zorunlu Alan"),
        //companyName:Yup.string().required("Zorunlu Alan"),
        //webSite:Yup.string().required("Zorunlu Alan"),
        //phoneNumber:Yup.string().required("Zorunlu Alan")
    })

    const onSubmit = (values) => {
        if (values.email == null) {
            values.email = employer.email
        }
        if (values.password == null) {
            values.password = employer.password
        }
        if (values.companyName == null) {
            values.companyName = employer.companyName
        }
        if (values.webSite == null) {
            values.webSite = employer.webSite
        }
        if (values.phoneNumber == null) {
            values.phoneNumber = employer.phoneNumber
        }
        values.employer.id=id
        
        employerUpdateService.add(values).then(()=>console.log(values))
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

    let imageService = new ImageService()

    const [image, setimage] = useState({})

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_present', 'my_default')

        setimage(data)

    }

    const uploadFile = () => {
        imageService.upload(image, id)
        window.location.reload()
    }

    return (
        <div>
            <Container className='content'>
                <div style={{ marginTop: "12%" }}>
                    <Headline content="Profil Bilgileri Güncelle" />
                </div>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width="5">
                            <Image src={employer.image?.url} size="small" avatar />
                            <br /><br />
                            <Input type='file' name="file" placeholder="resim ekle" onChange={uploadImage} />
                            <br /> <br />
                            <Button color='violet' onClick={() => uploadFile()}>Resmi Güncelle</Button>
                        </Grid.Column>
                        <Grid.Column width="8">
                            <Formik>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Group widths="equal">
                                        <Form.Input
                                            name="companyName"
                                            label="Firma Adı"
                                            placeholder={employer.companyName}
                                            onChange={(event, data) => handleChange("companyName", data.value)}
                                            value={formik.values.companyName}
                                        />
                                        <Form.Input
                                            name="webSite"
                                            label="Website"
                                            placeholder={employer.webSite}
                                            onChange={(event, data) => handleChange("webSite", data.value)}
                                            value={formik.values.webSite}
                                        />
                                    </Form.Group>
                                    <Form.Group widths="equal">
                                        <Form.Input
                                            name="email"
                                            label="Email"
                                            placeholder={employer.email}
                                            onChange={(event, data) => handleChange("email", data.value)}
                                            value={formik.values.email}
                                        />
                                        <Form.Input
                                            name="password"
                                            label="Parola"
                                            type='password'
                                            onChange={(event, data) => handleChange("password", data.value)}
                                            value={formik.values.password}
                                        />
                                        {
                                            formik.errors.password && formik.touched.password &&
                                            <div style={{ marginTop: "4%" }}>
                                                <Label basic pointing="left" color='red' content={formik.errors.password} />
                                            </div>
                                        }
                                    </Form.Group>
                                    <Form.Input
                                        name="phoneNumber"
                                        label="Telefon Numarası"
                                        placeholder={employer.phoneNumber}
                                        onChange={(event, data) => handleChange("phoneNumber", data.value)}
                                        value={formik.values.phoneNumber}
                                    />
                                    <Button circular type="submit" color='orange'>Güncelleme Talebi Gönder</Button>
                                    <Button circular color='facebook' onClick={() => window.location.reload()} >Sıfırla</Button>
                                </Form>
                            </Formik>
                        </Grid.Column>
                        <Grid.Column width="3">
                            <div style={{margin:"12%"}}>
                                <Button color='violet' content="Profile Dön" as={NavLink} to={`/employers/${id}`} />
                            </div>
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
                                <Header as="h2" content="Güncelleme Talebi Gönderildi" />
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

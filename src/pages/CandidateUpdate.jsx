import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import CandidateService from '../services/CandidateService'
import * as Yup from "yup"
import { Formik, useFormik } from 'formik'
import { Container, Grid, Form, Label, Button, Image, Input, Modal, Segment, Header, Icon } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import ImageService from '../services/ImageService'


export default function () {

    let { id } = useParams()

    const [candidate, setcandidate] = useState({})
    let candidateService = new CandidateService()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        candidateService.getById(id).then((result) => setcandidate(result.data.data))
    }, [])

    const initialValues = {
        id: id,
        email: candidate.email,
        password: candidate.password,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        identityNumber: candidate.identityNumber,
        birthYear: candidate.birthYear
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Geçersiz email"),
        password: Yup.string().required("Şifrenizi girin."),
        firstName: Yup.string(),
        lastName: Yup.string(),
        identityNumber: Yup.string().length(11, "Tc no 11 karakter olmalı"),
        birthYear: Yup.string().max("4","Doğum yılı geçersiz").min(4,"Doğum Yılı geçersiz")
    })

    const onSubmit = (values) => {
        
        if(values.identityNumber == null){
            values.identityNumber = candidate.identityNumber
        }
        if(values.email== null){
            values.email = candidate.email
        }
        if(values.password == null){
            values.password = candidate.password
        }
        if(values.firstName == null) {
            values.firstName = candidate.firstName
        }
        if(values.lastName == null) {
            values.lastName = candidate.lastName
        }
        if(values.birthYear == null) {
            values.birthYear = candidate.birthYear
        }
       candidateService.update(values)
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

    let imageService = new ImageService()

    const [image, setimage] = useState({})
   
    const uploadImage = async e => {
        const files  = e.target.files
        const data = new FormData()
        data.append('file',files[0])
        data.append('upload_present','my_default')

        setimage(data)
        
    }

    const uploadFile = () => {
        imageService.upload(image,id)
        window.location.reload()
    }


    return (
        <div>
            <Container className='content'>
                <div style={{paddingTop:"12%"}} >
                    <Headline content="Profil Güncelleme" />
                </div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="5">
                        <Image src={candidate.image?.url} size="small" avatar />
                        <br/><br/>
                        <Input type='file' name="file" placeholder="resim ekle" onChange={uploadImage} />
                        <br/> <br/>
                        <Button color='violet' onClick={() => uploadFile()}>Resmi Güncelle</Button> 
                    </Grid.Column>
                    <Grid.Column width="8">
                        <Formik>
                            <Form onSubmit={formik.handleSubmit}> 
                                   <Form.Input   
                                        name="identityNumber"
                                        label="TC Kimlik Numarası"
                                        focus
                                        placeholder={candidate.identityNumber}
                                        onChange={(event,data)=>handleChange("identityNumber",data.value)}
                                        value={formik.values.identityNumber}
                                    />
                                    {
                                        formik.errors.identityNumber && formik.touched.identityNumber &&
                                        <span>
                                            <Label basic pointing color='red' content={formik.errors.identityNumber}/>
                                            <br/><br/>
                                        </span>
                                    }
                                    <Form.Group widths="equal">
                                            <Form.Input 
                                                name="email"
                                                label="Email"
                                                focus
                                                placeholder={candidate.email}
                                                onChange={(event,data)=>handleChange("email",data.value)}
                                                value={formik.values.email}
                                            />
                                            <Form.Input
                                                name="password"
                                                label="Şifre"
                                                focus
                                                type='password'
                                                onChange={(event,data)=>handleChange("password",data.value)}
                                                value={formik.values.password}
                                            />
                                            {
                                                formik.errors.password && formik.touched.password &&
                                                <span>
                                                    <Label basic pointing="left" color='red' content={formik.errors.password} />
                                                    <br/><br/>
                                                </span>
                                            }
                                    </Form.Group>
                                    <Form.Group widths="three">
                                        <Form.Input
                                            name="firstName"
                                            label="İsim"
                                            focus
                                            placeholder={candidate.firstName}
                                            onChange={(event,data)=>handleChange("firstName",data.value)}
                                            value={formik.values.firstName}
                                        />
                                        <Form.Input
                                            name="lastName"
                                            label="Soyisim"
                                            focus
                                            placeholder={candidate.lastName}
                                            onChange={(event,data)=>handleChange("lastName",data.value)}
                                            value={formik.values.lastName}
                                        />
                                        <Form.Input 
                                            name="birthYear"
                                            label="Doğum Yılı"
                                            focus
                                            placeholder={candidate.birthYear}
                                            onChange={(event,data)=>handleChange("birthYear",data.value)}
                                            value={formik.values.birthYear}
                                        />
                                        {
                                            formik.errors.birthYear && formik.touched.birthYear &&
                                            <span>
                                                <Label basic pointing="left" color='red' content={formik.errors.birthYear} />    
                                            </span>
                                        }
                                    </Form.Group>
                                    
                                <Button circular  type="submit" color='orange'>Güncelle</Button>
                                <Button circular  color='facebook' onClick={()=>window.location.reload()} >Sıfırla</Button>
                            </Form>
                        </Formik>
                        
                    </Grid.Column>
                    <Grid.Column width="3">
                        <div style={{marginTop:"12%"}}>
                           <Button color='violet' content="Profile Dön" as={NavLink} to={`/candidates/${id}`} />
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
                            <Header as="h2" content="Güncelleme Başarılı" />
                           </Segment>
                        </Modal.Content>
                    </Segment>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={() => setOpen(false)} onClick={()=>window.location.reload()}>
                            <Icon name='remove' /> Kapat
                        </Button>
                    </Modal.Actions>
                </Modal>

            </Container>
        </div>
    )
}

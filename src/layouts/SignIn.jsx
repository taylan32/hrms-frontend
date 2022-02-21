import React from 'react'
import { Button, Container, Form, Grid, Label, Table } from 'semantic-ui-react'
import Headline from './Headline'
import * as Yup from "yup"
import { Formik, useFormik } from 'formik'
import UserService from '../services/UserService'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
export default function SignIn() {

    let userService = new UserService()
    const [isInvalid, setIsInvalid] = useState(false)


    const history = useHistory()


    useEffect(() => {
        // userService.getAll().then((result) => setUsers(result.data.data))
    })
 
    const intialValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().required("Zorunlu Alan"),
        password: Yup.string().required("Zorunlu Alan")
    })

    const onSubmit = (values) => {
        let isAuthenticated = false
        /*
         for (let i = 0; i < users.length; i++) {
             if(users[i].email === values.email){
                 isAuthenticated = true
             }
         }
         
                 if(isAuthenticated) {
                     console.log("True")
                 }
                 else{
                     console.log("False")
                 }   
         */
          
                 userService.getByEmail(values.email).then((result) => {
                const email = result.data.data.email
                const password = result.data.data.password
                if (result.data.success && (email === values.email && password === values.password)) {
                    localStorage.setItem("email", values.email )
                    history.push("/")
                    window.location.reload()
                    setIsInvalid(false)
                }
                else {
                    setIsInvalid(true)
                }
                
            })
            
       /*     
       userService.login(values.email, values.password).then((result) => {
           dispatch(login(result.data.data, result.data.message.substr(0, result.data.message.indexOf(" "))))
           history.push("/")
        })


        */
      

    }

    const formik = useFormik({
        initialValues: intialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit
    })

    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value)
    }

    return (
        <div>
            <Container className='content'>
                <div style={{ marginTop: "10%" }}>
                    <Headline content="Giriş Yap" />
                </div>

                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width="6">
                            <Table color='teal' celled>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Formik>
                                                <Form onSubmit={formik.handleSubmit}>
                                                    <div style={{ margin: "2%" }}>
                                                        <Form.Input
                                                            name="email"
                                                            label="Email"
                                                            onChange={(event, data) => handleChange("email", data.value)}
                                                            value={formik.values.email}
                                                        />
                                                        {
                                                            formik.errors.email && formik.touched.email &&
                                                            <div>
                                                                <Label basic pointing color='red' content={formik.errors.email} />
                                                            </div>
                                                        }
                                                        <Form.Input
                                                            name="password"
                                                            label="Parola"
                                                            type='password'
                                                            onChange={(event, data) => handleChange("password", data.value)}
                                                            value={formik.values.password}
                                                        />
                                                        {
                                                            formik.errors.password && formik.touched.password &&
                                                            <div>
                                                                <Label basic pointing color='red' content={formik.errors.password} />
                                                            </div>
                                                        }
                                                        <div style={{ textAlign: "center" }}>
                                                            <Button type="submit" color='green' content="Giriş Yap" />
                                                            <Button color='facebook' content="Sıfırla" onClick={() => window.location.reload()} />
                                                        </div>
                                                        {
                                                            isInvalid &&
                                                            <div style={{ margin: "5%", textAlign: "center" }} >
                                                                <Label basic color='red' content="Kullanıcı Adı veya Şifre Yanlış" />
                                                            </div>
                                                        }
                                                    </div>
                                                </Form>
                                            </Formik>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}

import React, { useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Button, Container, Form, Grid, Header, Icon, Label, Modal, Segment, Table } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import SocialMediaAccountService from '../services/SocialMediaAccountService'
import * as Yup from "yup"
import { Formik, useFormik } from 'formik'

export default function SocialMediaAccountAdd() {

  let { candidateId } = useParams()

  const [open, setOpen] = useState(false)

  const [socialMediaAccounts, setSocialMediaAccounts] = useState([])
  let socialMediaAccountService = new SocialMediaAccountService()

  useEffect(() => {
    socialMediaAccountService.getAllByCandidateId(candidateId).then((result) => setSocialMediaAccounts(result.data.data))
  }, [])


  const initialValues = {
    candidate: {
      id: 0
    },
    name: "",
    url: ""
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Zorunlu Alan"),
    url: Yup.string().required("Zorunlu Alan")
  })

  const onSubmit = (values) => {
    values.candidate.id = candidateId
    socialMediaAccountService.add(values).then()
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
    <div>
      <Container className='content'>
        <div style={{ paddingTop: "12%" }}>
          <Headline content="Sosyal Medya Hesabı Ekle" />
        </div>
        <Grid>
          <Grid.Row>
            <Grid.Column width="4">
              <Header content="Daha Önce Eklenilenler" as="h4" />
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Platform</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {socialMediaAccounts.map((account) => (
                    <Table.Row key={account.id}>
                      <Table.Cell>{account.name}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width="8">
              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Input
                    name="name"
                    label="Platform Adı"
                    onChange={(event, data) => handleChange("name", data.value)}
                    value={formik.values.name}
                  />
                  {
                    formik.errors.name && formik.touched.name &&
                    <span>
                      <Label basic pointing color='red' content={formik.errors.name} />
                      <br /><br />
                    </span>
                  }
                  <Form.Input
                    name="url"
                    label="Url"
                    onChange={(event, data) => handleChange("url", data.value)}
                    value={formik.values.url}
                  />
                  {
                    formik.errors.url && formik.touched.url &&
                    <span>
                      <Label basic pointing color='red' content={formik.errors.url} />
                      <br /><br />
                    </span>
                  }
                  <Button type="submit" color='green' content="Ekle" />
                  <Button color='facebook' content="Sıfırla" onClick={() => window.location.reload()} />
                </Form>
              </Formik>
            </Grid.Column>
            <Grid.Column width="4" >
              <Button color='violet' content="Profile Dön" style={{marginTop:"8%"}} as={NavLink} to={`/candidates/${candidateId}`} />
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
                <Header as="h2" content="Eklendi" />
              </Segment>
            </Modal.Content>
          </Segment>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={() => setOpen(false)} as={NavLink} to={`/candidates/${candidateId}`}>
              <Icon name='remove' /> Kapat
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>
    </div>
  )
}

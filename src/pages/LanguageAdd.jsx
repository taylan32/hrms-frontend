import { Formik, useFormik } from 'formik'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Button, Container, Form, Grid, Header, Icon, Label, Modal, Segment, Table } from 'semantic-ui-react'
import * as Yup from "yup"
import Headline from '../layouts/Headline'
import LanguageService from '../services/LanguageService'

export default function LanguageAdd() {

  let { candidateId } = useParams()

  const [open, setOpen] = useState(false)

  const [languages, setLanguages] = useState([])
  let languageService = new LanguageService()

  useEffect(() => {
    languageService.getAll(candidateId).then((result) => setLanguages(result.data.data))
  }, [])

  const initialValues = {
    id: 0,
    language: "",
    candidate: {
      id: 0
    },
    level: 0
  }

  const validationSchema = Yup.object({
    language: Yup.string().required("Zorunlu Alan"),
    level: Yup.number().required("Zorunlu alan")
  })

  const onSubmit = (values) => {
    values.candidate.id = candidateId
    languageService.add(values).then()
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

  const languageOptions = [
    { key: 1, text: "Başlangıç Seviyesi", value: 1 },
    { key: 2, text: "Orta Seviye", value: 2 },
    { key: 3, text: "Profesyonel Çalışma Yetkinliği", value: 3 },
    { key: 4, text: "İkinci Dil", value: 4 },
    { key: 5, text: "Ana dil", value: 5 },

  ]



  return (
    <div>
      <Container className='content'>
        <div style={{ paddingTop: "12%" }}>
          <Headline content="Dil Ekle" />
        </div>
        <Grid>
          <Grid.Row>
            <Grid.Column width="5">
              <Header content="Daha Önce Eklenilen Diller" as="h4" />
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Dil</Table.HeaderCell>
                    <Table.HeaderCell>Seviyesi</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {languages.map((language) => (
                    <Table.Row key={language.id}>
                      <Table.Cell>
                        {language.language}
                      </Table.Cell>
                      <Table.Cell>
                        {language.level == 1 ? "Başlangıç Seviyesi" : language.level == 2 ? "Orta Seviye" : language.level == 3 ? "Profesyonel Çalışma Yetkinliği" : language.level === 4 ? "İkinci Dil" : language.level === 5 ? "Anadil/İkinci dil" : ""}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width="6">
              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group widths="equal">
                    <Form.Input
                      name="language"
                      label="Dil"
                      placeholder="Dil girişi..."
                      onChange={(event, data) => handleChange("language", data.value)}
                      value={formik.values.language}
                    />
                    {
                      formik.errors.language && formik.touched.language &&
                      <span>
                        <Label basic color='red' pointing="left" content={formik.errors.language} />
                        <br /> <br />
                      </span>
                    }
                    <Form.Select
                      name="level"
                      label="Dil Seviyesi"
                      options={languageOptions}
                      placeholder="Dil Seviyesi"
                      onChange={(event, data) => handleChange("level", data.value)}
                      value={formik.values.level}
                    />
                  </Form.Group>
                  <Button type="submit" color="green" content="Ekle" />
                  <Button color='facebook' content="Sıfırla" onClick={() => window.location.reload()} />
                </Form>
              </Formik>
            </Grid.Column>
            <Grid.Column width="5">
              <Button color='violet'  style={{marginTop:"7%"}} content="Profile Dön" as={NavLink} to={`/candidates/${candidateId}`} />
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
            <Button basic color='red' inverted onClick={() => setOpen(false)} as={NavLink} to={`/candidates/${candidateId}`} >
              <Icon name='remove' /> Kapat
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>
    </div>
  )
}

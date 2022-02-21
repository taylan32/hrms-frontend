import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import CandidateAboutService from '../services/CandidateAboutService'
import * as Yup from "yup"
import { useState } from 'react'
import { Formik, useFormik } from 'formik'
import { Button, Container, Form, Grid, Header, Icon, Label, Modal, Segment } from 'semantic-ui-react'
import Headline from '../layouts/Headline'


export default function CandidateAboutAdd() {

  let { candidateId } = useParams()

  const [open, setOpen] = useState(false)

  let candidateAboutService = new CandidateAboutService()

  const initialValues = {
    id: 0,
    candidate: {
      id: 0
    },
    description: ""
  }

  const validationSchema = Yup.object({
    description: Yup.string().required("Zorunlu alan")
  })

  const onSubmit = (values) => {
    values.candidate.id = candidateId
    candidateAboutService.add(values).then()
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
          <Headline content="Açıklama Ekle" />
        </div>

        <Grid>
          <Grid.Row>
            <Grid.Column width="4">
              <div style={{marginTop:"8%"}}>
                <Button color="violet" content="Profile Dön" as={NavLink} to={`/candidates/${candidateId}`} />
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.TextArea
                    name="description"
                    label="Açıklama"
                    placeholder="Kendinizi tanıtın..."
                    onChange={(event, data) => handleChange("description", data.value)}
                    value={formik.values.description}
                  />
                  {
                    formik.errors.description && formik.touched.description &&
                    <span>
                      <Label basic color="red" pointing content={formik.errors.description} />
                      <br />
                    </span>
                  }
                  <Button circular type="submit" content="Ekle" color='green' />
                  <Button circular color='facebook' content="Sıfırla" onClick={() => window.location.reload()} />
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
            <Button basic color='red' inverted onClick={() => setOpen(false)} as={NavLink} to={`/candidates/${candidateId}`} >
              <Icon name='remove' /> Kapat
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>

    </div>
  )
}

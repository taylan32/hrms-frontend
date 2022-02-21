import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Button, Container, Form, Grid, Header, Icon, Label, Modal, Segment, Table } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import SkillService from '../services/SkillService'
import * as Yup from "yup"
import { Formik, useFormik } from 'formik'

export default function SkillAdd() {

  let {candidateId} = useParams()

  const [open, setOpen] = useState(false)
  const [skills, setSkills] = useState([])
  let skillService = new SkillService()
  useEffect(()=>{
    skillService.getByCandidateId(candidateId).then((result) => setSkills(result.data.data))
  }, [])

  const initialValues = {
    id:0,
    candidate:{
      id:0
    },
    skillName:""
  }

  const validationSchema = Yup.object({
    skillName:Yup.string().required("Zorunlu alan")
  })

  const onSubmit = (values) => {
    values.candidate.id = candidateId
    skillService.add(values).then()
    setOpen(true)
  }

  const formik = useFormik({
    initialValues:initialValues,
    validationSchema:validationSchema,
    onSubmit:onSubmit
  })

  const handleChange = (fieldName, value) => {
    formik.setFieldValue(fieldName, value)
  }

  return (
    <div>
      <Container className='content'>
        <div style={{paddingTop:"12%"}}>
          <Headline content="Yetenek Ekle" />
        </div>

        <Grid>
          <Grid.Row>
            <Grid.Column width="5">
            <Header content="Daha Önce Eklenilenler" as="h4"/>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Yetenek</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {skills.map((skill)=> (
                    <Table.Row key={skill.id}>
                      <Table.Cell>{skill.skillName}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width="5">
              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Input 
                    name="skillName"
                    label="Yetenek"
                    onChange={(event, data) => handleChange("skillName", data.value)}
                    value = {formik.values.skillName}
                  />
                  {
                    formik.errors.skillName && formik.touched.skillName &&
                    <span>
                      <Label basic pointing color='red' content={formik.errors.skillName} />
                      <br/><br/>
                    </span>
                  }
                  <Button type="submit" color='green' content="Ekle" />
                  <Button color='facebook' content="Sıfırla" onClick={()=>window.location.reload()} />
                </Form>
              </Formik>
            </Grid.Column>
            <Grid.Column width="5">
              <Button color='violet' style={{marginTop:"7%"}} content="Profile Dön" as={NavLink} to={`/candidates/${candidateId}`} />
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

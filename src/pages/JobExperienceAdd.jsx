import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Container, Grid, Form, Label, Button, Modal, Segment, Header, Icon, Table, TableHeaderCell } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import JobExperienceService from '../services/JobExperienceService'
import JobTitleService from '../services/JobTitleService'
import * as Yup from "yup"
import { Formik, useFormik } from 'formik'

export default function JobExperienceAdd() {

  let { candidateId } = useParams()

  const [open, setOpen] = useState(false)

  const [jobExperiences, setJobExperiences] = useState([])
  let jobExperienceService = new JobExperienceService()

  

  const [jobTitles, setjobTitles] = useState([])
  let jobTitleService = new JobTitleService

  useEffect(() => {
    jobTitleService.getAll().then((result) => setjobTitles(result.data.data))
    jobExperienceService.getAll(candidateId).then((result) => setJobExperiences(result.data.data))
  }, [])

  const initialValues = {
    id: 0,
    candidate: {
      id: 0
    },
    workPlaceName: "",
    jobTitle: {
      id: 0
    },
    yearOfStart: "",
    releaseYear: ""
  }

  const validationSchema = Yup.object({
    workPlaceName: Yup.string().required("Zorunlu Alan"),
    yearOfStart: Yup.string().required("Zorunlu Alan")
  })

  const onSubmit = (values) => {
    values.candidate.id = candidateId
    jobExperienceService.add(values).then()
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

  const jobTitleOptions = [{ value: 0, text: "Title" }]
  jobTitles.map((title) => jobTitleOptions.push({
    key: title.id,
    text: title.jobTitle,
    value: title.id
  }))

  return (
    <div>
      <Container className='content'>
        <div style={{ paddingTop: "12%" }}>
          <Headline content="İş Tecrübesi Ekle" />
        </div>
        <Grid>
          <Grid.Row>
            <Grid.Column width="4">
            <Header content="Daha Önce Eklenilen İş Tecrübeleri" as="h4"/>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Firma</Table.HeaderCell>
                    <Table.HeaderCell>Ünvan</Table.HeaderCell>
                    <Table.HeaderCell>Giriş Yılı</Table.HeaderCell>
                    <Table.HeaderCell>Çıkış Yılı</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {jobExperiences.map((experience)=> (
                    <Table.Row key = {experience.key}>
                      <Table.Cell>{experience.workPlaceName}</Table.Cell>
                      <Table.Cell>{experience.jobTitle?.jobTitle}</Table.Cell>
                      <Table.Cell>{experience.yearOfStart}</Table.Cell>
                      <Table.Cell>{experience.releaseYear}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width="8" >
              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group widths="two">
                    <Form.Input
                      name="workPlaceName"
                      label="İşyeri Adı"
                      onChange={(event, data) => handleChange("workPlaceName", data.value)}
                      value={formik.values.workPlaceName}
                    />
                    {formik.errors.workPlaceName && formik.touched.workPlaceName &&
                      <span>
                        <Label basic pointing="left" color='red' content={formik.errors.workPlaceName} />
                      </span>
                    }
                    <Form.Select
                      name="jobTitle"
                      label="Title"
                      onChange={(event, data) => handleChange("jobTitle", data.value)}
                      options={jobTitleOptions}
                      value={formik.values.jobTitle.id}
                    />
                    {formik.errors.jobTitle?.id && formik.touched.jobTitle?.id &&
                      <span>
                        <Label basic pointing="left" color='red' content={formik.errors.jobTitle?.id} />
                      </span>
                    }
                  </Form.Group>
                  <Form.Group widths="two">
                    <Form.Input
                      name="yearOfStart"
                      label="Başlangıç Yılı"
                      onChange={(event, data) => handleChange("yearOfStart", data.value)}
                      value={formik.values.yearOfStart}
                    />

                    {formik.errors.yearOfStart && formik.touched.yearOfStart &&
                      <span>
                        <Label basic pointing="left" color='red' content={formik.errors.yearOfStart} />
                      </span>

                    }
                    <Form.Input
                      name="releaseYear"
                      label="İşten Çıkış Yılı"
                      onChange={(event, data) => handleChange("yearOfStart", data.value)}
                      placeholder="Devam ediyorsanız boş bırakın"
                      value={formik.values.releaseYear}
                    />
                  </Form.Group>
                  <Button type="submit" color='green' content="Ekle" />
                  <Button color='violet' content="Sıfırla" onClick={() => window.location.reload()} />
                </Form>
              </Formik>
            </Grid.Column>
            <Grid.Column width="4" >
              <Button style={{marginTop:"8%"}} color='violet' content="Profile Dön" as={NavLink} to={`/candidates/${candidateId}`} />
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

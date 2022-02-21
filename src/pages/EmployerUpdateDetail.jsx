import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Button, Container, Grid, Header, Icon, Modal, Segment, Table } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import EmployerService from '../services/EmployerService'
import EmployerUpdateService from '../services/EmployerUpdateService'

export default function EmployerUpdateDetail() {


    let { id } = useParams()

    const [open, setOpen] = useState(false)
    const [employerUpdate, setEmployerUpdate] = useState({})
    const [employer, setEmployer] = useState({})
    let employerUpdateService = new EmployerUpdateService()
    let employerService = new EmployerService()

    useEffect(() => {
        employerUpdateService.getById(id).then((result) => setEmployerUpdate(result.data.data))
    }, [])

    const handleAccept = () => {
        const employerId = employerUpdate.employer?.id
        employerService.getById(employerId).then((result) => setEmployer(result.data.data))
        employer.id = employerId
        employer.companyName = employerUpdate.companyName
        employer.webSite = employerUpdate.webSite
        employer.phoneNumber = employerUpdate.phoneNumber
        employer.email = employerUpdate.email
        employer.password = employerUpdate.password
        employer.confirmed = true
        employerService.update(employer).then(() => employerUpdateService.delete(employerUpdate))
        setOpen(true)
    }

    const handleReject = () => {
        employerUpdateService.delete(employerUpdate).then()
        setOpen(true)
    }

    return (
        <div>
            <Container className='content'>
                <div style={{ marginTop: "12%" }}>
                    <Headline content="Güncelleme Talebi Detayları" />
                </div>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width="5">
                            <Button color='violet' content="Profile Dön" as={NavLink} to={`/admin`} />
                        </Grid.Column>
                        <Grid.Column width="6">
                            <Table celled color='red'>
                                <Table.Header>
                                    <Table.Row textAlign='center'>
                                        <Table.HeaderCell>Güncellenecek Alan</Table.HeaderCell>
                                        <Table.HeaderCell>Eski Bilgi</Table.HeaderCell>
                                        <Table.HeaderCell>Yeni Bilgi</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>Firma Adı</Table.Cell>
                                        <Table.Cell>{employerUpdate.employer?.companyName}</Table.Cell>
                                        <Table.Cell>{employerUpdate.companyName}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Email</Table.Cell>
                                        <Table.Cell>{employerUpdate.employer?.email}</Table.Cell>
                                        <Table.Cell>{employerUpdate.email}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Website</Table.Cell>
                                        <Table.Cell>{employerUpdate.employer?.webSite}</Table.Cell>
                                        <Table.Cell>{employerUpdate.webSite}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Telefon</Table.Cell>
                                        <Table.Cell>{employerUpdate.employer?.phoneNumber}</Table.Cell>
                                        <Table.Cell>{employerUpdate.phoneNumber}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Parola</Table.Cell>
                                        <Table.Cell>{employerUpdate.employer?.password}</Table.Cell>
                                        <Table.Cell>{employerUpdate.password}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <Button color='green' content="Onayla" onClick={() => handleAccept(employerUpdate)} />
                            <Button color='red' content="Reddet" onClick={() => handleReject(employerUpdate)} />
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
                                <Header as="h2" content="İşlem Başarılı" />
                            </Segment>
                        </Modal.Content>
                    </Segment>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={() => setOpen(false)} as={NavLink} to={`/admin`} >
                            <Icon name='remove' /> Kapat
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Container>
        </div>
    )
}

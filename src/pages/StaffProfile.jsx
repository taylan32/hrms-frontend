import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Card, Container, Divider, Grid, Table, Icon } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import { NavLink } from 'react-router-dom'
import JobAdvertisementService from '../services/JobAdvertisementService'
import StaffService from '../services/StaffService'
import EmployerService from '../services/EmployerService'
import EmployerUpdateService from '../services/EmployerUpdateService'

export default function StaffProfile() {


    const [advertisementsWaitingForConfirmation, setAdvertisementsWatingForConfirmation] = useState([])

    const [employersWaitingForConfirmation, setEmployersWaitingForConfirmation] = useState([])

    let staffService = new StaffService()
    let jobAdvertisementService = new JobAdvertisementService()
    const [employerUpdateWaitingForConfirmation, setEmployerUpdateWaitingForConfirmation] = useState([])
    let employerUpdateService = new EmployerUpdateService()
    let employerService = new EmployerService()
    useEffect(() => {
        jobAdvertisementService.getAllWaitingForConfirmation().then((result) => setAdvertisementsWatingForConfirmation(result.data.data))
        employerUpdateService.getAll().then((result) => setEmployerUpdateWaitingForConfirmation(result.data.data))
        employerService.getAllPassive().then((result) => setEmployerUpdateWaitingForConfirmation(result.data.data))
    }, [])


    const handleAdvertisementConfirm = (advertisementId) => {
        staffService.confirmAdvertisement(advertisementId)
        window.location.reload()
    }

    return (

        <Container className='contnet'>
            <div style={{ marginTop: "12%" }}>
                <Headline content="Personel Profil Sayfası" />
            </div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="4">
                        <Table color='orange'>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell><a href="#advertisementsWaitingForConfirmation">Onay Bekleyen İlanlar</a></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><a href="#employerUpdateWaitingForConfirmation">Güncelleme Talableri</a></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><a href="#employerWaitingForConfirmation">Kayıt Onayı Bekleyen İşverenler</a></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><a href='/jobtitles/add'>Title Ekle</a></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><a href='/cities/add'>Şehir Ekle</a></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column width="10">
                        <Divider horizontal style={{ margin: "5%" }}>
                            <a name="advertisementsWaitingForConfirmation"></a>
                            <Icon name='paste' />Onay Bekleyen ilanlar
                        </Divider>
                        {

                            advertisementsWaitingForConfirmation.length == 0 ?
                                <span>
                                    <Button circular color='green' content="Onay bekleyen Bulunamadı" />
                                </span>
                                :
                                <div>
                                    <div style={{ margin: "5%" }}>
                                        <Button circular color='blue' content={`${advertisementsWaitingForConfirmation.length} Onay bekleyen ilan bulunuyor`} />
                                    </div>

                                    <Card.Group itemsPerRow="2">
                                        {
                                            advertisementsWaitingForConfirmation.map((advertisement) => (
                                                <Card raised key={advertisement.id}>
                                                    <Card.Content>
                                                        <Card.Header>
                                                            {advertisement.jobTitle?.jobTitle}
                                                        </Card.Header>
                                                        <Card.Meta>

                                                            Firma:&nbsp;{advertisement.employer?.companyName} <br></br>

                                                            Şehir:&nbsp;{advertisement.city?.cityName}<br />
                                                            <strong>Alıcanak Kişi Sayısı</strong>
                                                            {advertisement.amount}<br />
                                                            <strong>Yayım Tarihi</strong>:&nbsp;&nbsp;
                                                            {new Date(advertisement.creationDate).toLocaleDateString("tr")}
                                                            <br />
                                                            <strong>Son Başvuru Tarihi:</strong>
                                                            {new Date(advertisement.deadLine).toLocaleDateString("tr")}<br />
                                                        </Card.Meta>
                                                    </Card.Content>
                                                    <Card.Content>
                                                        <Button circular compact color='green' floated='left' content="Onayla" onClick={() => handleAdvertisementConfirm(advertisement.id)} />
                                                        <Button circular compact color='orange' floated='right' as={NavLink} to={`/jobadvertisements/${advertisement.id}`}>İlan Detayına Git</Button>
                                                    </Card.Content>
                                                </Card>
                                            ))
                                        }
                                    </Card.Group>
                                </div>
                        }
                        <Divider horizontal style={{ margin: "5%" }}>
                            <a name="employerUpdateWaitingForConfirmation"></a>
                            <Icon name='paste' />Onay Bekleyen Güncelleme Talepleri
                        </Divider>
                        {
                            employerUpdateWaitingForConfirmation.length == 0 ?
                                <span>
                                    <Button circular color='green' content="Onay Bekleyen Güncelle Talebi Bulunamadı" />
                                </span>
                                :
                                <div>
                                    <div style={{ margin: "5%" }}>
                                        <Button color='blue' circular content={`${employerUpdateWaitingForConfirmation.length} Onay bekleyen güncelleme talebi bulunuyor`} />
                                    </div>
                                    <Card.Group itemsPerRow="2">
                                        {
                                            employerUpdateWaitingForConfirmation.map((employerUpdate) => (
                                                <Card raised key={employerUpdate.id}>
                                                    <Card.Content>
                                                        <Card.Header>
                                                            {employerUpdate.employer?.companyName}
                                                        </Card.Header>
                                                        <Card.Meta>
                                                            <Divider />
                                                            <Button color='orange' circular content="Detay" as={NavLink} to={`/employerupdatedetail/${employerUpdate.id}`} />
                                                        </Card.Meta>
                                                    </Card.Content>
                                                </Card>
                                            ))
                                        }
                                    </Card.Group>
                                    <div style={{ marginTop: "5%" }}>
                                        <Button circular content="Tüm Taleplerin Detayları " color='blue' as={NavLink} to="/employerupdates" />
                                    </div>
                                </div>
                        }


                        <Divider horizontal style={{ margin: "5%" }}>
                            <a name="employerWaitingForConfirmation"></a>
                            <Icon name='paste' />Kayıt Onayı Bekleyen İşverenler
                        </Divider>
                        {
                            employersWaitingForConfirmation.length == 0 ?
                                <span>
                                    <Button circular color='green' content="Onay Bekleyen Kayıt Talebi Bulunamadı" />
                                </span>
                                :
                                <div>
                                    <div style={{ margin: "5%" }}>
                                        <Button color='blue' circular content={`${employersWaitingForConfirmation.length} Onay bekleyen kayıt talebi bulunuyor`} />
                                    </div>
                                    <Card.Group itemsPerRow="2">
                                        {
                                            employersWaitingForConfirmation.map((employer) => (
                                                <Card raised key={employer.id}>
                                                    <Card.Content>
                                                        <Card.Header>
                                                            {employer.employer?.companyName}
                                                        </Card.Header>
                                                        <Card.Meta>
                                                            <Divider />
                                                            <Button color='orange' circular content="Detay" />
                                                        </Card.Meta>
                                                    </Card.Content>
                                                </Card>
                                            ))
                                        }
                                    </Card.Group>
                                    <div style={{ marginTop: "5%" }}>
                                        <Button circular content="Tüm Taleplerin Detayları "  />
                                    </div>
                                </div>
                        }

                    </Grid.Column>
                    <Grid.Column />
                </Grid.Row>
            </Grid>
        </Container>

    )
}

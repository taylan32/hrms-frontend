import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import { Button, Card, Container, Divider, Grid, Header, Icon, Image, Table } from 'semantic-ui-react';
import Headline from '../layouts/Headline';
import EmployerService from '../services/EmployerService';
import JobAdvertisementService from '../services/JobAdvertisementService';
import JobAdvertisementList from './JobAdvertisementList';
/*
const employerInitial = {
    id:0,
    email:"",
    password:"",
    image:{
        id:0,
        "url":""
    },
    companyName:"",
    webSite:"",
    phoneNumner:"",
    confirmed:true
}
*/

export default function EmployerDetail() {

    let { id } = useParams()

    const [employer, setemployer] = useState({});
    let employerService = new EmployerService()

    const [passiveJobAdvertisements, setpassiveJobAdvertisements] = useState([]);
    const [activeAdvertisements, setActiveAdvertisements] = useState([])
    let jobAdvertisementService = new JobAdvertisementService()

    const [advertisementsWaitingForConfirmation, setAdvertisementsWaitingForConfirmation] = useState([])

    useEffect(() => {
        employerService.getById(id).then(result => setemployer(result.data.data))
        jobAdvertisementService.getAllPassiveAdvertisementByEmployerId(id).then((result) => setpassiveJobAdvertisements(result.data.data))
        jobAdvertisementService.getAllWaitingForConfirmationByEmployerId(id).then((result) => setAdvertisementsWaitingForConfirmation(result.data.data))
        jobAdvertisementService.getAllActiveAdvertisementByEmployerId(id).then((result) => setActiveAdvertisements(result.data.data))
    }, [])


    return (

        <Container className="content" >
            <div style={{ paddingTop: "12%" }}>
                <Headline content="İşveren Bilgileri" />
            </div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="3">
                        <Table color='blue'>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell><a href="#activeAdvertisements">Aktif İlanlar</a></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><a href="#passiveAdvertisements">Pasif İlanlar</a></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><a href="#advertisementsWaitingForConfirmation">Onay Bekleyen İlanlar</a></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column width="10">
                        <Grid.Row>
                            <Button circular compact floated="right" color='orange' icon="edit" as={NavLink} to={`/employers/update/${id}`}>Profili Düzenle</Button>
                            <Button circular compact floated='right' color='red' as={NavLink} to={`/jobadvertisements/add/${id}`} >İlan Ekle</Button>
                        </Grid.Row>
                        <Grid.Row >
                            <Header textAlign='left' as="h1">
                                <span className='detail-header'>
                                    <Image src={employer.image?.url} size="small" circular bordered />
                                </span>
                                <br />
                                <span className='detail-header'>
                                    <strong>{employer.companyName}</strong>
                                </span>
                                <Header.Subheader>
                                    <Icon name="linkify" /> <a href={`https://${employer.webSite}`}>{employer.webSite}</a> <br />
                                    <Icon name='envelope' />Mail:&nbsp;<a href='mailto:${employer.email}'>{employer.email}</a><br/>
                                    <Icon  name='phone' size='small'/> Telefon:&nbsp; <a href='tel:${employer.phoneNumber}'>{employer.phoneNumber}</a>
                                </Header.Subheader>
                            </Header>

                            <Divider horizontal>
                                <a name="activeAdvertisements"></a>
                                <Icon name="paste" /> Aktif iş ilanları
                            </Divider>
                            <br />
                            {
                                activeAdvertisements.length == 0 ?
                                    <div>
                                        <Button circular color='green' content="Aktif İlan bulunamadı" />
                                    </div>
                                    :
                                    <div>
                                        <Button circular color='blue' content={`${activeAdvertisements.length} Aktif ilan bulunuyor`} />
                                        <div style={{marginTop:"2%"}}>

                                        <JobAdvertisementList type="byEmployer" itemsPerRow="2" id={id} />
                                        </div>
                                    </div>
                            }
                        </Grid.Row>
                        <br /><br />
                        <Divider horizontal>
                            <div style={{ margin: "2%" }}>
                                <a name="passiveAdvertisements"></a>
                            </div>
                            <Icon name='paste' />Pasif ilanlar
                        </Divider>
                        {

                            passiveJobAdvertisements.length == 0 ?
                                <span>
                                    <Button circular color='green' content="Pasif İlan Bulunamadı" />
                                </span>
                                :
                                <div>
                                    <div style={{ margin: "2%" }}>
                                        <Button circular color='blue' content={`${passiveJobAdvertisements.length} pasif ilan bulunuyor`} />
                                    </div>

                                    <Card.Group itemsPerRow="2">
                                        {
                                            passiveJobAdvertisements.map((advertisement) => (
                                                <Card raised key={advertisement.id}>
                                                    <Card.Content>
                                                        <Card.Header>
                                                            {advertisement.jobTitle?.jobTitle}
                                                        </Card.Header>
                                                        <Card.Meta>
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
                                                        <Button circular compact color='orange' floated='right' as={NavLink} to={`/jobadvertisements/${advertisement.id}`}>İlan Detayına Git</Button>
                                                    </Card.Content>
                                                </Card>
                                            ))
                                        }
                                    </Card.Group>
                                </div>
                        }
                        <br /><br />
                        <Divider horizontal>
                            <a name="advertisementsWaitingForConfirmation"></a>
                            <Icon name='paste' />Onay Bekleyen ilanlar
                        </Divider>
                        {

                            advertisementsWaitingForConfirmation.length == 0 ?
                                <span>
                                    <Button circular color='green' content="Onay bekleyen  ilan bulunamadı" />
                                </span>
                                :
                                <div>
                                    <div style={{ margin: "2%" }}>
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
                                                        <Button circular compact color='orange' floated='right' as={NavLink} to={`/jobadvertisements/${advertisement.id}`}>İlan Detayına Git</Button>
                                                    </Card.Content>
                                                </Card>
                                            ))
                                        }
                                    </Card.Group>
                                </div>
                        }
                    </Grid.Column>
                    <Grid.Column width="3" />
                </Grid.Row>
            </Grid>
        </Container>
    );
}

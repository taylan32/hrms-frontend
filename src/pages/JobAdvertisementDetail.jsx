import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import JobAdvertisementService from '../services/JobAdvertisementService'
import FavouriteJobAdvertisementService from '../services/FavouriteJobAdvertisementService'
import { Button, Container, Divider, Grid, Header, Icon, Label, List, Modal, Segment } from 'semantic-ui-react'
import Headline from '../layouts/Headline'
import StaffService from '../services/StaffService'
import EmployerService from '../services/EmployerService'
import CandidateService from '../services/CandidateService'

/*
const AdvertismentInitial = {
    active: true,
    username: "",
    password: "",
    city: {
        id: 0,
        cityName: ""
    },
    jobTitle: {
        id: 0,
        jobTitle: ""
    }
}
*/
export default function JobAdvertisementDetail() {

    let { id } = useParams()


    const [jobAdvertisement, setjobAdvertisements] = useState({})
    let jobAdvertisementService = new JobAdvertisementService()

    const [open, setOpen] = useState(false)
    let favouriteJobAdvertisementService = new FavouriteJobAdvertisementService()

    const [isEmployer, setIsEmployer] = useState(false)
    let employerService = new EmployerService()

    const [isCandidate, setIsCandidate] = useState(false)
    let candidateServive = new CandidateService()

    let staffService = new StaffService()
    const [isStaff, setIsStaff] = useState(false)


    useEffect(() => {
        jobAdvertisementService.getById(id).then(result => setjobAdvertisements(result.data.data))
        employerService.getByEmail(localStorage.getItem("email")).then((result) => setIsEmployer(result.data.success))
        candidateServive.getByEmail(localStorage.getItem("email")).then((result) => setIsCandidate(result.data.success))
        staffService.getByEmail(localStorage.getItem("email")).then((result) => setIsStaff(result.data.success))
    }, [])

    const handleAddToFavourite = (candidateId, jobAdvertisementId) => {
        favouriteJobAdvertisementService.add(candidateId, jobAdvertisementId)
    }



    const handleAdvertisementConfirm = () => {
        staffService.confirmAdvertisement(id).then(() => window.location.reload())
    }

    //const history = useHistory()

    const handleModel = (value) => {
        setOpen(value)
    }

    const handleSetActiveOrPassive = (advertisementId) => {
        if (jobAdvertisement.active == true) {
            jobAdvertisementService.setIsActiveFalse(advertisementId)
        }
        else {
            jobAdvertisementService.setIsActiveTrue(advertisementId)
        }
        handleModel(true)
        //window.location.reload()

    }

    return (

        <div>
            <Container className='content' >
                <div style={{ paddingTop: "12%" }}>
                    <Headline content="İlan Detayı" />
                </div>

                <Grid textAlign='left'>
                    <Grid.Row>
                        <Grid.Column width="3" />
                        <Grid.Column width="10" >
                            <Grid.Row>
                            {
                                isStaff && 
                                <Button color='green' circular compact content="Onayla" floated='right' onClick={() => handleAdvertisementConfirm()} />
                            }

                                {
                                    isEmployer &&
                                    <div>
                                        <Button color='google plus' circular compact content="Sil" floated='right' as={NavLink} to={`/employers/${jobAdvertisement.employer?.id}`} onClick={() => jobAdvertisementService.delete(jobAdvertisement).then()} />
                                        <Button compact circular color='orange' floated='right' as={NavLink} to={`/jobadvertisements/update/${jobAdvertisement.id}`} >Düzenle</Button>
                                        {jobAdvertisement.active == true ?
                                            <Button compact circular color='red' floated='right' onClick={() => handleSetActiveOrPassive(jobAdvertisement.id)}>İlanı Pasifleştir</Button>
                                            :
                                            <Button compact circular color='green' floated='right' onClick={() => handleSetActiveOrPassive(jobAdvertisement.id)}  >İlanı Aktifleştir</Button>
                                        }
                                    </div>
                                }
                                {
                                    isCandidate &&
                                    <Button compact circular color="yellow" icon="bookmark" floated='right' onClick={() => handleAddToFavourite(jobAdvertisement.id)}>Favorilere Ekle</Button>
                                }
                            </Grid.Row>
                            <Grid.Row>
                                <Header style={{ marginTop: "2%" }}>
                                    <span>{jobAdvertisement?.jobTitle?.jobTitle}</span> <br />
                                    <a href={`/employers/${jobAdvertisement.employer?.id}`} >{jobAdvertisement?.employer?.companyName}</a><br />
                                </Header>

                                <Icon name='linkify' /> <a href={`https://${jobAdvertisement.employer?.webSite}`}>{jobAdvertisement.employer?.webSite}</a> <br />
                                <Icon name="envelope" /> <a href={`mailto:${jobAdvertisement.employer?.email}`}>{jobAdvertisement.employer?.email}</a><br />
                                <Icon name="phone" /><a href={`tel:${jobAdvertisement.employer?.phoneNumber}`}>{jobAdvertisement.employer?.phoneNumber}</a> <br />
                                <Divider />
                                <br />
                                {
                                    jobAdvertisement.confirmed == false &&
                                    <div style={{ margin: "1%" }}>
                                        <Button size='lagrge' circular color='red' content="Onay Bekliyor" floated='center' />
                                    </div>
                                }
                                {jobAdvertisement?.description}
                                <br /><br />
                                <List bulleted>
                                    <List.Item>Şehir:&nbsp;{jobAdvertisement.city?.cityName}</List.Item>
                                    <List.Item>Çalışma Tipi:&nbsp;{jobAdvertisement.workingTime?.time}</List.Item>
                                    <List.Item>Çalışma Şekli:&nbsp;{jobAdvertisement.workingType?.type}</List.Item>
                                    {
                                        jobAdvertisement?.minSalary == 0 ? null :
                                            <List.Item>Minimum Maaş:&nbsp;{jobAdvertisement.minSalary}</List.Item>
                                    }
                                    {
                                        jobAdvertisement?.maxSalary == 0 ? null :
                                            <List.Item>Maximum Maaş:&nbsp;{jobAdvertisement.maxSalary}</List.Item>
                                    }
                                    <List.Item>Açık Pozisyon Sayısı:&nbsp;<Label circular color='violet' className='orbitron' >{jobAdvertisement.amount}</Label></List.Item>
                                </List>
                                <Label circular basic color='orange' size='huge' >
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width="2" />
                                            <Grid.Column width="2">
                                                <Icon name='calendar alternate outline' size='big' />
                                            </Grid.Column>
                                            <Grid.Column width="10">
                                                <span className='orbitron'>
                                                    Son Başvuru Tarihi <br />
                                                    {new Date(jobAdvertisement?.deadLine).toLocaleDateString('tr')}
                                                </span>

                                            </Grid.Column>
                                            <Grid.Column width="2" />
                                        </Grid.Row>
                                    </Grid>
                                </Label>
                            </Grid.Row>

                        </Grid.Column>
                        <Grid.Column width="3" />
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
                        <Header icon>
                            <Icon name='check' color='green' />

                        </Header>
                        <Modal.Content>
                            {
                                jobAdvertisement.active == true ?
                                    <span>
                                        <Header as="h2" className='orbitron' content="İlan Pasifleştirildi" />
                                    </span>
                                    :
                                    <span>
                                        <Header as="h2" className='orbitron' content="İlan Aktifleştirildi" />
                                    </span>
                            }
                        </Modal.Content>
                    </Segment>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={() => setOpen(false)} onClick={() => window.location.reload()}>
                            <Icon name='remove' /> Kapat
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Container>
        </div>
    )
}

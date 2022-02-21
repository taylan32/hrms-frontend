import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Divider, Grid, Header, Image } from 'semantic-ui-react';
import EmployerService from '../services/EmployerService'

export default function EmployerList() {

    const [employers, setemployers] = useState([]);
    let employerService = new EmployerService()

    useEffect(() => {
        employerService.getAllActive().then((result) => setemployers(result.data.data))
    }, [])


    return (
        <Card.Group itemsPerRow="2">
            {
                employers.map((employer) => (
                    <Card raised key={employer.id} >
                        <Card.Content textAlign='center' as={NavLink} to={`/employers/${employer.id}`}>
                            <Card.Header>
                                {/* <Header textAlign='left'>
                                <Image circular src={employer.image.url} />
                            </Header> */}
                                <Header as="h3" color='violet' content={employer.companyName} />
                                <Divider />
                            </Card.Header>
                            <Card.Meta>
                                <Grid>
                                    <Grid.Column width="5" >

                                        <Image circular size='tiny' src={employer.image.url} />
                                    </Grid.Column>
                                    <Grid.Column width="10">
                                        Website:&nbsp;{employer.webSite}<br /><br />
                                        Telefon:&nbsp;{employer.phoneNumber}<br /><br />
                                        Email:&nbsp;{employer.email}
                                    </Grid.Column>
                                </Grid>
                            </Card.Meta>

                        </Card.Content>
                    </Card>
                ))
            }
        </Card.Group>

    );
}

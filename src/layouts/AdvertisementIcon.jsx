import React from 'react';
import { Divider, Grid,  Image, Input, Segment } from 'semantic-ui-react';
import Headline from './Headline';

export default function AdvertisementIcon() {
    return (

        <Grid>
            <Grid.Row stretched columns="2">
                <Grid.Column>
                <br /> <br /> <br /> <br /> <br /> <br />
                    <Image src="https://res.cloudinary.com/dqfj17jgm/image/upload/v1644266670/kisspng-application-for-employment-job-hunting-icon-magnifying-glass-icon-5aa97123a15337.0666963015210539876608_pkcjau.jpg" 
                    width="70%" height="60%"
                    />
                </Grid.Column>
                <Grid.Column>
                    <Divider hidden />
                    <Divider hidden />
                    <Divider hidden />
                    <Divider hidden />

                    <Segment basic>
                        {/* <Header color='violet' textAlign="center">
                            <span className='headline-1' style={{fontSize:60}}>İlan ara</span>
                        </Header> */}
                        <Headline content="İlan ara" />
                    </Segment>

                    <Segment raised circular>
                        <Input transparent type='text' size='big' icon="search" placeholder="İlan ara..." />
                    </Segment>
                    <Divider hidden />
                    <Divider hidden />
                    <Divider hidden />
                </Grid.Column>
            </Grid.Row>
        </Grid>

    );
}

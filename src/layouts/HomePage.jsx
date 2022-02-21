import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Divider, Grid, Icon } from 'semantic-ui-react';
import JobAdvertisementList from '../pages/JobAdvertisementList';
import AdvertisementIcon from './AdvertisementIcon';

export default function HomePage() {
  return (
    <div>
      <AdvertisementIcon />
      <br />
      <Divider horizontal>
        <Icon name="paste" /> Güncel ilanlar
      </Divider>
      <br /><br />

      <JobAdvertisementList type="recently" itemsPerRow="3" />

      <Container>
        <Grid>
          <Grid.Row centered>
            <Button circular size='big' color='facebook' content="Tüm iş ilanları" as={NavLink} to={"/jobAdvertisements"} />

          </Grid.Row>
        </Grid>
        <br /><br />
      </Container>
    </div>

  );
}

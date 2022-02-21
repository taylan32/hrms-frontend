import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Grid,
  GridColumn,
  Header,
  Icon,
  Modal,
  ModalActions,
} from "semantic-ui-react";

export default function Login() {
  const [open, setOpen] = useState(false);

  const handleModal = (value) => {
    setOpen(value);
  };
  return (
    <span>
      <Button
        circular
        color="red"
        content="Giriş yap"
        onClick={() => handleModal(true)}
      />

      <Modal
        basic
        dimmer
        onClose={() => handleModal(false)}
        onOpen={() => handleModal(true)}
        open={open}
        size="small"
      >
        <Header icon as="h2" className="orbitron">
          <Icon name="sign-in" />
          Hesap türünü seçiniz
        </Header>

        <ModalActions>
          <Grid>
            <Grid.Row>
              <GridColumn width="5">
                <Button
                  circular fluid color="red" content= "Aday" as = {NavLink} to="/login"
                  onClick = {() => setOpen(false)} >
                </Button>
              </GridColumn>

             
              <GridColumn width="5">
                <Button
                  circular
                  fluid
                  color="yellow"
                  content="İşveren"
                  as={NavLink}
                  to="/login"
                  onClick={() => setOpen(false)}
                ></Button>
              </GridColumn>
              <GridColumn width="5">
                <Button
                  circular
                  fluid
                  color="blue"
                  content="Personel"
                  as={NavLink}
                  to="/login"
                  onClick={() => setOpen(false)}
                ></Button>
              </GridColumn>
            </Grid.Row>
          </Grid>
        </ModalActions>
      </Modal>
    </span>
  );
}

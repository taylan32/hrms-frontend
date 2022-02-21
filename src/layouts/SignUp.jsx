import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, GridColumn, Icon, Modal,  Header} from 'semantic-ui-react';

export default function SignUp() {
    const [open, setOpen] = useState(false);

    const handleModal = (value) => {
        setOpen(value)
    }
    return (
        <span>
            <Button
                circular
                color='orange'
                content="Kayıt ol"
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
                    <Icon className='paper plane outline' />
                    Hesap türünü seçiniz
                </Header>

                <Modal.Actions>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width="5" >
                                <Button
                                    circular
                                    fluid
                                    color="red"
                                    content="Aday"
                                    as={NavLink}
                                    to={"/candidate/add"}
                                    onClick={() => setOpen(false)}
                                />
                            </Grid.Column>
                            

                            <GridColumn width="5">
                                <Button 
                                circular
                                fluid
                                color = "yellow"
                                content = "İşveren"
                                as = {NavLink}
                                to = {"/employers/add"}
                                onClick= {()=>setOpen(false)}
                                />
                            </GridColumn>
                            <GridColumn width="5">
                                <Button 
                                circular
                                fluid
                                color = "blue"
                                content = "Personel"
                                as = {NavLink}
                                to = {"/staffs/add"}
                                onClick= {()=>setOpen(false)}
                                />
                            </GridColumn>

                        </Grid.Row>
                    </Grid>
                </Modal.Actions>
            </Modal>
        </span>

    );
}

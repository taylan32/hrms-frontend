import { Container, Divider, Grid, Icon, List } from "semantic-ui-react";

export default function Footer() {

    return (
        <Container>
            <Divider />
            <br />
            <Grid>
                <Grid.Row centered>
                    &copy;Copyright - 2022 - Ömer Taylan Alparslan
                </Grid.Row>
                <Grid.Row centered>
                    <List link horizontal>
                        <List.Item href="https://github.com/taylan32"><Icon name="github" size="large" /></List.Item>
                        <List.Item href="https://tr.linkedin.com/in/taylan-alparslan-984546201"> <Icon name="linkedin" size="large" /> </List.Item>
                    </List>
                </Grid.Row>
            </Grid>

            <br />
            <br />
        </Container>
    )

}
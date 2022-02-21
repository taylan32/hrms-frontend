import { Container, Header, Segment} from "semantic-ui-react";

export default function Headline({ content }) {

    return (
        <Container className="headline">
            <Segment basic>
                <Header color="violet" as="h4" textAlign="left">
                    <span className="headline-1" style={{fontSize:60}}>{content}</span>
                </Header>
            </Segment>
            <Segment basic size ="tiny"  color="yellow"/>
        </Container>
    )

}
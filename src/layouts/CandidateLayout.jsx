import { Container } from "semantic-ui-react";
import CandidateList from "../pages/CandidateList";
import Headline from "./Headline";

export default function CandidateLayout() {
    return (
        <div>
            <Container className="content">
                <div style={{paddingTop:"12%"}}> 
                    <Headline content="Adaylar" />
                </div>
                <CandidateList />
            </Container>
        </div>

    )
}
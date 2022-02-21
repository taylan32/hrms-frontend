import { Container } from "semantic-ui-react";
import EmployerList from "../pages/EmployerList";
import Headline from "./Headline";


export default function EmployerLayout() {

    return (
        <div>
            <Container  className="content">
                <div style={{paddingTop:"12%"}}>
                  <Headline  content="İşverenler" />
                </div>
                <EmployerList />
            </Container>
        </div>
    )

}
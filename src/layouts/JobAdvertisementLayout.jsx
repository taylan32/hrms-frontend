import { Container } from "semantic-ui-react";
import JobAdvertisementList from "../pages/JobAdvertisementList";
import Headline from "./Headline";

export default function JobAdvertisementPage() {
    return (
        <div>
            <Container className="content">
                
               <div style={{paddingTop:"12%"}}>
               
                     <Headline content="İş İlanları" />
               </div>
                
                <JobAdvertisementList type="filtered" itemsPerRow = "2" />
            </Container>
        </div>
    )
}
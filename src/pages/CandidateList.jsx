import React from "react"
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Card, Divider, Image } from "semantic-ui-react";
import CandidateService from "../services/CandidateService";
import ImageService from '../services/ImageService'

export default function CandidateList() {

    const [candidates, setcandidates] = useState([]);
    let candidateService = new CandidateService()

    const [image, setImage] = useState({})
    let imageService = new ImageService()


   let handleImage = (candiateId) => {
       return imageService.getByUserId(candiateId).then(result=>setImage(result.data.data))
       
    }

    useEffect(() => {
        candidateService.getAll().then((result) => setcandidates(result.data.data))   
    }, [])


    return (

        <Card.Group itemsPerRow="4">
            {
                candidates.map((candidate) => (

                    <Card raised key={candidate.id}>
                             
                        <Card.Content textAlign="center" as={NavLink} to={`/candidates/${candidate.id}`} >
                            <br />
                            <Card.Header className="montserrat">
                                 <Image circular size="small" src={candidate.image?.url} />
                                 <Divider />
                            </Card.Header>
                            <Card.Meta>
                            <strong>{candidate.firstName} {candidate.lastName}</strong>
                                <br /> {candidate.email}
                            </Card.Meta>
                        </Card.Content>
                    </Card>
                ))
            }
        </Card.Group>

    )
}
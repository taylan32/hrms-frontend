import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    Segment,
} from "semantic-ui-react";
import Headline from "../layouts/Headline";
import CandidateService from "../services/CandidateService";
import JobExperienceService from "../services/JobExperienceService";
import CandidateAboutService from "../services/CandidateAboutService";
import LanguageService from "../services/LanguageService";
import SchoolService from "../services/SchoolService";
import SkillService from "../services/SkillService";
import SocialMediaAccountService from "../services/SocialMediaAccountService";
import LanguageLevelIcon from "../layouts/LanguageLevelIcon";

export default function CandidateDetail() {
    let { id } = useParams();

    const [candidates, setCandidates] = useState([]);
    const [isCandidate, setIsCandidate] = useState(false)
    let candidateService = new CandidateService();

    const [jobExperiences, setjobExperiences] = useState([]);
    let jobExperienceService = new JobExperienceService();

    const [candidateAbouts, setcandidateAbouts] = useState([]);
    let candidateAboutService = new CandidateAboutService();

    const [languages, setlanguages] = useState([]);
    let languageService = new LanguageService();

    const [schools, setschools] = useState([]);
    let schoolService = new SchoolService();

    const [skills, setskills] = useState([]);
    let skillService = new SkillService();

    const [socialMediaAccounts, setsocialMediaAccounts] = useState([]);
    let socialMediaAccountService = new SocialMediaAccountService();

    useEffect(() => {
        candidateService.getAll().then((result) => setCandidates(result.data.data));
        candidateAboutService
            .getOne(id)
            .then((result) => setcandidateAbouts(result.data.data));
        jobExperienceService
            .getAll(id)
            .then((result) => setjobExperiences(result.data.data));
        languageService.getAll(id).then((result) => setlanguages(result.data.data));
        schoolService
            .getByCandidateIdSorted(id)
            .then((result) => setschools(result.data.data));
        skillService
            .getByCandidateId(id)
            .then((result) => setskills(result.data.data));
        socialMediaAccountService
            .getAllByCandidateId(id)
            .then((result) => setsocialMediaAccounts(result.data.data));
        candidateService.getByEmail(localStorage.getItem("email")).then((result) => setIsCandidate(result.data.success))
    }, []);

    return (
        <div>
            <Container className="content">
                <div style={{ paddingTop: "12%" }}>
                    <Headline content="Aday Profili" />
                </div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width="3" />
                        <Grid.Column width="10">
                            {candidates.map((candidate) => (
                                <Grid key={candidate.id}>
                                    {candidate.id == id && (
                                        <Grid.Row>
                                            <Grid.Column textAlign="left">
                                                {
                                                    isCandidate &&
                                                    <div style={{ textAlign: "right" }}>
                                                        <Button
                                                            circular
                                                            compact
                                                            flaoted="right"
                                                            color="orange"
                                                            as={NavLink}
                                                            to={`/candidates/update/${candidate.id}`}
                                                        >
                                                            {" "}
                                                            <Icon name="edit outline" /> Bilgileri Güncelle
                                                        </Button>
                                                    </div>}
                                                <Image
                                                    circular
                                                    size="small"
                                                    src={candidate.image?.url}
                                                />
                                                <Header textAlign="left">
                                                    <span className="detail-header">
                                                        <strong>
                                                            {candidate.firstName}&nbsp;&nbsp;
                                                            {candidate.lastName}
                                                        </strong>
                                                    </span>
                                                    <div style={{ textAlign: "left", fontSize: "small" }}>
                                                        {jobExperiences.length !== 0 ? (
                                                            <span>{jobExperiences[0].jobTitle.jobTitle}</span>
                                                        ) : null}
                                                        <br />
                                                        Email:{" "}
                                                        <a href="mailto:${candidate.email}">
                                                            {candidate.email}
                                                        </a>
                                                        <br />
                                                    </div>
                                                </Header>
                                                <Divider />
                                                {
                                                    isCandidate &&
                                                    <div>
                                                        <Button
                                                            circular
                                                            size="mini"
                                                            compact
                                                            color="pink"
                                                            content="Açıklama Ekle"
                                                            as={NavLink}
                                                            to={`/candidateabouts/add/${candidate.id}`}
                                                        />
                                                        <Button
                                                            circular
                                                            size="mini"
                                                            compact
                                                            color="red"
                                                            content="Eğitim Bilgisi Ekle"
                                                            as={NavLink}
                                                            to={`/school/add/${candidate.id}`}
                                                        />
                                                        <Button
                                                            circular
                                                            size="mini"
                                                            compact
                                                            color="facebook"
                                                            content="İş Tecrübesi Ekle"
                                                            as={NavLink}
                                                            to={`/jobexperiences/add/${candidate.id}`}
                                                        />
                                                        <Button
                                                            circular
                                                            size="mini"
                                                            compact
                                                            color="yellow"
                                                            content="Dil Ekle"
                                                            as={NavLink}
                                                            to={`/languages/add/${candidate.id}`}
                                                        />
                                                        <Button
                                                            circular
                                                            size="mini"
                                                            compact
                                                            color="orange"
                                                            content="Yetenek Ekle"
                                                            as={NavLink}
                                                            to={`/skills/add/${candidate.id}`}
                                                        />
                                                        <Button
                                                            circular
                                                            size="mini"
                                                            compact
                                                            color="violet"
                                                            content="Sosyal Medya Hesabı Ekle"
                                                            as={NavLink}
                                                            to={`/socialmediaaccounts/add/${candidate.id}`}
                                                        />
                                                        <Divider />
                                                    </div>
                                                }
                                                {candidateAbouts === null ? null : (
                                                    <Segment raised>
                                                        <Header>
                                                            Aday Hakkında &nbsp;&nbsp;&nbsp;&nbsp;
                                                        </Header>
                                                        <Divider />
                                                        <Grid>
                                                            {candidateAbouts.map((about) => (
                                                                <Grid.Row key={about.id}>
                                                                    <Grid.Column width="10">
                                                                        {about.description}
                                                                    </Grid.Column>
                                                                    <Grid.Column width="6">
                                                                        {
                                                                            isCandidate &&
                                                                            <div>
                                                                                <Button
                                                                                    circular
                                                                                    compact
                                                                                    color="orange"
                                                                                    content="Güncelle"
                                                                                    as={NavLink}
                                                                                    to={`/candidateabouts/update/${about.id}`}
                                                                                />
                                                                                <Button
                                                                                    circular
                                                                                    compact
                                                                                    color="red"
                                                                                    content="Sil"
                                                                                    onClick={() =>
                                                                                        candidateAboutService
                                                                                            .delete(about)
                                                                                            .then(() => window.location.reload())
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        }

                                                                    </Grid.Column>
                                                                </Grid.Row>
                                                            ))}
                                                        </Grid>
                                                    </Segment>
                                                )}
                                                {schools.length === 0 ? null : (
                                                    <Segment raised>
                                                        <Header>
                                                            Eğitim Bilgileri &nbsp;&nbsp;&nbsp;&nbsp;
                                                        </Header>
                                                        <Divider />
                                                        <Grid>
                                                            {schools.map((school) => (
                                                                <Grid.Row key={school.id}>
                                                                    <Grid.Column width="10">
                                                                        <strong>{school.schoolName}</strong>
                                                                        <br />
                                                                        {school.department}
                                                                        <br />
                                                                        <span className="extra">
                                                                            {school.yearOfStart}&nbsp;-&nbsp;{" "}
                                                                            {school.completed === true
                                                                                ? school.graduationYear
                                                                                : "Hala devam ediyor"}
                                                                        </span>
                                                                    </Grid.Column>
                                                                    <Grid.Column width="6">
                                                                        {
                                                                            isCandidate &&
                                                                            <div>
                                                                                <Button
                                                                                    circular
                                                                                    compact
                                                                                    color="orange"
                                                                                    content="Güncelle"
                                                                                    as={NavLink}
                                                                                    to={`/schools/update/${school.id}`}
                                                                                />
                                                                                <Button
                                                                                    circular
                                                                                    compact
                                                                                    color="red"
                                                                                    content="Sil"
                                                                                    onClick={() =>
                                                                                        schoolService
                                                                                            .delete(school)
                                                                                            .then(() => window.location.reload())
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        }
                                                                    </Grid.Column>
                                                                </Grid.Row>
                                                            ))}
                                                        </Grid>
                                                    </Segment>
                                                )}
                                                {jobExperiences.length === 0 ? null : (
                                                    <Segment raised>
                                                        <Header>
                                                            İş Tecrübeleri &nbsp;&nbsp;&nbsp;&nbsp;
                                                        </Header>
                                                        <Divider />
                                                        <Grid>
                                                            {jobExperiences.map((jobExperience) => (
                                                                <Grid.Row key={jobExperience.id}>
                                                                    <Grid.Column width="10">
                                                                        <strong>
                                                                            {jobExperience.jobTitle.jobTitle}
                                                                        </strong>
                                                                        <br />
                                                                        <strong>
                                                                            {jobExperience.workPlaceName}
                                                                        </strong>
                                                                        <br />
                                                                        <span>
                                                                            {jobExperience.yearOfStart}&nbsp;-&nbsp;
                                                                            {jobExperience.continued === true
                                                                                ? jobExperience.releaseYear
                                                                                : "Hala devam ediyor"}
                                                                        </span>
                                                                    </Grid.Column>
                                                                    <Grid.Column width="6">
                                                                        {
                                                                            isCandidate &&
                                                                            <div>
                                                                                <Button
                                                                                    circular
                                                                                    compact
                                                                                    color="orange"
                                                                                    content="Güncelle"
                                                                                    as={NavLink} to={`/jobexperiences/update/${jobExperience.id}`}
                                                                                />
                                                                                <Button
                                                                                    circular
                                                                                    compact
                                                                                    color="red"
                                                                                    content="Sil"
                                                                                    onClick={() =>
                                                                                        jobExperienceService
                                                                                            .delete(jobExperience)
                                                                                            .then(() => window.location.reload())
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        }
                                                                    </Grid.Column>
                                                                </Grid.Row>
                                                            ))}
                                                        </Grid>
                                                    </Segment>
                                                )}
                                                {languages.length === 0 ? null : (
                                                    <Segment raised>
                                                        <Header>Diller</Header>
                                                        <Divider />
                                                        <Grid>
                                                            {languages.map((language) => (
                                                                <Grid.Row key={language.id}>
                                                                    <Grid.Column width="10">
                                                                        <LanguageLevelIcon level={language.level} />{" "}
                                                                        &nbsp;&nbsp; {language.language}&nbsp;&nbsp;
                                                                        <i>
                                                                            {language.level == 1
                                                                                ? "Başlangıç Seviyesi"
                                                                                : language.level == 2
                                                                                    ? "Orta Seviye"
                                                                                    : language.level == 3
                                                                                        ? "Profesyonel Çalışma Yetkinliği"
                                                                                        : language.level === 4
                                                                                            ? "İkinci Dil"
                                                                                            : language.level === 5
                                                                                                ? "Anadil/İkinci dil"
                                                                                                : ""}
                                                                        </i>
                                                                        <br />
                                                                        <br />
                                                                    </Grid.Column>
                                                                    <Grid.Column width="6">
                                                                        {
                                                                            isCandidate &&
                                                                            <div>
                                                                                <Button
                                                                                    circular
                                                                                    compact
                                                                                    color="orange"
                                                                                    content="Güncelle"
                                                                                    as={NavLink} to={`/languages/update/${language.id}`}
                                                                                />
                                                                                <Button
                                                                                    circular
                                                                                    compact
                                                                                    color="red"
                                                                                    content="Sil"
                                                                                    onClick={() =>
                                                                                        languageService
                                                                                            .delete(language)
                                                                                            .then(() => window.location.reload())
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        }
                                                                    </Grid.Column>
                                                                </Grid.Row>
                                                            ))}
                                                        </Grid>
                                                    </Segment>
                                                )}
                                                {skills.length === 0 ? null : (
                                                    <Segment raised>
                                                        <Header>Yetenekler</Header>
                                                        <Divider />
                                                        <br />
                                                        <Grid>
                                                            <div
                                                                style={{ display: "flex", marginLeft: "2%" }}
                                                            >
                                                                {isCandidate == true ?
                                                                    skills.map((skill) => (
                                                                        <div>
                                                                            <Button
                                                                                compact
                                                                                attached="left"
                                                                                color="blue"
                                                                                disabled
                                                                            >
                                                                                {skill.skillName}
                                                                            </Button>
                                                                            <Button
                                                                                compact
                                                                                attached="right"
                                                                                color="red"
                                                                                icon="delete"
                                                                                onClick={() =>
                                                                                    skillService
                                                                                        .delete(skill)
                                                                                        .then(() => window.location.reload())
                                                                                }
                                                                            />
                                                                            <div style={{ margin: "2%" }}></div>
                                                                        </div>
                                                                    ))
                                                                    :
                                                                    skills.map((skill) => (
                                                                        <Button compact color="green" disabled>{skill.skillName}</Button>
                                                                    ))
                                                                }
                                                            </div>
                                                        </Grid>
                                                        <br />
                                                    </Segment>
                                                )}
                                                {socialMediaAccounts.length === 0 ? null : (
                                                    <Segment raised>
                                                        <Header>Sosyal Medya Hesapları</Header>
                                                        <Divider />
                                                        <Grid>
                                                            {socialMediaAccounts.map((socialMediaAccount) => (
                                                                <Grid.Row key={socialMediaAccount.id}>
                                                                    <Grid.Column width="10">
                                                                        <a href={socialMediaAccount.url}>
                                                                            <Icon
                                                                                name={socialMediaAccount.name}
                                                                                size="large"
                                                                            />
                                                                        </a>
                                                                        &nbsp;{socialMediaAccount.name}&nbsp;&nbsp;
                                                                    </Grid.Column>
                                                                    <Grid.Column>
                                                                        {
                                                                            isCandidate &&
                                                                            <Button
                                                                                color="red"
                                                                                circular
                                                                                compact
                                                                                content="Sil"
                                                                                onClick={() =>
                                                                                    socialMediaAccountService
                                                                                        .delete(socialMediaAccount)
                                                                                        .then(() => window.location.reload())
                                                                                }
                                                                            />}
                                                                    </Grid.Column>
                                                                </Grid.Row>
                                                            ))}
                                                        </Grid>
                                                    </Segment>
                                                )}
                                            </Grid.Column>
                                        </Grid.Row>
                                    )}
                                </Grid>
                            ))}
                        </Grid.Column>
                        <Grid.Column width="3" />
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    );
}

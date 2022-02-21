import React from 'react';
import { Route } from 'react-router-dom';
import { Container} from 'semantic-ui-react'
import CandidateAboutAdd from '../pages/CandidateAboutAdd';
import CandidateDetail from '../pages/CandidateDetail';
import CandidateUpdate from '../pages/CandidateUpdate';
import EmployerDetail from '../pages/EmployerDetail';
import JobAdvertisementDetail from '../pages/JobAdvertisementDetail';
import JobExperienceAdd from '../pages/JobExperienceAdd';
import LanguageAdd from '../pages/LanguageAdd';
import SchoolAdd from '../pages/SchoolAdd';
import SocialMedaiAccountAdd from '../pages/SocialMediaAccountAdd'
import SchoolUpdate from '../pages/SchoolUpdate';
import SkillAdd from '../pages/SkillAdd';
import CandidateLayout from './CandidateLayout';
import EmployerLayout from './EmployerLayout';
import Footer from './Footer';
import HomePage from './HomePage';
import JobAdvertisementLayout from './JobAdvertisementLayout';
import Navi from './Navi';
import JobTitleAdd from '../pages/JobTitleAdd';
import CandidateAboutUpdate from '../pages/CandidateAboutUpdate';
import JobExperienceUpdate from '../pages/JobExperienceUpdate';
import LanguageUpdate from '../pages/LanguageUpdate';
import JobAdvertisementUpdate from '../pages/JobAdvertisementUpdate';
import JobAdvertisementAdd from '../pages/JobAdvertisementAdd';
import EmployerUpdate from '../pages/EmployerUpdate';
import StaffProfile from '../pages/StaffProfile';
import CityAdd from '../pages/CityAdd';
import EmployerUpdateDetail from '../pages/EmployerUpdateDetail';
import EmployerUpdateDetailList from '../pages/EmployerUpdateDetailList';
import CandidateAdd from '../pages/CandidateAdd';
import Login from './Login';
import SignIn from './SignIn';

export default function Dashboard() {
  return (
      <Container className="dashboard" >
        <Navi/>
        
        <Route exact path="/" component={HomePage} />
        <Route exact path="/home"  component={HomePage}/>
        <Route exact path="/jobadvertisements" component={JobAdvertisementLayout} />
        <Route exact path="/candidates" component={CandidateLayout} />
        <Route exact path="/employers" component={EmployerLayout} />
        <Route exact path="/candidates/:id" component={CandidateDetail} />
        <Route exact path="/employers/:id" component={EmployerDetail} />
        <Route exact path="/jobadvertisements/:id" component={JobAdvertisementDetail} />
        <Route exact path="/candidates/update/:id" component={CandidateUpdate}  />
        <Route exact path="/schools/update/:id" component={SchoolUpdate} />
        <Route exact path="/school/add/:candidateId" component={SchoolAdd} />
        <Route exact path="/candidateabouts/add/:candidateId" component={CandidateAboutAdd} />
        <Route exact path="/jobexperiences/add/:candidateId" component={JobExperienceAdd} />
        <Route exact path="/languages/add/:candidateId" component={LanguageAdd} />
        <Route exact path="/skills/add/:candidateId" component={SkillAdd} />
        <Route exact path="/socialmediaaccounts/add/:candidateId" component={SocialMedaiAccountAdd} />
        <Route exact path="/jobtitles/add" component={JobTitleAdd} />
        <Route exact path="/candidateabouts/update/:id" component={CandidateAboutUpdate} />
        <Route exact path="/jobexperiences/update/:id" component={JobExperienceUpdate} />
        <Route exact path="/languages/update/:id" component={LanguageUpdate} />
        <Route exact path="/jobadvertisements/update/:id" component={JobAdvertisementUpdate} />
        <Route exact path="/jobadvertisements/add/:id" component={JobAdvertisementAdd} />
        <Route exact path="/employers/update/:id" component={EmployerUpdate} />
        <Route exact path="/admin" component={StaffProfile}/>
        <Route exact path="/cities/add" component={CityAdd} />
        <Route exact path="/employerupdatedetail/:id" component={EmployerUpdateDetail} />
        <Route exact path="/employerupdates" component={EmployerUpdateDetailList} />
        <Route exact path="/candidate/add" component={CandidateAdd} />
        <Route exact path="/login" component={SignIn} />
        
      <br/> <br/>
        <Footer />
      </Container>

  )
}

import React from 'react';
import { useEffect, useState } from 'react';
import JobAdvertisementService from '../services/JobAdvertisementService'
import CityService from '../services/CityService'
import JobTitleService from '../services/JobTitleService'
import WorkingTimeService from '../services/WorkingTimeService'
import WorkingTypeService from '../services/WorkingTypeService'
import FavouriteJobAdvertisementService from '../services/FavouriteJobAdvertisementService'
import { Grid, Icon, Label, Card, Button, Form } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PaginationButton from '../layouts/PaginationButton'


export default function JobAdvertisementList({ type, itemsPerRow, id }) {

  const [jobAdvertisements, setjobAdvertisements] = useState([]);
  let jobAdvertisementService = new JobAdvertisementService()

  const [favouriteJobAdvertisements, setfavouriteJobAdvertisements] = useState([]);
  let favouriteJobAdvertisementService = new FavouriteJobAdvertisementService()

  const [cities, setCities] = useState([]);
  let cityService = new CityService()

  const [jobTitles, setjobTitles] = useState([]);
  let jobTitleService = new JobTitleService()

  const [workingTimes, setworkingTimes] = useState([]);
  let workingTimeService = new WorkingTimeService()

  const [workingTypes, setworkingTypes] = useState([]);
  let workingTypeService = new WorkingTypeService()

  const [cityId, setCityId] = useState(0);
  const [jobTitleId, setjobTitleId] = useState(0);
  const [workingTimeId, setworkingTimeId] = useState(0);
  const [workingTypeId, setworkingTypeId] = useState(0);
  const [numberOfData, setnumberOfData] = useState(0);
  const [pageNo, setpageNo] = useState(1);
  const [pageSize, setpageSize] = useState(10);

  let totalNumberOfPages = Math.ceil(numberOfData === 0 ? 1 : numberOfData / pageSize)

  useEffect(() => {

    if (type === "recently") {
      jobAdvertisementService.getAllActiveAdvertisementSortedDESCTop6().then((result) => setjobAdvertisements(result.data.data))
    }
    else if (type === "byEmployer") {
      jobAdvertisementService.getAllActiveAdvertisementByEmployerIdSortedDESC(id).then((result) => setjobAdvertisements(result.data.data))
    }
    else if (type === "favourites") {
      favouriteJobAdvertisementService.getByCandidateId(id).then((result) => setfavouriteJobAdvertisements(result.data.data))
    }
    else if (type === "filtered") {
      jobAdvertisementService.getAllActiveAdvertisementPageableFilteredByCityAndJobTitleAndWorkingTimeAndWorkingType(cityId, jobTitleId, workingTimeId, workingTypeId, pageNo, pageSize).then((result) => setjobAdvertisements(result.data.data))
      jobAdvertisementService.getAllActiveAdvertisementFilteredByCityAndJobTitleAndWorkingTimeAndWorkingType(cityId, jobTitleId, workingTimeId, workingTypeId).then((result) => setnumberOfData(result.data.data.length))
      cityService.getAll().then((result) => setCities(result.data.data))
      jobTitleService.getAll().then((result) => setjobTitles(result.data.data))
      workingTimeService.getAll().then((result) => setworkingTimes(result.data.data))
      workingTypeService.getAll().then((result) => setworkingTypes(result.data.data))
    }

  }, [pageNo, pageSize, numberOfData])


  const handlePreviousPage = () => {
    if (pageNo != 1) {
      setpageNo(pageNo - 1)
    }
  }

  const handleNextPage = () => {
    if (pageNo != totalNumberOfPages) {
      setpageNo(pageNo + 1)
    }
  }

  const handleAddToFavourites = (jobAdvertisement) => { // candidate id gelecek
    favouriteJobAdvertisementService.add(jobAdvertisement)
  }

  const handleRemoveFromFavourites = (jobAdvertisement) => {
    favouriteJobAdvertisements.map((favouriteJobAdvertisement) => favouriteJobAdvertisement.jobAdvertisement?.id == jobAdvertisement.id && favouriteJobAdvertisementService.delete(favouriteJobAdvertisement))
  }

  const cityOptions = [{ value: 0, text: "Şehir seçiniz" }]
  cities.map((city) => cityOptions.push({
    key: city.id,
    text: city.cityName,
    value: city.id
  }))

  const jobTitleOptions = [{ value: 0, text: "Title seçiniz" }]
  jobTitles.map((jobTitle) => jobTitleOptions.push({
    key: jobTitle.id,
    text: jobTitle.jobTitle,
    value: jobTitle.id
  }))

  const workingTimeOptions = [{ value: 0, text: "Çalışma zamani seçiniz" }]
  workingTimes.map((workingTime) => workingTimeOptions.push({
    key: workingTime.id,
    text: workingTime.time,
    value: workingTime.id
  }))

  const workingTypeOptions = [{ value: 0, text: "Çalışma şekli seçiniz" }]
  workingTypes.map((workingType) => workingTypeOptions.push({
    key: workingType.id,
    text: workingType.type,
    value: workingType.id
  }))

  const handlePageSize = (size) => {
    setpageNo(1)
    setpageSize(size)
  }

  const handleCity = (value) => {
    setCityId(value)
  }

  const handleJobTitle = (value) => {
    setjobTitleId(value)
  }

  const handleWorkingTime = (value) => {
    setworkingTimeId(value)
  }

  const handleWorkingType = (value) => {
    setworkingTypeId(value)
  }

  const handleFilter = () => {
    setpageNo(1)
    setpageSize(10)
    jobAdvertisementService.getAllActiveAdvertisementFilteredByCityAndJobTitleAndWorkingTimeAndWorkingType(cityId, jobTitleId, workingTimeId, workingTypeId).then((result) => setnumberOfData(result.data.data.length))
    jobAdvertisementService.getAllActiveAdvertisementPageableFilteredByCityAndJobTitleAndWorkingTimeAndWorkingType(cityId, jobTitleId, workingTimeId, workingTypeId, pageNo, pageSize).then((result) => setjobAdvertisements(result.data.data))
  }

  const handleClearFilter = () => {
    window.location.reload();
  };

  return (
    <div>
      <Grid>
        {type === "filtered" && <Grid.Row>
          <Grid.Column width="12" textAlign='center'>
            <PaginationButton
              previous={() => handlePreviousPage()}
              next={() => handleNextPage()}
              pageContent={pageNo + " / " + totalNumberOfPages}
              pageSize1={() => handlePageSize(10)}
              pageSize2={() => handlePageSize(20)}
              pageSize3={() => handlePageSize(50)}
              pageSize4={() => handlePageSize(100)}
              pageSizeContent={"İlan sayısı: " + pageSize}
            />
          </Grid.Column>
          <Grid.Column width="4" />
        </Grid.Row>}

        <Grid.Column width={type === "filtered" ? "12" : "16"}>
          <Card.Group itemsPerRow={itemsPerRow}>

            {jobAdvertisements.map((jobAdvertisement) => (
              <Card raised key={jobAdvertisement.id} >
                <Card.Content>
                  {
                    type === "favourites"
                      ? <Button compact circular color="yellow" icon="minus" floated="right" onClick={() => handleRemoveFromFavourites(jobAdvertisement)} />
                      : <Button compact circular color="yellow" icon="bookmark" floated="right" onClick={() => handleAddToFavourites(jobAdvertisement)} />
                  }
                  <Card.Header className="montserrat">
                    {jobAdvertisement.jobTitle?.jobTitle}
                  </Card.Header>
                  <Card.Meta>
                    Firma:{jobAdvertisement.employer?.companyName}
                    <br />
                    Şehir:{jobAdvertisement.city?.cityName}
                    <br />
                    <strong>Açık pozisyon miktarı</strong> &nbsp;&nbsp;

                    <Label circular color="red" className="orbitron" content={jobAdvertisement.amount} />
                  </Card.Meta>
                  <Card.Description className="orbitron">
                    <strong>Yayımlanma Tarihi</strong> &nbsp;&nbsp;
                    {new Date(jobAdvertisement.creationDate).toLocaleDateString("tr")}
                    <br />
                    <strong>Son Başvuru Tarihi</strong> &nbsp;&nbsp;
                    {new Date(jobAdvertisement.deadLine).toLocaleDateString("tr")}
                  </Card.Description>

                </Card.Content>
                <Card.Content>
                  {
                    type === "recently" && <Icon name="info" size="big" color="orange" floated="right" />
                  }
                  <Button circular compact floated="right" color="violet" content="Detaylar" as={NavLink} to={`/jobadvertisements/${jobAdvertisement?.id}`} />
                </Card.Content>
              </Card>
            ))}
            {/***/}

          </Card.Group>
        </Grid.Column>
        {type === "filtered" &&
          <Grid.Column width="4">
            <Form>
              <Form.Select
                name="Title"
                placeholder="Title"
                options={jobTitleOptions}
                onChange={(event, data) => handleJobTitle(data.value)}
              />
              <Form.Select
                name="city"
                placeholder="Şehir"
                options={cityOptions}
                onChange={(event, data) => handleCity(data.value)}
              />
              <Form.Select
                name="workingTime"
                placeholder="Çalışma Zamanı"
                options={workingTimeOptions}
                onChange={(event, data) => handleWorkingTime(data.value)}
              />
              <Form.Select
                name="workingType"
                placeholder="Çalışma Şekli"
                options={workingTypeOptions}
                onChange={(event, data) => handleWorkingType(data.value)}
              />
              <br />
              <Button
                circular
                fluid
                color='yellow'
                content="Filtrele"
                onClick={() => handleFilter()}
              />
              <br />
              <Button
                circular
                fluid
                color='green'
                content="Temizle"
                onClick={() => handleClearFilter()}
              />


            </Form>
          </Grid.Column>
        }

      </Grid>

    </div>

  );
}

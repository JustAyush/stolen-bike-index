import React, { useState } from 'react';
import { Box, CircularProgress, Typography, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { Card, InfoWithFigure } from '../../components';
import { PageLayout } from '../../layouts';
import Form from './Form';
import SearchImg from '../../assets/images/png/search.png';
import NoResultImg from '../../assets/images/png/no-result.png';

import { fetchIncidents } from '../../services/httpService';

import { convertTo10DigitTimestamp } from '../../utils/momentUtils';

import { QUERY_CONSTANTS } from '../../constants';

const defaultQueryParams = {
  per_page: QUERY_CONSTANTS.PER_PAGE,
  proximity_square: QUERY_CONSTANTS.PROXIMITY_SQUARE,
  incident_type: QUERY_CONSTANTS.INCIDENT_TYPE
};

const Home = () => {
  // form input states
  const [location, setLocation] = useState({
    address: '',
    lat: '',
    lng: ''
  });
  const [title, setTitle] = useState('');
  const [occurredBefore, setOccurredBefore] = useState(null);
  const [occurredAfter, setOccurredAfter] = useState(null);
  // error state
  const [error, setError] = useState({
    text: '',
    warning: false,
    address: false,
    server: false
  });
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // Submitted state
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Bike Theft Incidents
  const [bikeTheftIncidents, setBikeTheftIncidents] = useState([]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const checkIfAddressTypeBtNotPicked = () => {
    if (location.address && !(location.lat || location.lng)) return true;
    return false;
  };

  const checkIfInputNotFilled = () => {
    if (
      !(
        location.lat ||
        location.lng ||
        title ||
        occurredBefore ||
        occurredAfter
      )
    ) {
      return true;
    }
    return false;
  };

  const getQueryParams = (page) => {
    return {
      page,
      occurred_before: occurredBefore
        ? convertTo10DigitTimestamp(occurredBefore)
        : undefined,
      occurred_after: occurredAfter
        ? convertTo10DigitTimestamp(occurredAfter)
        : undefined,
      proximity:
        location.lat && location.lng
          ? `${location.lat},${location.lng}`
          : undefined,
      query: title ? title.trim() : undefined
    };
  };

  const fetchBikeTheftIncidents = (queryObj) => {
    return new Promise((resolve, reject) => {
      fetchIncidents({
        ...queryObj,
        ...defaultQueryParams
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  };

  const checkInputValidation = () => {
    let isValidated = true;
    const isAddressTypeBtNotPicked = checkIfAddressTypeBtNotPicked();
    if (isAddressTypeBtNotPicked) {
      setError({
        warning: false,
        text:
          'Could not pick the exact location. Please pick the location from the suggestion',
        address: true,
        server: false
      });
      isValidated = false;
    }
    const isInputNotFilled = checkIfInputNotFilled();
    if (isInputNotFilled) {
      setError({
        warning: false,
        text: 'Please fill any of the inputs for searching results',
        address: false,
        server: false
      });
      isValidated = false;
    }
    return isValidated;
  };

  const handleFormSubmit = (page = 1) => {
    setCurrentPage(page);
    const isInputValidated = checkInputValidation();
    if (!isInputValidated) return;
    setError({ warning: false, text: '', address: false, server: false });
    setIsLoading(true);
    setIsSubmitted(true);
    const queryParams = getQueryParams(page);
    fetchBikeTheftIncidents(queryParams)
      .finally(() => setIsLoading(false))
      .then((response) => {
        setBikeTheftIncidents(response.incidents);
      })
      .catch((err) => {
        setError({
          warning: false,
          text: `We are having trouble fetching incidents : ${err.response.data.error}`,
          address: false,
          server: true
        });
      });
  };

  const handlePrevClick = () => {
    const isInputValidated = checkInputValidation();
    if (!isInputValidated) return;
    const prevPage = currentPage - 1;
    handleFormSubmit(prevPage);
  };

  const handleNextClick = () => {
    const isInputValidated = checkInputValidation();
    if (!isInputValidated) return;
    const nextPage = currentPage + 1;
    handleFormSubmit(nextPage);
  };

  const renderedInitialSearchInfo = !isLoading && !isSubmitted && (
    <InfoWithFigure
      imageUrl={SearchImg}
      text="Please search with any or all of the queries above to get bike theft
       incidents."
    />
  );

  const renderedResultNotFoundMsg = !isLoading &&
    isSubmitted &&
    bikeTheftIncidents &&
    bikeTheftIncidents.length < 1 && (
      <InfoWithFigure
        imageUrl={NoResultImg}
        text="We couldn't find any incidents with given queries."
      />
    );

  const renderedAlertMsg = !isLoading && Boolean(error.text) && (
    <Alert severity={error.warning ? 'warning' : 'error'} className="mb-4">
      {error.text}
    </Alert>
  );

  const renderedLoader = isLoading && (
    <Box display="flex" justifyContent="center" mt={12}>
      <CircularProgress color="secondary" />
    </Box>
  );

  const renderedResults =
    !isLoading &&
    bikeTheftIncidents &&
    bikeTheftIncidents.map((result) => (
      <Card
        key={result.id}
        imageUrl={result.media && result.media.image_url}
        title={result.title}
        address={result.address}
        description={result.description}
        stolenDate={result.occurred_at}
        reportedDate={result.updated_at}
      />
    ));

  const renderedPagination = !isLoading &&
    isSubmitted &&
    bikeTheftIncidents &&
    bikeTheftIncidents.length > 0 && (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}>
        <Typography variant="subtitle1" color="initial">
          Page&nbsp;
          {currentPage}
        </Typography>
        <Box>
          <Button
            disabled={currentPage === 1 || isLoading}
            onClick={handlePrevClick}>
            Prev
          </Button>
          <Button onClick={handleNextClick} disabled={isLoading}>
            Next
          </Button>
        </Box>
      </Box>
    );

  return (
    <div>
      <PageLayout
        header={
          <Form
            location={location}
            setLocation={setLocation}
            title={title}
            setTitle={setTitle}
            occurredBefore={occurredBefore}
            setOccurredBefore={setOccurredBefore}
            occurredAfter={occurredAfter}
            setOccurredAfter={setOccurredAfter}
            error={error}
            setError={setError}
            isLoading={isLoading}
            handleFormSubmit={handleFormSubmit}
          />
        }>
        {renderedPagination}
        {renderedAlertMsg}
        {renderedLoader}
        {renderedInitialSearchInfo}
        {renderedResultNotFoundMsg}
        {renderedResults}
        {bikeTheftIncidents &&
          bikeTheftIncidents.length > 5 &&
          renderedPagination}
      </PageLayout>
    </div>
  );
};

export default Home;

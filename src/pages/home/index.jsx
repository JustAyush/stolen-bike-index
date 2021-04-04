import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';

import { Card, InfoWithFigure } from '../../components';
import { PageLayout } from '../../layouts';
import Form from './Form';
import SearchImg from '../../assets/images/png/search.png';
import NoResultImg from '../../assets/images/png/no-result.png';

import { fetchIncidents } from '../../services/httpService';

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

  const checkIfAddressTypeBtNotPicked = () => {
    if (location.address && !(location.lat || location.lng)) return true;
    return false;
  };

  const validateInputs = () => {
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

  const fetchBikeTheftIncidents = () => {
    return new Promise((resolve, reject) => {
      fetchIncidents({
        page: 1,
        proximity_square: 10,
        incident_type: 'theft'
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  };

  const handleFormSubmit = () => {
    const isAddressTypeBtNotPicked = checkIfAddressTypeBtNotPicked();
    if (isAddressTypeBtNotPicked) {
      setError({
        warning: false,
        text:
          'Could not pick the exact location. Please pick the location from the suggestion',
        address: true,
        server: false
      });
      return;
    }
    const isInputNotFilled = validateInputs();
    if (isInputNotFilled) {
      setError({
        warning: false,
        text: 'Please fill any of the inputs for searching results',
        address: false,
        server: false
      });
      return;
    }
    setError({ warning: false, text: '', address: false, server: false });
    setIsLoading(true);
    setIsSubmitted(true);
    fetchBikeTheftIncidents()
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
        {!isLoading && Boolean(error.text) && (
          <Alert
            severity={error.warning ? 'warning' : 'error'}
            className="mb-4">
            {error.text}
          </Alert>
        )}
        {isLoading && 'Loading...'}
        {!isLoading && !isSubmitted && (
          <InfoWithFigure
            imageUrl={SearchImg}
            text="Please search with any or all of the queries above to get bike theft
             incidents."
          />
        )}
        {!isLoading &&
          isSubmitted &&
          bikeTheftIncidents &&
          bikeTheftIncidents.length < 1 && (
            <InfoWithFigure
              imageUrl={NoResultImg}
              text="We couldn't find any incidents with given queries."
            />
          )}
        {renderedResults}
      </PageLayout>
    </div>
  );
};

export default Home;

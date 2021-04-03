import React from 'react';

import { Card } from '../../components';

import { PageLayout } from '../../layouts';

const DEMO_DATA = [
  {
    id: 137770,
    title: 'Streets (Hazard/Debris/Animal in Roadway)',
    description:
      'Glass on the side of the road northbound direction on Beach Park just before Foster City Blvd intersection. Makes it so bikers are forced to ride out in traffic or risk puncturing their tires. ',
    address: 'Beach Park Blvd & Foster City Blvd Foster City, CA, 94404, USA',
    occurred_at: 1617138908,
    updated_at: 1617142487,
    url: 'https://bikewise.org/api/v1/incidents/137770',
    source: {
      name: 'SeeClickFix.com',
      html_url: 'https://seeclickfix.com/issues/9620971',
      api_url: 'https://seeclickfix.com/api/v2/issues/9620971'
    },
    media: {
      image_url:
        'https://files.bikeindex.org/uploads/Pu/414010/large_SC_Bike_Photo.jpg',
      image_url_thumb: null
    },
    location_type: null,
    location_description: null,
    type: 'Hazard',
    type_properties: null
  }
];

const Home = () => {
  const renderedResults = DEMO_DATA.map((result) => (
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
      <PageLayout header={<p>Hello World</p>}>{renderedResults}</PageLayout>
    </div>
  );
};

export default Home;

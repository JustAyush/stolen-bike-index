import React from 'react';
import { render } from '@testing-library/react';
import Card from './index';

describe('----------- Testing <Card /> : Component that displays the search result -------------', () => {
  it('props work', () => {
    const imageUrl =
      'https://files.bikeindex.org/uploads/Pu/414010/large_SC_Bike_Photo.jpg';
    const title = 'Streets (Hazard/Debris/Animal in Roadway)';
    const address =
      'Beach Park Blvd & Foster City Blvd Foster City, CA, 94404, USA';
    const description =
      'Glass on the side of the road northbound direction on Beach Park';
    const stolenDate = 1617130800;
    const reportedDate = 1617224423;
    const card = render(
      <Card
        imageUrl={imageUrl}
        title={title}
        address={address}
        description={description}
        stolenDate={stolenDate}
        reportedDate={reportedDate}
      />
    );
    const image = card.getByAltText(new RegExp(`mtb-bike`, 'i'));
    expect(image.src).toContain(imageUrl);
    expect(card.getByTestId('title').textContent).toBe(title);
    expect(card.getByTestId('address').textContent).toBe(address);
    expect(card.getByTestId('description').textContent).toBe(description);
    expect(card.getByTestId('stolen-date').textContent).toBe('Mar 31, 2021');
    expect(card.getByTestId('reported-date').textContent).toBe('Apr 1, 2021');
  });

  it('the component is presentational only', () => {
    const imageUrl =
      'https://files.bikeindex.org/uploads/Pu/413390/large_20200525_122921.jpg';
    const title = 'Stolen 2019 Giant Escape 2 Disc(silver, gray or bare metal)';
    const address = 'Indianapolis, IN, 46205';
    const description =
      'Garage opener stolen from car. Bike stolen from garage.';
    const stolenDate = 1616914800;
    const reportedDate = 1617008422;
    const card = render(
      <Card
        imageUrl={imageUrl}
        title={title}
        address={address}
        description={description}
        stolenDate={stolenDate}
        reportedDate={reportedDate}
      />
    );
    const image = card.getByAltText(new RegExp(`mtb-bike`, 'i'));
    expect(image.src).toContain(imageUrl);
    expect(card.getByTestId('title').textContent).toBe(title);
    expect(card.getByTestId('address').textContent).toBe(address);
    expect(card.getByTestId('description').textContent).toBe(description);
    expect(card.getByTestId('stolen-date').textContent).toBe('Mar 28, 2021');
    expect(card.getByTestId('reported-date').textContent).toBe('Mar 29, 2021');
  });
});

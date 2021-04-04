import React from 'react';
import { render } from '@testing-library/react';
import InfoWithFigure from './index';

describe('----------- Testing <InfoWithFigure /> : Component used for handling initial unsearched and no result found scenarios -------------', () => {
  it('props work', () => {
    const imageUrl =
      'https://files.bikeindex.org/uploads/Pu/414010/large_SC_Bike_Photo.jpg';
    const text = 'Search with new queries.';
    const infoWithFigure = render(
      <InfoWithFigure imageUrl={imageUrl} text={text} />
    );
    const image = infoWithFigure.getByAltText(new RegExp(`fig`, 'i'));
    expect(image.src).toContain(imageUrl);
    expect(infoWithFigure.getByTestId('info-text').textContent).toBe(text);
  });

  it('the component is presentational only', () => {
    const imageUrl =
      'https://files.bikeindex.org/uploads/Pu/413390/large_20200525_122921.jpg';
    const text = 'We could not find incidents matching given queries.';
    const infoWithFigure = render(
      <InfoWithFigure imageUrl={imageUrl} text={text} />
    );
    const image = infoWithFigure.getByAltText(new RegExp(`fig`, 'i'));
    expect(image.src).toContain(imageUrl);
    expect(infoWithFigure.getByTestId('info-text').textContent).toBe(text);
  });
});

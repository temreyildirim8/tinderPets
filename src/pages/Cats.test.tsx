import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import axios from 'axios';

import Cats from './Cats';

jest.mock('axios');

describe('Cats', () => {
  const mockedCatImage = {
    id: '2bbSbBC-v',
    url: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg',
    breeds: [
      {
        name: 'Abyssinian',
        id: '2bbSbBC-v',
      },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', async () => {
    const {getByTestId} = render(<Cats />);
    const image = getByTestId('cat-image');
    expect(image.props.source.uri).toBe(mockedCatImage.url);
  });

  it('fetches a new cat image when the component mounts', async () => {
    const {getByTestId} = render(<Cats />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    const image = getByTestId('cat-image');
    expect(image.props.source.uri).toBe(mockedCatImage.url);
  });

  it('votes for the cat image when the like button is pressed', async () => {
    const {getByTestId} = render(<Cats />);
    const likeButton = getByTestId('like-button');
    fireEvent.press(likeButton);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/votes?api_key=live_PObtf0cErjNokIYUcUmTg7Yl7NXlXFw3R5RolGPlNlzKN21f8ZEIr0YXyYjJ4xDY',
      {image_id: mockedCatImage.id, value: 1},
    );
  });

  it('votes against the cat image when the unlike button is pressed', async () => {
    const {getByTestId} = render(<Cats />);
    const unlikeButton = getByTestId('unlike-button');
    fireEvent.press(unlikeButton);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/votes?api_key=live_PObtf0cErjNokIYUcUmTg7Yl7NXlXFw3R5RolGPlNlzKN21f8ZEIr0YXyYjJ4xDY',
      {image_id: mockedCatImage.id, value: -1},
    );
  });
});

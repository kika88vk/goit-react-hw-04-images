import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { apiImages } from 'ApiImages/ApiImages';
import PropTypes from 'prop-types';

export const ImageGallery = ({ imageTags, openModal }) => {
  // state = {
  //   images: null,
  //   error: null,
  //   status: 'idle',
  //   page: 1,
  // };
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setStatus('pending');
    apiImages(imageTags, page)
      .then(images => setImages(images.hits))
      .then(setStatus('resolved'))
      .catch(error => setError(error), setStatus('rejected'));
  }, [imageTags]);

  useEffect(() => {
    setStatus('pending');
    apiImages(imageTags, page)
      .then(images => setImages(prevImages => [...prevImages, ...images.hits]))
      .then(setStatus('resolved'))
      .catch(error => setError(error), setStatus('rejected'));
  }, [page]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.imageTags !== this.props.imageTags) {
  //     this.setState({ status: 'pending' });

  //     apiImages(this.props.imageTags, this.state.page)
  //       .then(images =>
  //         this.setState({ images: images.hits, status: 'resolved' })
  //       )
  //       .catch(error => this.setState({ error, status: 'rejected' }));
  //   }
  //   if (prevState.page !== this.state.page) {
  //     this.setState({ status: 'pending' });

  //     apiImages(this.props.imageTags, this.state.page)
  //       .then(images =>
  //         this.setState(prevState => {
  //           return {
  //             images: [...prevState.images, ...images.hits],
  //             status: 'resolved',
  //           };
  //         })
  //       )
  //       .catch(error => this.setState({ error, status: 'rejected' }));
  //   }
  // }

  const handleBtnChangePage = () => {
    // this.setState(prev => ({ page: prev.page + 1 }));
    setPage(prevPage => prevPage + 1);
    console.log('gallery page', page);
  };

  // const { images, error, status } = this.state;

  if (status === 'idle') {
    return <h1 className={css.heading}>Enter what you're looking for</h1>;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <h1 className={css.heading}>{error}</h1>;
  }

  if (status === 'resolved') {
    return (
      <>
        {images.length === 0 && (
          <h1 className={css.heading}>Sorry, pictures are not found!</h1>
        )}

        <ul className={css.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              bigPhoto={image.largeImageURL}
              smallPhoto={image.webformatURL}
              tags={image.tags}
              openModal={openModal}
            />
          ))}
        </ul>
        {images.length > 0 && <Button onChangePage={handleBtnChangePage} />}
      </>
    );
  }
};

ImageGallery.propTypes = {
  imageTags: PropTypes.string,
  openModal: PropTypes.func,
};

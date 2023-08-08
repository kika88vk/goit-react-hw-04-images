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
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    setStatus('pending');
    apiImages(imageTags, page)
      .then(photos => {
        if (imageTags === '') {
          setStatus('idle');
          return;
        }
        if (page === 1) {
          setImages(photos.hits);
          setTotalHits(photos.totalHits);
          console.log('images', images);
          console.log('totalHits', totalHits);
          console.log('images.length', images.length);
          setStatus('resolved');
          return;
        }
        if (page > 1) {
          setImages(prevImages => [...prevImages, ...photos.hits]);
          console.log('photos', photos);
          setStatus('resolved');
        }
      })

      .catch(error => {
        setError(error.message);
        setStatus('rejected');
      });
  }, [imageTags, page]);

  // useEffect(() => {
  //   setStatus('pending');
  //   apiImages(imageTags, page)
  //     .then(images => {
  //       setImages(prevImages => [...prevImages, ...images.hits]);
  //       setStatus('resolved');
  //     })

  //     .catch(error => {
  //       setError(error.message);
  //       setStatus('rejected');
  //     });
  // }, [page]);

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

  return (
    <>
      {status === 'idle' && (
        <h1 className={css.heading}>Enter what you're looking for</h1>
      )}
      {status === 'pending' && <Loader />}
      {totalHits === 0 && (
        <h1 className={css.heading}>Sorry, pictures are not found!</h1>
      )}

      {status === 'resolved' && (
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
      )}
      {images.length > 0 && <Button onChangePage={handleBtnChangePage} />}
      {status === 'rejected' && <h1 className={css.heading}>{error}</h1>}
    </>
  );
};

ImageGallery.propTypes = {
  imageTags: PropTypes.string,
  openModal: PropTypes.func,
};

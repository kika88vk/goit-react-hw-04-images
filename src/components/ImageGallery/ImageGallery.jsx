import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { apiImages } from 'ApiImages/ApiImages';
import PropTypes from 'prop-types';

export const ImageGallery = ({ imageTags, openModal }) => {
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (imageTags !== '' && page > 0) {
      getImages();
    }

    async function getImages() {
      try {
        setStatus('pending');
        const photos = await apiImages(imageTags, page);
        if (page === 1) {
          setImages(photos.hits);
          setStatus('resolved');
        } else {
          setImages(prevImages => [...prevImages, ...photos.hits]);
          console.log('photos', photos);
          setStatus('resolved');
        }

        setTotalHits(photos.total);
      } catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    }
  }, [imageTags, page]);

  const handleBtnChangePage = () => {
    setPage(prevPage => prevPage + 1);
    console.log('gallery page', page);
  };

  const showImages = Array.isArray(images) && images.length > 0;
  return (
    <>
      {status === 'idle' && (
        <h1 className={css.heading}>Enter what you're looking for</h1>
      )}
      {status === 'pending' && <Loader />}
      {totalHits === 0 && status === 'resolved' && (
        <h1 className={css.heading}>Sorry, pictures are not found!</h1>
      )}

      {status === 'resolved' && showImages && (
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
      {images?.length < totalHits / page && (
        <Button onChangePage={handleBtnChangePage} />
      )}
      {status === 'rejected' && <h1 className={css.heading}>{error}</h1>}
    </>
  );
};

ImageGallery.propTypes = {
  imageTags: PropTypes.string,
  openModal: PropTypes.func,
};

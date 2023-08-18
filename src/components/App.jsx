import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { useState, useEffect } from 'react';
import { Loader } from 'components/Loader/Loader';
import { apiImages } from 'ApiImages/ApiImages';
import { Button } from 'components/Button/Button';

export const App = () => {
  const [imageTags, setImageTags] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [bigImage, setBigImage] = useState({});
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [images, setImages] = useState(null);

  const handleFormSubmit = (imageTags, page) => {
    setImageTags(imageTags);
    setPage(page);
  };

  const openModal = (bigPhoto, tags) => {
    setShowModal(true);
    setBigImage({ bigPhoto, tags });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    async function getImages() {
      try {
        setStatus('pending');
        const photos = await apiImages(imageTags, page);
        if (page === 1) {
          setImages(photos.hits);
          setStatus('resolved');
        } else {
          setImages(prevImages => [...prevImages, ...photos.hits]);

          setStatus('resolved');
        }

        setTotalHits(photos.total);
      } catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    }

    if (imageTags !== '' && page > 0) {
      getImages();
    }
    console.log('page', page);
  }, [imageTags, page]);

  const handleBtnChangePage = () => {
    setPage(prevPage => prevPage + 1);
    console.log('gallery page', page);
  };

  return (
    <div className={css.App}>
      <Searchbar onPropSubmit={handleFormSubmit} />
      {status === 'idle' && (
        <h1 className={css.heading}>Enter what you're looking for</h1>
      )}
      {status === 'pending' && <Loader />}
      {totalHits === 0 && status === 'resolved' && (
        <h1 className={css.heading}>Sorry, pictures are not found!</h1>
      )}
      {status === 'resolved' && (
        <ImageGallery imagesList={images} openModal={openModal} />
      )}
      {images?.length < totalHits / page && (
        <Button onChangePage={handleBtnChangePage} />
      )}
      {status === 'rejected' && <h1 className={css.heading}>{error}</h1>}
      {showModal && (
        <Modal onClose={closeModal}>
          <img
            width="1400"
            height="900"
            src={bigImage.bigPhoto}
            alt={bigImage.tags}
          />
        </Modal>
      )}
    </div>
  );
};

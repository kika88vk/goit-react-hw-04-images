import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const App = () => {
  const [imageTags, setImageTags] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [bigImage, setBigImage] = useState({});
  const [page, setPage] = useState(1);

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

  return (
    <div className={css.App}>
      <Searchbar onPropSubmit={handleFormSubmit} />
      <ImageGallery
        imageTags={imageTags}
        pageFromApp={page}
        openModal={openModal}
      />
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

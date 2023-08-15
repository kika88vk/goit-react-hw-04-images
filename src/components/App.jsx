import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const App = () => {
  const [imageTags, setImageTags] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [bigImage, setBigImage] = useState({});

  const handleFormSubmit = imageTags => {
    setImageTags(imageTags);
    console.log('imageTags', imageTags);
  };

  const openModal = (bigPhoto, tags) => {
    setShowModal(true);
    setBigImage({ bigPhoto, tags });
    console.log('open modal', showModal);
  };

  const closeModal = () => {
    setShowModal(false);
    console.log('close modal', showModal);
  };

  return (
    <div className={css.App}>
      <Searchbar onPropSubmit={handleFormSubmit} />
      <ImageGallery imageTags={imageTags} openModal={openModal} />
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

import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const App = () => {
  // state = {
  //   imageTags: '',
  //   showModal: false,
  // };

  const [imageTags, setImageTags] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [bigImage, setBigImage] = useState({});

  const handleFormSubmit = imageTags => {
    // this.setState({ imageTags });
    setImageTags(imageTags);
    console.log('imageTags', imageTags);
  };

  const openModal = (bigPhoto, tags) => {
    // this.setState({ showModal: true, bigImage: { bigPhoto, tags } });
    setShowModal(true);
    setBigImage({ bigPhoto, tags });
    console.log('open modal', showModal);
  };

  const closeModal = () => {
    // this.setState({ showModal: false });
    setShowModal(false);
    console.log('close modal', showModal);
  };

  // const { imageTags, bigImage, showModal } = this.state;
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

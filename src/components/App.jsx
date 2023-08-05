import React, { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    imageTags: '',
    showModal: false,
  };

  handleFormSubmit = imageTags => {
    this.setState({ imageTags });
    console.log(imageTags);
  };

  openModal = (bigPhoto, tags) => {
    this.setState({ showModal: true, bigImage: { bigPhoto, tags } });
    console.log('open modal', this.state.showModal);
  };

  closeModal = () => {
    this.setState({ showModal: false });
    console.log('close modal', this.state.showModal);
  };

  render() {
    const { imageTags, bigImage, showModal } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onPropSubmit={this.handleFormSubmit} />
        <ImageGallery imageTags={imageTags} openModal={this.openModal} />
        {showModal && (
          <Modal onClose={this.closeModal}>
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
  }
}

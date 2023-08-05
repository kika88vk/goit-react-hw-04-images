import css from './ImageGalleryItem.module.css';
import React, { Component } from 'react';
// import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  // state = {
  //   showModal: false,
  // };

  // openModal = () => {
  //   this.setState({ showModal: true });
  //   console.log('open modal');
  // };

  // closeModal = () => {
  //   this.setState({ showModal: false });
  //   console.log('close modal');
  // };

  render() {
    const { bigPhoto, smallPhoto, tags, openModal } = this.props;
    return (
      <li
        className={css.ImageGalleryItem}
        onClick={() => openModal(bigPhoto, tags)}
      >
        <img
          src={smallPhoto}
          alt={tags}
          className={css.ImageGalleryItemImage}
        />
      </li>
    );
  }
}

/* {this.state.showModal && (
          <Modal onClose={this.closeModal}>
            <img width="1400" height="900" src={bigPhoto} alt={tags} />
          </Modal>
        )} */
ImageGalleryItem.propTypes = {
  bigPhoto: PropTypes.string,
  smallPhoto: PropTypes.string,
  tags: PropTypes.string,
  openModal: PropTypes.func,
};

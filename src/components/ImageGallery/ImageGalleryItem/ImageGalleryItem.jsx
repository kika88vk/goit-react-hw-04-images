import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ bigPhoto, smallPhoto, tags, openModal }) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => openModal(bigPhoto, tags)}
    >
      <img src={smallPhoto} alt={tags} className={css.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  bigPhoto: PropTypes.string,
  smallPhoto: PropTypes.string,
  tags: PropTypes.string,
  openModal: PropTypes.func,
};

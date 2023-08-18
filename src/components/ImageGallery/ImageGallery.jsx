import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ imagesList, openModal }) => {
  const showImages = Array.isArray(imagesList) && imagesList.length > 0;
  return (
    <>
      {showImages && (
        <ul className={css.ImageGallery}>
          {imagesList.map(image => (
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
    </>
  );
};

ImageGallery.propTypes = {
  imagesList: PropTypes.array,
  openModal: PropTypes.func,
};

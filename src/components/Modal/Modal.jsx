import css from './Modal.module.css';

import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  const handleKeyDown = useCallback(
    evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleClickOnOverlay = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
    return;
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleClickOnOverlay}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

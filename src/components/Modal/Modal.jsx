import css from './Modal.module.css';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
    console.log('close esc');
  };

  handleClickOnOverlay = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }

    console.log('close target');
    return;
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleClickOnOverlay}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

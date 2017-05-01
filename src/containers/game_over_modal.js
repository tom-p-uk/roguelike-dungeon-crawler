import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
} from 'react-modal-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

class GameOverModal extends Component {



  render() {
    const dialogStyles = {
      open: {
        top: 200,
        background: 'rgba(255, 255, 255, 1)',
      }
    };

    return (
      <div className='layout-page'>
        <main className='layout-main'>
          <div className='container game-over-modal'>
            <Modal isOpen={this.props.isOpen} size='modal-lg' dialogStyles={dialogStyles}>
              <ModalBody>
                <div className="game-over-text">Game over</div>
                <div className="play-again-text">You died. Press enter to play again</div>
              </ModalBody>
            </Modal>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isOpen: state.gameOverIsOpen };
};

export default connect(mapStateToProps, actions)(GameOverModal);

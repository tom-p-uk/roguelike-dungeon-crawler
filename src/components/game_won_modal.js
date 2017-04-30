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

class GameWonModal extends Component {

  render() {
    return (
      <div className='layout-page'>
        <main className='layout-main'>
          <div className='container game-won-modal'>
            <Modal isOpen={this.props.isOpen} size='modal-sm' onRequestHide={this.props.closeModal}>
              <ModalBody>
                <div className="game-won-text">You defeated the boss</div>
                <div className="play-again-text">Press enter to play again</div>
              </ModalBody>
            </Modal>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isOpen: state.gameWonIsOpen };
};

export default connect(mapStateToProps, actions)(GameWonModal);

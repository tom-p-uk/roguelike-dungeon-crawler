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
    const dialogStyles = {
      open: {
        top: 200
      }
    };

    return (
      <div className='layout-page'>
        <main className='layout-main'>
          <div className='container game-won-modal'>
            <Modal isOpen={this.props.isOpen} size='modal-sm' dialogStyles={dialogStyles}>
              <ModalBody>
                <div className="game-won-text">You won</div>
                <div className="play-again-text">You defeated the boss. Press enter to play again</div>
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

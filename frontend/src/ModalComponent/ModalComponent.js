import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import './modal.css'

const ModalComponent = (props) => {
    const { modalOpen, modalClose, betRecord } = props
    const totalAmount = betRecord.reduce((a, b) => +a + +b.betAmount, 0)

    return (
        <div>
            <Modal isOpen={modalOpen} toggle={modalClose} >
                <ModalHeader ><h3>Bet Receipt</h3></ModalHeader>
                <ModalBody>
                    {betRecord && betRecord.map(item => {
                        return <div>
                            <h6>{item.name}</h6>
                            <p>Bet Amount: £{item.betAmount}</p>
                            <hr />
                        </div>
                    })}
                </ModalBody>
                <h4 className='mt-4'>Total Amount: £{totalAmount} </h4><br />
                <Button color='danger' onClick={modalClose} className='m-3'>Close</Button>
            </Modal>
        </div>
    )
}

export default ModalComponent;
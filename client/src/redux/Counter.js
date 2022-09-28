import React, { useState } from "react";
// import Modal from 'react-modal';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";

function Counter(props) {
    const { number, number1 } = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [cw, setCw] = useState("Connect Wallet");
    const [ctk, setCtk] = useState("Connect to Kaikas");

    const modalClose = () => setModalIsOpen(false);
    const modalOpen = () => setModalIsOpen(true);

    const dispatch = useDispatch();
    const dispatchSetCW = (cw) => dispatch({ type: "SET_CW", number: cw });
    const dispatchSetCtk = (cw) => dispatch({ type: "SET_CTK", number1: cw });

    const connectWallet = async () => {
        if (window.klaytn !== 'undefined') { // 카이카스가 설치되어있으면
            if (window.klaytn.isKaikas) {
                const accounts = await window.klaytn.enable()
                setCw(accounts[0]);
                setCtk(accounts[0]);
                dispatchSetCW(accounts[0]);
                dispatchSetCtk(accounts[0]);
            }
        } else { //카이카스 설치가 되어있지 않을때
            //          카이카스 설치 팝업 
        }
    };

    return (
        <>
            <Button size="sm" variant="outline-secondary" onClick={modalOpen}>{number}</Button>
            <Modal
                show={modalIsOpen}
                onHide={modalClose}
                backdrop="static"
                keyboard={false}
            >   <Modal.Header closeButton>
                    <Modal.Title>Connect Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You can start using JDex right away, using Kaikas.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="metaConnect"
                        variant="primary"
                        onClick={() => {
                            connectWallet();
                        }}>
                        {number1}
                    </Button>
                </Modal.Footer>
            </Modal>



        </>
    );

};

export default Counter;
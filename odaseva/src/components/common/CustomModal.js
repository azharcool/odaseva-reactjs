import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color:rgba(0, 40, 144, 0.9);
    position: fixed;
    display: flex;
    justify-content:center;
    align-items: center;
    z-index: 999999999999999999;
`;



export function CustomModal({ children, showModal, setShowModal }) {
    const modalRef = useRef();
    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? 'translateY(0%)' : 'translateY(-100%)'
    });

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal();
        }
    };

    if (!showModal) {
        return null;
    };

    return (
        <Background ref={modalRef} onClick={closeModal}>
            <animated.div style={animation}>
                {children}
            </animated.div>
        </Background>
    )

}

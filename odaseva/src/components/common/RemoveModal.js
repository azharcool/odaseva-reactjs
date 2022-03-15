import * as React from 'react';
import styled from 'styled-components';
import { DeleteIcon, CloseIcon } from '../common/Icons';
import { CustomModal } from './CustomModal';



const Wrapper = styled.div`
    width: 517px;
    height: 282px;
    background: #FFFFFF;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    outline: none;
    z-index: 999;
    position: relative;

`;

const Header = styled.div`
    width: 517px;
    height: 80px;
    background: #FFFFFF;
    box-shadow: 0px 1px 0px #E3E8EA;
    border-radius: 6px 6px 0px 0px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding-left: 40px;
    padding-right: 40px;
`;

const Footer = styled.div`
    width: 517px;
    height: 64px;
    background: #F7F7F7;
    border-radius: 0px 0px 6px 6px;
    text-align: end;
    padding: 12px 24px;
`;

const Main = styled.div`
    padding: 40px;
`;


const ConfirmBtn = styled.div`
    width: 113px;
    height: 40px;
    background: #1853EB;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    text-align: center;   
    margin-left:8px;
`;

const CancelBtn = styled.div`
    width: 77px;
    height: 40px;
    background: #FFFFFF;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    text-align: center;
`;

const Title = styled.span`
    font-family: Manrope;
    font-style: normal;
    font-weight: ${p => p.cancel ? '600' : p.desc ? '500' : '700'};
    font-size:  ${p => p.desc ? '15px' : '13px'};
    line-height: ${p => p.desc ? '' : '40px'};
    letter-spacing: 0.2px;
    color: ${p => p.cancel ? '#151818' : p.desc ? '#151818' : '#FFFFFF'};
    margin-left: ${p => p.ml};
`;

const IconWrapper = styled.div`
    width:${p => p.w};
    height:${p => p.h};
    margin-right: ${p => p.mr};
`;

const HeadingTitle = styled.span`
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    color: #151818;
    margin-left: ${p => p.ml}
`;

const Row = styled.div`
    display: flex;
    align-items: center;
`;




export function RemoveModal(props) {
    const { extraData, onRemoveApplyHandler, onRemoveCancelHandler } = props;
    const { removeOpen } = extraData;

    const onConfirm = () => {
        onRemoveApplyHandler();
    };

    const onCancel = () => {
        onRemoveCancelHandler();
    };


    return (
        <>

            <CustomModal showModal={removeOpen}
                setShowModal={() => { }}>
                <Wrapper>
                    <Header>

                        <Row>
                            <IconWrapper>
                                <DeleteIcon width='21' height='19.5' color='#1853EB' />
                            </IconWrapper>
                            <HeadingTitle ml='9.5px'>
                                Remove Object
                            </HeadingTitle>
                        </Row>

                        <IconWrapper onClick={onCancel}>
                            <CloseIcon width='12' height='12' color='#778185' />
                        </IconWrapper>

                    </Header>
                    <Main>
                        <Title desc>
                            Removing this object will also remove all associated child objects.  Are you sure you wish to proceed?
                        </Title>
                    </Main>
                    <Footer>
                        <CancelBtn onClick={onCancel}>
                            <Title cancel>Cancel</Title>
                        </CancelBtn>
                        <ConfirmBtn onClick={onConfirm}>
                            <Title>Yes, I’m sure</Title>
                        </ConfirmBtn>
                    </Footer>
                </Wrapper>
            </CustomModal>

        </>
    );
}
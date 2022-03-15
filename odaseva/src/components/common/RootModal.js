
import React, { useState } from 'react';
import closeIcon from '../../assets/Icons/close.svg';
import hierarchy from '../../assets/Icons/hierarchy-4.svg';
import moduleGray from '../../assets/Icons/module-gray.svg';
import moduleBlue from '../../assets/Icons/module-blue.svg';
import questionBlack from '../../assets/Icons/question-black.svg';
import questionWhite from '../../assets/Icons/question-white.svg';
import searchIcon from '../../assets/Icons/search.svg';
import styled, { css } from 'styled-components';
import { CustomModal } from './CustomModal';
import { useSelector } from 'react-redux';


const Title = styled.span`
    font-family: 'Manrope';
    font-style: normal;
    font-weight: ${p => p.fontWt || 'bold'};
    font-size: ${p => p.fontSize};
    line-height: ${p => p.lineHt};
    color: ${p => p.color};
`;

const Button = styled.div`
    width: ${p => p.width};
    height: ${p => p.height};
    border-radius: 4px;
    background: ${p => p.background};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 7px;
`;

const Container = styled.div`
    width: 605px;
    height: 404px;
    background: #FFFFFF;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    outline: none;
    z-index: 999;
    display: flex;
    flex-direction:column;
    justify-content:space-between;
    position: relative;
`;

const Header = styled.div`
    width:100%;
    height: 80px;
    background: #FFFFFF;
    box-shadow: 0px 1px 0px #E3E8EA;
    border-radius: 6px 6px 0px 0px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding-left: 40px;
    padding-right: 34px;
`;

const Main = styled.div`
    width:100%;    
   margin-left: 40px;
    
`;

const Image = styled.img`
    width: ${p => p.width};
    height: ${p => p.height};
    margin-left: ${p => p.marginLeft};
`;

const Footer = styled.div`
    width:100%;
    height: 64px;
    background: #F7F7F7;
    border-radius: 0px 0px 6px 6px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 39px;
`;

const InputContainer = styled.div`
    width: 525px;
    height: 56px;
    background: #FFFFFF;
    border: 1px solid #E8EAEB;
    box-sizing: border-box;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
`;

const RadioButton = styled.div`
     width: 262.5px;
    height: 100%; 
    display: flex;
    justify-content: center;
    align-items: center;  
    cursor: pointer;
    ${p => p.buttonSelect === true ?
        css`
        background: #1853EB;
        border-radius: 0px;
        `:
        css`
        background: #FFFFFF;
        border: 1px solid #E8EAEB;
        box-sizing: border-box;
        `
    }
`;

const RadioButtonContainer = styled.div`
    width: 525px;
    height: 40px;
    background: ${p => p.background};
    border: 1px solid #E8EAEB;
    box-sizing: border-box;
    margin-top: 10px;
    margin-bottom: 32px;
    display: flex;
`;

const Input = styled.input`
    width: 92%;
    height: 100%;
    outline: none;
    border-width: 0;
    font-size: 13px;
    font-weight: 600;
    color: #151818;
    ::placeholder{
        color:  #778185;
    }
`;

const SearchContainer = styled.div`
    width: 8%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const List = styled.div`
  width: 524px;
  position: absolute;
  background-color: #FFFFFF;
  border: 1px solid #E8EAEB;
  border-radius: 6px;
  box-sizing: border-box;
  overflow: auto;
  max-height: 256px;
`;



export function RootModal({ open, handleClose, createNewRootV1 }) {
    const getObjectListState = useSelector(state => state.rootObjectList);

    const [buttonSelect, setButtonSelect] = useState(true);
    const [objectInput, setObjectInput] = useState('');
    const [objectListSearch, setObjectListSearch] = useState([]);
    const [newRoot, setNewRoot] = useState([]);

    const onListClick = ({ item }) => {
        setObjectInput(item.l)
        setObjectListSearch([]);
        setNewRoot(item);
    };

    const onCreateClick = () => {
        if (objectInput.length === 0) {
            alert('Please select any node');
        } else {
            createNewRootV1(newRoot);
            setObjectInput('');
        };
    };

    const closeHandler = () => {
        setObjectInput("")
        setObjectListSearch([]);
        handleClose();
    }

    const onChangeHandler = ({ target }) => {
        setObjectInput(target.value);
        const cloneObjectListJson = JSON.parse(JSON.stringify(getObjectListState));

        if (target.value.length >= 3) {
            let filteredObjectList = cloneObjectListJson.filter(i => {
                let nodeLabel = i.l.toLowerCase();
                let technicalName = i.n.toLowerCase();
                let objectListInput = target.value.toLowerCase();

                let check = nodeLabel.includes(objectListInput);
                if (check) {
                    return i;
                }
                let checkTechnicalName = technicalName.includes(objectListInput);
                if (checkTechnicalName) {
                    return i
                }

                return false;
            });
            setObjectListSearch(filteredObjectList);

        } else {
            setObjectListSearch([]);
        }

    };


    const modalSearchList = () => {
        return (
            <List>
                {
                    objectListSearch.map((item, index) => {
                        return (
                            <div key={index + item.n} className="modal-search-list" onClick={onListClick.bind(this, { item })}>
                                <Image src={moduleBlue} alt="module" width="20" height="20" />
                                <div className="modal-search">
                                    <Title color='#151818' fontSize='13px'>{item.l}</Title>
                                    <div className="modal-search-item">
                                        <div className="modal-search-item-list">
                                            <Image src={moduleGray} alt="list" width="11" height="11" />
                                            <Title style={{ marginLeft: 6 }} color='#919B9F' fontWt='500' fontSize='13px'>{item.n}</Title>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </List>
        );

    }



    return (
        <>
            <CustomModal showModal={open}
                setShowModal={() => { }}>
                <Container>
                    <Header>
                        <div style={{ display: 'flex', alignItems: 'center', }}>
                            <Image src={hierarchy} width='22.5px' height='24px' />
                            <Title color='#151818' fontSize='18px' style={{ paddingLeft: 8 }}>Add New Root Object</Title>
                        </div>
                        <Image src={closeIcon} width='14px' height='14px' onClick={closeHandler} style={{ cursor: 'pointer' }} />
                    </Header>
                    <Main>
                        <Title color='#000000' fontSize='13px'>Record extraction method</Title>
                        <RadioButtonContainer>
                            <RadioButton onClick={() => { setButtonSelect(true) }} buttonSelect={buttonSelect ? true : false}>
                                <Title color={buttonSelect ? '#FFFFFF' : '#151818'} fontSize='13px'>Full extraction</Title>
                                <Image src={buttonSelect ? questionWhite : questionBlack} marginLeft='8px' width='14px' height='14px' />
                            </RadioButton>
                            <RadioButton onClick={() => { setButtonSelect(false) }} buttonSelect={buttonSelect ? false : true}>
                                <Title color={buttonSelect ? '#151818' : '#FFFFFF'} fontSize='13px'>Node based extraction</Title>
                                <Image src={buttonSelect ? questionBlack : questionWhite} marginLeft='8px' width='14px' height='14px' />
                            </RadioButton>
                        </RadioButtonContainer>
                        <InputContainer>
                            <SearchContainer>
                                <Image src={searchIcon} width='14px' height='14px' />
                            </SearchContainer>
                            <Input
                                placeholder="Search by node id# or object name..."
                                type="text"
                                value={objectInput}
                                onChange={onChangeHandler}
                            />
                        </InputContainer>

                        {
                            objectListSearch.length > 0 &&
                            modalSearchList()
                        }
                    </Main>
                    <Footer>
                        <Button width='77px' height='40px' background='#FFFFFF' onClick={closeHandler}>
                            <Title color='#151818' fontSize='13px'>Cancel</Title>
                        </Button>

                        <Button width='77px' height='40px' background=' #1853EB' onClick={onCreateClick}>
                            <Title color='#FFFFFF' fontSize='13px'>Add</Title>
                        </Button>
                    </Footer>
                </Container>
            </CustomModal>

        </>
    );
};
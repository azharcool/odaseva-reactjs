import styled from 'styled-components';
import hierarchyBlack from '../../assets/Icons/hierarchy-black.svg';
import hierarchyBlue from '../../assets/Icons/hierarchy-4.svg';
import cloudDownloadBlack from '../../assets/Icons/cloud-download-black.svg';
import cloudDownloadBlue from '../../assets/Icons/cloud-download-blue.svg';
import navigatorBlack from '../../assets/Icons/navigator-black.svg';
import navigatorBlue from '../../assets/Icons/navigator-blue.svg';

import { SearchIcon } from './Icons';

const Container = styled.header`
    width: 100%;
    height: 64px;
    background: #FFFFFF;
    box-shadow: inset 0px -1px 0px #E3E8EA;
    border-radius: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 84px;
    padding-right: 48px;
    position: fixed;
    z-index:99;
`;

const Image = styled.img`
    width: ${p => p.width};
    height: ${p => p.height};
    margin-left: ${p => p.marginLeft};   
    margin-right: ${p => p.marginRight};
`;

const HideImage = styled.img`
    display: none;
    width: ${p => p.width};
    height: ${p => p.height};
    margin-left: ${p => p.marginLeft};
`;

const Title = styled.div`
    color: #151818;
    font-weight: bold;
    font-size: 13px;
`;

const Root = styled.div`
    width: 152px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E8EAEB;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content:space-around;
    padding-left:10px;
    padding-right:10px;

    :hover {
        cursor: pointer;
        background:#EBF0FF;
        border: 1px solid #EBF0FF;
    }
    
    :hover img {
        display: none;
    }

    :hover ${HideImage}{
        display: block;
    }

    :hover ${Title} {
        color:#1853EB
    }
`;

const IconWrapper = styled.div`
    width:${p => p.w};
    height:${p => p.h};
    margin-right: ${p => p.mr};
`;

const Card = styled.div`
    width: 44px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E8EAEB;
    box-sizing: border-box;
    border-radius: 4px;
    margin-left: ${p => p.margin};
    margin-right: ${p => p.margin};
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        cursor: pointer;
        background: #EBF0FF;
         border: 1px solid #EBF0FF;
    };

    :hover img{
        display: none;
    }

     :hover ${HideImage}{
        display: block;
    }
`;

const InputContainer = styled.div`
    width: 215px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E8EAEB;
    box-sizing: border-box;
    border-radius: 4px;
    padding-left:15.99px;
    display: flex;
    align-items: center;
`;

const Row = styled.div`
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
    };
    padding-left: 8px;
`;


export function Header({ handleOpen, draggingHandler, onFocusedHandler,
    onBlurHandler, onChangeEvent, dragging, downloadHandler, extraData }) {

    return (
        <Container>
            <Root onClick={handleOpen}>
                <Image src={hierarchyBlack} width={'15px'} height={'16px'} />
                <HideImage src={hierarchyBlue} width='15px' height='16px' />
                <Title>Add root object</Title>
            </Root>
            <Row>
                <Card onClick={draggingHandler}>
                    <Image src={navigatorBlack} width={'15px'} height={'16px'} />
                    <HideImage src={navigatorBlue} width='15px' height='16px' />
                </Card>

                <Card margin='8px' onClick={downloadHandler}>
                    <Image src={cloudDownloadBlack} width={'15px'} height={'16px'} />
                    <HideImage src={cloudDownloadBlue} width='15px' height='16px' />
                </Card>
                <InputContainer>
                    <IconWrapper>
                        <SearchIcon color='#151818' width='14' height='14' />
                    </IconWrapper>
                    <Input
                        placeholder="Jump to object..."
                        type="text"
                        onFocus={onFocusedHandler}
                        onBlur={onBlurHandler}
                        onChange={onChangeEvent}
                        value={extraData.value}
                    />
                </InputContainer>
            </Row>
        </Container>
    );
};


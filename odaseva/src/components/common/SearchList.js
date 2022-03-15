import React from 'react';
import styled from 'styled-components';
import upArrowGreen from '../../assets/Icons/arrow-up-green.svg';
import downArrowBlue from '../../assets/Icons/arrow-down-blue.svg';
import moduleGray from '../../assets/Icons/module-gray.svg';

const JumpWrapper = styled.div`
  position:fixed;
  width: 386px;
  right: 46px;
  top:60px;
  height: 300px;  
  overflow: auto;
  z-index: 9999999;
`;

const JumpScroll = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const ListItemWrapper = styled.div`
  width: 100%;
  height: 64px;
  background: #FFFFFF;
  border-top: 1px solid #E8EAEB;
  border-left: 1px solid #E8EAEB;
  border-right: 1px solid #E8EAEB;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  align-items: center;
  border-radius: ${p => {
        if (p.indexValue === 0)
            return '6px 6px 0px 0px';

        if (p.indexValue === p.last)
            return '0px 0px 6px 6px';
    }}
`;

const Rounded = styled.div`
  width: 24px;
  height: 24px;
  background: ${p => p.queryMode === 'Parent' ? '#E1FFFC' : '#EBF0FF'};
  border-radius: 360%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 19px;
  margin-left: 16px;
`;

const Title = styled.span`
    font-family: 'Manrope';
    font-style: normal;
    font-weight:${p => p.fontWt};
    font-size: ${p => p.fontSize};
    line-height: ${p => p.lineHt};
    color: ${p => p.title ? '#151818' : '#919B9F'};
    margin-top:${p => p.marginTop};
    margin-left:${p => p.marginLeft}; 
    margin-right: ${p => p.marginRight};
`;

const Image = styled.img`
    width: ${p => p.width || '14px'};
    height: ${p => p.height || '14px'};
    margin-top:${p => p.marginTop};
    margin-left: ${p => p.marginLeft};
    margin-right: ${p => p.marginRight};
`;

const Row = styled.div`
    display: flex;
    flex-direction: column;
`;

const Module = styled.div`
    display: flex;
    align-items: center;
`;


function JumpContainer({ children }) {
    return (
        <JumpWrapper>
            <JumpScroll>
                {children}
            </JumpScroll>
        </JumpWrapper>
    );
};

const Data = [
    {
        nodeId: '1',
        label: 'Sample object name',
        Id: 'Sample field name...',
        queryMode: 'Parent'
    },
    {
        nodeId: '2',
        label: 'Sample object name',
        Id: 'Sample field name...',
        queryMode: 'Children'
    },
    {
        nodeId: '3',
        label: 'Sample object name',
        Id: 'Sample field name...',
        queryMode: 'Parent'
    },
    {
        nodeId: '4',
        label: 'Sample object name',
        Id: 'Sample field name...',
        queryMode: 'Children'
    },
    {
        nodeId: '5',
        label: 'Sample object name',
        Id: 'Sample field name...',
        queryMode: 'Parent'
    },
];



export function SearchList(props) {
    const { onSearchNodeClick, extraData } = props;
    const { searchNodeList } = extraData;
    console.log({ props, searchNodeList })
    const last = Data.length;

    return (
        <JumpContainer>
            {
                searchNodeList.map((item, index) => {
                    let queryMode = item.queryMode;
                    let indexValue = index;
                    return (<ListItemWrapper onClick={onSearchNodeClick.bind(this, { nodeId: item.nodeId, parentNodeId: item.parentNodeId })} key={item.nodeId} last={last - 1} indexValue={indexValue}>
                        <Rounded queryMode={queryMode}>
                            <Image src={item.queryMode === 'Parent' ? upArrowGreen : downArrowBlue} width={'11.79px'} height={'12px'} />
                        </Rounded>

                        <Row>
                            <Title
                                fontWt='800'
                                fontSize='13px'
                                color='#151818'
                            >{item.label}</Title>
                            <Module>
                                <Image src={moduleGray} width={'11px'} height={'11px'} marginRight='6px' />
                                <Title
                                    fontWt='500'
                                    fontSize='13px'
                                    color='#919B9F'
                                >{item.rl}</Title>
                            </Module>
                        </Row>
                    </ListItemWrapper>)
                })
            }
        </JumpContainer>
    );
};
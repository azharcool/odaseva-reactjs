import React from 'react';
import styled from 'styled-components';
import { Node } from './Node';
import { RootJunction } from '../../common/Junction';

import { NodeFilterIcon, HierarchyIcon } from '../../common/Icons';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    display: flex;
    margin-top: 12px;
    align-items: center;
`;

const CardWrapper = styled.div`
    min-width: 245px;
    display: flex;
    justify-content: center;
`;

export const CircleStyled = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 24px;
    background-color: ${p => p.bgColor ? '#346DFF' : '#EBF0FF'};
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const Divider = styled.div`
    min-height: 57px;
`;

export const JunctionTitle = styled.span`
    text-align: center;
    color: #FFFFFF;
    font-weight: 600;
    font-size:13px
`;

export const Union = styled.div`
    width: 209px;
    height: 53px;
    box-sizing: border-box;
    position: relative;
`;

export const Ellipse = styled.div`
   position: absolute;
    width: 36px;
    height: 36px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.08);
    background: #FFFFFF;
    border: 1px solid transparent;
`;

export const EllipseOuter = styled.div`
    position: absolute;
    width: 36px;
    height: 36px;
    left: 1px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: ${p => p.bgColor ? '#346DFF' : ' #ffffff'};
    border: 1px solid transparent;
    z-index: 1;
`;

export const Tooltip = styled.span`
    visibility: hidden;
    opacity: 0;
    z-index: 10;
    position:absolute;
    bottom: 100%;
    left: 10px;
    background-color: black;
    color: white;
    padding: 6px 18px;
    border-radius: 2px;
    transition: 0.3s;
    font-size: 13px;

    ::before{
       content: "";
       position: absolute;
       width: 15px;
       height: 15px;
       background-color: black;
       bottom: -7.5px;
       left: 50%;
       transform: rotate(45deg) translateX(-50%);
         z-index: -1;
     }
 `;

export const TitleV1 = styled.div`
    color: ${p => p.color ? '#ffffff' : '#3C4244'};
    font-weight: 600;
    font-size:13px;
    position: absolute;
    left: 28px;
    padding: auto;
    display: block;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);   
`;

export const Rectangle = styled.div`
    position: relative;
    width: 200px;
    height: 53px;
    left: 10px;
    background-color: ${p => p.bgColor ? '#346DFF' : ' #ffffff'};
    border-radius: 6px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.08);
    border: 1 solid transparent;
    z-index: 1;
    box-sizing: border-box;

    :hover{
         border: 1px solid #346DFF;
         background: #F5F8FF;
    }

    :hover ~ ${Ellipse}{
        border: 1px solid #346DFF;
    }

    :hover ~ ${EllipseOuter}{
         background: #F5F8FF;
    }

    :hover ~ ${EllipseOuter} ${CircleStyled}{
         background: #F5F8FF;
    }

     :hover ~ ${EllipseOuter} ${CircleStyled} svg {
        path {
            fill: #1853EB;
        }
    }

    :hover ~ ${Tooltip}{
        visibility: visible;
        opacity: 1;
    }

    :hover > ${TitleV1}{
        color:#3C4244
    }

`;

export const FilterTooltip = styled.span`
    visibility: hidden;
    opacity: 0;
    z-index: 10;
    position:absolute;
    bottom: 100%;
    right: -18%;
    background-color: black;
    color: white;
    padding: 6px 18px;
    border-radius: 2px;
    transition: 0.3s;
    font-size: 13px;

     ::before{
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: black;
        bottom: -7.5px;
        left: 50%;
        transform: rotate(45deg) translateX(-50%);
        z-index: -1;
    }
`;

export const Filter = styled.div`
     visibility: ${p => p.isVisible ? 'visible' : 'hidden'};
     width: 20px;
     height: 20px;
     position: absolute;
     background-color: ${p => p.bgColor ? '#346DFF' : '#EBF0FF'};
     right: 10px;
     top: 50%;
     border-radius:3px;
     transform: translateY(-50%);
     z-index: 2;
     display: flex;
     justify-content: center;
     align-items: center;

     :hover {
           background-color: #EBF0FF;
     }

    :hover ~ ${Rectangle}{
         border: 1px solid #346DFF;
         background: #F5F8FF;
    }
     :hover ~ ${Ellipse}{
        border: 1px solid #346DFF;
    }

    :hover ~ ${EllipseOuter}{
         background: #F5F8FF;
    }

    :hover ~ ${EllipseOuter} ${CircleStyled}{
         background: #F5F8FF;
    }


    :hover ~ ${EllipseOuter} ${CircleStyled} svg {
        path {
            fill: #1853EB;
        }
    }

    :hover ~ ${Rectangle} ${TitleV1}  {
        color:#3C4244
    }

    :hover ~ ${FilterTooltip}{
        visibility: visible;
        opacity: 1;
    }
`;



const CardV1 = ({ title, isClicked, isVisible, onCardClick, onFilterClick }) => {
    return (
        <Union>
            <Filter bgColor={isClicked} isVisible={isVisible} onClick={onFilterClick}>
                <NodeFilterIcon />
            </Filter>
            <Rectangle bgColor={isClicked} onClick={onCardClick}>
                <TitleV1 color={isClicked}>{title}</TitleV1>
            </Rectangle>
            <Ellipse />
            <EllipseOuter bgColor={isClicked} onClick={onCardClick}>
                <CircleStyled bgColor={isClicked}>
                    <HierarchyIcon color={isClicked ? '#FBFBFC' : "#1853EB"} />
                </CircleStyled>
            </EllipseOuter>
            <FilterTooltip>Filter records</FilterTooltip>
            <Tooltip>{title}</Tooltip>
        </Union>
    )
}

export function Root(props) {
    const { data, onRootCardClickV1, onCardClickV1, extraData, activeNodeHandler, filterModalHandler } = props;
    const { parent, children } = data;
    let countParent = parent.length;
    let countChildren = children.length;
    let total2 = Math.abs(countChildren - countParent);
    let findRootJunction = extraData.blueJunction.includes(data.nodeId);

    let count = 0;
    let findParent = parent === undefined ? [] : parent.filter(i => i.isVisible === true);
    let findChildren = children === undefined ? [] : children.filter(i => i.isVisible === true);
    count = findParent.length + findChildren.length;

    let checkIsActivated = extraData.activeNodes.includes(data.nodeId);
    let isClicked = data.nodeId === extraData.blueCard ? true : false;

    const onRootClickHandler = () => {
        onRootCardClickV1(data.nodeId, data);
    };

    const onCardClick = (data, id, blueJun) => {
        onCardClickV1(data, id, blueJun);
    };

    const onJunctionClick = ({ nodeId }) => {
        activeNodeHandler(nodeId);
    };

    return (
        <>
            <Wrapper data-testId='component-root'>
                <CardWrapper style={(countParent > countChildren) && checkIsActivated ? { marginTop: (total2 * 62.8) + 10 } : checkIsActivated ? { marginBottom: total2 * 63 } : {}}>
                    <CardV1
                        title={data.objectName.substring(0, 20)}
                        isClicked={isClicked}
                        isVisible={data.filter ? true : false}
                        onCardClick={onRootClickHandler}
                        onFilterClick={filterModalHandler.bind(this, { status: 'open' })}
                    />
                </CardWrapper>

                {
                    data.isVisible && count > 0 &&
                    <RootJunction
                        data-testId='root-junction-id'
                        check={checkIsActivated}
                        blueJunction={findRootJunction}
                        id={data.nodeId}
                        onClick={onJunctionClick.bind(this, { nodeId: data.nodeId })}
                        style={(countParent > countChildren) && checkIsActivated ? { marginTop: (total2 * 63) + 27 } : checkIsActivated ? { marginBottom: (total2 * 63) + 17 } : {}}>
                        <JunctionTitle data-testId='root-junction-title-id'>
                            {checkIsActivated ? "" : count}
                        </JunctionTitle>
                    </RootJunction>
                }

                {
                    checkIsActivated &&
                    <div>
                        <div>
                            {
                                data.parent.map((i, index) => {
                                    if (i.isVisible) {
                                        return (
                                            <React.Fragment key={i.nodeId + index}>
                                                <Node
                                                    data={i}
                                                    parentId={data.nodeId}
                                                    listAllObj={data.nodeList}
                                                    onCardClick={onCardClick}
                                                    extraData={extraData}
                                                    activeNodeHandler={activeNodeHandler}
                                                    filterModalHandler={filterModalHandler} />
                                            </React.Fragment>

                                        )
                                    } else {
                                        return null;
                                    }

                                })
                            }
                        </div>
                        <Divider />
                        <div>
                            {
                                data.children.map((i, index) => {
                                    if (i.isVisible) {
                                        return (
                                            <React.Fragment key={i.nodeId + index}>
                                                <Node data={i}
                                                    parentId={data.nodeId}
                                                    listAllObj={data.nodeList}
                                                    onCardClick={onCardClick}
                                                    extraData={extraData}
                                                    activeNodeHandler={activeNodeHandler}
                                                    filterModalHandler={filterModalHandler} />
                                            </React.Fragment>

                                        )
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </div>
                    </div>
                }
            </Wrapper>
        </>
    )
}

Root.propTypes = {
    data: PropTypes.object.isRequired,
}
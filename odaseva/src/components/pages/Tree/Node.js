import React from 'react';
import Xarrow from "react-xarrows";
import styled from 'styled-components';
import upArrowGreen from '../../../assets/Icons/arrow-up-green.svg';
import downArrowBlue from '../../../assets/Icons/arrow-down-blue.svg';
import downArrowWhite from '../../../assets/Icons/arrow-down-white.svg';
import upArrowWhite from '../../../assets/Icons/arrow-up-white.svg';
import { Junction } from '../../common/Junction';
import { NodeFilterIcon, DownQueryIcon, UpQueryIcon } from '../../common/Icons';

const CardWrapper = styled.div`
    min-width: 272px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const Wrapper = styled.div`
    display: flex;
    margin-top: 12px;
    align-items: center;
`;

const CircleStyled = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 24px;
    background-color: ${p => p.bgColor};
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const JunctionTitle = styled.span`
    text-align: center;
    color: #FFFFFF;
    font-weight: 600;
    font-size:13px
`;

const Union = styled.div`
    width: 209px;
    height: 53px;
    box-sizing: border-box;
    position: relative;
`;

const Ellipse = styled.div`
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

const EllipseOuter = styled.div`
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

const Tooltip = styled.span`
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

const TitleV1 = styled.div`
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

const Rectangle = styled.div`
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

    :hover > ${TitleV1}  {
        color:#3C4244
    }

`;

const FilterTooltip = styled.span`
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

const Filter = styled.div`
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


const CardV1 = ({ title, isClicked, isVisible, onCardClick, onFilterClick, id, queryMode }) => {
    const CustomIcon = queryMode === 'Parent' ? UpQueryIcon : DownQueryIcon;
    const circleBgColor = isClicked ? '#346DFF' : queryMode === 'Parent' ? '#E1FFFC' : '#EBF0FF';
    const iconColor = isClicked ? '#FBFBFC' : queryMode === 'Parent' ? '#03887D' : '#1853EB';

    return (
        <Union>
            <Filter bgColor={isClicked} isVisible={isVisible} onClick={onFilterClick}>
                <NodeFilterIcon />
            </Filter>
            <Rectangle id={id} bgColor={isClicked} onClick={onCardClick}>
                <TitleV1 color={isClicked}>{title}</TitleV1>
            </Rectangle>
            <Ellipse />
            <EllipseOuter bgColor={isClicked} onClick={onCardClick}>
                <CircleStyled bgColor={circleBgColor}>
                    <CustomIcon color={iconColor} />
                </CircleStyled>
            </EllipseOuter>
            <FilterTooltip>Filter records</FilterTooltip>
            <Tooltip>{title}</Tooltip>
        </Union>
    )
}

export function Node({ data, parentId, listAllObj, onCardClick, extraData, activeNodeHandler, filterModalHandler }) {
    const { queryMode, left, parent, children } = data;

    let countParent = parent.length;
    let countChildren = children.length;
    let total2 = Math.abs(countChildren - countParent);

    let img = queryMode === 'Parent' ? (data.nodeId === extraData.blueCard ? upArrowWhite : upArrowGreen) : (data.nodeId === extraData.blueCard ? downArrowWhite : downArrowBlue);
    let findRootJunction = extraData.blueJunction.includes(data.nodeId);
    let tickBlueLine = extraData.selectedBlueLineArr.includes(data.nodeId);

    let count = 0;
    let findParent = parent === undefined ? [] : parent.filter(i => i.isVisible === true);
    let findChildren = children === undefined ? [] : children.filter(i => i.isVisible === true);
    count = findParent.length + findChildren.length;

    let checkIsActivated = extraData.activeNodes.includes(data.nodeId);
    let isClicked = data.nodeId === extraData.blueCard ? true : false;

    const onCardClickHandler = ({ nodeId }) => {
        let blueJunctionArr = [], blueLineArr = [];
        let filteredMenuData = listAllObj.filter(i => i.nodeId === nodeId);
        let blueJunction = getBlueJunctionArr(nodeId, blueJunctionArr);
        let blueLine = getBlueLineArr(nodeId, blueLineArr);
        onCardClick(filteredMenuData, blueLine, blueJunction);
    };

    const getBlueJunctionArr = (nodeId, numberArr) => {
        let filteredParent1 = listAllObj.filter((i) => i.nodeId === nodeId);
        if (filteredParent1.length !== 0) {
            numberArr.push(filteredParent1[0].parentNodeId)
            getBlueJunctionArr(filteredParent1[0].parentNodeId, numberArr);
        }
        return numberArr;
    };

    const getBlueLineArr = (nodeId, numberArr) => {
        numberArr.push(nodeId);
        let fitNode = listAllObj.filter((i) => i.nodeId === nodeId);
        let arr = [];
        if (fitNode.length !== 0) {
            arr = getBlueLineRecursive(fitNode[0].parentNodeId, numberArr);
        } else {
            arr.push(nodeId);
        }
        return arr;
    };

    const getBlueLineRecursive = (nodeId, numberArr) => {
        let fitParentNode = listAllObj.filter(i => i.nodeId === nodeId);
        if (fitParentNode.length > 0) {
            numberArr.push(nodeId);
            getBlueLineRecursive(fitParentNode[0].parentNodeId, numberArr)
        };
        return numberArr;
    };

    function showJunction() {
        let calculate = left;
        return `${calculate}px`;
    };

    function hideJunction() {
        let calculate = left - 3;
        return `${calculate}px`;
    }

    const onJunctionClick = ({ nodeId }) => {
        activeNodeHandler(nodeId);
    };


    return (

        <Wrapper key={data.nodeId}>
            {
                data.isVisible &&
                <CardWrapper id={'card-wrapper' + data.nodeId}
                    style={(countParent > countChildren) && checkIsActivated ? { marginTop: (total2 * 62.8) + 10 } : checkIsActivated ? { marginBottom: total2 * 63 } : {}}>
                    <CardV1
                        title={data.objectName.substring(0, 20)}
                        isClicked={isClicked}
                        isVisible={data.filter ? true : false}
                        onCardClick={onCardClickHandler.bind(this, { nodeId: data.nodeId })}
                        onFilterClick={filterModalHandler.bind(this, { status: 'open' })}
                        id={data.nodeId}
                        queryMode={queryMode}
                    />
                </CardWrapper>
            }
            {
                data.isVisible && count > 0 &&
                <Junction
                    queryMode={data.queryMode}
                    id={'node' + data.nodeId}
                    onClick={onJunctionClick.bind(this, { nodeId: data.nodeId })}
                    left={checkIsActivated ? showJunction() : hideJunction()}
                    blueJunction={findRootJunction}
                    check={checkIsActivated}
                    style={(countParent > countChildren) && checkIsActivated ? { marginTop: (total2 * 63) + 10 } : checkIsActivated ? { marginBottom: (total2 * 63) } : {}}>
                    <JunctionTitle count={count}>
                        {checkIsActivated ? "" : count}
                    </JunctionTitle>
                </Junction>
            }
            {
                data.isVisible &&
                <Xarrow
                    start={parentId} //can be react ref
                    end={data.nodeId} //or an id
                    headShape="circle"
                    headSize={2}
                    startAnchor="right"
                    endAnchor="left"
                    strokeWidth={2}
                    lineColor={tickBlueLine ? '#507fd7' : "#e1e4ec"}
                    z-index={-1}
                />
            }

            {
                checkIsActivated &&
                <div>
                    <div>
                        {data.parent.map((i) => {
                            if (i.isVisible) {
                                return (
                                    <Node data={i}
                                        parentId={'node' + data.nodeId}
                                        listAllObj={listAllObj}
                                        onCardClick={onCardClick}
                                        extraData={extraData}
                                        activeNodeHandler={activeNodeHandler}
                                        filterModalHandler={filterModalHandler} />
                                )
                            } else {
                                return null;
                            }

                        })}
                    </div>
                    <div style={{ minHeight: 57 }} />
                    <div>
                        {data.children.map((i) => {
                            if (i.isVisible) {
                                return (
                                    <Node data={i}
                                        parentId={'node' + data.nodeId}
                                        listAllObj={listAllObj}
                                        onCardClick={onCardClick}
                                        extraData={extraData}
                                        activeNodeHandler={activeNodeHandler}
                                        filterModalHandler={filterModalHandler} />
                                )
                            } else {
                                return null;
                            }

                        })}
                    </div>
                </div>

            }


        </Wrapper>
    );
}
import { parse, stringify } from 'flatted';
import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import downArrow from '../../assets/Icons/arrow-down-1.svg';
import downArrowBlue from '../../assets/Icons/arrow-down-blue.svg';
import upArrowGreen from '../../assets/Icons/arrow-up-green.svg';
import checkedIcon from '../../assets/Icons/checked.svg';
import closeIcon from '../../assets/Icons/close.svg';
import hierarchy from '../../assets/Icons/hierarchy-4.svg';
import listBulletIcon from '../../assets/Icons/list-bullets-1.svg';
import searchIcon from '../../assets/Icons/search.svg';
import unCheckedIcon from '../../assets/Icons/unchecked.svg';
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { storeObjDetail } from 'generic';

import { DeleteIcon, RootIcon, FilterIcon2, BulletListIcon } from './Icons';

const RemoveIcon = styled.div`
    position: absolute;
    cursor: pointer;
    right:16px;
    top: 25px;
    width:14px;
    height:14px;
`;

const MenuIconContainer = styled.div`
    cursor: pointer;
    width:40px;
    height:40px;
    border: 1px solid #E8EAEB;
    box-sizing: border-box;
    border-radius: 4px;
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &:hover {
    background-color: #EBF0FF;
    border: 1px solid #EBF0FF;
    }
    
    &:hover > svg {       
        path {
            fill: #1853EB;
        }
    }

`;

const IconImage = styled.img`
    cursor: ${p => p.cursor};
    width: ${p => p.width || '14px'};
    height: ${p => p.height || '14px'};
    margin-top:${p => p.marginTop};
    margin-left: ${p => p.marginLeft};
    margin-right: ${p => p.marginRight};
`;

const Title = styled.div`
    cursor: ${p => p.cursor};
    font-family: 'Manrope';
    font-style: normal;
    font-weight:${p => p.fontWt};
    font-size: ${p => p.fontSize};
    line-height: ${p => p.lineHt};
    color: ${p => p.color};
    margin-top:${p => p.marginTop};
    margin-left:${p => p.marginLeft}; 
    margin-right: ${p => p.marginRight};
    cursor: ${p => p.cursor};
    letter-spacing: ${p => p.letterSpacing};
`;

const FilterIconContainer = styled.div`
    width: ${p => p.filter === 'true' ? '170px' : '137px'};
    justify-content:  ${p => p.filter === 'true' ? 'space-between' : ''};
    padding-left: ${p => p.filter === 'true' ? '10px' : '16px'};
    padding-right:  ${p => p.filter === 'true' ? '10px' : ''};
    height: 40px;
    border: 1px solid #E8EAEB;
    box-sizing: border-box;
    border-radius: 4px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    margin-right: 8px;
    cursor: pointer;
     &:hover {
    background-color: #EBF0FF;
    border: 1px solid #EBF0FF;
    }
    &:hover ${Title} {
        color: #1853EB;
    }

    &:hover svg {
        path {
            fill: #1853EB;
        }        
    }
`;

const NavigationMenu = styled.div`
    display: none;
    width: 241px;
    height: 98px;
    background: #FFFFFF;
    border: 1px solid #E8EAEB;
    box-sizing: border-box;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    border-radius: 6px;
    position: absolute;
    right: 0;
    top: 41px;
    padding: 9px;
    ${MenuIconContainer}:hover & {
    display: block;
  }
`;

const RemoveObj = styled.div`
    width: 223px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding-left: 12px;

    :hover {
        background: #F7F7F7;
    }
`;

const CustomButton = styled.div`
    cursor: pointer;
    width: ${p => p.width || '111px'};
    height: 40px;
    background: ${p => p.background || '#FFFFFF'};
    border: 1px solid #E8EAEB;
    box-sizing: border-box;
    border-radius: 4px;
    margin-left: ${p => p.left || 0};
    margin-right: ${p => p.right || 0};

    font-family: Manrope;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 40px;
    color: ${p => p.color || '#FFFFFF'};
    display: flex;
    justify-content: center;
`;



const Input = styled.input`
    width: 90%;
    height: 100%;
    margin-left: 11px;
    outline: none;
    border-width: 0;
    font-weight: 600;
    font-size: 13px;
    color: #919B9F;
`;

const ShowAllWrapper = styled.div`
  width: 100%;
  height: 56px;
  background: #FFFFFF;
  border-bottom: 1px solid #E8EAEB;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 360%;
    background-color: ${p => p.backgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
  width: 655px;
  height: calc(100vh - 67px);
  background-color: red;
  position: fixed;
  right: 0%;
  top: 64px;
  z-index: 999999;
  border: 1px solid #E8EAEB;
  background-color: #FFFFFF;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 0px #346DFF;
`;

const ListItem = styled.div`
  /* border: 1px solid #E8EAEB; */
  border-bottom: 1px solid #E8EAEB;
  box-sizing: border-box;
  background: #FFFFFF;
  width: 100%;
  height: 72px;
  display: flex;
  justify-content:space-between;
  align-items:center;
`;

const RightItem = styled.div`
  width: 86px;
  height: 24px;
  background: #E1FFFC;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:center;
  margin-right: 24px;
`;

const Footer = styled.div`
  width: 100%;
  height: 64px;
  background: #FFFFFF;
  position: absolute;
  bottom: 0;
  border: 1px solid #E8EAEB;
  box-sizing: border-box;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.div`
  width: 610px;
  margin-top:42px;
  margin-left: 25px;
  display: flex;
  flex-direction:column;
  height: 90%;
`;

const MenuRow = styled.div`
  width: 100%;
  height:48px;
  background: #FBFBFC;
  /* border: 1px solid #E8EAEB; */
  border-bottom: 1px solid #E8EAEB;
  box-sizing: border-box;
  display: flex;
  justify-content:space-between
`;

const Row = styled.div`
  width:100%;
  display: flex;
  justify-content:space-between;
  align-items:center;
`;

const SearchWrapper = styled.div`
  width:100%;
  height:56px;
  margin-top:34px;
  background: #FFFFFF;
  border: 1px solid #E8EAEB;
  box-sizing: border-box;
  border-radius: 6px 6px 0px 0px;
  padding-left: 23.99px;
`;

const FilterWrapper = styled.div`
    width: 24px;
    height: 24px;
    background: #EBF0FF;
    border-radius: 4px;
    text-align: center;
`;

const FilterTitle = styled.span`
    font-family: Manrope;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 24px;
    color: #0031AE;
`;

const MenuWrapper = styled.div`
     width: 100%;
     overflow: hidden;
     /* height: 100%; */
    /* height: calc(100% - 50px); */
    border-left: 1px solid #E8EAEB;
    border-right: 1px solid #E8EAEB;
    border-bottom: 1px solid #E8EAEB;
    max-height:73%;
`;

const MenuScroll = styled.div`
  width: 100%;
  max-height: 100%;
  min-height: 500px;
  /* height: calc(100% - 50px); */
  overflow-y: auto;
  /* border-bottom: 1px solid #E8EAEB; */
`;


export const Menu = (props) => {
    const getObjectListState = useSelector(state => state.rootObjectList);
    const dispatch = useDispatch()

    const { closeMenuHandler, menuDataV1, newRootV2, extraData, onConfirmBeforeRemoveHandler,
        parentList, childrenList, collapseNodeHandler, filterModalHandler } = props;
    const [update, setUpdate] = useState(false);
    const [totalNode, setTotalNode] = useState(0);
    const [parent, setParent] = useState([]);
    const [children, setChildren] = useState([]);
    const [value, setValue] = useState('');
    const [showAll, setShowAll] = useState({ parent: false, children: false });
    const [collapse, setCollapse] = useState({ parent: true, children: true });
    const [volume, setVolume] = useState({ parent: 0, children: 0 });
    const [selectAllNode, setSelectAllNode] = useState({ parent: false, children: false });


    const checkTotal = useCallback(() => {
        if (menuDataV1 !== null) {
            let totalParentNodes = parentList.filter(i => i.isVisible === true);
            let totalChildrenNodes = childrenList.filter(i => i.isVisible === true);
            setTotalNode(totalParentNodes.length + totalChildrenNodes.length);

            let totalParentCount = parentList.filter(i => i.vol === false);
            let totalChildrenCount = childrenList.filter(i => i.vol === false);
            setVolume(s => ({ parent: totalParentCount.length, children: totalChildrenCount.length }));
        };
    }, [childrenList, parentList, menuDataV1]);

    useEffect(() => {
        checkTotal();

        return () => {
            checkTotal();
        }
    }, [checkTotal, update]);



    const selectAll = ({ status }) => {
        let parentListCopy, childrenListCopy;
        parentListCopy = parentList;
        childrenListCopy = childrenList;

        if (status === 'parent') {
            if (selectAllNode.parent) {
                parentListCopy.map((i) => {
                    i.isVisible = false;
                    return false;
                });
                setSelectAllNode(s => ({ ...s, [status]: false }));
            } else {
                if (showAll.parent) {
                    parentListCopy.map((i) => {
                        i.isVisible = true;
                        return false;
                    });
                } else {
                    parentListCopy.map((i) => {
                        if (i.vol === true) {
                            i.isVisible = true;
                        };
                        return false;
                    });
                };
                setSelectAllNode(s => ({ ...s, [status]: true }));
            }

        } else if (status === 'children') {
            if (selectAllNode.children) {
                childrenListCopy.map((i) => {
                    i.isVisible = false;
                    return false;
                });
                setSelectAllNode(s => ({ ...s, [status]: false }));
            } else {
                if (showAll.children) {
                    childrenListCopy.map((i) => {
                        i.isVisible = true;
                        return false;
                    });
                } else {
                    childrenListCopy.map((i) => {
                        if (i.vol === true) {
                            i.isVisible = true;
                        };
                        return false;
                    });
                };
                setSelectAllNode(s => ({ ...s, [status]: true }));
            }

        };
        setUpdate(!update);
    };

    const removeNodeHandler = () => {
        onConfirmBeforeRemoveHandler();
        return;
    };

    const collapseHandler = ({ status }) => {
        setCollapse(s => ({ ...s, [status]: !s[status] }));
    };

    const showAllHandler = ({ status }) => {
        if (status === 'parent' && volume.parent === 0) {
            return;
        }
        if (status === 'children' && volume.children === 0) {
            return;
        }

        setShowAll(s => ({ ...s, [status]: !s[status] }));
    };

    const onAddObjectHandler = async () => {
        let filterRoot, totalLevel;
        if (extraData.blueJunction.length > 0) {
            let lastIndexValue = extraData.blueJunction[extraData.blueJunction.length - 1];
            filterRoot = newRootV2.filter(i => i.nodeId === lastIndexValue);
        } else {
            filterRoot = newRootV2.filter(i => i.nodeId === menuDataV1.nodeId);
        };

        let filterParentCopy, filterChildrenCopy;
        filterParentCopy = parentList;
        filterChildrenCopy = childrenList;

        if (totalNode > 0) {

            let filterParent = filterParentCopy.filter(i => i.isVisible === true);
            let filterChildren = filterChildrenCopy.filter(i => i.isVisible === true);

            let filteredParentData = filterParentCopy.filter(i => i);
            let filteredChildrenData = filterChildrenCopy.filter(i => i);

            menuDataV1.parentData = filteredParentData;
            menuDataV1.childrenData = filteredChildrenData;

            // Parent
            if (filterParent.length > 0) {
                filterParent.map(async (i) => {
                    if (i.nodeId === undefined) {
                        let count = menuDataV1.level + 1;
                        totalLevel = count > extraData.levelCount ? count : extraData.levelCount;
                        i.level = menuDataV1.level + 1;
                        i.left = menuDataV1.left + 272;
                        i.nodeId = i.nodeId ? i.nodeId : uuid();
                        i.parentNodeId = menuDataV1.nodeId;
                        i.filter = false;
                        i.filteredParentData = [];
                        i.filteredChildrenData = [];
                        i.showParent = true;
                        i.showChildren = true;
                        i.totalFilter = 0;
                        let list = [];
                        try {
                            const nKey = i.objectName;// API name
                            const getObjectDetail = await dispatch(storeObjDetail(nKey));
                            console.log('getObjectDetailPP', getObjectDetail)
                            let childrenList = getObjectDetail.c;
                            let parentList = getObjectDetail.p;
                            i.filterList = getObjectDetail.f;
                            childrenList.map((c) => {
                                const cloneObjectListJson = JSON.parse(JSON.stringify(getObjectListState));
                                let filteredObjectList = cloneObjectListJson.filter(i => i.n === c.n);
                                let status = false, childrenTemp = {};
                                if (filteredObjectList.length > 0) {
                                    if (filteredObjectList[0].s !== undefined) {
                                        status = true;
                                    }
                                }
                                childrenTemp.queryMode = 'Children';
                                childrenTemp.label = c.n;
                                childrenTemp.fieldName = c.n;
                                childrenTemp.objectName = c.n;
                                childrenTemp.isVisible = false;
                                childrenTemp.rl = c.rl === '' ? c.rf : c.rl;
                                childrenTemp.parent = [];
                                childrenTemp.children = [];
                                childrenTemp.parentData = [];
                                childrenTemp.s = i.s;
                                childrenTemp.childrenData = [];
                                childrenTemp.vol = status;
                                list.push(childrenTemp);
                                return false;
                            });

                            parentList.map((p) => {
                                const cloneObjectListJson = JSON.parse(JSON.stringify(getObjectListState));
                                let filteredObjectList = cloneObjectListJson.filter(i => i.n === p.n);
                                let status = false, parentTemp = {};
                                if (filteredObjectList.length > 0) {
                                    if (filteredObjectList[0].s !== undefined) {
                                        status = true;
                                    }
                                }
                                parentTemp.queryMode = 'Parent';
                                parentTemp.label = p.n;
                                parentTemp.objectName = p.n;
                                parentTemp.fieldName = 'Id';
                                parentTemp.rl = p.rl === '' ? p.rf : p.rl;
                                parentTemp.isVisible = false;
                                parentTemp.parent = [];
                                parentTemp.children = [];
                                parentTemp.parentData = [];
                                parentTemp.s = i.s;
                                parentTemp.childrenData = [];
                                parentTemp.vol = status;
                                list.push(parentTemp);
                                return false;
                            })
                            let getClone = parse(stringify(list));
                            i.listData = list;
                            i.nodeList = [];
                            i.parentData = getClone.filter(i => i.queryMode === 'Parent');
                            i.childrenData = getClone.filter(i => i.queryMode === 'Children');
                        } catch (e) {
                            i.listData = list;
                            i.nodeList = [];
                            i.parentData = [];
                            i.childrenData = [];
                            i.filterList = [];
                        }
                    };
                    return false;
                });
                menuDataV1.parent = filterParent;
            } else {
                menuDataV1.parent = filterParent;
            };

            // Children
            if (filterChildren.length > 0) {
                filterChildren.map(async (i) => {
                    if (i.nodeId) {
                    } else {
                        let count = menuDataV1.level + 1;
                        totalLevel = count > extraData.levelCount ? count : extraData.levelCount;
                        i.level = menuDataV1.level + 1;
                        i.left = menuDataV1.left + 272;
                        i.nodeId = i.nodeId ? i.nodeId : uuid();
                        i.parentNodeId = menuDataV1.nodeId;
                        i.filter = false;
                        i.filteredParentData = [];
                        i.filteredChildrenData = [];
                        i.totalFilter = 0;
                        i.showParent = true;
                        i.showChildren = true;
                        let list = [];
                        try {
                            const nKey = i.objectName;// API name
                            const getObjectDetail = await dispatch(storeObjDetail(nKey));
                            let childrenList = getObjectDetail.c;
                            let parentList = getObjectDetail.p;
                            i.filterList = getObjectDetail.f;
                            childrenList.map((c) => {
                                const cloneObjectListJson = JSON.parse(JSON.stringify(getObjectListState));
                                let filteredObjectList = cloneObjectListJson.filter(i => i.n === c.n);
                                let status = false, childrenTemp = {};
                                if (filteredObjectList.length > 0) {
                                    if (filteredObjectList[0].s !== undefined) {
                                        status = true;
                                    }
                                }
                                childrenTemp.queryMode = 'Children';
                                childrenTemp.label = c.n;
                                childrenTemp.fieldName = c.n;
                                childrenTemp.objectName = c.n;
                                childrenTemp.isVisible = false;
                                childrenTemp.rl = c.rl === '' ? c.rf : c.rl;
                                childrenTemp.parent = [];
                                childrenTemp.children = [];
                                childrenTemp.parentData = [];
                                childrenTemp.s = i.s;
                                childrenTemp.childrenData = [];
                                childrenTemp.vol = status;
                                list.push(childrenTemp);
                                return false;
                            });

                            parentList.map((p) => {
                                const cloneObjectListJson = JSON.parse(JSON.stringify(getObjectListState));
                                let filteredObjectList = cloneObjectListJson.filter(i => i.n === p.n);
                                let status = false;
                                if (filteredObjectList.length > 0) {
                                    if (filteredObjectList[0].s !== undefined) {
                                        status = true;
                                    }
                                }
                                let parentTemp = {};
                                parentTemp.queryMode = 'Parent';
                                parentTemp.label = p.n;
                                parentTemp.objectName = p.n;
                                parentTemp.fieldName = 'Id';
                                parentTemp.rl = p.rl === '' ? p.rf : p.rl;
                                parentTemp.isVisible = false;
                                parentTemp.parent = [];
                                parentTemp.children = [];
                                parentTemp.parentData = [];
                                parentTemp.s = i.s;
                                parentTemp.childrenData = [];
                                parentTemp.vol = status;
                                list.push(parentTemp);
                                return false;
                            })
                            let getClone = parse(stringify(list));
                            i.listData = list;
                            i.nodeList = [];
                            i.parentData = getClone.filter(i => i.queryMode === 'Parent');
                            i.childrenData = getClone.filter(i => i.queryMode === 'Children');
                        } catch (error) {
                            i.listData = list;
                            i.nodeList = [];
                            i.parentData = [];
                            i.childrenData = [];
                            i.filterList = [];
                        }

                    }
                    return false;
                });
                menuDataV1.children = filterChildren;
            } else {
                menuDataV1.children = filterChildren;
            };

            let nodeList = removeAllDuplicates(filterRoot[0]);
            filterRoot[0].nodeList = nodeList;
            filterRoot[0].totalLevel = totalLevel + 1;


        } else {
            let filterParent = filterParentCopy.filter(i => i.isVisible === true);
            let filterChildren = filterChildrenCopy.filter(i => i.isVisible === true);

            let filteredParentData = filterParentCopy.filter(i => i);
            let filteredChildrenData = filterChildrenCopy.filter(i => i);

            if (filterParent.length === 0) {
                menuDataV1.parent = filterParent;
                menuDataV1.parentData = filteredParentData;
            };

            if (filterChildren.length === 0) {
                menuDataV1.childrenData = filteredChildrenData;
                menuDataV1.children = filterChildren;
            };
        }

        collapseNodeHandler(menuDataV1.nodeId, menuDataV1.queryMode);
        closeMenuHandler();
    };


    const removeAllDuplicates = (root) => {
        const pushList = [];
        let list = siblingRecursive(root, pushList);
        return list;
    };

    const siblingRecursive = (root, pushEle) => {
        if (root.parent.length > 0) {
            root.parent.map((i) => {
                pushEle.push(i)
                siblingRecursive(i, pushEle);
                return false;
            });
        };

        if (root.children.length > 0) {
            root.children.map((i) => {
                pushEle.push(i)
                siblingRecursive(i, pushEle);
                return false;
            })
        };
        return pushEle;
    };



    const onCancelled = () => {
        closeMenuHandler();
    }

    const onChangeHandler = ({ target }) => {
        setValue(target.value);
        if (target.value.length >= 3) {
            let filteredParent = parentList.filter(i => {
                console.log('i', i)
                let nodeLabel = i.label.toLowerCase();
                let inputValue = target.value.toLowerCase();
                let check = nodeLabel.includes(inputValue);
                if (check) { return i }
                return false;
            });

            let filteredChildren = childrenList.filter(i => {
                let nodeLabel = i.label.toLowerCase();
                let inputValue = target.value.toLowerCase();
                let check = nodeLabel.includes(inputValue);
                if (check) { return i }
                return false;
            });

            setParent(filteredParent);
            setChildren(filteredChildren);
        } else {
            setChildren([]);
            setParent([]);
        }

    };

    console.log(menuDataV1)

    const renderParent = () => {
        let getList;
        if (value.length === 0) {
            getList = parentList.filter(i => i.queryMode === 'Parent');
        } else {
            getList = parent;
        }

        const parent_list = getList.map((i, index) => {
            let check = showAll.parent ? (i.vol === true || i.vol === false) : (i.vol === true);
            if (check) {
                return (
                    <ListItem key={index + i.rl}>
                        <div style={{ display: 'flex', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <IconImage cursor='pointer' src={i.isVisible ? checkedIcon : unCheckedIcon} width={'18px'} height={'18px'} marginTop='7px' onClick={() => {
                                i.isVisible = !i.isVisible;
                                setUpdate(!update)
                            }} />
                            <div style={{ marginLeft: 10 }}>
                                <Title
                                    fontWt={'500'}
                                    fontSize={'13px'}
                                    lineHt={'13px'}
                                    color={' #151818'}

                                >
                                    {i.label}
                                </Title>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                    <IconImage src={listBulletIcon} width={'11px'} height={'11px'} />
                                    <Title
                                        fontWt={'500'}
                                        fontSize={'13px'}
                                        lineHt={'13px'}
                                        color={'#919B9F'}
                                        marginLeft='5px'
                                    >
                                        {i.rl}
                                    </Title>
                                </div>
                            </div>
                        </div>
                        <RightItem>
                            <IconImage src={upArrowGreen} width={'12px'} height={'12px'} />
                            <Title
                                fontWt={'600'}
                                fontSize={'12px'}
                                lineHt={'24px'}
                                color={'#03887D'}
                                marginLeft={'6px'}
                            >
                                Up query
                            </Title>
                        </RightItem>
                    </ListItem>
                );
            } else {
                return false;
            }
        })
        return parent_list;
    };

    const renderChildren = () => {
        let getList;

        if (value.length === 0) {
            getList = childrenList.filter(i => i.queryMode === 'Children');
        } else {
            getList = children;
        };


        const children_List = getList.map((i, index) => {
            let check = showAll.children ? (i.vol === true || i.vol === false) : (i.vol === true);
            if (check) {
                return (
                    <ListItem key={index + i.rl}>
                        <div style={{ display: 'flex', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <IconImage cursor='pointer' src={i.isVisible ? checkedIcon : unCheckedIcon} width={'18px'} height={'18px'} marginTop='7px' onClick={() => {
                                i.isVisible = !i.isVisible;
                                setUpdate(!update)
                            }} />
                            <div style={{ marginLeft: 10 }}>
                                <Title
                                    fontWt={'500'}
                                    fontSize={'13px'}
                                    lineHt={'13px'}
                                    color={' #151818'}

                                >
                                    {i.label}
                                </Title>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                    <IconImage src={listBulletIcon} width={'11px'} height={'11px'} />
                                    <Title
                                        fontWt={'500'}
                                        fontSize={'13px'}
                                        lineHt={'13px'}
                                        color={'#919B9F'}
                                        marginLeft='5px'>
                                        {i.rl}
                                    </Title>
                                </div>
                            </div>
                        </div>
                        <RightItem style={{ backgroundColor: '#EBF0FF' }}>
                            <IconImage src={downArrowBlue} width={'12px'} height={'12px'} />
                            <Title
                                fontWt={'600'}
                                fontSize={'12px'}
                                lineHt={'24px'}
                                color={'#1853EB'}
                                marginLeft={'6px'}
                            >
                                Sup query
                            </Title>
                        </RightItem>
                    </ListItem>
                );
            } else {
                return false;
            }

        });

        return children_List;
    };


    return (
        <>
            {
                menuDataV1 &&
                <Container position={'absolute'}>
                    <RemoveIcon onClick={closeMenuHandler}>
                        <IconImage src={closeIcon} />
                    </RemoveIcon>

                    <Header>
                        <Row>
                            <div style={{ display: 'flex' }}>
                                <IconContainer backgroundColor={menuDataV1.queryMode === 'Root' ? '#EBF0FF' : menuDataV1.queryMode === 'Parent' ? '#E1FFFC' : '#EBF0FF'}>
                                    <IconImage src={menuDataV1.queryMode === 'Root' ? hierarchy : menuDataV1.queryMode === 'Parent' ? upArrowGreen : downArrowBlue}
                                        width="26px" height="26px" />
                                </IconContainer>
                                <div style={{ marginLeft: 11, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Title
                                        fontWt={'800'}
                                        fontSize={'22px'}
                                        lineHt={'23px'}
                                        color={'#151818'}
                                    >
                                        {menuDataV1.label}
                                    </Title>
                                    <Title
                                        fontWt={'500'}
                                        fontSize={'13px'}
                                        lineHt={'13px'}
                                        color={'#919B9F'}
                                        marginTop={'9px'}
                                    >
                                        Node ID {menuDataV1.nodeId.substring(0, 5)}  |  {menuDataV1.objectName}
                                    </Title>
                                </div>
                            </div>

                            <div style={{ marginTop: 20, display: 'flex' }}>
                                <FilterIconContainer filter={menuDataV1.filter.toString()} onClick={filterModalHandler.bind(this, { status: 'open' })}>
                                    <FilterIcon2 width="16" height="16" color="#151818" class="filter" />
                                    <Title
                                        fontWt={'600'}
                                        fontSize={'13px'}
                                        lineHt={'40px'}
                                        color={'#151818'}
                                        marginLeft={'8.03px'}
                                    >
                                        Filter records
                                    </Title>

                                    {
                                        menuDataV1.filter && <FilterWrapper>
                                            <FilterTitle>{menuDataV1.totalFilter}</FilterTitle>
                                        </FilterWrapper>
                                    }

                                </FilterIconContainer>
                                <MenuIconContainer>
                                    <BulletListIcon className='bullet' />
                                    <NavigationMenu>
                                        <div style={{ display: 'flex', paddingTop: 8, paddingBottom: 8 }}>
                                            <RootIcon color='#919B9F' width="16" height="16" />
                                            <Title
                                                fontWt='500'
                                                fontSize='13px'
                                                color='#778185'
                                                marginLeft='12px'
                                                letterSpacing='0.2px'
                                            >
                                                Start a new root from here
                                            </Title>
                                        </div>
                                        <RemoveObj onClick={removeNodeHandler}>
                                            <DeleteIcon color='#151818' width="14" height="14" />
                                            <Title
                                                fontWt={'500'}
                                                fontSize={'13px'}
                                                color={'#151818'}
                                                marginLeft={'12px'}
                                                letterSpacing='0.2px'
                                            >
                                                Remove this object
                                            </Title>
                                        </RemoveObj>
                                    </NavigationMenu>
                                </MenuIconContainer>
                            </div>
                        </Row>


                        <div>
                            <SearchWrapper>
                                <IconImage src={searchIcon} />
                                <Input type="text" placeholder="Search..." onChange={onChangeHandler} />
                            </SearchWrapper>
                        </div>




                        <MenuWrapper>
                            <MenuScroll>
                                <MenuRow>
                                    <div onClick={collapseHandler.bind(this, { status: 'parent' })}
                                        style={{ marginLeft: 22.89, display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
                                        <IconImage src={downArrow} width={'8px'} height={'10px'} />
                                        <Title
                                            fontWt={'bold'}
                                            fontSize={'13px'}
                                            lineHt={'40px'}
                                            color={'#151818'}
                                            marginLeft={'9.9px'}
                                        >
                                            Parents
                                        </Title>
                                    </div>

                                    <Title cursor='pointer'
                                        fontWt={'600'} fontSize={'13px'} lineHt={'48px'}
                                        color={'#1853EB'} marginRight={'28px'}
                                        onClick={selectAll.bind(this, { status: 'parent' })}
                                    >
                                        {selectAllNode.parent ? 'Deselect All' : 'Select All'}
                                    </Title>
                                </MenuRow>
                                {collapse.parent && renderParent()}

                                {
                                    menuDataV1.s !== '' && !showAll.parent && volume.parent > 0 && <ShowAllWrapper last='false'>
                                        <Title
                                            cursor='pointer'
                                            fontWt={'600'} fontSize={'13px'} lineHt={'48px'}
                                            color={'#1853EB'} marginLeft={'59px'}
                                            onClick={showAllHandler.bind(this, { status: 'parent' })}
                                        >
                                            + Show {volume.parent} objects with no records
                                        </Title>
                                    </ShowAllWrapper>
                                }



                                <MenuRow>
                                    <div onClick={collapseHandler.bind(this, { status: 'children' })}
                                        style={{ marginLeft: 22.89, display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
                                        <IconImage src={downArrow} width={'8px'} height={'10px'} />
                                        <Title
                                            fontWt={'bold'}
                                            fontSize={'13px'}
                                            lineHt={'40px'}
                                            color={'#151818'}
                                            marginLeft={'9.9px'}
                                        >
                                            Children
                                        </Title>
                                    </div>

                                    <Title
                                        cursor='pointer'
                                        fontWt={'600'}
                                        fontSize={'13px'}
                                        lineHt={'48px'}
                                        color={'#1853EB'}
                                        marginRight={'28px'}
                                        onClick={selectAll.bind(this, { status: 'children' })}
                                    >
                                        {selectAllNode.children ? 'Deselect All' : 'Select All'}
                                    </Title>
                                </MenuRow>
                                {collapse.children && renderChildren()}
                                {
                                    menuDataV1.s !== '' && !showAll.children && volume.children > 0 && <ShowAllWrapper last='true'>
                                        <Title
                                            cursor='pointer'
                                            fontWt={'600'} fontSize={'13px'} lineHt={'48px'}
                                            color={'#1853EB'} marginLeft={'59px'}
                                            onClick={showAllHandler.bind(this, { status: 'children' })}
                                        >
                                            + Show {volume.children} objects with no records
                                        </Title>
                                    </ShowAllWrapper>
                                }
                            </MenuScroll>
                        </MenuWrapper>
                    </Header>

                    <Footer>
                        <CustomButton
                            left={'19px'}
                            color={" #151818"}
                            onClick={onCancelled}
                        >
                            Cancel
                        </CustomButton>
                        <CustomButton
                            right={'19px'}
                            color={"#FFFFFF"}
                            background={'#1853EB'}
                            onClick={onAddObjectHandler}
                        >
                            {`Add ${totalNode} objects`}
                        </CustomButton>
                    </Footer>
                </Container>
            }

        </>


    );
};


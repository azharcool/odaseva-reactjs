import exportFromJSON from 'export-from-json';
import { parse, stringify } from 'flatted';
import React, { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { RootModal } from '../../components/common/RootModal';
import { Header } from '../common/Header';
import { Menu } from '../common/Menu';
import { SearchList } from '../common/SearchList';
import '../css/style.css';
import { Root } from '../pages/Tree/Root';
import { FilterModal } from '../common/FilterModal';
import { RemoveModal } from '../common/RemoveModal';
import { useSelector, useDispatch } from 'react-redux';

import useRecursive from '../hooks/useRecursiveHook';

import { storeObjDetail } from 'generic';


const LabelWrapper = styled.div`
    display: flex;
    height: 40px;
    width: 100%;
`;

const Container = styled.div`
    width: 100%;
`;

const TreeWrapper = styled.div`
    width: ${p => p.width || '100%'};
    position: relative;  
    min-height:  calc(100vh - 67px);
    margin-top: 64px;
`;

const Border = styled.div`
  width:1px;
  min-height: 100%;
  position: absolute;
  border-right: 1px solid #e1e4ec;
  left: ${p => p.left};
`;

const Col = styled.div`
  min-width: ${p => p.width};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e1e4ec;
  border-bottom: 1px solid #e1e4ec;
  color: #99A3BF;
  font-weight: 600;
  font-size:13px
`;

const HorizontalScroll = styled.div`
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
`;

const Home = () => {
    const getObjectListState = useSelector(state => state.rootObjectList);
    const getNewObjArr = useSelector(state => state.newObjectsJsonArr);

    const { collapseNodes } = useRecursive();
    const scrollRef = useRef(null);
    const [root, setRoot] = useState([]);
    const [extraData, setExtraData, extraDataRef] = useState({
        modalOpen: true, offsetHeight: 0,
        counter: [], menuOpen: false, menuData: null, dragging: false,
        blueJunction: [], listOfAllNode: [], exportRoot: [], levelCount: 0,
        blueCard: '', selectedBlueLineArr: [], exportData: [], activeNodes: [],
        collapseNode: [], selectLevel: '', onFocus: false, value: '', searchNodeList: [],
        filterOpen: false, removeOpen: false
    });

    const dispatch = useDispatch();

    useEffect(() => {

    }, [root]);


    const modalHandler = ({ status }) => {
        if (status === 'close') {
            setExtraData(s => ({ ...s, modalOpen: false }))
        } else {
            setExtraData(s => ({ ...s, modalOpen: true }))
        }
    };

    const filterModalHandler = ({ status }) => {
        if (status === 'close') {
            setExtraData(s => ({ ...s, filterOpen: false }))
        } else {
            setExtraData(s => ({ ...s, filterOpen: true }))
        }
    };


    const removeModalHandler = ({ status }) => {
        if (status === 'close') {
            setExtraData(s => ({ ...s, removeOpen: false }))
        } else {
            setExtraData(s => ({ ...s, removeOpen: true }))
        }
    };

    const createNewRoot = async (item) => {
        let temp = {};
        temp.label = item.l;
        temp.nodeId = uuid();
        temp.queryMode = 'Root';
        temp.isVisible = true;
        temp.parent = [];
        temp.children = [];
        temp.level = 0;
        temp.left = 236.5;
        temp.totalLevel = 0;
        temp.fieldName = 'Id';
        temp.objectName = item.n; // API name object name
        temp.filter = false;
        temp.filteredParentData = [];
        temp.filteredChildrenData = [];
        temp.totalFilter = 0;
        temp.showParent = true;
        temp.showChildren = true;
        let list = [];

        if (item.s !== undefined) {
            try {
                temp.s = item.s;
                const nKey = item.n;
                const getObjectDetail = await dispatch(storeObjDetail(nKey));
                let childrenList = getObjectDetail.c;
                let parentList = getObjectDetail.p;
                temp.filterList = getObjectDetail.f;

                parentList.map((p) => {
                    const cloneObjectListJson = JSON.parse(JSON.stringify(getObjectListState));
                    let filteredObjectList = cloneObjectListJson.filter(i => i.n === p.n);
                    let status = false;
                    if (filteredObjectList.length > 0) {
                        if (filteredObjectList[0].s !== undefined) {
                            status = true;
                        };
                    };
                    let parentTemp = {};
                    parentTemp.queryMode = 'Parent';
                    parentTemp.label = p.n;
                    parentTemp.rl = p.rl === '' ? p.rf : p.rl;
                    parentTemp.isVisible = false;
                    parentTemp.parent = [];
                    parentTemp.children = [];
                    parentTemp.parentData = [];
                    parentTemp.s = item.s;
                    parentTemp.childrenData = [];
                    parentTemp.vol = status;
                    parentTemp.objectName = p.n;
                    parentTemp.fieldName = 'Id';
                    parentTemp.level = 0;
                    parentTemp.filter = false;
                    list.push(parentTemp);
                    return false;
                });

                childrenList.map((c) => {
                    const cloneObjectListJson = JSON.parse(JSON.stringify(getObjectListState));
                    let filteredObjectList = cloneObjectListJson.filter(i => i.n === c.n);
                    let status = false;
                    if (filteredObjectList.length > 0) {
                        if (filteredObjectList[0].s !== undefined) {
                            status = true;
                        };
                    };
                    let childrenTemp = {};
                    childrenTemp.queryMode = 'Children';
                    childrenTemp.label = c.n;
                    childrenTemp.isVisible = false;
                    childrenTemp.rl = c.rl === '' ? c.rf : c.rl;
                    childrenTemp.parent = [];
                    childrenTemp.children = [];
                    childrenTemp.parentData = [];
                    childrenTemp.s = item.s;
                    childrenTemp.childrenData = [];
                    childrenTemp.vol = status;
                    childrenTemp.fieldName = c.n;
                    childrenTemp.objectName = c.n;
                    childrenTemp.level = 0;
                    childrenTemp.filter = false;
                    list.push(childrenTemp);
                    return false;
                });

                let getClone = JSON.parse(JSON.stringify(list));
                temp.listData = list;
                temp.nodeList = [];
                temp.parentData = getClone.filter(i => i.queryMode === 'Parent');
                temp.childrenData = getClone.filter(i => i.queryMode === 'Children');

            } catch (error) {
                temp.listData = list;
                temp.nodeList = [];
                temp.parentData = [];
                temp.childrenData = [];
            }
        } else {
            temp.s = '';
            temp.listData = list;
            temp.filterList = [];
            temp.nodeList = [];
            temp.parentData = [];
            temp.childrenData = [];
        }


        setRoot([...root, temp]);
        if (extraData.counter.length === 0) {
            setExtraData(s => ({ ...s, counter: [{ level: 'root' }] }))
        }
        modalHandler({ status: 'close' });
    }

    const deleteRootObject = (id) => {
        findIndex(id);
        setRoot([...root]);
        let findLength = root.length;
        if (findLength === 0) {
            setExtraData(s => ({ ...s, counter: [] }));
            modalHandler({ status: 'open' });
        }
    };

    const findIndex = (id) => {
        let index = -1;
        root.forEach((i, indx) => {
            if (i.nodeId === id) {
                index = indx;
            }
        })
        if (index !== -1) {
            root.splice(index, 1)
        }
    };

    const onRootCardClickV1 = (id, data) => {
        setExtraData(s => ({ ...s, menuOpen: true }));
        setExtraData(s => ({ ...s, menuData: data }));
        setExtraData(s => ({ ...s, blueCard: id }));
        setExtraData(s => ({ ...s, selectedBlueLineArr: [] }));
        setExtraData(s => ({ ...s, blueJunction: [] }));
    };

    const closeMenuHandler = () => {
        setExtraData(s => ({ ...s, menuOpen: false }));
        setExtraData(s => ({ ...s, blueCard: '' }));
        setExtraData(s => ({ ...s, selectedBlueLineArr: [] }));
        setExtraData(s => ({ ...s, blueJunction: [] }));
        if (extraData.selectLevel >= 3) {
            currentPosition();
        };
        getListOfAllNodeHandler();
    };

    const onCardClickV1 = (data, selectedLine, blueJun) => {
        setExtraData(s => ({
            ...s, menuData: data[0],
            menuOpen: true,
            blueCard: data[0].nodeId,
            selectedBlueLineArr: selectedLine,
            blueJunction: blueJun,
            selectLevel: data[0].level
        }));
        if (data[0].level >= 3) {
            horizontalScroll(data[0].level);
        };
    };

    const activeNodeHandler = (node1) => {
        let index = extraData.activeNodes.indexOf(node1);
        if (index > -1) {
            let temp = extraData.activeNodes;
            temp.splice(index, 1);
            setExtraData(s => ({ ...s, activeNodes: [...temp] }));
        } else {
            setExtraData(s => ({ ...s, activeNodes: [...extraData.activeNodes, node1] }));
        };
        countLengthHandler();
    };

    const downloadHandler = async () => {
        if (root.length === 0) {
            return;
        }
        let JsonList = root.map((i) => {
            let temp = {};
            temp.nodeId = i.nodeId;
            temp.parentNodeId = null;
            temp.queryMode = 'Root';
            temp.rootInput = null;
            temp.sourceNodeIds = null;
            temp.objectName = i.objectName;
            temp.fieldName = "";
            temp.parentNodeFieldName = "";
            if (i.jsonFormat) {
                temp.filter = i.jsonFormat.filter;
                temp.recordsSampling = i.jsonFormat.recordsSampling;
            } else {
                temp.filter = null;
                temp.recordsSampling = null;
            }
            let list = [];
            list.push(temp);
            i.nodeList.map((item) => {
                if (item.isVisible === true) {
                    let temp = {};
                    temp.nodeId = item.nodeId;
                    temp.parentNodeId = item.parentNodeId;
                    temp.queryMode = item.queryMode === 'Parent' ? 'UpQuery' : 'SubQuery';
                    temp.rootInput = null;
                    temp.sourceNodeIds = null;
                    temp.objectName = item.objectName;
                    temp.fieldName = item.queryMode === 'Parent' ? item.fieldName : item.objectName;
                    temp.parentNodeFieldName = item.queryMode === 'Parent' ? i.objectName : i.fieldName;
                    if (item.jsonFormat) {
                        temp.filter = item.jsonFormat.filter;
                        temp.recordsSampling = item.jsonFormat.recordsSampling;
                    } else {
                        temp.filter = null;
                        temp.recordsSampling = null;
                    }
                    list.push(temp);
                };
                return false;
            });

            return list;
        });

        let finalList = [];
        JsonList.map((i) => {
            finalList.push(...i);
            return false;
        });
        const data = finalList;
        const fileName = 'download';
        const exportType = exportFromJSON.types.json;
        exportFromJSON({ data, fileName, exportType });
    };

    const horizontalScroll = (level) => {
        let scrollId = document.getElementById("scroll");
        scrollId.scrollBy({ top: 0, left: 655, behavior: 'smooth' });
    };

    const currentPosition = () => {
        let scrollId = document.getElementById("scroll");
        scrollId.scrollBy({ top: 0, left: -655, behavior: 'smooth' });
    };

    const collapseNodeHandler = (id, query) => {
        let finalResult = collapseNodes(id, root, extraData.activeNodes, query);
        setExtraData(s => ({ ...s, activeNodes: finalResult }));
        return;
    };

    const getListOfAllNodeHandler = () => {
        let pushNode = [];
        root.map((item) => {
            let node = item.nodeList;
            pushNode.push(...node);
            return false;
        });
        setExtraData(s => ({ ...s, listOfAllNode: pushNode }));
    };

    const onChangeEvent = (e) => {
        setExtraData(s => ({ ...s, value: e.target.value }));
        if (e.target.value.length >= 3) {
            let filterNodeList = extraData.listOfAllNode.filter((i) => {
                let nodeLabel = i.label.toLowerCase();
                let input = e.target.value.toLowerCase();
                let check = nodeLabel.startsWith(input);
                if (check) {
                    return i;
                };
                return false;
            });
            setExtraData(s => ({ ...s, searchNodeList: filterNodeList }));
        } else {
            setExtraData(s => ({ ...s, searchNodeList: [] }));
        };
    };

    const onBlurHandler = () => {
    };

    const onFocusedHandler = () => {
    };

    const countLengthHandler = () => {
        const totalCountArr = [];
        root.map((item) => {
            let temp = [];
            temp.push(item.nodeId);
            const filter = item.nodeList.filter(i => {
                temp.push(i.nodeId);
            });
            const find = temp.filter(i => extraDataRef.current.activeNodes.includes(i));
            totalCountArr.push(find.length);
        });

        let totalLevel = Math.max(...totalCountArr);
        let newObj = [];
        for (let i = 0; i < totalLevel + 1; i++) {
            newObj = [...newObj, { i }]
        };
        if (totalLevel !== undefined) {
            setExtraData(s => ({ ...s, levelCount: totalLevel }));
            setExtraData(s => ({ ...s, counter: newObj }));
        };
    }

    const onSearchNodeClickHandler = ({ nodeId }) => {

        setExtraData(s => ({ ...s, searchNodeList: [] }));
        setExtraData(s => ({ ...s, value: '' }));
        let filteredMenuData = extraData.listOfAllNode.filter(i => i.nodeId === nodeId);
        let blueJunctionArr = [], blueLineArr = [];
        let blueJunction = getBlueJunctionArr(nodeId, blueJunctionArr);
        let blueLine = getBlueLineArr(nodeId, blueLineArr);
        setExtraData(s => ({ ...s, activeNodes: blueJunction }));
        onCardClickV1(filteredMenuData, blueLine, blueJunction);
        countLengthHandler();
    };

    const getBlueJunctionArr = (nodeId, numberArr) => {
        let filteredParent1 = extraData.listOfAllNode.filter((i) => i.nodeId === nodeId);
        if (filteredParent1.length !== 0) {
            numberArr.push(filteredParent1[0].parentNodeId)
            getBlueJunctionArr(filteredParent1[0].parentNodeId, numberArr);
        }
        return numberArr;
    };

    const getBlueLineArr = (nodeId, numberArr) => {
        numberArr.push(nodeId);
        let fitNode = extraData.listOfAllNode.filter((i) => i.nodeId === nodeId);
        let arr = [];
        if (fitNode.length !== 0) {
            arr = getBlueLineRecursive(fitNode[0].parentNodeId, numberArr);
        } else {
            arr.push(nodeId);
        }
        return arr;
    };

    const getBlueLineRecursive = (nodeId, numberArr) => {
        let fitParentNode = extraData.listOfAllNode.filter(i => i.nodeId === nodeId);
        if (fitParentNode.length > 0) {
            numberArr.push(nodeId);
            getBlueLineRecursive(fitParentNode[0].parentNodeId, numberArr)
        };
        return numberArr;
    };

    const filterUpdateHandler = () => {
        setExtraData(s => ({ ...s, filterOpen: false, menuOpen: true }));
    }

    const onRemoveApplyHandler = () => {
        setExtraData(s => ({ ...s, menuOpen: false, removeOpen: false }));
        if (extraData.menuData.queryMode === 'Root') {
            deleteRootObject(extraData.menuData.nodeId);
        } else {
            extraData.menuData.isVisible = false;
            deleteSibling(extraData.menuData);
            let filterRoot;

            if (extraData.blueJunction.length > 0) {
                let lastIndexValue = extraData.blueJunction[extraData.blueJunction.length - 1];
                filterRoot = root.filter(i => i.nodeId === lastIndexValue);
                let nodeList = removeAllDuplicates(filterRoot[0]);
                filterRoot[0].nodeList = nodeList;
            }
        }
    };

    const deleteSibling = (data) => {
        if (data.parent.length > 0) {
            data.parent.map((i) => {
                i.isVisible = false;
                deleteSibling(i);
                return false;
            });
        };

        if (data.children.length > 0) {
            data.children.map((i) => {
                i.isVisible = false;
                deleteSibling(i);
                return false;
            });
        };

        return;
    }

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

    const onRemoveCancelHandler = () => {
        setExtraData(s => ({ ...s, menuOpen: true, removeOpen: false }));
    };

    const onConfirmBeforeRemoveHandler = () => {
        setExtraData(s => ({ ...s, menuOpen: false, removeOpen: true }));
    };

    return (
        <>

            {
                extraData.value.length > 0 && <SearchList extraData={extraData}
                    onSearchNodeClick={onSearchNodeClickHandler} />
            }

            {
                extraData.filterOpen &&
                <FilterModal extraData={extraData}
                    filterModalHandler={filterModalHandler}
                    menuDataV1={extraData.menuData}
                    rootArr={extraData.blueJunction}
                    listOfNode={parse(stringify(extraData.menuData.listData))}
                    parentList={parse(stringify(extraData.menuData.parentData))}
                    childrenList={parse(stringify(extraData.menuData.childrenData))}
                    filterUpdateHandler={filterUpdateHandler}
                />
            }

            <RootModal
                handleClose={modalHandler.bind(this, { status: 'close' })}
                open={extraData.modalOpen}
                createNewRootV1={createNewRoot}
            />

            <RemoveModal extraData={extraData}
                removeModalHandler={removeModalHandler}
                onRemoveApplyHandler={onRemoveApplyHandler}
                onRemoveCancelHandler={onRemoveCancelHandler}
            />


            <Container id="id-container">

                <Header handleOpen={modalHandler}
                    onBlurHandler={onBlurHandler}
                    onChangeEvent={onChangeEvent}
                    onFocusedHandler={onFocusedHandler}
                    downloadHandler={downloadHandler}
                    extraData={extraData} />



                <HorizontalScroll id='scroll' ref={scrollRef}>
                    <TreeWrapper id='tree-wrapper' width={`${(extraData.counter.length - 1) * 272 + 245 + 655}px`}>

                        <LabelWrapper>

                            {extraData.counter.map((item, index) => {
                                if (index === 0) {
                                    return <Col width="245px" key={index}>Root Level</Col>
                                } else {
                                    return <Col width="272px" key={index}> Level {index}</Col>
                                }

                            })}
                        </LabelWrapper>
                        {extraData.counter.map((item, index) => {
                            let left = (index * 272) + 244;
                            if (index === 0) {
                                return <Border key={index + left} left='244px' height={`${extraData.offsetHeight}px`} />
                            } else {
                                return <Border key={index + left} left={`${left}px`} height={`${extraData.offsetHeight}px`} />
                            }
                        })}
                        {
                            root.map((i, index) => {
                                return (
                                    <React.Fragment key={i.nodeId + index}>
                                        <Root
                                            key={i.nodeId}
                                            data={i}
                                            onRootCardClickV1={onRootCardClickV1}
                                            onCardClickV1={onCardClickV1}
                                            extraData={extraData}
                                            activeNodeHandler={activeNodeHandler}
                                            filterModalHandler={filterModalHandler}
                                        />
                                    </React.Fragment>
                                )
                            })
                        }

                    </TreeWrapper>
                </HorizontalScroll>



                {
                    extraData.menuOpen && //side Menu
                    <Menu
                        closeMenuHandler={closeMenuHandler}
                        newRootV2={root}
                        menuDataV1={extraData.menuData}
                        deleteRootObject={deleteRootObject}
                        rootArr={extraData.blueJunction}
                        listOfNode={parse(stringify(extraData.menuData.listData))}
                        parentList={parse(stringify(extraData.menuData.parentData))}
                        childrenList={parse(stringify(extraData.menuData.childrenData))}
                        extraData={extraData}
                        setExtraData={setExtraData}
                        collapseNodeHandler={collapseNodeHandler}
                        getListOfAllNodeHandler={getListOfAllNodeHandler}
                        filterModalHandler={filterModalHandler}
                        onConfirmBeforeRemoveHandler={onConfirmBeforeRemoveHandler}
                    />
                }




            </Container>

        </>
    );
};



export default Home;
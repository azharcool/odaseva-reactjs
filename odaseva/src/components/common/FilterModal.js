
import { parse, stringify } from 'flatted';
import { React, useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuid } from 'uuid';
import { AddIcon, CloseIcon, DeleteIcon, DownArrowIcon, FilterIcon, LimitIcon, SearchIcon, DangerIcon } from '../common/Icons';
import { CustomModal } from './CustomModal';


const Container = styled.div`
    width: 958px;
    height: 677px;
    background: #FFFFFF;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    outline: none;
    z-index: 999;
    display: flex;
    position: relative;
    flex-direction:column;
    justify-content:space-between;
    box-sizing: border-box;
`;

const Header = styled.div`
    max-width: 958px;
    height: 80px;
    background: #FFFFFF;
    box-shadow: 0px 1px 0px #E3E8EA;
    border-radius: 6px 6px 0px 0px;
    display: flex;
    align-items:center;
    padding-left: 40px;
    box-sizing: border-box;
`;

const Footer = styled.div`
    width: 958px;
    height: 64px;
    background: #F7F7F7;
    border-radius: 0px 0px 6px 6px;
    text-align: end;
    padding: 12px 40px;
    box-sizing: border-box;
`;

const Main = styled.div`
    width: 100%; 
    max-height:533px;
    overflow :scroll;
    padding: 0;
    box-sizing: border-box;
`;

const Button = styled.div`
    width: 69px;
    height: 40px;
    background: #1853EB;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    text-align: center; 
       box-sizing: border-box;
`;

const ClearBtn = styled.div`
    width: 107px;
    height: 40px;
    background: #FFFFFF;
    opacity: 0.3;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    text-align: center;
    margin-right: 8px;
    box-sizing: border-box;
`;

const Title = styled.span`
    font-family: Manrope;
    font-style: normal;
    font-weight: ${p => p.title === 'true' ? '700' : '600'};
    font-size: ${p => p.title === 'true' ? p.titleValue : '13px'};
    line-height: ${p => p.lineHt === 'true' ? '40px' : ''} ;
    letter-spacing: 0.2px;
    color: ${p => p.clear ? '#151818' : '#FFFFFF'};
    margin-left: ${p => p.ml};
`;

const IconWrapper = styled.div`
    width:${p => p.w};
    height:${p => p.h};
    margin-right: ${p => p.mr};
`;

const Wrapper = styled.div`
    margin-left: 40px;
    margin-bottom: ${p => p.gutterBottom ? '37px' : ''};
    margin-top: ${p => p.top ? '45px' : ''};
       box-sizing: border-box;
`;

const TitleWrapper = styled.div`
    display: flex;
`;

const Text = styled.span`
    font-family: Manrope;
    font-style: normal;
    font-weight: ${p => p.title === 'true' ? '600' : '500'};
    font-size: 13px;
    color: ${p => p.title === 'true' ? '#282C2D' : p.inserted === 'true' ? '#0031AE' : '#778185'};
`;

const MainWrapper = styled.div`
    width: 878px;
    background: #F7F7F7;
    border-radius: 6px;
    margin-top: 20px;
    padding-top:24px; 
    padding-left: 24px;
    padding-bottom: ${p => p.limit ? '36px' : '26px'};
    padding-right: 52px;
    display: flex;
    box-sizing: border-box;
`;

const Record = styled.div`
    width: 388px;
    height: 40px;
    background: #FFFFFF;
    border-radius: 4px;
    margin-top: 11px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 14px;
       box-sizing: border-box;
`;

const AddRow = styled.div`
    width: 108px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E8EAEB;
    box-sizing: border-box;
    border-radius: 4px;
    margin-top: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

`;

const Row = styled.div`
    margin-top: 11px;
    display: flex;
    box-sizing: border-box;
`;

const Input = styled.input`
    width: 90%;
    height: 100%;
    outline: none;
    border-width: 0;
    font-weight: 600;
    font-size: 13px;
    color: #919B9F;

    ::-webkit-inner-spin-button{
         -webkit-appearance: none;
        margin: 0;
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }
`;

const CommonWrapper = styled.div`
    width: ${p => p.w};
    height: ${p => p.h};
    background: ${p => p.disable === true ? '#F7F7F7' : '#FFFFFF'} ;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding-left: ${p => p.pl};
    position: relative;
    margin-left: ${p => p.ml};
    margin-right: ${p => p.mr};
    box-sizing: border-box;
    cursor: pointer;
    ${p => p.inserted ? css`
        background: #F5F8FF;
        border: 1px solid #346DFF;
    `: css`
    `}
`;

const CommonListWrapper = styled.div`
    width: ${p => p.w};
    height: ${p => p.h};
    background: #FFFFFF;
    border: 1px solid #E8EAEB;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    position: absolute;
    left: 0px;
    top: 42px;
    overflow-y: auto;
    z-index:1;
    
`;

const CommonListItem = styled.div`
    width: '100%';
     height: 40px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding-right: 24px;
    padding-left: 24px;
    border-bottom: 1px solid #E8EAEB;
   box-sizing: border-box;
    :hover {
        background: #f6f6f6;
        cursor: pointer;
    }
`;

const CommonText = styled.span`
    color: #151818;
    font-family: Manrope;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;    
`;

const FieldListWrapper = styled.div`
    width: ${p => p.w ? '313px' : '404px'};
    height: 150px;
    background: #FFFFFF;
    border: 1px solid #E8EAEB;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    position: absolute;
    left: 0px;
    top: 42px;
    overflow-y: auto;
    z-index: 9;
`;

const FieldItem = styled.div`
    width: '100%';
    height: 64px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding-right: 24px;
    padding-left: 24px;
    border-bottom: 1px solid #E8EAEB;
   box-sizing: border-box;
    :hover {
        background: #f6f6f6;
        cursor: pointer;
    }
`;

const FieldText = styled.span`
    font-family: Manrope;
    font-style: normal;
    font-weight: ${p => p.blue ? '600' : '500'};
    font-size: 13px;
    color:${p => p.title ? '#151818' : p.blue ? '#1853EB' : '#919B9F'};
    display: block;
`;

const FilterPreview = styled.div`
    width: ${p => p.w || '818px'};
    height: ${p => p.h || '47px'};
    background: ${p => p.bg || '#E8EAEB'};
    border-radius: ${p => p.br || '6px'};
    margin-top: ${p => p.mt || '12px'} ;
    align-items: center;
    padding-left: ${p => p.pl || '12px'};
`;

const FilterText = styled.span`
    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 47px;
    color: #575F62;
    letter-spacing: .1px
`;

const Danger = styled.div`
    width:878px;
    height:47px;
    background: #FFEBE6;
    border-radius:6px;
    margin-top: 19px;
    align-items: center;
    padding-left:12px;
    display: flex;
`;

const DangerText = styled.span`
    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 48px;
    color: #BF2E0E;
`;

const DangerIconStyled = styled.div`
    margin-left: 16px;
    margin-right: 12px;
`;

export function FilterModal(props) {
    const { extraData, filterModalHandler, menuDataV1, filterUpdateHandler } = props;
    const { filterOpen } = extraData;
    const [filterData, setFilterData] = useState({
        limitValue: '', ascOrDesc: '',
        orderBy: '', textField: '', operators: ['Equals', 'Not equals', 'Less than', 'Less or equal', 'Greater than', 'Greater or equal', 'Like', 'IN', 'NOT IN'],
        showOperators: false, operator: '', enterValue: '', searchList: [], showOrder: false,
        orderListArr: [], showOrderBy: false, orderByArr: ['Ascending', 'Descending'],
        showFilterPreview: false, filterQuery: '', inserted: false, operatorClose: false,
        orderbyClose: false, orderNameClose: false, addRow: [], forceUpdate: false, addedNode: [],
        showDanger: false
    });

    const [forceUpdate, setForceUpdate] = useState(false);

    const preview = useCallback(() => {
        let limit = filterData.limitValue;
        let orderName = filterData.orderBy;
        let orderBy = filterData.ascOrDesc;

        let text = filterData.textField;
        let opr = filterData.operator;
        let enterValue = filterData.enterValue;

        if (text !== '' || enterValue !== '' || enterValue.length >= 1) {
            let operator = operatorGenerator(opr);

            if (orderName === '') {
                orderName = 'Name'
            }

            if (orderBy === 'Ascending') {
                orderBy = 'ASC';
            } else {
                orderBy = 'DESC';
            };

            if (limit === '') {
                limit = 1;
            }

            let query = `${text} ${operator} ${enterValue} ORDER BY ${orderName} ${orderBy} LIMIT ${limit}`;

            let firstStep = `${text} ${operator} ${enterValue}`;
            let lastStep = `ORDER BY ${orderName} ${orderBy} LIMIT ${limit}`;
            let middleList = '';
            filterData.addRow.map((item) => {
                let middleStep = '';
                let operator = operatorGenerator(item.operator2);
                if (item.operator1 !== '' || item.enterValue !== '' || item.textField !== '') {
                    let operator1 = item.operator1 === '' ? "AND" : item.operator1;
                    let value = item.enterValue === '' ? '""' : item.enterValue;
                    let text = item.textField === '' ? '""' : item.textField;
                    middleStep = `${operator1} ${text} ${operator} ${value} `;
                    middleList = middleList.concat(middleStep);
                }
                return false;
            });

            if (filterData.addRow.length === 0) {
                setFilterData(s => ({ ...s, showFilterPreview: true, filterQuery: query }));
            } else {
                let finalQuery = `${firstStep} ${middleList} ${lastStep}`;
                setFilterData(s => ({ ...s, showFilterPreview: true, filterQuery: finalQuery }));
            };
        } else {
            setFilterData(s => ({ ...s, showFilterPreview: false, filterQuery: '' }));
        }
    }, [filterData.limitValue, filterData.addRow,
    filterData.orderBy, filterData.ascOrDesc, filterData.enterValue, filterData.operator, filterData.textField])

    useEffect(() => {
        preview();

        return () => {
            preview()
        }
    }, [forceUpdate, preview]);

    useEffect(() => {
        updateFilter();
    }, [])



    const operatorGenerator = (operator) => {
        if (operator === 'Equals') {
            operator = '=';
        } else if (operator === 'Not equals') {
            operator = '!=';
        } else if (operator === 'Less than') {
            operator = '<';
        } else if (operator === 'Less or equal') {
            operator = '<=';
        } else if (operator === 'Greater than') {
            operator = '>';
        } else if (operator === 'Greater or equal') {
            operator = '>=';
        } else if (operator === 'Like') {
            operator = 'LIKE';
        } else if (operator === 'IN') {
            operator = 'IN';
        } else if (operator === 'NOT IN') {
            operator = 'NOT IN';
        }
        return operator;
    }

    const updateFilter = () => {
        if (menuDataV1.filterData) {
            if (filterData.limitValue === '') {
                setFilterData(s => ({
                    ...s,
                    limitValue: menuDataV1.filterData.limitValue,
                }));
            }

            if (filterData.orderBy === '') {
                setFilterData(s => ({
                    ...s,
                    orderBy: menuDataV1.filterData.orderBy,
                    showOrder: menuDataV1.filterData.showOrder,
                    orderNameClose: menuDataV1.filterData.orderNameClose,
                }));
            }

            if (filterData.ascOrDesc === '') {
                setFilterData(s => ({
                    ...s,
                    ascOrDesc: menuDataV1.filterData.ascOrDesc,
                    showOrderBy: menuDataV1.filterData.showOrderBy,
                    orderbyClose: menuDataV1.filterData.orderbyClose,
                }));
            }

            if (filterData.textField === '') {
                setFilterData(s => ({
                    ...s,
                    textField: menuDataV1.filterData.textField,
                    inserted: menuDataV1.filterData.inserted,
                }));
            }

            if (filterData.operator === '') {
                setFilterData(s => ({
                    ...s,
                    operator: menuDataV1.filterData.operator,
                    showOperators: menuDataV1.filterData.showOperators,
                    operatorClose: menuDataV1.filterData.operatorClose,
                }));
            }

            if (filterData.enterValue === '') {
                setFilterData(s => ({
                    ...s,
                    enterValue: menuDataV1.filterData.enterValue,
                }));
            }

            if (filterData.addRow.length === 0 && menuDataV1.filterData.addRow.length > 0) {
                menuDataV1.filterData.addRow.map((item) => {
                    let temp = {};
                    temp.textField = item.textField;
                    temp.inserted = item.inserted;
                    temp.showOperator1 = item.showOperator1;
                    temp.showOperator2 = item.showOperator2;
                    temp.addedNode = item.addedNode;
                    temp.operator1 = item.operator1;
                    temp.operator2 = item.operator2;
                    temp.enterValue = item.enterValue;
                    temp.showOperatorArr1 = item.showOperatorArr1;
                    temp.showOperatorArr2 = item.showOperatorArr2;
                    temp.operatorArr1 = item.operatorArr1;
                    temp.operatorArr2 = item.operatorArr2;
                    temp.id = item.id;
                    temp.searchList = item.searchList;
                    filterData.addRow.push(temp);
                });



            }



        }

        if (filterData.orderListArr.length === 0) {
            let temp = [];
            menuDataV1.filterList.map((i) => {
                temp.push(i.n)

            });
            setFilterData(s => ({
                ...s,
                orderListArr: temp
            }));
        }
    }

    const clearFiltered = () => {
        setFilterData(s => ({
            ...s,
            limitValue: '', ascOrDesc: '', showOperators: false,
            orderBy: '', textField: '', showOrder: false, showOrderBy: false,
            operator: '', enterValue: '', searchList: [], showFilterPreview: false, filterQuery: '',
            inserted: false, operatorClose: false, addRow: [], addedNode: [],
            orderbyClose: false, orderNameClose: false, showDanger: false
        }));
    };



    const applyChanges = () => {
        if (filterData.enterValue !== '' && filterData.limitValue !== '') {
            let filterDataClone = parse(stringify(filterData));

            menuDataV1.filter = true;
            let totalFiltered = filterDataClone.addRow.length + 1;
            menuDataV1.totalFilter = totalFiltered;
            menuDataV1.filterData = filterData;

            let jsonFormat = {};
            let operator;

            if (filterData.operator === '') {
                operator = '=';
            } else {
                operator = operatorGenerator(filterData.operator);
            }

            let firstStep = ["", filterData.textField, operator, filterData.enterValue];
            let lastStep = [];
            filterData.addRow.map((item) => {
                let operator = operatorGenerator(item.operator2);
                if (filterData.textField !== '' && item.enterValue !== '') {
                    let step = [item.operator1, filterData.textField, operator, item.enterValue];
                    lastStep = [...lastStep, step];
                }
                return false;
            });

            jsonFormat.filter = [firstStep, ...lastStep];
            let temp = {};
            temp.limits = filterData.limitValue;
            temp.orderBys = [{
                "fieldName": menuDataV1.objectName,//API Name
                "direction": filterData.ascOrDesc === 'Ascending' ? 'ASC' : 'DESC', //ASC or DESC
            }];
            jsonFormat.recordsSampling = [temp];
            menuDataV1.jsonFormat = jsonFormat;
            filterUpdateHandler();
        } else {
            setFilterData(s => ({ ...s, showDanger: true }));
        }

    };

    const onLimitChange = (e) => {
        setFilterData(s => ({ ...s, limitValue: e.target.value }));
        if (filterData.enterValue !== '' && filterData.textField !== '') {
            setForceUpdate(s => !s);
        }
    };

    const onFieldChange = (e) => {
        setFilterData(s => ({ ...s, textField: e.target.value, showOperators: false }));
        let menuClone = parse(stringify(menuDataV1));
        if (e.target.value.length >= 3) {
            let filterDataClone = menuClone.filterList;
            let scrollId = document.getElementById("scrollVertical");
            scrollId.scrollBy({ top: 500, left: 0, behavior: 'smooth' });
            let filteredData = filterDataClone.filter((i) => {
                let technicalLabel = i.n.toLowerCase();
                let nodeLabel = i.l.toLowerCase();
                let inputValue = e.target.value.toLowerCase();
                let check = nodeLabel.includes(inputValue);
                if (check) {
                    return i;
                };

                let isTechnical = technicalLabel.includes(inputValue);
                if (isTechnical) {
                    return i;
                };
                return false;
            });

            let cloneMixAll = parse(stringify(filteredData));
            if (filterData.ascOrDesc === 'Ascending') {
                let ascMixAll = cloneMixAll.sort();

                setFilterData(s => ({ ...s, searchList: ascMixAll }));
            } else if (filterData.ascOrDesc === 'Descending') {
                let ascMixAll = cloneMixAll.reverse();
                setFilterData(s => ({ ...s, searchList: ascMixAll }));
            } else {
                let ascMixAll = cloneMixAll.sort();
                setFilterData(s => ({ ...s, searchList: ascMixAll }));
            }

        } else {
            setFilterData(s => ({ ...s, searchList: [] }));
        }
    };


    const onEnterValueChange = (e) => {
        setFilterData(s => ({ ...s, enterValue: e.target.value }));
        if (filterData.textField !== '') {
            setForceUpdate(s => !s);
        }
    };

    const onOrderSelect = () => {
        if (filterData.limitValue === '')
            return;

        if (filterData.showOrder) {
            setFilterData(s => ({ ...s, showOrder: false }));
        } else {
            setFilterData(s => ({ ...s, showOrder: true }));
        }
    };

    const showOrHideOperators = () => {
        if (filterData.showOperators) {
            setFilterData(s => ({ ...s, showOperators: false }));
        } else {
            setFilterData(s => ({ ...s, showOperators: true }));
        }
    };

    const onAscDescChange = () => {
        if (filterData.limitValue === '')
            return;

        if (filterData.orderBy === '') {
            return;
        }

        if (filterData.showOrderBy) {
            setFilterData(s => ({ ...s, showOrderBy: false }));
        } else {
            setFilterData(s => ({ ...s, showOrderBy: true }));
        }
    };


    const commonCloseHandler = ({ status }) => {
        if (status === 'insert') {
            setFilterData(s => ({ ...s, textField: '', inserted: false, addedNode: [] }));
        } else if (status === 'operator') {
            setFilterData(s => ({ ...s, operator: '', operatorClose: false }));
        } else if (status === 'orderName') {
            setFilterData(s => ({ ...s, orderBy: '', orderNameClose: false }));
        } else if (status === 'orderby') {
            setFilterData(s => ({ ...s, ascOrDesc: '', orderbyClose: false }));
        }
        setForceUpdate(s => !s);
    }

    const onOrderByItemClick = ({ i }) => {
        setFilterData(s => ({ ...s, ascOrDesc: i, showOrderBy: false, orderbyClose: true }));
        if (filterData.enterValue !== '' && filterData.textField !== '') {
            setForceUpdate(s => !s);
        }
    };

    const insertFieldHandler = (node) => {
        setFilterData(s => ({
            ...s,
            textField: node.n,
            showDanger: false,
            inserted: true,
            searchList: [],
        }));
        if (filterData.enterValue !== '') {
            setForceUpdate(s => !s);
        }
    };

    const onOperatorItemClick = ({ i }) => {
        setFilterData(s => ({ ...s, operator: i, showOperators: false, operatorClose: true }));
        if (filterData.enterValue !== '' && filterData.textField !== '') {
            setForceUpdate(s => !s);
        }
    }

    const addRowHandler = () => {
        if (filterData.limitValue === '')
            return;

        if (filterData.limitValue > filterData.addRow.length) {
            let temp = {};
            temp.textField = '';
            temp.inserted = false;
            temp.showOperator1 = false;
            temp.showOperator2 = false;
            temp.addedNode = [];
            temp.operator1 = '';
            temp.operator2 = '';
            temp.enterValue = '';
            temp.showOperatorArr1 = false;
            temp.showOperatorArr2 = false;
            temp.operatorArr1 = ['AND', 'OR', 'NOT'];
            temp.operatorArr2 = ['Equals', 'Not equals', 'Less than', 'Less or equal', 'Greater than', 'Greater or equal', 'Like', 'IN', 'NOT IN'];
            temp.id = uuid();
            temp.searchList = [];
            filterData.addRow.push(temp);
            setFilterData(s => ({ ...s, forceUpdate: true }));
        }
    };

    const deleteRowHandler = ({ id }) => {
        let index = -1;
        filterData.addRow.forEach((i, indx) => {
            if (i.id === id) {
                index = indx;
            }
        })
        if (index !== -1) {
            filterData.addRow.splice(index, 1)
        }
        setForceUpdate(s => !s);
    };


    const renderOrderList = () => {
        const order = filterData.orderListArr.map((i) => {
            return (<CommonListItem key={i} onClick={() => {
                setFilterData(s => ({
                    ...s, orderBy: i,
                    showOrder: false, orderNameClose: true
                }));
                if (filterData.enterValue !== '' && filterData.textField !== '') {
                    setForceUpdate(s => !s);
                }
            }}>
                <CommonText>{i}</CommonText>
            </CommonListItem>)
        });

        return <CommonListWrapper w='229px' h='88px'>
            {order}
        </CommonListWrapper>
    };



    const renderOrderBy = () => {
        const order = filterData.orderByArr.map((i) => {
            return (<CommonListItem key={i} onClick={onOrderByItemClick.bind(this, { i })} >
                <CommonText>{i}</CommonText>
            </CommonListItem>)
        });

        return <CommonListWrapper w='153px' h='80px'>
            {order}
        </CommonListWrapper>
    };




    const renderFieldList = () => {
        const fields = filterData.searchList.map((i, index) => {

            return (<FieldItem key={index}>
                <div>
                    <FieldText title='true'>{i.l}</FieldText>
                    <FieldText>{i.n}</FieldText>
                </div>
                <FieldText onClick={() => { insertFieldHandler(i) }} blue>Insert</FieldText>
            </FieldItem>)
        });
        return <FieldListWrapper>
            {fields}
        </FieldListWrapper>;
    };


    const renderOperator = () => {
        const operator = filterData.operators.map((i) => {
            return (
                <CommonListItem key={i} onClick={onOperatorItemClick.bind(this, { i })}>
                    <CommonText>{i}</CommonText>
                </CommonListItem>
            )
        });

        return <CommonListWrapper w='143px' h='88px'>
            {operator}
        </CommonListWrapper>
    };

    const renderRowOperatorArr1 = (i) => {
        const operator = i.operatorArr1.map((item) => {
            return (
                <CommonListItem key={item} onClick={() => {
                    i.operator1 = item;
                    i.showOperatorArr1 = false;
                    i.showOperator1 = true;
                    setForceUpdate(s => !s);
                    if (filterData.enterValue !== '' && filterData.textField !== '') {
                        setForceUpdate(s => !s);
                    }
                }}>
                    <CommonText>{item}</CommonText>
                </CommonListItem>
            )
        });

        return <CommonListWrapper w='83px' h='88px'>
            {operator}
        </CommonListWrapper>
    };

    const onRowFieldInserted = (i, item) => {
        i.searchList = [];
        i.textField = item.n;
        i.inserted = true;

        setFilterData(s => ({ ...s, forceUpdate: true }));
        if (filterData.enterValue !== '' && filterData.textField !== '') {
            setForceUpdate(s => !s);
        };
    }

    const renderRowField = (i) => {
        const fields = i.searchList.map((item, index) => {
            return (<FieldItem key={index}>
                <div>
                    <FieldText title='true'>{item.l}</FieldText>
                    <FieldText>{item.n}</FieldText>
                </div>
                <FieldText onClick={() => { onRowFieldInserted(i, item) }} blue='true'>Insert</FieldText>
            </FieldItem>)
        });
        return <FieldListWrapper w='true'>
            {fields}
        </FieldListWrapper>;
    };

    const renderRowOperatorArr2 = (i) => {
        const operator = i.operatorArr2.map((item) => {
            return (
                <CommonListItem key={item} onClick={() => {
                    i.operator2 = item;
                    i.showOperator2 = true;
                    setFilterData(s => ({ ...s, forceUpdate: true }));
                    if (filterData.enterValue !== '' && filterData.textField !== '') {
                        setForceUpdate(s => !s);
                    }
                }}>
                    <CommonText>{item}</CommonText>
                </CommonListItem>
            )
        });

        return <CommonListWrapper w='143px' h='88px'>
            {operator}
        </CommonListWrapper>
    }

    const rowInputChangeHandler = (e, i) => {
        i.textField = e.target.value;
        let menuClone = parse(stringify(menuDataV1));
        if (e.target.value.length >= 3) {
            let filterData = menuClone.filterList;
            let scrollId = document.getElementById("scrollVertical");
            scrollId.scrollBy({ top: 500, left: 0, behavior: 'smooth' });
            let filteredData = filterData.filter((i) => {
                let nodeLabel = i.n.toLowerCase();
                let technicalName = i.n.toLowerCase();

                let inputValue = e.target.value.toLowerCase();

                let check = nodeLabel.includes(inputValue);
                if (check) {
                    return i;
                };

                let checkTechnicalName = technicalName.includes(inputValue);
                if (checkTechnicalName) {
                    return i
                }
                return false;
            });

            let cloneMixAll = parse(stringify(filteredData));

            if (filterData.ascOrDesc === 'Ascending') {
                let ascMixAll = cloneMixAll.sort();
                i.searchList = ascMixAll;
            } else if (filterData.ascOrDesc === 'Descending') {
                let ascMixAll = cloneMixAll.reverse();
                i.searchList = ascMixAll;
            } else {
                let ascMixAll = cloneMixAll.sort();
                i.searchList = ascMixAll;
            }

        } else {
            i.searchList = [];
        }
        setFilterData(s => ({ ...s, forceUpdate: true }));
    }

    const renderRow = () => {
        const render = filterData.addRow.map((i, index) => {
            return (<div key={index} style={{ marginTop: 12, display: 'flex' }}>

                {i.showOperator1 && <CommonWrapper onClick={() => {
                    i.showOperatorArr1 = false;
                    i.showOperator1 = false;
                    i.operator1 = '';
                    setForceUpdate(s => !s);
                }} inserted w='83px' h='40px' pl='16px'>
                    <Text inserted='true'>{i.operator1}</Text>
                    <IconWrapper style={{ position: 'absolute', right: 10.08, bottom: 10, marginBottom: 3 }}>
                        <CloseIcon color='#1853EB' width="10" height="10" />
                    </IconWrapper>
                </CommonWrapper>}

                {i.showOperator1 === false && <CommonWrapper onClick={() => {
                    i.showOperatorArr1 = !i.showOperatorArr1;
                    setForceUpdate(s => !s);
                    let scrollId = document.getElementById("scrollVertical");
                    scrollId.scrollBy({ top: 500, left: 0, behavior: 'smooth' });

                }} w='83px' h='40px' pl='16px'>
                    <Text>{i.operator1 === '' ? 'And' : i.operator1}</Text>
                    <IconWrapper style={{ position: 'absolute', right: 10.08, bottom: 10, marginBottom: 5 }}>
                        <DownArrowIcon color='#282C2D' width="10" height="5.76" />
                    </IconWrapper>
                    {i.showOperatorArr1 && renderRowOperatorArr1(i)}
                </CommonWrapper>}


                {i.inserted && <CommonWrapper inserted w='313px' h='40px' pl='35.99px' ml='8px'>
                    <Text inserted='true'>{i.textField}</Text>
                    <IconWrapper onClick={() => {
                        i.textField = ''; i.inserted = false;
                        i.addedNode = [];
                        setFilterData(s => ({ ...s, forceUpdate: true }));
                        setForceUpdate(s => !s);
                    }} style={{ position: 'absolute', right: 11.99, bottom: 10, marginBottom: 3 }}>
                        <CloseIcon color='#1853EB' width="10" height="10" />
                    </IconWrapper>
                </CommonWrapper>}

                {i.inserted === false && <CommonWrapper w='313px' h='40px' pl='35.99px' ml='8px'>
                    <IconWrapper style={{ position: 'absolute', left: 11.99, bottom: 10, marginBottom: 3 }}>
                        <SearchIcon color='#282C2D' width="14" height="14" />
                    </IconWrapper>
                    <Input type="text" value={i.textField} placeholder="Find a field" onChange={(e) => {
                        rowInputChangeHandler(e, i);
                    }} />
                    {i.searchList.length > 0 && renderRowField(i)}
                </CommonWrapper>}

                {i.showOperator2 && <CommonWrapper inserted='true' w='143px' h='40px' pl='16px' ml='8px' mr='8px'>
                    <Text inserted='true'>{i.operator2}</Text>
                    <IconWrapper onClick={() => {
                        i.showOperator2 = false;
                        i.operator2 = '';
                        setForceUpdate(s => !s);
                        setFilterData(s => ({ ...s, forceUpdate: true }));
                    }} style={{ position: 'absolute', right: 10.08, bottom: 10, marginBottom: 3 }}>
                        <CloseIcon color='#1853EB' width="10" height="10" />
                    </IconWrapper>
                </CommonWrapper>}

                {i.showOperator2 === false && <CommonWrapper onClick={() => {
                    i.showOperatorArr2 = !i.showOperatorArr2;
                    setFilterData(s => ({ ...s, forceUpdate: true }));
                }} w='143px' h='40px' pl='16px' ml='8px' mr='8px'>
                    <Text>{i.operator2 === '' ? 'Equals' : i.operator2}</Text>
                    <IconWrapper style={{ position: 'absolute', right: 10.08, bottom: 10, marginBottom: 5 }
                    }>
                        <DownArrowIcon color='#282C2D' width="10" height="5.76" />
                    </IconWrapper>
                    {i.showOperatorArr2 && renderRowOperatorArr2(i)}
                </CommonWrapper>}

                <CommonWrapper w='239px' h='40px' pl='12px'>
                    <Input type="text" value={i.enterValue} placeholder="Enter value" onChange={(e) => {
                        i.enterValue = e.target.value;
                        setFilterData(s => ({ ...s, forceUpdate: true }));
                        setForceUpdate(s => !s);
                    }} />
                </CommonWrapper>

                <IconWrapper onClick={deleteRowHandler.bind(this, { id: i.id })} style={{ marginTop: '10px', marginLeft: '10px' }}>
                    <DeleteIcon color='#282C2D' width="17.5" height="16.25" />
                </IconWrapper>
            </div>)
        });

        return render;
    }



    return (
        <CustomModal
            showModal={filterOpen}
            setShowModal={filterModalHandler.bind(this, { status: 'close' })}
        >
            <Container>
                <Header>
                    <IconWrapper w='23.95px' h='23.25px' mr='8px'>
                        <FilterIcon color='#1853EB' />
                    </IconWrapper>
                    <Title title='true' titleValue='18px' clear='true'>Filter Records</Title>
                </Header>
                <Main id='scrollVertical'>
                    <Wrapper top='true'>
                        <TitleWrapper>
                            <IconWrapper style={{ marginRight: 10 }}>
                                <LimitIcon color='#000000' width='18.75px' height='20px' />
                            </IconWrapper>
                            <Title title='true' titleValue='16px' clear='true'>Limit Records</Title>
                        </TitleWrapper>
                        <MainWrapper limit='true'>
                            <div>
                                <Text title='true'>Limit # records to</Text>
                                <Record>
                                    <Input type="number" value={filterData.limitValue} placeholder="# records" onChange={onLimitChange} />
                                </Record>
                            </div>

                            <div style={{ marginLeft: 24 }}>
                                <Text title='true'>Order by</Text>
                                <Row>

                                    {filterData.orderNameClose && <CommonWrapper inserted='true' w='229px' h='40px' pl='12px' mr='8px' >
                                        <Text inserted='true'>{filterData.orderBy}</Text>
                                        <IconWrapper onClick={commonCloseHandler.bind(this, { status: 'orderName' })}
                                            style={{ position: 'absolute', right: 17.08, bottom: 10, marginBottom: 3 }}>
                                            <CloseIcon color='#1853EB' width="10" height="10" />
                                        </IconWrapper>
                                    </CommonWrapper>}

                                    {filterData.orderNameClose === false && <CommonWrapper onClick={onOrderSelect} w='229px' h='40px' pl='12px' mr='8px'>
                                        <Text>{filterData.orderBy === '' ? 'Select one...' : filterData.orderBy}</Text>
                                        <IconWrapper style={{ position: 'absolute', right: 17.08, bottom: 10, marginBottom: 5 }}>
                                            <DownArrowIcon color='#282C2D' width="10" height="6" />
                                        </IconWrapper>
                                        {filterData.showOrder && renderOrderList()}
                                    </CommonWrapper>}

                                    {filterData.orderbyClose && <CommonWrapper inserted w='153px' h='40px' pl='12px'>
                                        <Text inserted='true'>{filterData.ascOrDesc}</Text>
                                        <IconWrapper onClick={commonCloseHandler.bind(this, { status: 'orderby' })} style={{ position: 'absolute', right: 17.08, bottom: 10, marginBottom: 3 }}>
                                            <CloseIcon color='#1853EB' width="10" height="10" />
                                        </IconWrapper>
                                    </CommonWrapper>}

                                    {filterData.orderbyClose === false && <CommonWrapper onClick={onAscDescChange} w='153px' h='40px' pl='12px' disable={filterData.orderBy === ''}>
                                        <Text>{filterData.ascOrDesc === '' ? 'Descending' : filterData.ascOrDesc}</Text>
                                        <IconWrapper style={{ position: 'absolute', right: 17.08, bottom: 10, marginBottom: 5 }}>
                                            <DownArrowIcon color='#282C2D' width="10" height="5.76" />
                                        </IconWrapper>
                                        {filterData.showOrderBy && renderOrderBy()}
                                    </CommonWrapper>}


                                </Row>
                            </div>
                        </MainWrapper>
                    </Wrapper>
                    <div style={{ marginTop: 50 }} />
                    <Wrapper gutterBottom='true'>
                        <TitleWrapper>
                            <IconWrapper w='20px' h='20px' style={{ marginRight: 10 }}>
                                <FilterIcon color='#000000' width='20' height='20' />
                            </IconWrapper>
                            <Title title='true' titleValue='16px' clear='true'>Field Filtering</Title>
                        </TitleWrapper>

                        {filterData.showDanger && <Danger>
                            <DangerIconStyled>
                                <DangerIcon />
                            </DangerIconStyled>
                            <DangerText>All field filters must include a field selection and value.</DangerText>
                        </Danger>}


                        <MainWrapper>
                            <div>
                                <Text title='true'>Fields</Text>
                                <div style={{ display: 'flex', marginTop: 12 }}>

                                    {filterData.inserted && <CommonWrapper inserted w='404px' h='40px' pl='35.99px'>
                                        <Text inserted='true'>{filterData.textField}</Text>
                                        <IconWrapper onClick={commonCloseHandler.bind(this, { status: 'insert' })} style={{ position: 'absolute', right: 11.99, bottom: 10, marginBottom: 3 }}>
                                            <CloseIcon color='#1853EB' width="10" height="10" />
                                        </IconWrapper>
                                    </CommonWrapper>}

                                    {filterData.inserted === false && <CommonWrapper w='404px' h='40px' pl='35.99px'>
                                        <IconWrapper style={{ position: 'absolute', left: 11.99, bottom: 10, marginBottom: 3 }}>
                                            <SearchIcon color='#282C2D' width="14" height="14" />
                                        </IconWrapper>
                                        <Input type="text" value={filterData.textField}
                                            placeholder="Find a field"
                                            onBlur={() => {

                                            }}
                                            onChange={onFieldChange} />
                                        {filterData.searchList.length > 0 && renderFieldList()}
                                    </CommonWrapper>}


                                    {filterData.operatorClose && <CommonWrapper inserted w='143px' h='40px' pl='16px' ml='8px' mr='8px'>
                                        <Text inserted='true'>{filterData.operator === '' ? 'Equals' : filterData.operator}</Text>
                                        <IconWrapper onClick={commonCloseHandler.bind(this, { status: 'operator' })} style={{ position: 'absolute', right: 10.08, bottom: 10, marginBottom: 3 }}>
                                            <CloseIcon color='#1853EB' width="10" height="10" />
                                        </IconWrapper>
                                    </CommonWrapper>}

                                    {filterData.operatorClose === false && <CommonWrapper onClick={showOrHideOperators} w='143px' h='40px' pl='16px' ml='8px' mr='8px'>
                                        <Text>{filterData.operator === '' ? 'Equals' : filterData.operator}</Text>
                                        <IconWrapper style={{ position: 'absolute', right: 10.08, bottom: 10, marginBottom: 5 }}>
                                            <DownArrowIcon color='#282C2D' width="10" height="5.76" />
                                        </IconWrapper>
                                        {filterData.showOperators && renderOperator()}
                                    </CommonWrapper>}

                                    <CommonWrapper w='239px' h='40px' pl='12px'>
                                        <Input type="text" value={filterData.enterValue} placeholder="Enter value" onChange={onEnterValueChange} />
                                    </CommonWrapper>
                                </div>

                                {renderRow()}

                                <AddRow onClick={addRowHandler}>
                                    <AddIcon color='#151818' width="16" height="16" />
                                    <Title clear='true' ml='8px'>Add row</Title>
                                </AddRow>

                                {
                                    filterData.showFilterPreview && <div style={{ marginTop: 32 }}>
                                        <Text title='true'>Filter preview</Text>
                                        <FilterPreview>
                                            <FilterText>{filterData.filterQuery}</FilterText>
                                        </FilterPreview>
                                    </div>
                                }

                            </div>

                        </MainWrapper>
                    </Wrapper>

                </Main>
                <Footer>
                    <ClearBtn onClick={clearFiltered}>
                        <Title lineHt='true' clear='true'>Clear filters</Title>
                    </ClearBtn>
                    <Button onClick={applyChanges}>
                        <Title lineHt='true'>Apply</Title>
                    </Button>
                </Footer>
            </Container>
        </CustomModal>
    );
};
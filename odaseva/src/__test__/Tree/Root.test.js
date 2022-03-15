import React from 'react';
import 'react-tippy/dist/tippy.css';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Root } from '../../components/pages/Tree';

const rootDataObj = {
    label: 'Root',
    nodeId: '12345', //uuid
    queryMode: 'Root',
    isVisible: true,
    parent: [],
    children: [],
    level: 0,
    left: 236.5,
    totalLevel: 0,
    fieldName: 'Id',
    objectName: 'Root', // API name object name
    filter: false,
    filteredParentData: [],
    filteredChildrenData: [],
    totalFilter: 0
}

const extraDataObj = {
    modalOpen: true, offsetHeight: 0,
    counter: [], menuOpen: false, menuData: null, dragging: false,
    blueJunction: [], listOfAllNode: [], exportRoot: [], levelCount: 0,
    blueCard: '', selectedBlueLineArr: [], exportData: [], activeNodes: [],
    collapseNode: [], selectLevel: '', onFocus: false, value: '', searchNodeList: [],
    filterOpen: false, removeOpen: false
}

test('renders Root page', () => {
    const { getByTestId, debug } = render(<Root
        data={rootDataObj}
        onRootCardClickV1={jest.fn()}
        onCardClickV1={jest.fn()}
        extraData={extraDataObj}
        activeNodeHandler={jest.fn()}
        filterModalHandler={jest.fn()} />);
    const innerText = getByTestId('root-title-id').innerHTML;
    expect(innerText).toBe(rootDataObj.objectName)
    debug();
});
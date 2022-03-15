import React from 'react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import styled from 'styled-components';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Node } from '../../components/pages/Tree';

test('render Node page', () => {
    const { debug } = render(<Node
        data={{ parent: [], children: [] }}
        extraData={{
            modalOpen: true, offsetHeight: 0,
            counter: [], menuOpen: false, menuData: null, dragging: false,
            blueJunction: [], listOfAllNode: [], exportRoot: [], levelCount: 0,
            blueCard: '', selectedBlueLineArr: [], exportData: [], activeNodes: [],
            collapseNode: [], selectLevel: '', onFocus: false, value: '', searchNodeList: [],
            filterOpen: false, removeOpen: false
        }}
        activeNodeHandler={jest.fn()}
        filterModalHandler={jest.fn()}
    />);
    // debug();
});
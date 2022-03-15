import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from '../components/pages/Home';

test('renders Home page', () => {
    const { debug } = render(<Home />);
    // debug();
});
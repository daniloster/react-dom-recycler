/* global document */
import React, {
    PropTypes
} from 'react';
import { render } from 'react-dom';

import ListRecycler from '../index';

const ComponentItem = (({ text }) => (<div>{text}</div>));
ComponentItem.propTypes = {
    text: PropTypes.string
};

const items = [];
for (let idx = 0, len = 50; idx < len; idx += 1) {
    items.push({
        text: `Text ${idx % 2 === 0 ? 'Even' : 'Odd'} ${idx}`
    });
}

const root = document.querySelector('#root');
root.setAttribute('style', 'height: 80px');

render(
    <ListRecycler
        ComponentItem={ComponentItem}
        items={items}
        itemHeight={18.4}
        totalBufferMargin={2}
    />,
    root
);

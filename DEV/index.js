/* global document */
import React, {
    PropTypes
} from 'react';
import { render } from 'react-dom';

import ListRecycler from '../index';
import NodesRecycler from '../src/nodes-recycler';
import Comment from '../src/boilerplate/comment';

const ComponentItem = (({ text }) => (<div>{text}</div>));
ComponentItem.propTypes = {
    text: PropTypes.string
};

const items = [];
for (let idx = 0, len = 5000; idx < len; idx += 1) {
    items.push({
        author: `Author ${idx % 2 === 0 ? 'Even' : 'Odd'} ${idx}`,
        text: `Text ${idx % 2 === 0 ? 'Even' : 'Odd'} ${idx}`
    });
}
const nodes = items.map(item => (
    <Comment
        {...item}
    />
));

const AppDev = (() => (
    <div>
        <div style={{ height: 100 }}>
            <ListRecycler
                ComponentItem={ComponentItem}
                items={items}
                itemHeight={18.4}
                totalBufferMargin={10}
            />
        </div>
        <div style={{ height: 300 }}>
            <NodesRecycler
                nodes={nodes}
                itemHeight={65.92}
                totalBufferMargin={10}
            />
        </div>
    </div>
));

const root = document.querySelector('#root');

render(
    <AppDev />,
    root
);

/* global document */
import React from 'react';
import { render } from 'react-dom';

import {
    ListRecycler,
    NodesRecycler
} from '../index';
import Comment from '../src/boilerplate/comment';
import ComponentItem from '../src/boilerplate/component-item';

const items = [];
for (let idx = 0, len = 500; idx < len; idx += 1) {
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
                itemHeight={65.92}
                totalBufferMargin={10}
            >
                {nodes}
            </NodesRecycler>
        </div>
    </div>
));

const root = document.querySelector('#root');

render(
    <AppDev />,
    root
);

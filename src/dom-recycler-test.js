/* eslint-disable */
/* global document */
import React, {
    PropTypes
} from 'react';
import {
    render,
    mount
} from 'enzyme';
import TestUtils from 'react-addons-test-utils';

import {
    ListRecycler,
    NodesRecycler
} from './index';
import ComponentItem from './boilerplate/component-item';

const items = [];
for (let idx = 0, len = 50; idx < len; idx += 1) {
    items.push({
        text: `Text ${idx % 2 === 0 ? 'Even' : 'Odd'} ${idx}`
    });
}
const nodes = items.map((item, idx) => (<ComponentItem {...item} key={idx} />));

let scrollTop;
const Document = (() => (
    <div>
        <button id="btnScrollTopList" onClick={(e) => {
            const container = document.querySelector('.list-recycler--container-recycler');
            container.scrollTop = scrollTop;
        }}>Change scrollTop</button>
        <button id="btnScrollTopNodes" onClick={(e) => {
            const container = document.querySelector('.nodes-recycler--container-recycler');
            container.scrollTop = scrollTop;
        }}>Change scrollTop</button>
        <div style={{ height: '80px' }} id='listRecycler'>
            <ListRecycler
                ComponentItem={ComponentItem}
                items={items}
                itemHeight={18.4}
                totalBufferMargin={2}
            />
        </div>
        <div style={{ height: '80px' }} id='nodesRecycler'>
            <NodesRecycler
                itemHeight={18.4}
                totalBufferMargin={2}
            >
                {nodes}
            </NodesRecycler>
        </div>
    </div>
));

describe('ListRecycler', () => {
    let element;
    beforeEach(() => {
        element = mount(<Document />);
    });

    it('should show initially more 7 items rendered', () => {
        const elements = element.find('.list-recycler--content-recycler div');
        expect(elements.length > 7).toBeTruthy();
    });

    it('should show 5 items rendered after scroll 10 pixel', () => {
        const container = element.find('.list-recycler--container-recycler');
        container.simulate('scroll', { deltaY: 10 });
        const elements = element.find('.list-recycler--content-recycler div');
        expect(elements.length).toBe(5);
    });

    it('should show 7 items rendered after scroll 50 pixel', () => {
        const container = element.find('.list-recycler--container-recycler');
        container.simulate('scroll', { deltaY: 50 });
        const elements = element.find('.list-recycler--content-recycler div');
        expect(elements.length).toBe(5);
    });
});

describe('NodesRecycler', () => {
    let element;
    beforeEach(() => {
        element = mount(<Document />);
    });

    it('should show initially more 7 items rendered', () => {
        const elements = element.find('.nodes-recycler--content-recycler div');
        expect(elements.length > 7).toBeTruthy();
    });

    it('should show 5 items rendered after scroll 10 pixel', () => {
        const container = element.find('.nodes-recycler--container-recycler');
        container.simulate('scroll', { deltaY: 10 });
        const elements = element.find('.nodes-recycler--content-recycler div');
        expect(elements.length).toBe(5);
    });

    it('should show 7 items rendered after scroll 50 pixel', () => {
        const container = element.find('.nodes-recycler--container-recycler');
        container.simulate('scroll', { deltaY: 50 });
        const elements = element.find('.nodes-recycler--content-recycler div');
        expect(elements.length).toBe(5);
    });
});

/* eslint-enable */

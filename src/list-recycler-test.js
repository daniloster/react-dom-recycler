/* eslint-disable */
/* global document */
import React, {
    PropTypes
} from 'react';
import {
    render
} from 'enzyme';

import ListRecycler from '../index';

const ComponentItem = ({ text }) => (<div>{text}</div>);
ComponentItem.propTypes = {
    text: PropTypes.string
};

const items = [];
for (let idx = 0, len = 50; idx < len; idx += 1) {
    items.push({
        text: `Text ${idx % 2 === 0 ? 'Even' : 'Odd'} ${idx}`
    });
}
let scrollTop;
const Document = (() => (
    <div>
        <button id="btnScrollTop" onClick={(e) => {
            const container = e.target.parentNode.childNodes[1];
            container.scrollTop = scrollTop;
        }}>Change scrollTop</button>
        <div style={{ height: '80px' }}>
            <ListRecycler
                ComponentItem={ComponentItem}
                items={items}
                itemHeight={18.4}
                totalBufferMargin={2}
            />
        </div>
    </div>
));

function changeScrollTop(value, element) {
    scrollTop = 1;
    element.find('#btnScrollTop').simulate('click');
    const container = element.find('.list-recycler--container-recycler');
    container.simulate('scroll');
}

describe('ListRecycler', () => {
    let element;
    beforeEach(() => {
        element = render(<Document />);
    });

    it('should show initially more 7 items rendered', () => {
        const elements = element.find('.list-recycler--content-recycler div');
        expect(elements.length > 7).toBeTruthy();
    });

    it('should show 7 items rendered after scroll one pixel', () => {
        changeScrollTop(1, element);
        const elements = element.find('.list-recycler--content-recycler div');
        expect(elements.length).toBe(7);
    });
});

/* eslint-enable */

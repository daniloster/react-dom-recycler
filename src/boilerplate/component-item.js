import React, {
    PropTypes
} from 'react';

const ComponentItem = (({ text }) => (<div>{text}</div>));
ComponentItem.propTypes = {
    text: PropTypes.string
};

export default ComponentItem;

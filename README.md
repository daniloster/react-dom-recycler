# react-dom-recycler
npm module for recycling DOM elements in reactjs.

## Motivation
Working with heavy app on daily basis, scratched my brain and pushed me to research about better approaches for HTML redenring.
We all know that browsers have limitations and basically operations over DOM element are quite expensive. Having it on mind, we 
need to define 2 rules:
- Bind less events as possible to HMTL elements;
- Render the minimum possible amount of HTML for event;

## Consuming
### require
var ReactDomRecycler = require('react-dom-recycler');
### es6
import ReactDomRecycler from 'react-dom-recycler';
### global/window
var ReactDomRecycler = window.reactDomRecycler;

### Scenario
Scrolling is a decent and interesting context to improve performance. Usually we have scroll on pages cause we have a large amount 
of data being displayed. Holding json object in memory is not too much expensive when compared to rendering so, we may keep all the
data related in memory, but just display a certain amount of nodes camouflaging the container element with padding to top and bottom.

e.g. we have a list with 50K elements, our container has viewport of 80px and each element in the list has 18.4px, we just need to display 
roughly 5 elements. So, it is 5 against 50K. I think it is pretty reasonable. This example may be improved adding some buffer before and
after for the viewport. Thinking about to have 2 elements as margin buffer, we would end up rendering 7 elements at first, and after 
scrolling 3 elements, we would have 9 elements being rendered there. It is pretty awesome result!

*Pending tasks*: Add some examples of primitive rendering against optimised redenring. 


Please, check out our DEV folder, you will find out a proper example. Once you install
the react-dom-recycler module, go to node_modules/react-dom-recycler/DEV and have a look on index.js
file.

## Usage example
Here is a main file app using es6.
```
/* global document */
import React, {
    PropTypes
} from 'react';
import { render } from 'react-dom';

import {
    NodesRecycler,
    ListRecycler
} from 'react-dom-recycler';

const ComponentItem = ({ text }) => (<div>{text}</div>);
ComponentItem.propTypes = {
    text: PropTypes.string
};

const items = [];
for (let idx = 0, len = 50000; idx < len; idx += 1) {
    items.push({
        text: `Text ${idx % 2 === 0 ? 'Even' : 'Odd'} ${idx}`
    });
}
const nodes = items.map(item => (<ComponentItem {...item} />));

const root = document.querySelector('#root');
root.setAttribute('style', 'height: 80px');

const App = (() => (
    <NodesRecycler
        itemHeight={18.4}
        totalBufferMargin={2}
    >
        {nodes}
    </NodesRecycler>
));

// Another option
// const App = (() => (
//     <NodesRecycler
//         itemHeight={18.4}
//         totalBufferMargin={2}
//     >
//         {items.map((item, idx) => (<ComponentItem key={`item-${idx}`} {...item} />))}
//     </NodesRecycler>
// ));

render(
    <App />,
    root
);

// // or
// render(
//     <ListRecycler
//         ComponentItem={ComponentItem}
//         items={items}
//         itemHeight={18.4}
//         totalBufferMargin={2}
//     />,
//     root
// );

```

*index.html*
```
<!DOCTYPE  html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>REACT-LIST-RECYCLER</title>
    </head>
    <body>
        <div id="root"></div>
        <script src="my-bundle.js"></script>
    </body>
</html>
```

## Happy for sharing it!
Thanks for all support and help us making pull request to optimise this module! 
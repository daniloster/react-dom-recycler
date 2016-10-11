/* global document, window */
import React, {
    PropTypes,
    Component
} from 'react';
import {
    getBoxBuffer
} from './list-recycler-utils';
import styles from './list-recycler.scss';
/**
 * This component is responsible for recycling dom elements. Then, it requires
 * some initial data to perform it correctly.
 * Requirements:
 * - boxHeight: height of one item in pixels;
 * - totalBufferMargin: total buffered previously and after view port;
 * e.g. 1 means that we have 1 buffered before and 1 after;
 */

class ListRecycler extends Component {
    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
    }

    /**
     * At this point your component still do not know what is the
     * element size cause it is about to render. Then, we are assume
     * the worst scenario where we have the whole page to display data.
     * In this case, we assume the container is the full page and do
     * the math based on the screen size, finding, then, the total number
     * of elements that might be displayed in this viewport.
     * As soon as the event scroll is triggered, the state values get
     * updated, taking into account the proper container height.
     */
    componentWillMount() {
        const {
            items,
            itemHeight,
            totalBufferMargin
        } = this.props;
        const {
            styles: contentStyles,
            start,
            end
        } = getBoxBuffer(
            items,
            {
                offsetHeight: window.screen.height,
                scrollTop: 0
            },
            itemHeight,
            totalBufferMargin);
        this.setState({
            contentStyles,
            start,
            end
        });
    }

    /**
     * Handling the scroll event, doing math to find out the slice of the
     * elements based on start and end. Also, finds the padding required to
     * simulate that the elements hidden are in the container occuping space.
     */
    onScroll(e) {
        const container = e.target;
        const {
            items,
            itemHeight,
            totalBufferMargin
        } = this.props;
        const {
            styles: contentStyles,
            start,
            end
        } = getBoxBuffer(
            items,
            container,
            itemHeight,
            totalBufferMargin);
        this.setState({
            contentStyles,
            start,
            end
        });
    }


    render() {
        const {
            ComponentItem,
            items
        } = this.props;
        const {
            contentStyles,
            start,
            end
        } = this.state;
        return (
            <div
                className={styles.containerRecycler}
                onScroll={this.onScroll}
            >
                <div
                    style={contentStyles}
                    className={styles.contentRecycler}
                >
                    { items.slice(start, end).map((item, idx) => (
                        <ComponentItem {...item} key={idx} />
                    )) }
                </div>
            </div>
        );
    }
}

ListRecycler.propTypes = {
    ComponentItem: PropTypes.elem,
    items: PropTypes.arrayOf(PropTypes.object),
    itemHeight: PropTypes.number,
    totalBufferMargin: PropTypes.number
};

export default ListRecycler;

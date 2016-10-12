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

class NodesRecycler extends Component {
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
            nodes,
            itemHeight,
            totalBufferMargin
        } = this.props;
        const {
            start,
            end
        } = getBoxBuffer(
            nodes,
            {
                offsetHeight: window.screen.height,
                scrollTop: 0
            },
            itemHeight,
            totalBufferMargin);
        this.setState({
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
            nodes,
            itemHeight,
            totalBufferMargin
        } = this.props;
        const {
            start,
            end
        } = getBoxBuffer(
            nodes,
            container,
            itemHeight,
            totalBufferMargin);
        this.setState({
            start,
            end
        });
    }


    render() {
        const {
            nodes,
            itemHeight
        } = this.props;
        const {
            start,
            end
        } = this.state;
        return (
            <div
                className={styles.containerRecycler}
                onScroll={this.onScroll}
            >
                <div style={{ height: start * itemHeight }} />
                <div
                    className={styles.contentRecycler}
                >
                    { nodes.slice(start, end) }
                </div>
                <div style={{ height: (nodes.length - end) * itemHeight }} />
            </div>
        );
    }
}

NodesRecycler.propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.element),
    itemHeight: PropTypes.number,
    totalBufferMargin: PropTypes.number
};

export default NodesRecycler;

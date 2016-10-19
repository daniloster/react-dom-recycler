/* global document, window */
import React, {
    PropTypes,
    Component,
    Children
} from 'react';
import {
    getBoxBuffer
} from './dom-recycler-utils';
import styles from './nodes-recycler.scss';
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
            children,
            itemHeight,
            totalBufferMargin
        } = this.props;
        const nodes = Children.toArray(children);
        this.setState({
            nodes
        });
        this.update({
            offsetHeight: window.screen.height,
            scrollTop: 0
        },
        nodes,
        itemHeight,
        totalBufferMargin);
    }

    /**
     * At this point your component do not have the container reference so,
     * it does not know what is the element size. Then, we are assuming
     * the worst scenario where we have the whole page to display data.
     */
    componentWillReceiveProps(nextProps) {
        const {
            children,
            itemHeight,
            totalBufferMargin
        } = nextProps;
        if (this.props.children !== children) {
            this.setState({
                nodes: Children.toArray(children)
            });
        }
        this.update({
            offsetHeight: window.screen.height,
            scrollTop: 0
        },
        this.state.nodes,
        itemHeight,
        totalBufferMargin);
    }

    /**
     * Verifies whether the component should be re-rendered.
     * @param nextProps {object} - represents the new props passed down
     * @param nextState {object} - represents the new state applied
     */
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state === null || this.props === null) {
            return true;
        }
        const {
            children
        } = this.props;
        const isItemsEquals = nextProps.children === children;
        const isBoxBufferEquals = nextState.start === this.state.start
            && nextState.end === this.state.end;
        return !(isItemsEquals && isBoxBufferEquals);
    }

    /**
     * Handling the scroll event, doing math to find out the slice of the
     * elements based on start and end. Also, finds the padding required to
     * simulate that the elements hidden are in the container occuping space.
     */
    onScroll(e) {
        const {
            itemHeight,
            totalBufferMargin
        } = this.props;
        this.update(e.target,
            this.state.nodes,
            itemHeight,
            totalBufferMargin);
    }

    /**
     * Updates the window sliding up and down when it is necessary.
     * @param container {object} - represents an object with shape
     * of { scrollTop: number, offsetHeight: number }
     * @param props {object} - represents the properties that should
     * contain the items, itemHeight and totalBufferMargin
     */
    update(container, items, itemHeight, totalBufferMargin) {
        const {
            start,
            end
        } = getBoxBuffer(
            items,
            container,
            itemHeight,
            totalBufferMargin);
        const isWindow = container.tagName === undefined;
        const isOutOfScope = (container.scrollTop > items.length * itemHeight);
        const isValidScrollUpdate = isWindow || (!isOutOfScope
            && ((start !== undefined && start !== this.state.start) || end !== this.state.end));
        if (isValidScrollUpdate) {
            this.setState({
                start: start || 0,
                end
            });
        }
    }

    render() {
        const {
            itemHeight
        } = this.props;
        const {
            start,
            end,
            nodes
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
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    itemHeight: PropTypes.number,
    totalBufferMargin: PropTypes.number
};

export default NodesRecycler;

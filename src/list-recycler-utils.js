/**
 * Calculates the start and end of the items that should be displayed according to
 * parameters provided.
 * @param item {array} list of the items that must be rendered
 * @param container {element} (Or object that contains offsetHeight and scrollTop)
 * represents the container element
 * @param itemHeight {number} is the size in pixels of the item element
 * @param totalBufferMargin {number} is the total buffer for the edges (top and bottom)
 */
function getBoxBuffer(items, container, itemHeight, totalBufferMargin) {
    const totalItems = items.length;
    const containerHeight = container.offsetHeight;
    const totalElementInViewport = containerHeight / itemHeight;
    const scrollTop = container.scrollTop;
    const offTopView = Math.floor(scrollTop / itemHeight);
    let start = 0;
    let end = 0;
    let totalSlicesElements = Math.ceil(totalElementInViewport + totalBufferMargin);
    if (offTopView > totalBufferMargin) {
        start = offTopView - totalBufferMargin;
    }
    const diffOffBottomView = totalItems - start - totalSlicesElements;
    if (diffOffBottomView > 0) {
        totalSlicesElements += (diffOffBottomView > totalBufferMargin)
            ? totalBufferMargin
            : diffOffBottomView;
    }
    end = start + totalSlicesElements;
    return {
        start,
        end
    };
}

export { getBoxBuffer };

export default {
    getBoxBuffer
};

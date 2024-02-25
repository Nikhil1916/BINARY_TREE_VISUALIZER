export class Node {
    lc = null
    rc = null
    value = null;
    constructor(value) {
        this.value = value;
        this.lc = this.rc = null;
    }

    setLeftChild(node) {
        this.lc = node;
    }

    setRightChild(node) {
        this.rc = node;
    }

    getHeight() {
        const leftHeight = this.lc?.getHeight() || 0;
        const rightHeight = this.lc?.getHeight() || 0;
        return Math.max(leftHeight , rightHeight) + 1;
    }
}

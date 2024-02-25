import { Node } from "./binaryTreeNode.js";
import { getRequiredHeightAndWidth } from "./treeUtils.js";

const canvas = document.querySelector("canvas");

function drawBinaryTree(root, canvasElement) {

    const maxHeight = window.innerHeight;
    const maxWidth = window.innerWidth;

    // initialize canvas dimesions
    canvasElement.width = maxWidth;
    canvasElement.height = maxHeight;


    // calculate require width and height to draw tree structure jo box hei jisme humara tree hoga
    const { reqCanvasHeight, reqCanvasWidth } = getRequiredHeightAndWidth(root);

    // as we want to place the tree at window center so finding starting and ending point in x-axis
    const windowCenter = maxHeight / 2;
    const requiredWidthCenter = reqCanvasWidth / 2;

    const xStart = windowCenter - requiredWidthCenter;
    const xEnd = windowCenter + requiredWidthCenter;

    const horizontalConfig = {
        xStart, 
        xEnd
    };

}

const root = new Node(10);

const node2 = new Node(2);

const node3 = new Node(3);

root.setLeftChild(node2);

root.setRightChild(node3);

console.log(root);

drawBinaryTree(root , canvas);
import { Node } from "./binaryTreeNode.js";

export const DEFAULT_CONFIG = {
    radius: 20,
    nodeWidthSpacing: 50, // width and height are bigger then node ek box mei node hei suppose kro
    nodeHeightSpacing: 100, // line height or Y-axis height
    fontSize: 10
}



export function getRequiredHeightAndWidth(root) {
    const treeHeight = root.getHeight();
    // console.log(treeHeight);
    // to get canvas height we will use tree Hieght which will be Node line height * height of tree
    const reqCanvasHeight = treeHeight * DEFAULT_CONFIG['nodeHeightSpacing'];

    // to get width of canvas we will use no of leaf nodes that is 2 ki power height then multiply by node width
    const noOfLeafNodes = Math.pow(2, treeHeight);
    const reqCanvasWidth = noOfLeafNodes * DEFAULT_CONFIG['nodeWidthSpacing'];

    return {
        reqCanvasHeight,
        reqCanvasWidth
    }
}

export function drawNode(value, canvasElement, x, y) {
    const context = canvasElement.getContext("2d"); // tool to draw

    // draw circle
    context.beginPath();
    context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI);
    context.fillStyle = 'lightsalmon';
    context.fill();


    // /draw circle border
    context.beginPath();
    context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI);
    context.strokeStyle = 'brown';
    context.stroke();

    // fill value
    context.font = `${DEFAULT_CONFIG?.fontSize}pt serif`;
    context.fillStyle = 'brown';
    context.textAlign = 'center';
    context.fillText(value, x, y + DEFAULT_CONFIG?.fontSize / 2);

}

export function connectEdges(canvasElement, xCoordinates, yCoordinates) {
    const { xStart, xEnd } = xCoordinates;
    const { yStart, yEnd } = yCoordinates;

    // draw curve
    const start = {
        x: xStart,
        y: yStart
    }

    const xHalf = (xStart + xEnd) / 2;
    const yHalf = (yStart + yEnd) / 2;
    const cpoint1 = {
        x: xHalf,
        y: yHalf
    }

    const cpoint2 = {
        x: xEnd,
        y: yHalf
    }

    const end = {
        x: xEnd,
        y: yEnd
    }
    const context = canvasElement.getContext("2d"); // tool to draw
    context.beginPath();
    context.strokeStyle = 'brown';
    context.moveTo(start.x, start.y);
    context.bezierCurveTo(cpoint1.x, cpoint1.y, cpoint2.x, cpoint2.y, end.x, end.y);
    // context.lineTo(end.x, end.y);
    context.stroke();
}

export function treeConstructor(input) {
    input = parseInput(input);

    const queue = [];

    let idx = 0;
    const root = new Node(input[idx]);
    idx++;

    queue.push(root);

    while (queue.length > 0 && idx < input.length) {
        const node = queue.shift();

        // Left child
        if (idx < input.length) {
            if (input[idx] !== null) {
                const leftNode = new Node(input[idx]);
                node.setLeftChild(leftNode);
                queue.push(leftNode);
            }
            idx++;
        }

        // Right child
        if (idx < input.length) {
            if (input[idx] !== null) {
                const rightNode = new Node(input[idx]);
                node.setRightChild(rightNode);
                queue.push(rightNode);
            }
            idx++;
        }
    }

    return root;
}

function parseInput(input) {
    let parsedInput = '';
    for (let i = 0; i < input.length; i++) {
        let ch = input.charAt(i);
        if (ch != '') parsedInput += ch;
    }
    return parsedInput.split(",")?.map(el => {
        if (el == 'null') return null;
        else return el;
    })?.filter(el => el != '');
}

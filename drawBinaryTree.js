import { Node } from "./binaryTreeNode.js";
import { getRequiredHeightAndWidth , DEFAULT_CONFIG , drawNode , connectEdges } from "./treeUtils.js";

const canvas = document.querySelector("canvas");

function drawBinaryTree(root, canvasElement) {

    const maxHeight = window.innerHeight;
    const maxWidth = window.innerWidth;

    // initialize canvas dimesions
    console.log(maxHeight , maxWidth);
    canvasElement.width = maxWidth;
    canvasElement.height = maxHeight;


    // calculate require width and height to draw tree structure jo box hei jisme humara tree hoga
    const { reqCanvasHeight, reqCanvasWidth } = getRequiredHeightAndWidth(root);

    // console.log(reqCanvasHeight , reqCanvasWidth);

    // as we want to place the tree at window center so finding starting and ending point in x-axis
    const windowCenter = maxWidth / 2;
    const requiredWidthCenter = reqCanvasWidth / 2;

    const xStart = windowCenter - requiredWidthCenter;
    const xEnd = windowCenter + requiredWidthCenter;

    const horizontalConfig = {
        xStart, 
        xEnd
    };

    recursivelyDrawNodes(root, canvasElement , 0.5 , horizontalConfig);
}


function recursivelyDrawNodes(root , canvasElement, currentLevel , horizontalConfig) {
    const {xStart , xEnd} =  horizontalConfig;

    const xPos = (xStart + xEnd)/2;
    const yPos = currentLevel * DEFAULT_CONFIG.nodeHeightSpacing;

    drawNode(root.value , canvasElement, xPos , yPos);
    if(root.lc!==null) {
        const leftNodeHorizontalConfig = {
            xStart,
            xEnd: xPos
        }

        recursivelyDrawNodes(root.lc , canvasElement, currentLevel+1 , leftNodeHorizontalConfig);
        //connect edges
        connectEdges(
          canvasElement,
          {
            xStart: xPos,
            xEnd: (xStart + xPos) / 2,
          },
          {
            yStart: yPos + DEFAULT_CONFIG.radius,
            yEnd:
              ((currentLevel +
              1) * DEFAULT_CONFIG.nodeHeightSpacing) -
              DEFAULT_CONFIG.radius,
          }
        );
    }

    if(root.rc!==null) {
        const rightNodeHorizontalConfig = {
            xStart: xPos,
            xEnd
        }
        recursivelyDrawNodes(root.rc , canvasElement, currentLevel+1 , rightNodeHorizontalConfig);
        // /connect edges
        connectEdges(
            canvasElement,
            {
              xStart: xPos,
              xEnd: (xPos + xEnd) / 2,
            },
            {
              yStart: yPos + DEFAULT_CONFIG.radius,
              yEnd:
               ( (currentLevel +
                1 )* DEFAULT_CONFIG.nodeHeightSpacing) -
                DEFAULT_CONFIG.radius,
            }
          );
    }
}

const root = new Node(10);

const node2 = new Node(2);

const node3 = new Node(3);

root.setLeftChild(node2);

root.setRightChild(node3);

node2.setLeftChild(new Node(10));
node3.setLeftChild(new Node(10));
// node2.setLeftChild(new Node(10));

console.log(root);

drawBinaryTree(root , canvas);
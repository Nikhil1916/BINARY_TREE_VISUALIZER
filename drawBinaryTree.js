import { Node } from "./binaryTreeNode.js";
import { getRequiredHeightAndWidth , DEFAULT_CONFIG , drawNode , connectEdges , treeConstructor } from "./treeUtils.js";

const canvas = document.querySelector("canvas");
const applyBtn = document.querySelector(".applyBtn");
const clearBtn = document.querySelector(".clearBtn");
const textArea = document.querySelector("textarea")

function drawBinaryTree(root, canvasElement) {

    const maxHeight = window.innerHeight;
    const maxWidth = window.innerWidth;

    // initialize canvas dimesions
    // console.log(maxHeight , maxWidth);
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

function init(value) {
  const root = treeConstructor(value);
  drawBinaryTree(root , canvas);
}

applyBtn.addEventListener("click", ()=> {
  if(textArea.value) {
    init(textArea.value)
  }
});

function clearCanvas() {
  const context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}
window.addEventListener("resize",()=>{
  clearCanvas();
  if(textArea.value) {
    init(textArea.value)
  }
})

clearBtn.addEventListener("click",()=>{
  clearCanvas();
  textArea.value = '';
})
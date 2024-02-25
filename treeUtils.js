export const DEFAULT_CONFIG = {
    radius: 20,
    nodeWidthSpacing: 25, // width widht and height are bigger then node ek box mei node hei suppose kro
    nodeHeightSpacing: 90, // line height or Y-axis height
    fontSize: 10
}



export function getRequiredHeightAndWidth(root) {
    const treeHeight = root.getHeight();
    // to get canvas height we will use tree Hieght which will be Node line height * height of tree
    const reqCanvasHeight = treeHeight * DEFAULT_CONFIG['nodeHeightSpacing'];

    // to get width of canvas we will use no of leaf nodes that is 2 ki power height then multiply by node width
    const noOfLeafNodes = Math.pow(2 , treeHeight);
    const reqCanvasWidth = noOfLeafNodes * DEFAULT_CONFIG['nodeWidthSpacing'];

    return {
        reqCanvasHeight,
        reqCanvasWidth
    }
}
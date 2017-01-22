import java.util.Stack;

public class NodeBounds {

    BinaryTreeNode node;
    int lowerBound;
    int upperBound;

    public NodeBounds(BinaryTreeNode node, int lowerBound, int upperBound) {
        this.node = node;
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }
}

public boolean bstChecker(BinaryTreeNode root) {

    // start at the root, with an arbitrarily low lower bound
    // and an arbitrarily high upper bound
    Stack<NodeBounds> nodeAndBoundsStack = new Stack<NodeBounds>();
    nodeAndBoundsStack.push(new NodeBounds(root, Integer.MIN_VALUE, Integer.MAX_VALUE));

    // depth-first traversal
    while (!nodeAndBoundsStack.empty()) {
        NodeBounds nb = nodeAndBoundsStack.pop();
        BinaryTreeNode node = nb.node;
        int lowerBound = nb.lowerBound;
        int upperBound = nb.upperBound;

        // if this node is invalid, we return false right away
        if ((node.value < lowerBound) || (node.value > upperBound)) {
            return false;
        }

        if (node.left != null) {
            // this node must be less than the current node
            nodeAndBoundsStack.push(new NodeBounds(node.left, lowerBound, node.value));
        }
        if (node.right != null) {
            // this node must be greater than the current node
            nodeAndBoundsStack.push(new NodeBounds(node.right, node.value, upperBound));
        }
    }

    // if none of the nodes were invalid, return true
    // (at this point we have checked all nodes)
    return true;
}

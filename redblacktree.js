class Node {
    constructor(data, color) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.color = color; // 0 for red, 1 for black
    }
}

class RedBlackTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        let newNode = new Node(data, 0); // Red by default
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
        // Fix the tree
        this.fixViolation(newNode);
    }

    // Utility function to do level order traversal
    // This function is mainly used to display the tree
    levelOrderTraversal(node) {
        if (node === null) return;
        let result = [];
        let queue = [];
        queue.push(node);

        while (queue.length > 0) {
            let tempNode = queue.shift();
            result.push(tempNode.data);
            if (tempNode.left !== null) queue.push(tempNode.left);
            if (tempNode.right !== null) queue.push(tempNode.right);
        }
        return result;
    }

    // Function to fix violations after standard BST insert
    fixViolation(node) {
        let parent = null;
        let grandparent = null;

        while (node !== this.root && node.color === 0 && node.parent.color === 0) {
            parent = node.parent;
            grandparent = parent.parent;

            // Case A: Parent of the current node is left child of grandparent
            if (parent === grandparent.left) {
                let uncle = grandparent.right;

                // Case 1: Uncle is also red. Only recoloring required
                if (uncle !== null && uncle.color === 0) {
                    grandparent.color = 0;
                    parent.color = 1;
                    uncle.color = 1;
                    node = grandparent;
                } else {
                    // Case 2: Node is right child of its parent. Left rotation required
                    if (node === parent.right) {
                        this.rotateLeft(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    // Case 3: Node is left child of its parent. Right rotation required
                    this.rotateRight(grandparent);
                    let tempColor = parent.color;
                    parent.color = grandparent.color;
                    grandparent.color = tempColor;
                    node = parent;
                }
            }
            // Case B: Parent of the current node is right child of grandparent
            else {
                let uncle = grandparent.left;

                // Case 1: Uncle is also red. Only recoloring required
                if (uncle !== null && uncle.color === 0) {
                    grandparent.color = 0;
                    parent.color = 1;
                    uncle.color = 1;
                    node = grandparent;
                } else {
                    // Case 2: Node is left child of its parent. Right rotation required
                    if (node === parent.left) {
                        this.rotateRight(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    // Case 3: Node is right child of its parent. Left rotation required
                    this.rotateLeft(grandparent);
                    let tempColor = parent.color;
                    parent.color = grandparent.color;
                    grandparent.color = tempColor;
                    node = parent;
                }
            }
        }
        this.root.color = 1; // Ensure root is always black
    }

    // Rotate left at node x
    rotateLeft(x) {
        let y = x.right;
        x.right = y.left;
        if (y.left !== null) {
            y.left.parent = x;
        }
        y.parent = x.parent;
        if (x.parent === null) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        y.left = x;
        x.parent = y;
    }

    // Rotate right at node x
    rotateRight(x) {
        let y = x.left;
        x.left = y.right;
        if (y.right !== null) {
            y.right.parent = x;
        }
        y.parent = x.parent;
        if (x.parent === null) {
            this.root = y;
        } else if (x === x.parent.right) {
            x.parent.right = y;
        } else {
            x.parent.left = y;
        }
        y.right = x;
        x.parent = y;
    }

    // Helper method to insert a node into the tree
    insertNode(root, node) {
        if (node.data < root.data) {
            if (root.left === null) {
                root.left = node;
                node.parent = root;
            } else {
                this.insertNode(root.left, node);
            }
        } else {
            if (root.right === null) {
                root.right = node;
                node.parent = root;
            } else {
                this.insertNode(root.right, node);
            }
        }
    }

    // Utility function to display the Red-Black Tree
    display() {
        console.log(this.levelOrderTraversal(this.root));
    }
}

// Example usage:
let rbTree = new RedBlackTree();
rbTree.insert(7);
rbTree.insert(3);
rbTree.insert(18);
rbTree.insert(10);
rbTree.insert(22);
rbTree.insert(8);
rbTree.insert(11);

rbTree.display();

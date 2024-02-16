class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// level order bft
function bft(root) {
    const q = [];
    const visited = [];

    if (root == null) {
        return;
    }

    q.push(root);
    while (q.length > 0) {
        const current = q.shift();
        visited.push(current.data);
        if (current.left !== null) {
            q.push(current.left);
        }
        if (current.right !== null) {
            q.push(current.right);
        }
    }
    return visited;
}

// level order dft
function dft(root) {
    const s = [];
    const visited = [];

    if (root == null) {
        return;
    }

    s.push(root);
    while (s.length > 0) {
        const current = s.pop();
        visited.push(current.data);
        if (current.left !== null) {
            s.push(current.left);
        }
        if (current.right !== null) {
            s.push(current.right);
        }
    }
    return visited;
}

function preorder_rdft(root) {
    const visited = [];
    function traverse(node) {
        if (node === null) {
            return;
        }
        visited.push(node.data);
        if (node.left !== null) {
            traverse(node.left);
        }
        if (node.right !== null) {
            traverse(node.right);
        }
    }
    traverse(root);
    return visited;
}

function inorder_rdft(root) {
    const visited = [];
    function traverse(node) {
        if (node === null) {
            return;
        }
        if (node.left !== null) {
            traverse(node.left);
        }
        visited.push(node.data);
        if (node.right !== null) {
            traverse(node.right);
        }
    }
    traverse(root);
    return visited;
}

function postorder_rdft(root) {
    const visited = [];
    function traverse(node) {
        if (node === null) {
            return;
        }
        if (node.left !== null) {
            traverse(node.left);
        }
        if (node.right !== null) {
            traverse(node.right);
        }
        visited.push(node.data);
    }
    traverse(root);
    return visited;
}



const root = new Node(9);
root.left = new Node(7);
root.right = new Node(12);
root.left.left = new Node(5);
root.left.right = new Node(8);

let path = bft(root);
console.log("BFT:", path);

path = dft(root);
console.log("Level Order DFT:", path);

path = preorder_rdft(root);
console.log("Preorder DFT:", path);

path = inorder_rdft(root);
console.log("Inorder DFT:", path);

path = postorder_rdft(root);
console.log("Postorder DFT:", path);


function fib(n, memo = {}) {
    if (n in memo) {
        return memo[n];
    }
    if (n < 2) {
        return n;
    }
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

function ifib(n) {
    if (n < 2) {
        return n;
    }

    let prev1 = 0;
    let prev2 = 1;
    let current = 0;
    const fibs = [0, 1];

    for (let i = 2; i <= n; i++) {
        fibs.push(fibs[i - 1] + fibs [i - 2])
    }

    return fibs[fibs.length - 1];
}


[0, 1, 1, 2]
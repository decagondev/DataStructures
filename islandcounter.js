class Graph {
    constructor(rows, cols, grid) {
        this.rows = rows;
        this.cols = cols;
        this.grid = grid;
        this.visited = [];
        for (let i = 0; i < rows; i++) {
            this.visited.push(new Array(cols).fill(false));
        }
    }

    // Check if a cell is valid and not visited
    isValidCell(row, col) {
        return (
            row >= 0 &&
            row < this.rows &&
            col >= 0 &&
            col < this.cols &&
            this.grid[row][col] === 1 &&
            !this.visited[row][col]
        );
    }

    // Depth First Search traversal
    dfs(row, col) {
        // Arrays to represent the 4 possible movements: up, down, left, right
        const rowMove = [-1, 1, 0, 0];
        const colMove = [0, 0, -1, 1];

        // Mark current cell as visited
        this.visited[row][col] = true;

        // Traverse all adjacent cells
        for (let i = 0; i < 4; i++) {
            const newRow = row + rowMove[i];
            const newCol = col + colMove[i];
            if (this.isValidCell(newRow, newCol)) {
                this.dfs(newRow, newCol);
            }
        }
    }

    // Count number of islands
    countIslands() {
        let count = 0;
        // Traverse all cells of the grid
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                // If a cell is not visited and is part of an island
                if (!this.visited[i][j] && this.grid[i][j] === 1) {
                    // Increment count and perform DFS traversal from this cell
                    count++;
                    this.dfs(i, j);
                }
            }
        }
        return count;
    }
}

// Example usage:
const grid = [
    [1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1]
];

const rows = grid.length;
const cols = grid[0].length;

const graph = new Graph(rows, cols, grid);
const islandCount = graph.countIslands();
console.log("Number of islands:", islandCount);

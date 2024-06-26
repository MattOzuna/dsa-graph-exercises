class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach((node) => {
      this.nodes.add(node);
    });
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of vertex.adjacent) {
      this.removeEdge(node, vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let stack = [start];
    let seen = new Set(stack);
    let answer = []

    while (stack.length) {
      let currNode = stack.pop();
      answer.push(currNode.value)

      for (let node of currNode.adjacent) {
        if (!seen.has(node)) {
          seen.add(node);
          stack.push(node);
        }
      }
    }

    return answer;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start];
    let seen = new Set(queue);
    let answer = []

    while (queue.length) {
      let currNode = queue.shift();
      answer.push(currNode.value)

      for (let node of currNode.adjacent) {
        if (!seen.has(node)) {
          seen.add(node);
          queue.push(node);
        }
      }
    }

    return answer;
  }

  shortestPath(source, target){
    let queue = [source];
    let seen = new Set(queue);
    let parent = {};
    let answer = []

    while (queue.length) {
      let currNode = queue.shift();

      if (currNode === target) {
        let node = currNode;
        while (node !== source) {
          answer.push(node.value);
          node = parent[node.value];
        }
        answer.push(source.value);
        return answer.reverse();
      }

      for (let node of currNode.adjacent) {
        if (!seen.has(node)) {
          seen.add(node);
          parent[node.value] = currNode;
          queue.push(node);
        }
      }
    }

    return answer;
    
  }
}

module.exports = { Graph, Node };

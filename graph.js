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
    for(let vertex of vertexArray){
      this.nodes.add(vertex)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let adjV of vertex.adjacent){
      adjV.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start]
    let seen = new Set(toVisitStack);
    let vals = [start.value]

    while (toVisitStack.length > 0) {
      let currNode = toVisitStack.pop();

      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor)
          vals.push(neighbor.value)
        }
      }
    }
    console.log(vals)
    return vals;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    let vals = [start.value];

    while (toVisitQueue.length > 0) {
      let currNode = toVisitQueue.shift();

      for (let neighbor of currNode.adjacent) {
        if(!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
          vals.push(neighbor.value);
        }
      }
    }

    return vals
  }

  //given a starting and ending node find the shortest path between them
  shortestPath(start, end) {
    if (start === end) return [start.value];

    const queue = [start];
    let visited = new Set();
    let predecessors = {};
    let path = [];

    while (queue.length){
      let currentVertex = queue.shift();

      //if the end has been reached, add all stops to the path, and flip the path around
      if(currentVertex === end) {
        let stop = predecessors[end.value];
        while(stop){
          path.push(stop);
          stop = predecessors[stop];
        }
        path.unshift(end.value);
        path.reverse();
        return path
      }

      visited.add(currentVertex);
      //iterate through vertex's adjacent to the current vertex adding vertexs that haven't been visited to the queue
      for(let vertex of currentVertex.adjacent) {
        if (!visited.has(vertex)) {
          predecessors[vertex.value] = currentVertex.value;
          queue.push(vertex);
        }
      }
    }
  }

}

module.exports = {Graph, Node}
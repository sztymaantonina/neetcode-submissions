class Solution {
    /**
     * @param {number} n
     * @param {number[][]} trust
     * @return {number}
     */
    findJudge(n: number, trust: number[][]): number {
        // create directed graph
        // will have 1 > 3, 4> 3, 2> 3 and 3> nothing 
        // need unique key which value is null
        // for the other keys check if that key is a value 
        // otherwise return -1
 const constructDirectedGraph = (
    dependencies: number[][],
  ): Map<number, number[]> => {
        const graph = new Map<number, number[]>();

    for (const [from, to] of dependencies) {
      if (!graph.has(from)) graph.set(from, []);
      if (!graph.has(to)) graph.set(to, []);

      graph.get(from)!.push(to);
    }

    return graph;
  };

  const graph = constructDirectedGraph(trust);

  if (graph.size !== n) {
    return -1
  }
  
  for (const key of graph.keys()) {
    if (graph.get(key)!.length === 0) {
      const set = new Set<number>();
      for (const inner of graph.keys()) {
        set.add(inner);
      }
      set.delete(key);

      for (const rest of set) {
        if (!graph.get(rest)!.includes(key)) return -1;
      }

      return key;
    }
  }

  return -1;
}
}

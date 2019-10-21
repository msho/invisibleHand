package world

import "math"

type dijk struct {
	mapNodes []*Node
	node1    *Node
	node2    *Node

	dist      map[*Node]int
	prev      map[*Node]*Node
	unvisited []*Node
}

func (d *dijk) init() {
	sizeWorld := len(d.mapNodes)

	d.dist = make(map[*Node]int, sizeWorld)
	d.prev = make(map[*Node]*Node, 4)
	d.unvisited = make([]*Node, sizeWorld)

	for _, node := range d.mapNodes {
		d.dist[node] = math.MaxInt32
		d.prev[node] = nil
	}
	d.unvisited = d.mapNodes
	d.dist[d.node1] = 0
}

func (d *dijk) findPath() []*Node {
	for i := 0; i < len(d.unvisited); i++ {
		var u *Node
		for j := i; j < len(d.unvisited); j++ {
			possibleU := d.unvisited[j]
			if u == nil || (d.dist[possibleU] < d.dist[u]) {
				u = possibleU
			}
		}

		//If target position was found, we can stop
		if u != nil && u == d.node2 {
			break
		}

		for _, neighbor := range u.GetNeighbors().Get() {
			alt := d.dist[u] + 1 //todo: add path cost here
			if alt < d.dist[neighbor] {
				d.dist[neighbor] = alt
				d.prev[neighbor] = u
			}
		}
	} // while unvisted len > 0

	foundPath := make([]*Node, 1, 5)
	foundPath[0] = d.node2
	curr := d.prev[d.node2]
	for curr != nil {
		foundPath = prependNode(foundPath, curr)

		curr = d.prev[curr]

	}

	return foundPath

}

func prependNode(path []*Node, node *Node) []*Node {
	path = append(path, nil)
	copy(path[1:], path)
	path[0] = node
	return path
}

func MakeDijk(mapNodes []*Node, node1 *Node, node2 *Node) dijk {
	path := dijk{
		mapNodes: mapNodes,
		node1:    node1,
		node2:    node2,
	}

	path.init()

	return path
}

func findPath(mapNodes []*Node, node1 *Node, node2 *Node) []*Node {
	d := MakeDijk(mapNodes, node1, node2)
	return d.findPath()

}

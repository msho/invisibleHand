package path

import (
	"math"

	"invisiblehand/models/world"
)

type dijk struct {
	mapNodes world.NodesList
	node1    *world.Node
	node2    *world.Node

	dist      map[*world.Node]int
	prev      map[*world.Node]*world.Node
	unvisited world.NodesList
}

func (d *dijk) init() {
	sizeWorld := len(d.mapNodes)

	d.dist = make(map[*world.Node]int, sizeWorld)
	d.prev = make(map[*world.Node]*world.Node, 4)
	d.unvisited = make(world.NodesList, sizeWorld)

	for _, node := range d.mapNodes {
		d.dist[node] = math.MaxInt32
		d.prev[node] = nil
	}
	d.unvisited = d.mapNodes
	d.dist[d.node1] = 0
}

func (d *dijk) findPath() world.NodesList {
	for len(d.unvisited) > 0 {
		var u *world.Node
		uIndex := 0
		for puIndex, possibleU := range d.unvisited {
			if u == nil || (d.dist[possibleU] < d.dist[u]) {
				u = possibleU
				uIndex = puIndex
				break
			}
		}

		//If target position was found, we can stop
		if u == d.node2 {
			break
		}

		for _, neighbor := range u.GetNeighborsNodes() {
			alt := d.dist[u] + 1 //todo: add path cost here
			if alt < d.dist[neighbor] {
				d.dist[neighbor] = alt
				d.prev[neighbor] = u
			}
		}

		if u != nil {
			d.unvisited = d.unvisited.RemoveIndexUnsorted(uIndex)
		}

	} // while unvisted len > 0

	return d.getFoundPath()

}

func (d *dijk) getFoundPath() world.NodesList {
	foundPath := make(world.NodesList, 1, 5)
	foundPath[0] = d.node2
	curr := d.prev[d.node2]
	for curr != nil {
		foundPath = prependNode(foundPath, curr)

		curr = d.prev[curr]

	}

	return foundPath
}

func prependNode(path world.NodesList, node *world.Node) world.NodesList {
	path = append(path, nil)
	copy(path[1:], path)
	path[0] = node
	return path
}

func makeDijk(mapNodes world.NodesList, node1 *world.Node, node2 *world.Node) dijk {
	path := dijk{
		mapNodes: mapNodes,
		node1:    node1,
		node2:    node2,
	}

	path.init()

	return path
}

// FindPathD fgiven from and destination nodes find closest path
func FindPathD(mapNodes world.NodesList, node1 *world.Node, node2 *world.Node) world.NodesList {
	d := makeDijk(mapNodes, node1, node2)
	return d.findPath()
}

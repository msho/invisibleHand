package path

import (
	"invisiblehand/models/world"
)

// Greedy algorythm to find the shortest path
type Greedy struct {
	node1, node2, currNode *world.Node
	path                   world.NodesList
	gameMap                world.Map
}

func (g *Greedy) init(gameMap world.Map, node1 *world.Node, node2 *world.Node) {
	g.node1, g.node2, g.gameMap = node1, node2, gameMap
	g.path = make(world.NodesList, 0, 5)
	g.currNode = g.node1

}

type funcDirection func() *world.Node

// FindPath find shortest path from node1 to node2
func (g *Greedy) FindPath(gameMap world.Map, node1 *world.Node, node2 *world.Node) world.NodesList {
	g.init(gameMap, node1, node2)

	currPos := g.currNode.GetPos()
	for currPos.X > g.node2.GetPos().X {
		// up
		currPos = g.moveStep(func() *world.Node { return g.gameMap.GetNode(currPos.X-1, currPos.Y) })
	}

	for currPos.Y > g.node2.GetPos().Y {
		// left
		currPos = g.moveStep(func() *world.Node { return g.gameMap.GetNode(currPos.X, currPos.Y-1) })
	}

	for currPos.X < g.node2.GetPos().X {
		// down
		currPos = g.moveStep(func() *world.Node { return g.gameMap.GetNode(currPos.X+1, currPos.Y) })
	}

	for currPos.Y < g.node2.GetPos().Y {
		// right
		currPos = g.moveStep(func() *world.Node { return g.gameMap.GetNode(currPos.X, currPos.Y+1) })
	}

	g.path = append(g.path, g.currNode)

	return g.path
}

func (g *Greedy) moveStep(dir funcDirection) world.NodePos {
	g.path = append(g.path, g.currNode)
	g.currNode = dir()
	if g.currNode == nil {
		panic("could not find path")
	}
	return g.currNode.GetPos()
}

// FindPathGreedy find the shortest path by index
func FindPathGreedy(gameMap world.Map, node1 *world.Node, node2 *world.Node) world.NodesList {
	greedy := Greedy{}

	return greedy.FindPath(gameMap, node1, node2)
}

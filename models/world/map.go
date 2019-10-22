package world

import (
	"fmt"
)

// Map is an array of nodes where the game takes place
type Map struct {
	arrNodes             NodesList
	rowsCount, colsCount int
}

// MakeMap create the game map
func MakeMap(numOfRows int, numOfCols int) Map {
	// create the map nodes
	arrNodes := createNodes(numOfRows, numOfCols)

	gameMap := Map{
		arrNodes:  arrNodes,
		rowsCount: numOfRows,
		colsCount: numOfCols,
	}

	// add neighbors
	gameMap.initNeighbors()

	// create a map with those nodes and return it
	return gameMap
}

// GetNode get the node from the map at prosition x,y
func (m *Map) getNode(pos NodePos) *Node {
	nodePos := m.rowsCount*pos.X + pos.Y
	if len(m.arrNodes) <= nodePos || nodePos < 0 {
		fmt.Println(fmt.Errorf("node not found"))
		return nil
	}

	return m.arrNodes[nodePos]
}

// GetNode get the node from the map at prosition x,y
func (m *Map) GetNode(x int, y int) *Node {
	return m.getNode(NodePos{x, y})
}

// GetAllNodes return all map nodes
func (m *Map) GetAllNodes() NodesList {
	return m.arrNodes
}

func (m *Map) initNeighbors() {
	for _, node := range m.arrNodes {
		x, y := node.pos.X, node.pos.Y
		prevCol, prevRow := x-1, y-1
		nextCol, nextRow := x+1, y+1

		// for node <x,y>. Check if <x-1, y> is a column neighbor.
		m.handleNeighbor(node, NodePos{prevCol, y}, prevCol, false)

		// for node <x,y>. Check if <x, y-1> is a row neighbor.
		m.handleNeighbor(node, NodePos{x, prevRow}, prevRow, true)

		// for node <x,y>. Check if <x+1, y> is a column neighbor.
		m.handleNeighbor(node, NodePos{nextCol, y}, nextCol, false)

		// for node <x,y>. Check if <x, y+1> is a row neighbor.
		m.handleNeighbor(node, NodePos{x, nextRow}, nextRow, true)

	}
}

// handleNeighbor decide if @neighbor is realy a neighbor to @node and add it to the node if so
func (m *Map) handleNeighbor(node *Node, neighbor NodePos, numToCheck int, isRow bool) {

	if numToCheck >= 0 && (isRow && numToCheck < m.rowsCount) {
		// check if bigger then 0, and smaller then rowsCount (if row)
		node.neighbors.Add(m.getNode(neighbor))

	} else if numToCheck >= 0 && (!isRow && numToCheck < m.colsCount) {
		// check if bigger then 0, and smaller then colsCount (if col)
		node.neighbors.Add(m.getNode(neighbor))
	}
}

func createNodes(numOfRows int, numOfCols int) NodesList {
	arrNodes := make(NodesList, numOfCols*numOfRows)

	counter := 0
	for i := 0; i < numOfRows; i++ {
		for j := 0; j < numOfCols; j++ {
			arrNodes[counter] = NewNode(NodePos{i, j})
			counter++
		}
	}

	return arrNodes
}

package world

// Map is an array of nodes where the game takes place
type Map struct {
	arrNodes             []Node
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

func (m *Map) initNeighbors() {
	for _, node := range m.arrNodes {
		x, y := node.pos.x, node.pos.y
		prevCol, prevRow := x-1, y-1
		nextCol, nextRow := x+1, y+1

		m.handleNeighbor(node, NodePos{prevCol, y}, prevCol, false)
		m.handleNeighbor(node, NodePos{x, prevRow}, prevRow, true)

		m.handleNeighbor(node, NodePos{nextCol, y}, prevCol, false)
		m.handleNeighbor(node, NodePos{x, nextRow}, prevRow, true)

	}
}

// handleNeighbor deside if @neighbor is realy a neighbor to @node and add it to the node if so
func (m *Map) handleNeighbor(node Node, neighbor NodePos, numToCheck int, isRow bool) {

	if numToCheck >= 0 && (isRow && numToCheck < m.rowsCount) {
		// check if bigger then 0, and smaller then rowsCount (if row)
		node.neighbors = append(node.neighbors, neighbor)

	} else if numToCheck >= 0 && (!isRow && numToCheck < m.colsCount) {
		// check if bigger then 0, and smaller then colsCount (if col)
		node.neighbors = append(node.neighbors, neighbor)
	}
}

func createNodes(numOfRows int, numOfCols int) []Node {
	arrNodes := make([]Node, numOfCols*numOfRows)

	counter := 0
	for i := 0; i < numOfRows; i++ {
		for j := 0; j < numOfCols; j++ {
			arrNodes[counter] = MakeNode(NodePos{i, j})
		}
	}

	return arrNodes
}

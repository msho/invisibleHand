package world

// NodePos has an x,y position
type NodePos struct {
	x int
	y int
}

// Node reprecent a one pixel in a map
type Node struct {
	pos       NodePos
	neighbors []NodePos
}

// NewNode Create new node in a given position and return its pointer
func NewNode(pos NodePos) *Node {
	return &Node{pos, make([]NodePos, 0, 4)}
}

// MakeNode Creates a node in a given position and return int
func MakeNode(pos NodePos) Node {
	return Node{pos, make([]NodePos, 0, 4)}
}

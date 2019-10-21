package world

import "fmt"

// NodePos has an x,y position
type NodePos struct {
	X int
	Y int
}

// Neighbors are the close tiles of a node
type Neighbors struct {
	neighbors [4]*Node
	count     int
}

// Add another node to neighbors
func (n *Neighbors) Add(node *Node) {

	if n.count >= 4 {
		fmt.Println(fmt.Errorf("too many neighbors to node"))
		return
	}

	n.neighbors[n.count] = node

	n.count = n.count + 1
}

// Get all the neighbors
func (n *Neighbors) Get() []*Node {
	allNeighbors := n.neighbors[:n.count]

	return allNeighbors
}

// Size the number of neighbors
func (n *Neighbors) Size() int {
	return n.count
}

func (n *Neighbors) String() string {
	var str string
	for i, node := range n.Get() {
		str += fmt.Sprintf("[%d, %d]", node.pos.X, node.pos.Y)

		if i < n.count-1 {
			str += ", "
		}
	}
	return str
}

// Node reprecent a one pixel in a map
type Node struct {
	pos       NodePos
	neighbors Neighbors
}

// GetPos get the position of the node
func (n Node) GetPos() NodePos {
	return n.pos
}

// GetNeighbors get the neighbors of the node
func (n Node) GetNeighbors() *Neighbors {
	return &n.neighbors
}

func (n Node) String() string {
	return fmt.Sprintf("pos: %v, neighbors: %s ", n.pos, n.neighbors.String())
}

// NewNode Create new node in a given position and return its pointer
func NewNode(pos NodePos) *Node {
	return &Node{pos: pos}
}

// MakeNode Creates a node in a given position and return int
func MakeNode(pos NodePos) Node {
	return Node{pos: pos}
}

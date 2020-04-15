class NpcHandler {

    constructor(domElem, objNpc) {
        this.domElem = domElem;
        this.cities =  objNpc.cities.map(city=>new City(city));
        this.villages = objNpc.villages.map(village=>new Village(village));

        this.addNpcs(objNpc);
    } // constructor

    addNpcs() {
        for (let i = 0; i< this.cities.length; i++) {
            this.cities[i].draw(i);
        }
        for (let i = 0; i< this.villages.length; i++) {
            this.villages[i].draw(i);
        }
    } // paintNpcs
}

class Npc {
    constructor(npc) {
        this.arrNodes = npc.nodes;
        this.id = npc.id;
        this.name = npc.name;
    }

    draw(strColor) {
        this.drawNodes(strColor);
        this.drawSign();
    } // draw

    drawNodes(strColor) {
        for (const objNode of this.arrNodes) {
            const domCell = Grid.getDomCell(objNode);
            domCell.style.backgroundColor = strColor;
            
            const type = this instanceof City? 'city' : 'village';
            GridData.AddData(domCell, type, this.name)
        }
    } // drawNodes

    drawSign() {
       let middleNode = this.findMiddleNode();
       this.writeSign(middleNode);
    }

    writeSign(node){
        const domCellElem = Grid.getDomCell(node)
        const domSignElem = DomHelper.createElement('p',{class: 'npc-sign', innerText: this.name}, domCellElem);
        //DomHelper.floatNear(domSignElem,domSignElem);
        //FloatNearHandler.instance().apply(domCellElem, domSignElem);
    }

    findMiddleNode() {
        let maxNeighbors = {val: 0, node: this.arrNodes[0]};
        for (const node of this.arrNodes) {
            const neighborCount = {val: this.countNodeNeighbors(node), node: node};
            if (neighborCount.val > maxNeighbors.val) {
                maxNeighbors = neighborCount;
            }
        }

        return maxNeighbors.node;
    } // findMiddle


    nodeExist(objNode){
        for (const node of this.arrNodes) {
            if (objNode.x === node.x && objNode.y === node.y) {
                return true;
            }
        }

        return false;
    } // nodeExist

    countNodeNeighbors(objNode){
        return this.nodeExist({x: objNode.x+1, y: objNode.y}) +
                this.nodeExist({x: objNode.x+1, y: objNode.y+1}) +
                this.nodeExist({x: objNode.x+1, y: objNode.y-1}) +
                this.nodeExist({x: objNode.x, y: objNode.y+1}) +
                this.nodeExist({x: objNode.x, y: objNode.y-1}) +
                this.nodeExist({x: objNode.x-1, y: objNode.y+1}) +
                this.nodeExist({x: objNode.x-1, y: objNode.y-1}) +
                this.nodeExist({x: objNode.x-1, y: objNode.y});
    } // getMaxNeighborNode
}

class City extends Npc {
    // TODO: color become reder as population gets bigger
    static opacityBg = 0.1;
    static colors = [
        `rgba(200,30,30,${City.opacityBg})`,
        `rgba(200,50,30,${City.opacityBg})`,
        `rgba(200,70,30,${City.opacityBg})`,
        `rgba(200,90,30,${City.opacityBg})`,
        `rgba(200,110,30,${City.opacityBg})`,
        `rgba(200,130,30,${City.opacityBg})`,
        `rgba(200,150,30,${City.opacityBg})`
    ];

    constructor(city) {
        super(city);

        this.id = city.id;
        this.name = city.name;
    }

    draw(colorNum) {
        super.draw(City.colors[colorNum % Village.colors.length]);
    }

} // City

class Village extends Npc {
    // TODO: color become bluer as population gets bigger
    static colors = [
        `rgba(30,30,200,${City.opacityBg})`,
        `rgba(30,50,200,${City.opacityBg})`,
        `rgba(30,70,200,${City.opacityBg})`,
        `rgba(200,90,200,${City.opacityBg})`,
        `rgba(30,110,200,${City.opacityBg})`,
        `rgba(30,130,200,${City.opacityBg})`,
        `rgba(30,150,200,${City.opacityBg})`
    ];

    constructor(village) {
        super(village);
    }

    draw(colorNum) {
        super.draw(Village.colors[colorNum % Village.colors.length]);
    }
    
} // Village
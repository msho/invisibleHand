'use strict';
const domContainer = document.getElementsByClassName("main-content")[0];

class WorldMap {
    constructor(mapData) {
        // create grid
        const infoBar = new InfoBar(domContainer);
        const grid = new Grid(mapData.map.width, mapData.map.height, infoBar);

        // apply mouse scroll 
        new MouseScroll(grid.domGridContainer);

        new ResourcesHandler(grid.domGridContainer, mapData.resources);

        this.npcHandler = new NpcHandler(grid.domGridContainer, mapData.npc)
    } // constructor
} // WorldMap

class Grid {

    static idDomGridContainer = 'grid-container';
    static gridCellIdPrefix = 'grid_cell_id_';
    
    static getCellIdSuffix(row, col){
        return `${row}_${col}`;
    }

    static getDomCell(objNode) {
        const domId = Grid.gridCellIdPrefix + Grid.getCellIdSuffix(objNode.x, objNode.y);
        return document.getElementById(domId);
    }


    constructor(width, height, infoBar) {
        this.infoBar = infoBar;

        this.domGridContainer = DomHelper.createElement('div', { id: Grid.idDomGridContainer }, domContainer)
        this.createGridMap(width, height);
    }

    createGridMap(width, height) {
        this.domGridContainer.innerHTML = '';

        for (let row = 0; row < height; row++) {
            const rowElem = DomHelper.createElement('div', null /*{ class: 'row' }*/, this.domGridContainer);
            for (let col = 0; col < width; col++) {
                const domCell = DomHelper.createElement('div', { id: Grid.gridCellIdPrefix + Grid.getCellIdSuffix(row,col) /*, class: 'grid-cell'*/ }, rowElem);
                domCell.addEventListener('click',e=>this.infoBar.addInfoFromDomCell(domCell));
            } // for each cell in row
        } // for each row
    } // createGridMap
} // Grid

const worldMap = new WorldMap(mapData);
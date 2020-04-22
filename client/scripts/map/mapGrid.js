'use strict';
const domContainer = document.getElementsByClassName("main-content")[0];

class WorldMap {
    constructor(mapData) {
        // dynamic style
        SizeHandler.buildCssStyle()

        // create info bar
        const infoBar = new InfoBar(domContainer);

        // create grid
        const grid = new Grid(mapData.map.width, mapData.map.height, infoBar);

        // apply mouse scroll 
        this.scrollHandler = new ScrollHandler(grid.domGridContainer);
        this.scrollHandler.onScroll = (e)=>{grid.onScroll(e)};

        // map game resources (wood, iron etc...)
        new ResourcesHandler(grid.domGridContainer, mapData.resources);

        // map game NPCs
        this.npcHandler = new NpcHandler(grid.domGridContainer, mapData.npc)
    } // constructor
} // WorldMap

class Grid {

    static idDomGridContainer = 'grid-container';
    static gridCellIdPrefix = 'grid_cell_id_';
    //static defaults = {size: 'bigger'};

    static getCellIdSuffix(row, col) {
        return `${row}_${col}`;
    }

    static getDomCell(objNode) {
        const domId = Grid.gridCellIdPrefix + Grid.getCellIdSuffix(objNode.x, objNode.y);
        return document.getElementById(domId);
    }


    constructor(width, height, infoBar) {
        this.width = width;
        this.height = height;
        this.infoBar = infoBar;

        this.domGridContainer = DomHelper.createElement(
            'div', //elem type
            { id: Grid.idDomGridContainer, class: SizeHandler.defaultClassName }, //attributes
            domContainer //parent
        );
        this.createGridMap();
    }

    createGridMap() {
        this.domGridContainer.innerHTML = '';

        const maxVisibleTiles = SizeHandler.maxVisibleTiles();
        const totalRows = Math.min(this.height, maxVisibleTiles.rows + 5);
        const totalCols = Math.min(this.width, maxVisibleTiles.cols + 5);
        this.startPos = {row: 0, col: 0};
        for (let row = this.startPos.row; row < totalRows; row++) {
            const rowElem = DomHelper.createElement('div', null /*{ class: 'row' }*/, this.domGridContainer);
            
            for (let col = this.startPos.col; col < totalCols; col++) {
                const domCell = DomHelper.createElement('div', { id: Grid.gridCellIdPrefix + Grid.getCellIdSuffix(row, col) /*, class: 'grid-cell'*/ }, rowElem);
                
                domCell.addEventListener('pointerup', e => this.infoBar.addInfoFromDomCell(domCell));
            } // for each cell in row
        } // for each row
    } // createGridMap

    onScroll(e){
        console.log(e.direction);
        // TODO:
        if (e.direction.x === 'west'){
            // remove 5 rows to maxVisible.width
            // add 5 rows to startPos.cols
        }
        else if (e.direction.x === 'east'){
            // add 5 rows to maxVisible.width
            for (const domRow of object) {
                
            }
            // remove 5 rows to startPos.cols
        }

        if (e.direction.y === 'north'){
            // remove 5 rows to maxVisible.height
            // add 5 rows to startPos.rows
        }
        else if (e.direction.y === 'south'){
            // add 5 rows to maxVisible.height
            // remove 5 rows to startPos.rows
        }
        
    }
} // Grid

const worldMap = new WorldMap(mapData);
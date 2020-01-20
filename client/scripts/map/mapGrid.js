const domContainer = document.getElementsByClassName("main-content")[0];

class WorldMap {
    constructor(mapData) {
        const grid = new Grid(mapData.map.width, mapData.map.height)
    }


}

class Grid {

    static idDomGridContainer = 'grid-container';

    constructor(width, height) {
        this._domGridContainer = DomHelper.createElement('tbody', {},
            DomHelper.createElement('table', { id: Grid.idDomGridContainer }, domContainer)
        );

        this.createGridMap(width, height);
    }

    createGridMap(width, height) {
        this._domGridContainer.innerHTML = '';
        const gridCellIdPrefix = 'grid_cell_id_';
        const gridRowIdPrefix = 'grid_row_id_';


        for (let row = 0; row < height; row++) {
            let domRowContainer = DomHelper.createElement('tr', { id: gridRowIdPrefix + row/*, class: 'grid-row'*/ }, this._domGridContainer);
            for (let col = 0; col < width; col++) {
                let gridCellIdSuffix = row + '_' + col;
                DomHelper.createElement('td', { id: gridCellIdPrefix + gridCellIdSuffix /*, class: 'grid-cell'*/ }, domRowContainer);
            }
        }
    }
}

const worldMap = new WorldMap(mapData);
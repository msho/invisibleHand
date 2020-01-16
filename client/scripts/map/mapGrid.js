const domContainer = document.getElementsByClassName("main-content")[0];

class WorldMap {
    constructor(mapData) {
        grid = Grid(mapData.map.width, mapData.map.height)
    }


}

class Grid {
    
    static idDomGridContainer = 'grid-container';

    constructor(width, height) {
        this._domGridContainer = domContainer.getElementById(idDomGridContainer) || Helper.;


    }
    
}

WorldMap = WorldMap(mapData);
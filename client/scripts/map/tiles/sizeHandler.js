// TODO: use it and check it out!
class SizeHandler {
    static dicClassSizes = {
        'tiny': { tile: 17, font: 0.8, opacity: 0.5 },
        'smaller': { tile: 22, font: 1, opacity: 0.7 },
        'small': { tile: 27, font: 1.5 },
        /*'normal': {tile: 32, font:1.4},*/
        'big': { tile: 37, font: 1.6 },
        'bigger': { tile: 45, font: 1.8 },
        'huge': { tile: 55, font: 2 }
    };

    static defaultClassName = "bigger";

    static arrClassSizeNames = SizeHandler.arrClassSizeNames || Object.keys(SizeHandler.dicClassSizes);

    /*constructor() {
        this.buildCssStyle()
    }*/

    static buildCssStyle() {
        for (const [cssClassName, sizeVal] of Object.entries(SizeHandler.dicClassSizes)) {
            const domStyle = document.createElement("style");
            const strOpacityCss = (sizeVal.opacity) ? `opacity: ${sizeVal.opacity}` : '';

            const textNodeStyle = document.createTextNode(
                `#grid-container.${cssClassName} > div > div { height: ${sizeVal.tile}px; flex-basis: ${sizeVal.tile}px}` +
                `#grid-container.${cssClassName} .npc-sign {font-size: ${sizeVal.font}rem; ${strOpacityCss};}`);
            domStyle.appendChild(textNodeStyle);
            document.head.appendChild(domStyle);
        } // for each dicClassSizes
    }

    static getClassSizeName(currentClasses) {
        currentClasses = currentClasses || document.getElementById(Grid.idDomGridContainer).classList;
        for (const classSizeName of SizeHandler.arrClassSizeNames) {
            if (currentClasses.contains(classSizeName)) {
                return classSizeName;
            }
        }
        // default class size
        return SizeHandler.defaultClassName;
    } // getClassSize

    static getCurrentTileSize() {
        //return SizeHandler.dicClassSizes[SizeHandler.getClassSizeName()].tile;
        return SizeHandler.dicClassSizes.tiny.tile;
    }

    static maxVisibleTiles() {
        const winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        const tileSize = SizeHandler.getCurrentTileSize();

        return {
            rows: winHeight / tileSize,
            cols: winWidth / tileSize
        };

    }
}
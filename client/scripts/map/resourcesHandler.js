class ResourcesHandler {
    constructor(domElem, arrResources) {
        this.domElem = domElem;
        this.arrResources = arrResources

        this.addResources();
    }

    addResources(){
        for (const resource of this.arrResources) {
            const domCell = this.draw(resource);
            GridData.AddData(domCell, 'resource', JSON.stringify(resource));
        }
    } // addResources

    draw(objResource) {
        const domCell = Grid.getDomCell(objResource.pos);
        domCell.classList.add(`res_${objResource.name}`);

        return domCell;

    } // draw
}
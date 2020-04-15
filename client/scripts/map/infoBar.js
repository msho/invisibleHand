class InfoBar {
    constructor(domContainer){
        this.domInfoBar = DomHelper.createElement('div',{class: 'info-bar'}, domContainer);
    }
    newInfo(objInfo) {
        this.domInfoBar.innerText = JSON.stringify(objInfo);
    }

    removeInfo(){
        this.domInfoBar.innerHTML = '';
    }

    addInfoFromDomCell(domCell) {
        this.newInfo(GridData.GetData(domCell));
    }



}
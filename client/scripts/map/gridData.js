class GridData {
    static mapData = new Map();

    static AddData(domCell, key, val) {
        let cellData = GridData.mapData.get(domCell);
        if (!cellData) {
           cellData = new Map(); 
           GridData.mapData.set(domCell, cellData);
        }

        cellData.set(key,val);
    }

    static GetData(domCell) {
        const data = GridData.mapData.get(domCell);
        console.log(data);
        return data;
    }
} // GridHelper


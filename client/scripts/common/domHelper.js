class DomHelper{
    static createElement(strTagName, dicProperties, parent) {
        
        // create element
        var elem = document.createElement(strTagName)
        
        // apppend attributes if any
        appendAttributes(elem, dicProperties);
        
        // append element to parent if needed
        if (parent) {
            parent.appendChild(elem);
        }

        return elem;
    }

    static appendAttributes(elem, dicProperties){
        if (!elem || !dicProperties) {
            return elem;
        }

        for (const [propertyName, propertyValue] of Object.entries(dicProperties)) {
            elem.setAttribute(propertyName, propertyValue)
        }
    }
}
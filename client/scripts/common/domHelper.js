class DomHelper {
    static createElement(strTagName, dicProperties, parent) {

        // create element
        var elem = document.createElement(strTagName)

        // apppend attributes if any
        DomHelper.appendAttributes(elem, dicProperties);

        // append element to parent if needed
        if (parent) {
            parent.appendChild(elem);
        }

        return elem;
    }

    static appendAttributes(elem, dicProperties) {
        if (!elem || !dicProperties) {
            return elem;
        }

        for (const [propertyName, propertyValue] of Object.entries(dicProperties)) {
            elem.setAttribute(propertyName, propertyValue)
        }
    }

    static addStyleToClass(className, strStyle) {
        const strCss = '.' + className + '{' + strStyle + '}';

        DomHelper.addStyleElementToHeader(strCss);
    }

    static addStyleElementToHeader(strCss) {
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.type = 'text/css';

        style.appendChild(document.createTextNode(strCss));
    }
}
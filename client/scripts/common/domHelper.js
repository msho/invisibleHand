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
            if (propertyName === 'innerText') {
                elem.innerText = propertyValue;
            } else if (propertyName === 'innerHTML') {
                elem.innerHTML = propertyValue;
            } else {
                elem.setAttribute(propertyName, propertyValue)
            }
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

    static getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY
        };
      }
}

/*
class FloatNearHandler {
    static _instance = null;
    static instance(){
        if (FloatNearHandler._instance=== null) {
            FloatNearHandler._instance = new FloatNearHandler();
            FloatNearHandler._instance.setDomGrid(document.getElementById(Grid.idDomGridContainer));
        }
        return FloatNearHandler._instance;
    }

    constructor(){
        this.dicDomNear = new Map();

        this.observer = new IntersectionObserver((entries)=> {
            for (const entry of entries) {
                const domFloating = this.dicDomNear.get(entry.target);

                if (!domFloating) {
                    continue;
                }

              if (entry.intersectionRatio >0.5) {
                  domFloating.classList.remove('hide');
                  domFloating.style.position = 'relative';
    
              } else {
                domFloating.classList.add('hide');
              }
            } 
        }, { threshold: [0.8,0] });
    } // constructor

    apply(domNear, domFloat) {
        this.dicDomNear.set(domNear, domFloat);
        this.observer.observe(domNear);
    }

    setDomGrid(domGrid){
        this.domGrid = domGrid;
    }
} // FloatNearHandler
*/
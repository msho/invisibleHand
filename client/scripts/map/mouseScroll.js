class MouseScroll {
    static scrollSpeed = 2;

    constructor(domElem) {
        this.isDown = false;
        this.currentPos = null; /*{x:0, y:0}*/
        this.oldPos = null; /*{x:0, y:0}*/
        this.domElem = domElem;

        this.mouseEvents();

        new MouseZoom(domElem);
    }

    mouseEvents() {
        this.domElem.addEventListener('mousedown', (e) => {
            this.isDown = true;
            this.oldPos = { x: e.clientX, y: e.clientY };
        });
        this.domElem.addEventListener('mouseup', () => this.isDown = false);
        this.domElem.addEventListener('mousemove', e => {
            if (!this.isDown) {
                return;
            }
            const currentPos = { x: e.clientX, y: e.clientY };
            this.scrollElement(currentPos);
            this.oldPos = currentPos;
        }); //mouse move

        this.domElem.addEventListener('mouseenter', (e)=>{
            if (this.wasDown && e.buttons === 1 || e.which === 1) {
                this.isDown = 1
            }
        }); //mouse enter

        this.domElem.addEventListener('mouseleave', (e)=>{
            this.wasDown = this.isDown;
            this.isDown = false;
        }); //mouse enter

    } //mouseEvents

    scrollElement(currentPos) {
        if (!this.oldPos) {
            return;
        }
        const moveLeft = (currentPos.x - this.oldPos.x) * MouseScroll.scrollSpeed;
        const moveUp = (currentPos.y - this.oldPos.y) * MouseScroll.scrollSpeed;

        this.domElem.scrollLeft = this.domElem.scrollLeft + moveLeft * -1;
        this.domElem.scrollTop = this.domElem.scrollTop + moveUp * -1;
    } //scrollElement

} // MouseMovement

class MouseZoom {

    static sizeClassNames = ['tiny', 'smaller', 'small', 'normal', 'big', 'bigger', 'huge'];

    constructor(domElem) {
        this.domElem = domElem;

        this.mouseEvents();
    }

    mouseEvents() {
        this.domElem.addEventListener('wheel', e => {
            e.preventDefault();
            this.zoomElement(e.deltaY);
        });
    }

    zoomElement(delta) {
        let currentClasses = this.domElem.classList;
        let currentClassSize = this.getClassSizeName(currentClasses);
        
        this.replaceClass(currentClasses, currentClassSize, this.normilizeDelta(delta));
        
    } //zoomElement

    getClassSizeName(currentClasses) {
        for (const classSizeName of MouseZoom.sizeClassNames) {
            if (currentClasses.contains(classSizeName)) {
                return classSizeName;
            }
        }
        // default class size
        return 'normal';
    } // getClassSize

    getNextClassIndex(currentClassName, zoomScale) {
        let nextClassIndex = MouseZoom.sizeClassNames.indexOf(currentClassName) + zoomScale;
        if (nextClassIndex > MouseZoom.sizeClassNames.length-1) {
            nextClassIndex = MouseZoom.sizeClassNames.length - 1;
        }
        if (nextClassIndex < 0) {
            nextClassIndex = 0;
        }
        return nextClassIndex;
    } //chooseBiggerClass

    replaceClass(currentClasses, currentClassName, zoomScale) {
        let nextClassIndex = this.getNextClassIndex(currentClassName, zoomScale);
        currentClasses.remove(currentClassName);
        currentClasses.add( MouseZoom.sizeClassNames[nextClassIndex]);
    }

    normilizeDelta(delta) {
        const opositSign = delta<0? 1 : -1;
        const absDelta = Math.abs(Math.round(delta));
        const highestPower10 = Math.floor(Math.log10(absDelta))
        return (absDelta / (10**highestPower10)) * opositSign;
    }
} // MouseZoom
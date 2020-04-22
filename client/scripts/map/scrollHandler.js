class ScrollHandler {
    static scrollSpeed = 2;

    constructor(domElem) {
        this.isDown = false;
        this.currentPos = null; /*{x:0, y:0}*/
        this.oldPos = null; /*{x:0, y:0}*/
        this.domElem = domElem;
        this.onScroll = null;
        this.lastScroll = { top: 0, left: 0 };
        this.mouseEvents();

        domElem.addEventListener("scroll", (e) => {
            if (typeof this.onScroll !== 'function') {
                return;
            }

            // ignore massive scroll event fire
            if (JsHelper.lock('grid scroll', 250)) {
                return;
            }

            this.handleOnGridScroll(e.target);

        });

        new MouseZoom(domElem);
    }

    handleOnGridScroll(domGrid) {
        let y = 'no change';
        if (domGrid.scrollTop > this.lastScroll.top) {
            y = 'south';
        } else if (domGrid.scrollTop < this.lastScroll.top) {
            y = 'north';
        }

        let x = 'no change';
        if (domGrid.scrollLeft > this.lastScroll.left) {
            x = 'east';
        } else if (domGrid.scrollLeft < this.lastScroll.left) {
            x = 'west';
        }

        this.lastScroll.top = domGrid.scrollTop <= 0 ? 0 : domGrid.scrollTop; // For Mobile or negative scrolling
        this.lastScroll.left = domGrid.scrollLeft <= 0 ? 0 : domGrid.scrollLeft; // For Mobile or negative scrolling
        this.onScroll({ direction: { y: y, x: x } });
    }

    mouseEvents() {
        // mouse down
        this.domElem.addEventListener('mousedown', (e) => {
            this.isDown = true;
            this.oldPos = { x: e.clientX, y: e.clientY };
        });

        // mouse up
        this.domElem.addEventListener('mouseup', () => this.isDown = false);

        // mouse move
        this.domElem.addEventListener('mousemove', e => {
            e.stopPropagation()

            if (!this.isDown) {
                return;
            }
            const currentPos = { x: e.clientX, y: e.clientY };
            this.scrollElement(currentPos);
            this.oldPos = currentPos;
        }); //mouse move

        // mouse enter
        this.domElem.addEventListener('mouseenter', (e) => {
            if (this.wasDown && e.buttons === 1 || e.which === 1) {
                this.isDown = 1
            }
        }); //mouse enter

        // mouse leave
        this.domElem.addEventListener('mouseleave', (e) => {
            this.wasDown = this.isDown;
            this.isDown = false;
        }); //mouse enter

    } //mouseEvents

    scrollElement(currentPos) {
        if (!this.oldPos) {
            return;
        }
        const moveLeft = (currentPos.x - this.oldPos.x) * ScrollHandler.scrollSpeed;
        const moveUp = (currentPos.y - this.oldPos.y) * ScrollHandler.scrollSpeed;

        this.domElem.scrollLeft = this.domElem.scrollLeft + moveLeft * -1;
        this.domElem.scrollTop = this.domElem.scrollTop + moveUp * -1;
    } //scrollElement

} // ScrollHanlder

class MouseZoom {

    //static sizeClassNames = ['tiny', 'smaller', 'small', 'normal', 'big', 'bigger', 'huge'];

    constructor(domElem) {
        this.domElem = domElem;

        this.currentZoomClass = SizeHandler.defaultClassName;
        this.isScrolled = true;

        this.zoomCssObserver();
        this.mouseEvents();
    }

    zoomCssObserver() {
        const zoomObserver = new MutationObserver(() => this.onCssClassChanged());
        zoomObserver.observe(this.domElem, {
            attributes: true,
            attributeFilter: ['class']
        });
    } // zoomCssObserver

    // called every time the css has been changed (using zoomObserver)
    onCssClassChanged() {
        if (this.domElem.classList.contains(this.currentZoomClass)) {
            this.isScrolled = true;
            return;
        }

        if (this.isScrolled === true) {
            return;
        }

        // if zoom css class has benn changed!
        setTimeout(() => {
            this.domElemToScroll.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
            this.isScrolled = true;
            this.currentZoomClass = SizeHandler.getClassSizeName();
        }, 0);
    } // cssChangedEvent

    mouseEvents() {
        // wheel
        this.domElem.addEventListener('wheel', e => {
            e.preventDefault();

            this.zoomElement(e.deltaY, e.target);
        });

        new TouchEvents(this.domElem,
            {
                // double click (or tap)
                onDoubleTap: (e) => this.zoomElement(-3, e.target),
                onPinch: (e) => this.zoomElement(e.value, e.target),
                preventDefault: true
            }
        );
        /*this.domElem.addEventListener('dblclick',(e)=>{ 
            e.preventDefault();
            this.zoomElement(-3, e.target)
        });*/
    }

    zoomElement(delta, domMouseTarget) {

        if (this.isScrolled === false) {
            return;
        }

        const currentClasses = this.domElem.classList;
        const currentClassSize = SizeHandler.getClassSizeName(currentClasses);

        this.replaceClass(currentClasses, currentClassSize, this.normilizeDelta(delta));

        this.domElemToScroll = domMouseTarget;
        this.isScrolled = false;

    } //zoomElement

    getNextClassIndex(currentClassName, zoomScale) {
        let nextClassIndex = SizeHandler.arrClassSizeNames.indexOf(currentClassName) + zoomScale;
        if (nextClassIndex > SizeHandler.arrClassSizeNames.length - 1) {
            nextClassIndex = SizeHandler.arrClassSizeNames.length - 1;
        }
        if (nextClassIndex < 0) {
            nextClassIndex = 0;
        }
        return nextClassIndex;
    } //chooseBiggerClass

    replaceClass(currentClasses, currentClassName, zoomScale) {
        const nextClassIndex = this.getNextClassIndex(currentClassName, zoomScale);
        currentClasses.remove(currentClassName);
        currentClasses.add(SizeHandler.arrClassSizeNames[nextClassIndex]);
    }

    normilizeDelta(delta) {
        const opositSign = delta < 0 ? 1 : -1;
        const absDelta = Math.abs(Math.round(delta));
        const highestPower10 = Math.floor(Math.log10(absDelta))
        return (absDelta / (10 ** highestPower10)) * opositSign;
    }
} // MouseZoom
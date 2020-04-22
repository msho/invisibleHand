// settings = {onPinch: onPinchCallback, onDoubleTap: onDoubleTapCallback}
class TouchEvents {
    static hasTouch(){
        return ("ontouchstart" in document.documentElement);
    }
    constructor(elem, settings) {
        if (settings.onPinch && TouchEvents.hasTouch()) {
            this.TouchPinch = new TouchPinch(elem, settings.onPinch, settings);
        }

        if (settings.onDoubleTap) {
            this.onDoubleTap = new DoubleTap(elem, settings.onDoubleTap, settings);
        }
    }
} // TouchEvent


class DoubleTap {
    static doubleTapGap = 400
    constructor(elem, onDoubleTap, settings) {
        this.elem = elem;
        this.onDoubleTap = onDoubleTap;
        this.isPreventDefault = settings.preventDefault;


        this.lastPointerDate = null;

        this.pointerHandler()
    }

    pointerHandler() {
        this.elem.addEventListener('pointerup', (e) => {
            this.onPointerUp(e)
        });
    }

    onPointerUp(eventPointer) {

        if (this.lastPointerDate === null) {
            this.lastPointerDate = Date.now();
            return;
        }

        if (this.lastPointerDate + DoubleTap.doubleTapGap > Date.now()) {
            // double tap

            if (this.isPreventDefault) {
                eventPointer.preventDefault();
            }

            this.onDoubleTap(eventPointer);
        }

        this.lastPointerDate = Date.now();
    }
} // DoubleTap

class TouchPinch {
    constructor(elem, onPinchCallback, settings) {
        this.elem = elem;
        this.onPinchCallback = onPinchCallback;
        this.isPreventDefault = settings.preventDefault;

        this.dicPointers = {};
        this.prevDiff = -1;

        this.pointerHandler()
    }

    pointerHandler() {
        this.elem.addEventListener('pointerdown', (e) => { this.addPointer(e) });
        this.elem.addEventListener('pointermove', (e) => { this.onPointerMove(e) });

        this.elem.addEventListener('pointerup', (e) => { this.onCancel(e.pointerId) });
        this.elem.addEventListener('pointercancel', (e) => { this.onCancel(e.pointerId) });
        this.elem.addEventListener('pointerout', (e) => { this.onCancel(e.pointerId) });
        this.elem.addEventListener('pointerleave', (e) => { this.onCancel(e.pointerId) });
    } // pointerHandler

    addPointer(eventPointer) {
        this.dicPointers[eventPointer.pointerId] = eventPointer;
    } // addPointer

    onCancel(pointerId) {
        const eventPointer = this.dicPointers[pointerId];
        if (eventPointer) {
            delete this.dicPointers[pointerId];
        }
    } // onCancel

    onPointerMove(eventPointer) {
        if (Object.keys(this.dicPointers).length < 2) {
            // not pinch
            return;
        }

        const otherEventPointer = this.getOtherEventPointer(eventPointer.pointerId);
        const curDiff = Math.abs(otherEventPointer.clientX - eventPointer.clientX);

        if (this.prevDiff <= 0) {
            this.prevDiff = curDiff;
            return;
        }

        // pinch alert!

        if (this.isPreventDefault) {
            eventPointer.preventDefault();
        }

        if (curDiff > this.prevDiff) {
            // The distance between the two pointers has increased
            this.onPinchCallback({ direcation: 'out', value: 1, target: eventPointer.target });
        }
        if (curDiff < this.prevDiff) {
            // The distance between the two pointers has decreased
            this.onPinchCallback({ direcation: 'in', value: -1, target: eventPointer.target });
        }

        this.prevDiff = curDiff;

    } // onPointerMove

    getOtherEventPointer(pointerId) {
        for (const [key, val] of this.dicPointers) {
            if (key !== pointerId) {
                return val;
            }
        }
        return null;
    } // getOtherEventPointer

} // TouchPinch
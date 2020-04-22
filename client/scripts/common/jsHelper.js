class JsHelper{
    static keyLock = {}
    static lock(key, miliSec) {
        if (!JsHelper.keyLock.hasOwnProperty(key)) {
            // key not found
            JsHelper.keyLock[key] = Date.now();
            return false;
        }

        // key found check time
        const isLocked = JsHelper.keyLock[key] + miliSec > Date.now() 
        if (!isLocked) {
            JsHelper.keyLock[key] = Date.now();
        }

        return isLocked;

    }
}
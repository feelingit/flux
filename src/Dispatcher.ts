import {EventEmitter} from "./EventEmitter";

class Dispatcher extends EventEmitter {

    private label: string;

    constructor() {
        super();
        this.label = `DispatcherEvent`;
    }

    register(callback: (action: any) => void): void {
        return super.subscribe(this.label, callback);
    }

    unregister(callback: (action: any) => void): void {
        return super.unsubscribe(callback);
    }

    dispatch(payload: any): void {
        return super.emit(this.label, payload);
    }
}

export { Dispatcher };

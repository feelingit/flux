import {EventEmitter} from "./EventEmitter";

class Dispatcher extends EventEmitter {

    private label: string;

    constructor() {
        super();
        this.label = `DispatcherEvent`;
    }

    register(callback: (action: any) => void): string {
        return super.subscribe(this.label, callback);
    }

    unregister(id: string): void {
        return super.unsubscribe(id);
    }

    dispatch(payload: any): void {
        return super.emit(this.label, payload);
    }
}

export { Dispatcher };

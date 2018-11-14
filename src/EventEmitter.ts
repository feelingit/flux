interface Listeners {
    [id: string]: EventListeners;
}

interface EventListeners {
    [id: string]: (action: any) => void;
}

class EventEmitter {

    private prefix: string;
    private listeners: Listeners;
    private lastID: number;

    constructor() {
        this.listeners = {};
        this.prefix = `ID_`;
        this.lastID = 1;
    }

    subscribe(label: string, callback: (action: any) => void): string {
        if (!this.listeners[label]) {
            this.listeners[label] = {};
        }
        let id: string = this.prefix + this.lastID++;
        this.listeners[label][id] = callback;
        return id;
    }

    unsubscribe(id: string): void {
        for (var label in this.listeners) {
            delete this.listeners[label][id];
            if (Object.keys(this.listeners[label]).length === 0) {
                delete this.listeners[label];
            }
        }
    }

    emit(label: string, payload: any): void {
        for (let id in this.listeners[label]) {
            this.listeners[label][id](payload);
        }
    }
}

export { EventEmitter };

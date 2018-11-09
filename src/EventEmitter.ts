interface Listeners {
    [id: string]: Listener;
}

interface Listener {
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
        console.log(this.listeners);
        return id;
    }

    unsubscribe(id: string) {
        for (var label in this.listeners) {
            for (var listener in this.listeners[label]) {
                if (listener === id) {
                    delete this.listeners[label][listener];
                    if (Object.keys(this.listeners[label]).length === 0) {
                        delete this.listeners[label];
                    }
                }
            }
        }
    }

    emit(label: string, action: any) {
        for (let id in this.listeners[label]) {
            this.listeners[label][id](action);
        }
    }
}

export { EventEmitter };

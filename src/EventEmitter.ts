interface Listeners {
    [id: string]: Set<(action: any) => void>;
}

class EventEmitter {

    private listeners: Listeners;

    constructor() {
        this.listeners = {};
    }

    subscribe(label: string, callback: (action: any) => void): void {
        if (!this.listeners[label]) {
            this.listeners[label] = new Set();
        }
        this.listeners[label].add(callback);
    }

    unsubscribe(callback: (action: any) => void): void {
        for (var label in this.listeners) {
            this.listeners[label].delete(callback);
            if (Object.keys(this.listeners[label]).length === 0) {
                delete this.listeners[label];
            }
        }
    }

    emit(label: string, payload: any): void {
        if (!this.listeners[label]) return;

        for (let item of Array.from(this.listeners[label].values())) {
            item(payload);
        }
    }
}

export { EventEmitter };

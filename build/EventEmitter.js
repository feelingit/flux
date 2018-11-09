"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmitter {
    constructor() {
        this.listeners = {};
        this.prefix = `ID_`;
        this.lastID = 1;
    }
    subscribe(label, callback) {
        if (!this.listeners[label]) {
            this.listeners[label] = {};
        }
        let id = this.prefix + this.lastID++;
        this.listeners[label][id] = callback;
        console.log(this.listeners);
        return id;
    }
    unsubscribe(id) {
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
    emit(label, action) {
        for (let id in this.listeners[label]) {
            this.listeners[label][id](action);
        }
    }
}
exports.EventEmitter = EventEmitter;

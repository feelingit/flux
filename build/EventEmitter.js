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
        return id;
    }
    unsubscribe(id) {
        for (var label in this.listeners) {
            delete this.listeners[label][id];
            if (Object.keys(this.listeners[label]).length === 0) {
                delete this.listeners[label];
            }
        }
    }
    emit(label, payload) {
        for (let id in this.listeners[label]) {
            this.listeners[label][id](payload);
        }
    }
}
exports.EventEmitter = EventEmitter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    subscribe(label, callback) {
        if (!this.listeners[label]) {
            this.listeners[label] = new Set();
        }
        this.listeners[label].add(callback);
    }
    unsubscribe(callback) {
        for (var label in this.listeners) {
            this.listeners[label].delete(callback);
            if (Object.keys(this.listeners[label]).length === 0) {
                delete this.listeners[label];
            }
        }
    }
    emit(label, payload) {
        if (!this.listeners[label])
            return;
        for (let item of Array.from(this.listeners[label].values())) {
            item(payload);
        }
    }
}
exports.EventEmitter = EventEmitter;

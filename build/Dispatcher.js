"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter_1 = require("./EventEmitter");
class Dispatcher extends EventEmitter_1.EventEmitter {
    constructor() {
        super();
        this.label = `DispatcherEvent`;
    }
    register(callback) {
        return super.subscribe(this.label, callback);
    }
    unregister(id) {
        return super.unsubscribe(id);
    }
    dispatch(payload) {
        return super.emit(this.label, payload);
    }
}
exports.Dispatcher = Dispatcher;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { expect } = require('chai');
const { Dispatcher } = require('../Dispatcher');
describe(`Dispatcher`, () => {
    it(`Dispatcher.dispatch - все обработчики вызываются`, () => {
        let testDispatcher = new Dispatcher();
        let result1 = ``;
        let result2 = ``;
        let result3 = ``;
        testDispatcher.register((payload) => { result1 = `done`; });
        testDispatcher.register((payload) => { result2 = `done`; });
        testDispatcher.register((payload) => { result3 = `done`; });
        // должны выполниться 2 обработчика event1 // result = 6
        testDispatcher.dispatch(`some-payload`);
        // должен выполниться 1 обработчик event2 // result = 9
        testDispatcher.dispatch(`some-payload`);
        expect({
            result1: result1,
            result2: result2,
            result3: result3
        }).to.deep.equal({
            result1: `done`,
            result2: `done`,
            result3: `done`
        });
    });
    it(`Dispatcher.dispatch - параметры передаются корректно`, () => {
        let testDispatcher = new Dispatcher();
        let result = ``;
        testDispatcher.register((payload) => { result = payload; });
        testDispatcher.dispatch(`done`);
        expect(result).to.equal(`done`);
    });
    it(`Dispatcher.dispatch - все обработчики удаляются`, () => {
        let testDispatcher = new Dispatcher();
        let result = 0;
        let cb = function (payload) { result += 1; };
        testDispatcher.register(cb);
        // должен выполниться 1 обработчик event // result = 1
        testDispatcher.dispatch(``);
        testDispatcher.unregister(cb);
        // обработчиков не осталось, результат не должен поменяться
        testDispatcher.dispatch(``);
        expect(result).to.equal(1);
    });
});

"use strict";
const { expect } = require('chai');
const { EventEmitter } = require('../EventEmitter');
describe(`EventEmitter`, () => {
    it(`EventEmitter.emit - все обработчики вызываются`, () => {
        let testEventEmitter = new EventEmitter();
        let result1 = ``;
        let result2 = ``;
        let result3 = ``;
        testEventEmitter.subscribe(`event1`, function (payload) { result1 = `done`; });
        testEventEmitter.subscribe(`event1`, function (payload) { result2 = `done`; });
        testEventEmitter.subscribe(`event2`, function (payload) { result3 = `done`; });
        // должны выполниться 2 обработчика event1 // result = 6
        testEventEmitter.emit(`event1`, `some-payload`);
        // должен выполниться 1 обработчик event2 // result = 9
        testEventEmitter.emit(`event2`, `some-payload`);
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
    it(`EventEmitter.emit - памаретры передаются корректно`, () => {
        let testEventEmitter = new EventEmitter();
        let result = ``;
        testEventEmitter.subscribe(`event1`, function (payload) { result = payload; });
        testEventEmitter.emit(`event1`, `done`);
        expect(result).to.equal(`done`);
    });
    it(`EventEmitter.emit - все обработчики удаляются`, () => {
        let testEventEmitter = new EventEmitter();
        let result = 0;
        let id1 = testEventEmitter.subscribe(`event1`, function (payload) { result += payload; });
        let id2 = testEventEmitter.subscribe(`event1`, function (payload) { result += payload; });
        // должны выполниться 2 обработчика event1 // result = 6
        testEventEmitter.emit(`event1`, 3);
        testEventEmitter.unsubscribe(id2);
        // должен выполниться 1 обработчик event1 // result = 9
        testEventEmitter.emit(`event1`, 3);
        testEventEmitter.unsubscribe(id1);
        // обработчиков не осталось, результат не должен меняться
        testEventEmitter.emit(`event1`, 3);
        expect(result).to.equal(9);
    });
});

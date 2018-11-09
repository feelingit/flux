const { expect } = require('chai');
const { EventEmitter } = require('../EventEmitter');

describe(`EventEmitter`, () => {
    it(`EventEmitter.emit - все обработчики вызываются`, () => {
        let testEventEmitter = new EventEmitter();
        let result1: string = ``;
        let result2: string = ``;
        let result3: string = ``;
        testEventEmitter.subscribe(`event1`, (payload: string) => { result1 = `done`; });
        testEventEmitter.subscribe(`event1`, (payload: string) => { result2 = `done`; });
        testEventEmitter.subscribe(`event2`, (payload: string) => { result3 = `done`; });
        // должны выполниться 2 обработчика event1
        testEventEmitter.emit(`event1`, `some-payload`);
        // должен выполниться 1 обработчик event2
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
    it(`EventEmitter.emit - параметры передаются корректно`, () => {
        let testEventEmitter = new EventEmitter();
        let result: string = ``;
        testEventEmitter.subscribe(`event`, (payload: string) => { result = payload; });
        testEventEmitter.emit(`event`, `done`);
        expect(result).to.equal(`done`);
    });
    it(`EventEmitter.emit - все обработчики удаляются`, () => {
        let testEventEmitter = new EventEmitter();
        let result: number = 0;
        let id: string = testEventEmitter.subscribe(`event`, (payload: string) => { result += 1; });
        // должен выполниться 1 обработчик event // result = 1
        testEventEmitter.emit(`event`, ``);
        testEventEmitter.unsubscribe(id);
        // обработчиков не осталось, результат не должен поменяться
        testEventEmitter.emit(`event`, ``);
        expect(result).to.equal(1);
    });
});

export {};
const { expect } = require('chai');
const { EventEmitter } = require('../EventEmitter');

describe(`EventEmitter`, () => {
    it(`EventEmitter.emit - все обработчики вызываются`, () => {
        let testEventEmitter = new EventEmitter();
        let result1: string = ``;
        let result2: string = ``;
        let result3: string = ``;
        testEventEmitter.subscribe(`event1`, function( payload: string ) { result1 = `done`; });
        testEventEmitter.subscribe(`event1`, function( payload: string ) { result2 = `done`; });
        testEventEmitter.subscribe(`event2`, function( payload: string ) { result3 = `done`; });
        testEventEmitter.emit(`event1`, `some-payload`); // должны выполниться 2 обработчика event1 // result = 6
        testEventEmitter.emit(`event2`, `some-payload`); // должен выполниться 1 обработчик event2 // result = 9
        expect({ 
            result1: result1, 
            result2: result2, 
            result3: result3 
        }).to.deep.equal({ 
            result1: `done`, 
            result2: `done`, 
            result3: `done` });
    });
    it(`EventEmitter.emit - все обработчики вызываются`, () => {
        let testEventEmitter = new EventEmitter();
        let result1: string = ``;
        let result2: string = ``;
        let result3: string = ``;
        testEventEmitter.subscribe(`event1`, function( payload: string ) { result1 = payload; });
        testEventEmitter.subscribe(`event1`, function( payload: string ) { result2 = payload; });
        testEventEmitter.subscribe(`event2`, function( payload: string ) { result3 = payload; });
        testEventEmitter.emit(`event1`, `event1`); // должны выполниться 2 обработчика event1 // result = 6
        testEventEmitter.emit(`event2`, `event2`); // должен выполниться 1 обработчик event2 // result = 9
        expect({ 
            result1: result1, 
            result2: result2, 
            result3: result3 
        }).to.deep.equal({ 
            result1: `event1`, 
            result2: `event1`, 
            result3: `event2` });
    });
    it(`EventEmitter.emit - все обработчики удаляются`, () => {
        let testEventEmitter = new EventEmitter();
        let result: number = 0;
        let id1: string = testEventEmitter.subscribe(`event1`, function( payload: number ) { result += payload; });
        let id2: string = testEventEmitter.subscribe(`event1`, function( payload: number ) { result += payload; });
        testEventEmitter.emit(`event1`, 3); // должны выполниться 2 обработчика event1 // result = 6
        testEventEmitter.unsubscribe(id2);
        testEventEmitter.emit(`event1`, 3); // должен выполниться 1 обработчик event1 // result = 9
        testEventEmitter.unsubscribe(id1);
        testEventEmitter.emit(`event1`, 3); // обработчиков не осталось, результат не должен меняться
        expect(result).to.equal(9);
    });
});

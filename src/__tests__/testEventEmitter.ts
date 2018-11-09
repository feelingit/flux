const { expect } = require('chai');
const { EventEmitter } = require('../EventEmitter');

describe(`EventEmitter`, () => {
    it(`EventEmitter.subscribe - должна возвращать "ID_3"`, () => {
        let testEventEmitter = new EventEmitter();
        let result: string;
        testEventEmitter.subscribe(`event1`, () => {});
        testEventEmitter.subscribe(`event2`, () => {});
        result = testEventEmitter.subscribe(`event3`, () => {});
        expect(result).to.equal(`ID_3`);
    });
    it(`EventEmitter.emit - все обработчики вызываются`, () => {
        let testEventEmitter = new EventEmitter();
        let result: number = 0;
        testEventEmitter.subscribe(`event1`, function( payload: number ) { result += payload; });
        testEventEmitter.subscribe(`event1`, function( payload: number ) { result += payload; });
        testEventEmitter.subscribe(`event2`, function( payload: number ) { result += payload; });
        testEventEmitter.emit(`event1`, 3); // должны выполниться 2 обработчика event1 // result = 6
        testEventEmitter.emit(`event2`, 3); // должен выполниться 1 обработчик event2 // result = 9
        expect(result).to.equal(9);
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

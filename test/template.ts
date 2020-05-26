import fs from 'fs-extra';
import { should } from 'chai';
import path from 'path';
import tmp from 'tmp';

import { Template, TemplateData } from '../src/index';

const subject = new Template();

should();

function check(data: TemplateData, expected: string): void {
    const tmpobj = tmp.dirSync();
    const template = 'blabla {{ key1 }} blabla {{ key2 }} bla ';
    const source = path.join(tmpobj.name, 'source');

    fs.writeFileSync(source, template);

    const target = path.join(tmpobj.name, 'somesubdir', 'target');

    subject.create(source, target, data);


    const actual = fs.readFileSync(target).toString();

    actual.should.eq(expected);
}

describe('TemplateManager', () => {
    before(() => {
        tmp.setGracefulCleanup();
    });

    describe('create', () => {
        it('should create a destination file from a template with interpolated data', () => {
            const data = { key1: 'value1', key2: 'value2' };
            const expected = 'blabla value1 blabla value2 bla ';
            check(data, expected);
        });
        it('should allow numeric values', () => {
            const data = { key1: 'value1', key2: 2 };
            const expected = 'blabla value1 blabla 2 bla ';
            check(data, expected);
        });
    });
});

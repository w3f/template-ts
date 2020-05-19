import fs from 'fs-extra';
import Handlebars from 'handlebars';
import path from 'path';

import { Template } from './types';

Handlebars.registerHelper('raw', function(options) {
    return options.fn();
});

export class TemplateManager<T> implements Template<T> {
    create(source: string, target: string, data: T): void {
        const sourceTpl = fs.readFileSync(source).toString();
        const template = Handlebars.compile(sourceTpl);
        const contents = template(data);

        const targetDir = path.dirname(target);
        fs.ensureDirSync(targetDir);

        fs.writeFileSync(target, contents);
    }
}

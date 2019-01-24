import * as faqtor from "faqtor";
import * as fs from "fs";
import * as util from "util";

import Handlebars from "handlebars";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export const render = (src: string, dst: string, data: any, options?: Handlebars.RuntimeOptions): faqtor.IFactor => {
    const run = async (): Promise<Error> => {
        try {
            const inp = await readFile(src, {encoding: "utf8"}).catch(e => Error(e));
            if (inp instanceof Error) { return inp; }
            const tpl = Handlebars.compile(inp);
            const result = tpl(data, options);
            const r = await writeFile(dst, result, {encoding: "utf8"}).catch((e) => Error(e));
            if (r instanceof Error) return r;
        } catch (e) {
            return Error(e)
        }
        return null;
    }

    return faqtor.func(run, src, dst);
}


import { generateSchemaFromHtml } from './src/utils/dom-scanner';
import { JSDOM } from 'jsdom';

// Polyfill document for node environment
const dom = new JSDOM('<!DOCTYPE html><div></div>');
global.document = dom.window.document;
global.Element = dom.window.Element;

const htmlInteractive = `
<div>
    <h1 data-type="text" data-name="my-title" data-title="Main Title">Hello World</h1>
    <p data-type="textarea" data-id="my-desc">Description here</p>
</div>
`;

const htmlLegacy = `
<div>
    <h1>Implicit Title</h1>
    <p>Implicit Description</p>
    <a href="#">Implicit Link</a>
</div>
`;

console.log("--- Interactive (Explicit) ---");
console.log(JSON.stringify(generateSchemaFromHtml(htmlInteractive), null, 2));

console.log("--- Legacy (Implicit) ---");
console.log(JSON.stringify(generateSchemaFromHtml(htmlLegacy), null, 2));

/* For detailed explanations visit notes from course at: https://github.com/themaximehardy/understanding-typescript


TypeScript is A JavaScript Superset. Its a Language building up on JavaScript. Adds new Features + Advantages to JavaScript. It cant be executed by browser environment. 

TypeScript is compiled to JavaScript. TypeScript compiler compiles features to JS workarounds and possible errors are thrown. TypeScript ADDS TYPES.

To install it:
npm install typescript -g typescript

tsc TYPESCRIPT-FILENAME.ts    to run the file

Once we import we always import .js file because a .ts file will be compilet to .js file of same name


TypeScript adds Next-gen JavaScript Features (compiled down for older Browsers).
It adds Non-JS Features like Interfaces or Generics. It adds Meta_Programming Features like Decorators.
It has Rich Configuration Options. Modern Tooling that helps even in non-TypeScript Projects.

TYPESCRIPT TYPE SYSTEM ONLY HELPS YOU DURING DEVELOPMENT > before the code gets compiled.
JavaScript uses "dynamic types" (resolved at runtime), while TypeScript uses "static types" (set during development)

CORE TYPES of TypeScript:
- number (All numbers, no differentiation between integers or floats)
- string (All text values)
- boolean (true, false - No truthy or falsy values like ZERO in JS)
- arrays (Any JavaScript array, type can be flexible or strict - regarding the element types)
- object (Any JavaScript object, more specific types - type of object are possible)
- Tuple [1, 2] - Added by TypeScript: FIXED-LENGTH ARRAY - EXAMPLE > we want ROLE [2, "author"] - array with exactly 2 elements, where first is number - a key and second is string that should be descriptive
- Enum - enum {NEW, OLD} - Added by TypeScript: Automatically enumerated global constant identifiers
- Any - * - Any kind of value, no specific type assignment

The core primitive types in TypeScript are all lowercase!

Type aliases can be used to create our own types. We are not limited to storing union types though - we can also provide an alias to a possibly comples object type.

type User = { name: string; age: number };
const u1: User = { name: "Slobodan", age: 30 };

FOR LIVE SERVER THAT TRACKS CHANGES AS THEY HAPPEN AND AS FILE IS SAVED USE:
npm init
npm install lite-server --save-dev
Than in your package.json add this to scripts
"start": "lite-server"
Make sure you have an index.html file within this folder and than just run
npm start


TO USE WATCH MODE TYPE tsc FILENAME.ts -w (or --watch)    THIS WILL WATCH ONLY ONE FILE

To WATCH WHOLE PROJECT run tsc --init       it will create tsconfig.json file
AFTER THAT we can just run the command tsc or if we want WHOLE PROJECT tsc -w


If we add "exclude": [filenametoexclude.js] to tsconfig.json we will exclude that files from compilation process, we can also put ".dev.ts" to exclude all files with this pattern (ending .dev.ts)

IF we set "include": [] then only files included will be compiled

"files": [] option allows to include just individual files that we want to include, without option to include folders like in include

"target": "es2016",    sets to which version we want to compile the code, if we delete value and hit CTRL + SPACE we will see available autocompletion options.

"lib": [], if its not set defaults is assumed, if its set we need to include default libraries ["dom", "es6", "dom.iterable", "scripthost"], these 4 are in default setup which is assumed

"allowJS": true,    JS file will be compiled even if its not with .ts suffix
"checkJS": true,    it will do a TS check on JS files

"sourceMap": true,    helps with debugging and development, opening developer tools, then sources, when true is active we can see .ts files code

"outDir": "./dist",   place our JS files in the dist folder
"rootDir": "./src",   make sure TSC compiler to look in that folder, so only files from that directory will be included in dist

"noEmit": true,       we set this if we dont want to emit JS files

"downlevelIteration": true,   if we compile to older versions of JS and we have problems with for loops we turn this on and it will compile in a way that it works

"noEmitOnError": true   if we have errors nothing will be generated to JS file, default setting is false


"strict": true,   set all strict options to true without having to set them separately one by one
"strictNullChecks": true,  how to work with values that might return null, for example document.querySelector("button"), we dont know if it will find a button element
"strictFunctionTypes": true,    is related to Function Types we might set
"strictBindCallApply": true,    ensures that we use bind, call and apply in a right way

*/

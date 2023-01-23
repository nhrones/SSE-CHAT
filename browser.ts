import { port } from "./constants.ts";

// what browser?
export const browserAliase = {
    windows: "explorer",
    darwin: "open",
    linux: "sensible-browser",
};

// just to force loading this module
export const start = async() => {
    console.log('Browser Started!')

//////////////////////////////////////
//  Opens index.html in the browser  //
//////////////////////////////////////
const browserProcess = Deno.run({
    cmd: [browserAliase[Deno.build.os], `http://localhost:${port}`]
});

await browserProcess.status()
    .then(() => console.log())
    .catch((reason) => console.warn(reason));
}
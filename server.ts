import { serve, join, serveFile } from './deps.ts'
import { DEBUG, host, port, targetFolder } from './constants.ts'
import { postMessage } from './post.ts'
import { registerClient } from './send.ts'
import * as browser from './browser.ts'

//////////////////////////////////////
//         Start our Server         //
//////////////////////////////////////
serve(handleRequest, { hostname: host, port: port })
   .then(() => console.log("Server closed"))
   .catch((err) => console.info('Server caught error - ', err))
   
   
//////////////////////////////////////
//    Handle all http requests      //
//////////////////////////////////////
function handleRequest(request: Request): Response | Promise<Response> {

   // Get and adjust the requested path name
   let { pathname } = new URL(request.url); // get the path name
   if (pathname === '/') pathname = '/index.html'; // fix root
   
   //////////////////////////////////////////////////////
   //  was request to register for Server Sent Events  //
   //////////////////////////////////////////////////////
   if (pathname.includes("sse_registration")) {
      if (DEBUG) console.log('got sse_registration request!')
      return registerClient(request)
   }
    
   ///////////////////////////////////////////////////
   //  A POST request: client is sending a message  //
   ///////////////////////////////////////////////////  
   else if (request.method === 'POST') {
      if (DEBUG) console.log('handling POST request!')
      return postMessage(request)
   }
    
   ///////////////////////////////////////////////////
   //           A file request: - send it           //
   /////////////////////////////////////////////////// 
   else {
      // the requested full-path (client folder?)
      const fullPath = (targetFolder.length > 0)
         ? join(Deno.cwd() + '\\' + targetFolder + pathname)
         : join(Deno.cwd() + pathname);
      console.log(`Serving ${fullPath}`); // show what was requested
      // find the file -> get the content -> return it in a response
      return serveFile(request, fullPath) //.substring(1));
   }
}
   
///////////////////////////////////////////////////
//       launch the browser with index.html      //
/////////////////////////////////////////////////// 
browser.start()

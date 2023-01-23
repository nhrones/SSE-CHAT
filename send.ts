import { DEBUG } from './constants.ts'

/** 
 * Server Sent Events
 * Subscribes a client to a Server Sent Event stream 
 * @param _req (Request) - the request object from the http request
 */
export function registerClient(req: Request): Response {
   // channel per connection
   const sseChannel = new BroadcastChannel("sse");

   if (DEBUG) console.info('Started SSE Stream! - ', req.url)

   const stream = new ReadableStream({
      start: (controller) => {

         // listening for bc messages
         sseChannel.onmessage = (e) => {
            const { topic, data } = e.data
            console.info(data)
            const { from, msg } = data
            if (DEBUG) console.log(`SSE BroadcastChannel got "${msg}" from ${from}!`)
            // pack it
            const reply = JSON.stringify({
               topic: topic,
               data: data
            })

            // send it
            controller.enqueue('data: ' + reply + '\n\n');

         }
      },
      cancel() {
         sseChannel.close();
      }
   })

   return new Response(stream.pipeThrough(new TextEncoderStream()), {
      headers: {
         "content-type": "text/event-stream",
         "Access-Control-Allow-Origin": "*",
         "Cache-Control": "no-cache"
      },
   })
}

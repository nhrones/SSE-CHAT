//////////////////////////////////////////////////////
//    POST a message to a common BroadcastChannel   //
//////////////////////////////////////////////////////
/** handler used to POST a message to a common BroadcastChannel, 
 * @param req (Request) - the original http request object
 * @returns (Promise<Response>) a required Response object 
 */
export async function postMessage(req: Request): Promise<Response> {
   const data = await req.json();
   //if (DEBUG) console.info('POST broadcasting: (' + (typeof data) + "): ", data)

   //////////////////////////////////////////////////////
   //         Our single use BroadcastChannel          //
   //////////////////////////////////////////////////////
   const bc = new BroadcastChannel("sse");
   bc.postMessage(data);
   bc.close();

   return new Response("", { status: 200 })
}
//////////////////////////////////////////////////////
//    POST a message to a common BroadcastChannel   //
//////////////////////////////////////////////////////

export async function postMessage(req: Request): Promise<Response> {
   const data = await req.json();

   //////////////////////////////////////////////////////
   //         Our single use BroadcastChannel          //
   //////////////////////////////////////////////////////
   const bc = new BroadcastChannel("sse");
   bc.postMessage(data);
   bc.close();

   return new Response("", { status: 200 })
}
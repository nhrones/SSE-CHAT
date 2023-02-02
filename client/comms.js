
import { display } from './dom.js'

// deno-lint-ignore-file
export const serverURL = "http://localhost:8080"

/** Post a message */
export const postMessage = (topic, from) => {
   fetch(serverURL + "/", {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({topic: topic, data:{from: from, msg:""}})
   });
};

// initialize our EventSource channel
export const initComms = (name) => {

   // this is our SSE client; we'll call her `events`
   const events = new EventSource(serverURL + "/sse_registration");

   display("CONNECTING");

   // on open; we'll notify UI
   events.addEventListener("open", () => {
      display("Connected to server ...")
      display(`Welcome ${name}!`)

      // register this user with peers
      postMessage('RegisterUser', name)
      document.title = name
   });

   // notify any state change events 
   events.addEventListener("error", (_e) => {
      switch (events.readyState) {
         case EventSource.OPEN:
            display("CONNECTED");
            break;
         case EventSource.CONNECTING:
            display("CONNECTING");
            break;
         case EventSource.CLOSED:
            reject("closed");
            display("DISCONNECTED");
            break;
      }
   });

   // messages from the server
   events.addEventListener("message", (evt) => {
      
      const { topic, data } = JSON.parse(evt.data)
      const { from, msg } = data
      
      console.info('got: ', data)
      
      if (from === name) from = 'Me';

      switch (topic) {

         // We'll get this unsolicited from the server
         case 'Registered':
            display(`Registered`);
            break;

         // A peer sends this to inform others    
         case 'RegisterUser':
            display(`        ${from} has joined!`)
            break;

         // A message from a chat peer      
         case 'msg': {
            display(`        ${from} << ${msg}`)
            break;
         }
         default:
            break;
      }

   });
};

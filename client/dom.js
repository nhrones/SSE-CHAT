import { serverURL } from './comms.js'

import { name } from './app.js'
let pre
let msgInput
let sendBtn

export const init = () => {
   pre = document.getElementById('pre')
   msgInput = document.getElementById('msg')

   msgInput.addEventListener('change', (e) => {
      sendIt(msg.value)
   })


   sendBtn = document.getElementById('send')
   sendBtn.addEventListener('click', (e) => {
      if (msgInput.value.length) sendIt(msgInput.value);
   })
   pre.textContent = ""
}

export const display = (what) => {
   pre.textContent = `${what}
` + pre.textContent;
}

const sendIt = (thisMsg) => {
   console.info('sending: ', thisMsg)
   if (msgInput.value.length > 0) {
      display(`${name} >> ${thisMsg}`)
      fetch(serverURL + "/", {
         method: "POST",
         mode: 'cors',
         body: JSON.stringify({topic: "msg", data:{from: name, msg: thisMsg}})
      });
      msgInput.value = ""
   }
}

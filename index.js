import { generateImagesLinks } from 'bimg';
import fs from 'fs';
import { Blob, FormData } from 'formdata-node';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Botly from 'botly';
import fetch from 'node-fetch';
import axios from 'axios';
import { toanime } from 'betabotz-tools';
import { exec } from 'child_process';
dotenv.config();
 
const app = express();
const PageID = "245492821986982";
let userStatus = {};
/*--------- page database ---------*/
const botly = new Botly({
  accessToken: 'EAAMjoLwZBS6EBO1t6BHj0h8qAN5OyCVQnjfCZAnZCBnZBS0317SZCOkDB9Axv05muVpykYueexNoEA5DT0h4jsNpsdBXsHN634laIQEZAPOUZBlfEtJZAUOSm4gxisihnf2itnwu8A0HDRdGyZAFZCcVZALpa1YhWMM1oSsAZBxzLkI8YHFJaUAywDugkjrTBZBClEWyq',
  verifyToken: '12345678',
  webHookPath: process.env.WB_PATH,
  notificationType: Botly.CONST.REGULAR,
  FB_URL: "https://graph.facebook.com/v18.0/",
});

/*--------- Functions ---------*/
app.get("/", function (_req, res) {
  res.sendStatus(200);
});
app.use(
  bodyParser.json({
    verify: botly.getVerifySignature('e899d98de2e864523b60b8903e3e1fd1'),
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/webhook", botly.router());
botly.on("message", async (senderId, message, data) => {
  //aaaaaaaaaaaaa
  botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.MARK_SEEN});
  botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.TYPING_ON});

  /*--------- s t a r t ---------*/
  if (message.message.text) {
    botly.sendText({id: senderId, text: "يرجى ارسال الصور فقط لتحويلها الى انيم ❤️"});
    } else if (message.message.attachments[0].payload.sticker_id) {
      botly.sendText({id: senderId, text: "(Y)"}) ;
    } else if (message.message.attachments[0].type == "image") {
        botly.sendText({id: senderId, text: "إنتظر دقيقة حتى أقوم بتحويل صورتك ❤️"});
    const attachment = message.message.attachments[0] 
            const url = attachment.payload.url;
            
    try {
    const to1 = 'https://skizo.tech/api/toanime?url=' + url + '&apikey=y6rsxtbase'
          botly.sendImage({
                  id: senderId,
                  url: to1,
                  is_reusable: true
              }, (err, data) => {
                  console.log("image sent");
              });
    } catch (a2) {
    const ress = await toanime(url)
    const to2 = ress.image_data
    botly.sendImage({
                  id: senderId,
                  url: to2,
                  is_reusable: true
              }, (err, data) => {
                  console.log("image sent");
              });
    }
    } else if (message.message.attachments[0].type == "audio") {
      botly.sendText({id: senderId, text: "يرجى ارسال الصور فقط ❤️"});
        } else if (message.message.attachments[0].type == "video") {
      botly.sendText({id: senderId, text: "يرجى ارسال الصور فقط ❤️"});
    }
  /*--------- e n d ---------*/
//botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.TYPING_OFF}); 
});
botly.on("postback", async (senderId, message, postback, data, ref) => {
 //aaaaaaaaaa
  botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.MARK_SEEN});
  //aaaaaaaa
  botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.TYPING_ON});
    /*--------- s t a r t ---------*/
    if (message.postback){ // Normal (buttons)
    if (postback == "GET_STARTED"){           botly.sendGeneric({id: senderId, elements: {
                title: "سعيد بلقاءك ❤️، انا هنا لتحويل كل صورك الى صور ابداعية 😍",
                image_url: "https://telegra.ph/file/77edfdf7b35823caf90f6.jpg",
                subtitle: "ارسل صورة لكي احوله الى انمي ❤️",
                buttons: [
                  botly.createPostbackButton("مطور البوت 🇲🇦😄", "Owner"),
                ]}, aspectRatio: Botly.CONST.IMAGE_ASPECT_RATIO.HORIZONTAL});
        
    } else if (postback == "Owner") {
        botly.sendGeneric({id: senderId, elements: {
           title: "Morocco AI",
           image_url: "https://telegra.ph/file/6db48bb667028c068d85a.jpg",
           subtitle: " اضغط لمتابعة الصفحة ❤️👇🏻",
           buttons: [
              botly.createWebURLButton("صفحة المطور 🇲🇦😄", "https://www.facebook.com/profile.php?id=100090780515885")]},
            aspectRatio: Botly.CONST.IMAGE_ASPECT_RATIO.HORIZONTAL});
      } else if (postback == "bots") {
      botly.sendText({id: senderId, text: `قائمة روبوتاتنا 🇲🇦😍`,
      quick_replies: [
         botly.createQuickReply("Atlas-GPT", "Atlas-GPT")]});
    }
  } else { // Quick Reply
   if (postback == "Owner") {
      botly.sendGeneric({id: senderId, elements: {
         title: "Morocco AI",
         image_url: "https://telegra.ph/file/6db48bb667028c068d85a.jpg",
         subtitle: "صفحة المطور 🇲🇦😄",
         buttons: [
            botly.createWebURLButton("مطور البوت 🇲🇦😍", "fb.com/Morocco.Openai")]},
          aspectRatio: Botly.CONST.IMAGE_ASPECT_RATIO.HORIZONTAL});
     }
  }
   /*--------- e n d ---------*/
 //aaaaa
  botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.TYPING_OFF});
});
/*------------- RESP -------------*/
botly.setGetStarted({pageId: PageID, payload: "GET_STARTED"});
botly.setGreetingText({
    pageId: PageID,
    greeting: [
      {
        locale: "default",
        text: "CatBot - Image Generator Bot\nهو روبوت لتحويل صورة الى انمي 😯\n❤️🇲🇦"
      }
    ]
  });
botly.setPersistentMenu({
    pageId: PageID,
    menu: [
        {
          locale: "default",
          composer_input_disabled: false,
          call_to_actions: [
            {
              type:  "web_url",
              title: "صفحة المطور 🇲🇦😄",
              url:   "fb.com/Morocco.Openai/",
              webview_height_ratio: "full"
            }
          ]
        }
      ]
  });
/*------------- RESP -------------*/
const port = 8080
//let serverLinkPrinted = false;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  /*const serveoProcess = exec('ssh -tt -i "./0" -o StrictHostKeyChecking=no -R fb-img:80:localhost:8080 serveo.net');

  serveoProcess.stdout.on('data', (data) => {
    const serveoLink = data.toString().trim();
    if (!serverLinkPrinted) {
      console.log(`Serveo link: ${serveoLink}`);
      serverLinkPrinted = true;
   }
  });

  serveoProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  serveoProcess.on('close', (code) => {
    console.log(`Serveo process exited with code ${code}`);
  });*/
});

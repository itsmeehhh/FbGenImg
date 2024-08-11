import fs from 'fs';
import { Blob, FormData } from 'formdata-node';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Botly from 'botly';
import fetch from 'node-fetch';
import axios from 'axios';
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
            const imageUrl = uploadImage(attachment.payload.url)
     processImage().then((url) => {
     //
  botly.sendImage({
                  id: senderId,
                  url: url,
                  is_reusable: true
              }, (err, data) => {
         botly.sendText({id: senderId, text: "نقوم باصلاح البوت الان ❤️\n انتظر حتى ننهي الاصلاح 🙏🏻"});
              });
              //
}).catch((error) => {
  console.error('Error:', error);
});
    
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
async function processImage() {
  
  try {
    const tobase64 = await imageUrlToBase64(imageUrl);

    const data = JSON.stringify({
      "image": `${tobase64}`
    });

    let config = {
      method: 'POST',
      url: 'https://www.drawever.com/api/tools/process',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; RMX3430 Build/SP1A.210812.016) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.186 Mobile Safari/537.36',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Content-Type': 'application/json',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Android WebView";v="126"',
        'sec-ch-ua-mobile': '?1',
        'path': '/ai/photo-to-anime',
        'sec-ch-ua-platform': '"Android"',
        'origin': 'https://www.drawever.com',
        'x-requested-with': 'mark.via.gp',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://www.drawever.com/ai/photo-to-anime?start=1723412154131',
        'accept-language': 'ar-MA,ar;q=0.9,en-MA;q=0.8,en-US;q=0.7,en;q=0.6',
        'priority': 'u=1, i',
        'Cookie': '...'},
      data: data
    };

    const response = await axios.request(config);
    const base64Data = response.data[1].replace(/^data:image\/jpeg;base64,/, "");

    const telegraphUrl = await uploadImage(`data:image/jpeg;base64,${base64Data}`);

    return telegraphUrl;
  } catch (error) {
    console.error('Error processing the image:', error);
  }
}

async function imageUrlToBase64(imgUrl) {
  try {
    const response = await axios.get(imgUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const imageBase64 = buffer.toString('base64');
    return `data:image/jpeg;base64,${imageBase64}`;
  } catch (error) {
    console.error('Error converting image URL to Base64:', error);
    throw error;
  }
}

async function uploadImage(base64Image) {
  try {
    const imageBuffer = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    let data = new FormData();
    data.append('file', imageBuffer, { filename: 'image.jpg' });

    let config = {
      method: 'POST',
      url: 'https://telegra.ph/upload',
      headers: {
        ...data.getHeaders()
      },
      data: data
    };

    const response = await axios(config);
    const fin = 'https://telegra.ph' + response.data[0].src;
    return fin;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

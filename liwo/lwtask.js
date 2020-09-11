//获取当前可参与的任务
//QX loon surge    

const $ = new Env('lwtask');
const taskName = '😊梨涡闲时任务提醒⏰点击通知直达闲时'
const Val = $.getval('CookieJD')
const url = "https://ms.jr.jd.com/gw/generic/bt/h5/m/queryLazyTaskList?time=-&reqData="
const option = {"open-url":"yocial://free_time"}

const review = encodeURI (url + JSON.stringify({"clientVersion":"4.1.0",
  "taskType":"2",
  "pageNo":1,
  "pageSize":10,
  "clientType":""}))
const invite = encodeURI (url + JSON.stringify({"clientVersion":"4.1.0",
  "taskType":"3",
  "pageNo":1,
  "pageSize":10,
  "clientType":""}))
const pick = encodeURI (url + JSON.stringify
    ({"clientVersion":"4.1.0",
     "taskType":"1",
     "pageNo":1,
     "pageSize":10,
     "clientType":""}))
const talk = encodeURI (url + JSON.stringify
   ({"clientVersion":"4.1.0",
     "taskType":"4",
     "pageNo":1,
     "pageSize":10,
     "clientType":""}))
const look = encodeURI (url + JSON.stringify
   ({"clientVersion":"4.1.0",
     "taskType":"7",
     "pageNo":1,
     "pageSize":10,
     "clientType":""}))

const headers = {"Accept": "application/json, text/plain, */*",
"Accept-Encoding": "gzip, deflate, br",
"Accept-Language": "zh-cn",
"Connection": "keep-alive",
"Cookie": Val,
"Host": "ms.jr.jd.com",
"Origin": "https://btfront.jd.com",
"Referer": "https://btfront.jd.com/release/zoneAuth/index.html?source=207&backURL=https%3A%2F%2Flwxianshi.jd.com%2FidleHours%2Findex.html%23%2Fbridge",
"User-Agent":"jdapp;iPhone;4.0.0;13.6.1;00e75528501feabe305085bd1d74f9ad2a49cc97;network/wifi;ADID/BDAE754C-5799-461C-B226-BC666A103CE1;model/iPhone8,4;appBuild/428;jdSupportDarkMode/0;pv/55.1;pap/(null)|(null)|IOS 13.5.1;apprpd/;psn/00e75528501feabe305085bd1d74f9ad2a49cc97|554;usc/;jdv/;umd/;psq/0;ucp/;app_device/IOS;utr/;ref/;adk/;ads/;Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/yocial",}

const header2 = {"Accept": "application/json, text/plain, */*",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "zh-cn",
  "Connection": "keep-alive",
  "Cookie": Val,
  "Host": "ms.jr.jd.com",
  "Origin": "https://btfront.jd.com",
  "Referer": "https://btfront.jd.com/release/growth/index.html?source=SYDBRK&lng=110.328383&lat=25.262626&sid=&un_area=",
  "User-Agent": "jdapp;iPhone;9.1.2;13.6.1;4216e3eb5d471450716807c479490761c4c4c5ab;network/wifi;ADID/0AF252D9-FB62-4177-9DE5-EEF1E3D4D5CB;supportApplePay/3;hasUPPay/1;pushNoticeIsOpen/0;model/iPhone8,4;addressid/2492304509;hasOCPay/0;appBuild/167361;supportBestPay/1;jdSupportDarkMode/0;pv/561.4;apprpd/MyJD_Main;ref/JDWebViewController;psq/3;ads/;psn/4216e3eb5d471450716807c479490761c4c4c5ab|825;jdv/0|iosapp|t_335139774|appshare|CopyURL|1598588445172|1598588452;adk/;app_device/IOS;pap/JA2015_311210|9.1.2|IOS 13.6.1;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",}

var params1 = {
    url:pick,
    headers:headers,
}

var params2 = {
    url:review,
    headers:headers,
}

var params3 = {
    url:invite,
    headers:headers,
}

var params4 = {
    url:talk,
    headers:headers,
}
var params5 = {
    url:look,
    headers:headers,
}


var message = ""
var active = ""
/*function dotask(){
   setTimeout(looklist(),10)
   setTimeout(picklist(),20)
   setTimeout(reviewlist(),30)
   setTimeout(talklist(),40)
   setTimeout(invitelist(),50)
   setTimeout(show(),60)
}*/

function gettip() {
  return new Promise((resolve) => {
    var nowtime = Date.now()
    var params = {
    url:"https://ms.jr.jd.com/gw/generic/bt/h5/m/queryBubble?_="+ nowtime +"&reqData=%7B%22req%22:%7B%22channelId%22:2,%22typeCode%22:%22interactive_bubble%22,%22size%22:1%7D%7D",
    headers:header2
    }
    $.get(params,
    (error,reponse,data) => {
      try {
        data = JSON.parse(data);
        if (data.resultCode == 0) {
        active += `🍄说：${data.resultData.bubbleInfoList[0].content}`
        $.log(active)
        }
       else{active +=`Github：@iisams 制作`}
      } catch (e) {
        $.log(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

function get_data(p){
  return new Promise((resolve)=>{
    setTimeout(() => {$.get(p,(error,response,data)=>{
      try{
        data = JSON.parse(data)
      }
      catch(e){
        $.log(e,response)
      }
      finally{
        resolve(data)
      }
    }
    )
   },10)
  }
 )
}

async function looklist(){
  const d = await get_data(params5)
  return new Promise((resolve)=>{
    var i
    const tasklist = d.resultData.data.queryTaskListInfo.taskInfoList
    try{
      for (i=0;i<tasklist.length;i++){
        if (tasklist[i].buttonColor == 1 && tasklist[i].stockTotalDaySurplus !==0) {
          var msg = (i+1)+"."+"👀【看看】"+ tasklist[i].taskName +" "+"💰"+ tasklist[i].unitPrice +"元 "+"🟢"+ tasklist[i].buttonStr + " 名额"+tasklist[i].stockTotalDaySurplus +`\n`
          message += msg
        }
      }
      $.log(JSON.stringify(tasklist))
    }catch(e){
      $.log(e)
    }finally{
      resolve(message)
    }
  }
  )
}

async function talklist(){
  const d = await get_data(params4)
  return new Promise((resolve)=>{
    var i
    const tasklist = d.resultData.data.queryTaskListInfo.taskInfoList
    try{
      for (i=0;i<tasklist.length;i++){
        if (tasklist[i].buttonColor == 1 && tasklist[i].stockTotalDaySurplus !==0) {
          var msg = (i+1)+"."+"📢【话题】"+ tasklist[i].taskName +" "+"💰"+ tasklist[i].unitPrice +"元 "+"🟢"+ tasklist[i].buttonStr + " 名额"+tasklist[i].stockTotalDaySurplus +`\n`
          message += msg
        }
      }
      $.log(JSON.stringify(tasklist))
    }catch(e){
      $.log(e)
    }finally{
      resolve(message)
    }
  }
  )
}

async function reviewlist(){
  const d = await get_data(params2)
  return new Promise((resolve)=>{
    var i
    const tasklist = d.resultData.data.queryTaskListInfo.taskInfoList
    try{
      for (i=0;i<tasklist.length;i++){
        if (tasklist[i].buttonColor == 1 && tasklist[i].stockTotalDaySurplus !==0) {
          var msg = (i+1)+"."+"🏷️【调研】"+ tasklist[i].taskName +" "+"💰"+ tasklist[i].unitPrice +"元 "+"🟢"+ tasklist[i].buttonStr + " 名额"+tasklist[i].stockTotalDaySurplus +`\n`
          message += msg
        }
      }
      $.log(JSON.stringify(tasklist))
    }catch(e){
      $.log(e)
    }finally{
      resolve(message)
    }
  }
  )
}

async function picklist(){
  const d = await get_data(params1)
  return new Promise((resolve)=>{
    var i
    const tasklist = d.resultData.data.queryTaskListInfo.taskInfoList
    try{
      for (i=0;i<tasklist.length;i++){
        if (tasklist[i].buttonColor == 1 && tasklist[i].stockTotalDaySurplus !==0) {
          var msg = (i+1)+"."+"✔【票选】"+ tasklist[i].taskName +" "+"💰"+ tasklist[i].unitPrice +"元 "+"🟢"+ tasklist[i].buttonStr + " 名额"+tasklist[i].stockTotalDaySurplus +`\n`
          message += msg
        }
      }
      $.log(JSON.stringify(tasklist))
    }catch(e){
      $.log(e)
    }finally{
      resolve(message)
    }
  }
  )
}

async function invitelist(){
  const d = await get_data(params3)
  return new Promise((resolve)=>{
    var i
    const tasklist = d.resultData.data.queryTaskListInfo.taskInfoList
    try{
      for (i=0;i<tasklist.length;i++){
        if (tasklist[i].buttonColor == 1 && tasklist[i].stockTotalDaySurplus !==0) {
          var msg = (i+1)+"."+"🔍【测评】"+ tasklist[i].taskName +" "+"💰"+ tasklist[i].unitPrice +"元 "+"🟢"+ tasklist[i].buttonStr + " 名额"+tasklist[i].stockTotalDaySurplus +`\n`
          message += msg
        }
      }
      $.log(JSON.stringify(tasklist))
    }catch(e){
      $.log(e)
    }finally{
      resolve(message)
    }
  }
  )
}

function show(){
  let subtitle = active
  $.log(message)
  if (message){
  $.msg(taskName,subtitle,message,option)
  }
  else return
}
  

async function dotask(){
  await Promise.all([
   looklist(),
   picklist(),
   reviewlist(),
   talklist(),
   //invitelist(),
   gettip()
  ]);
  await show()
}

dotask()




function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

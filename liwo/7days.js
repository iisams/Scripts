/*【Loon 2.1+ 脚本配置】
 * 梨涡app： https://bit.ly/33BRwHW
 * [Script]
 *
 *梨涡签到领现金
 *cron "7 0 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/7days.js,tag=梨涡签到领现金
 *http-request https:\/\/api\.m\.jd\.com\/api\/v1\/sign\/doSign script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/7dayscookie.js, requires-body=true, timeout=10, tag=梨涡签到领现金Cookie
 *
 *[MITM]
 *
 *hostname = api.m.jd.com
 */

 //支持QX loon surge

 const sams = new Env('梨涡签到领现金');
 const lwKey = 'CookieJD'
 const lwVal = sams.getdata(lwKey)
 const lwbodyKey = "Body"
 const lwbody = sams.getdata(lwbodyKey)
 const option = {"open-url":"yocial://webview/?url=https%3A%2F%2F2do.jd.com%2Fevents%2F7-days%2F%23%2F&login=1"}
 const option2 = {"open-url":"yocial://webview/?url=https%3A%2F%2Flwxianshi.jd.com%2FidleHours%2Findex.html%23%2Fwallet&login=1"}
 
 const header = {"Accept": "application/json, text/plain, */*","Accept-Encoding": "gzip, deflate, br","Accept-Language": "zh-cn","Connection": "keep-alive","Content-Length": "246","Content-Type": "application/x-www-form-urlencoded","Cookie": lwVal,"Host": "api.m.jd.com","Origin": "https://2do.jd.com","Referer": "https://2do.jd.com/events/7-days/","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/yocial,"}
 
 const nowtime = Date.now()
 const changebody = lwbody.replace(/(&t=)\d*/,"&t=" + nowtime)
 const resetboody =  changebody.replace(/v1_sign_doSign/,"v1_sign_resetSign")
 sams.log("刷新时间成功 "+"Time:" + nowtime )
 
 var params = {
     url:"https://api.m.jd.com/api/v1/sign/doSign",
     headers:header,
     body:changebody
 }
 
 var resetparams = {
     url:"https://api.m.jd.com/api/v1/sign/resetSign",
     headers:header,
     body:resetboody
 }
 
 var moneyparams = {
     url:"https://ms.jr.jd.com/gw/generic/bt/h5/m/queryUserAccount",
     headers:header
 }
 
 var money = ''
 var message = ''
 
 
 
 function getmoney() {
   return new Promise((resolve) => {
     sams.get(moneyparams,
     (error,reponse,data) => {
       try {
         data = JSON.parse(data);
         sams.log(data)
         if (data.resultCode == 0) {
         money += `💰钱包有${data.resultData.data.amount}元`
         }
        else{money +=`💰钱包余额获取失败`}
       } catch (e) {
         sams.log(e, resp);
       } finally {
         resolve(data);
       }
     })
   })
 }
 
 
 function sign() {
   return new Promise((resolve) => {
     sams.post(params,
     (error,reponse,data) => {
       try {
         result = JSON.parse(data);
         sams.log(result)
         if (result.status == true) {
          let subTitle = `💚签到成功\n`
          let detail = "✅" +result.data.message 
          message += subTitle+detail
          sams.log(detail)
       }
       //签过到了
       else if (result.status == false && result.error.code == 39002) {
          let subTitle = `💛您已签到\n`
          let detail = "❕" +result.error.message
          message += subTitle+detail
          sams.log(detail)
       }
      else if (result.status == false && result.error.code == 1007) {
          let subTitle = `😈登陆失效\n`
          let detail = "❕" +result.error.message
          message += subTitle+detail
           sams.log(detail)
       }
       //重新新一轮签到
       else if (result.status == false  && result.error.code == 39004) {
         setTimeout(resetSign(),500)
         sams.log("重新新一轮签到")
        }
       //失败
       else {
          let subTitle = `💔失败详情\n`
          let detail = "❗" +result
          message += subTitle+detail
          sams.log(detail)
        }
       } catch (e) {
         sams.log(e, resp);
       } finally {
         resolve(data);
       }
     })
   })
 }
 
 
  
            
  function resetSign() {
    return new Promise((resolve) => {
      sams.post(resetparams,
      (error,reponse,data) => {
        try {
          result = JSON.parse(data);
          sams.log(result)
          if (result.status == true) {
           let subTitle = `💚Reset签到成功\n`
           let detail = "✅" +result.data.message 
           message += subTitle+detail
           sams.log(detail)
        }
        //签过到了
        else if (result.status == false && result.error.code == 39002) {
           let subTitle = `💛您已签到\n`
           let detail = "❕" +result.error.message
          message += subTitle+detail
           sams.log(detail)
        }
       else if (result.status == false && result.error.code == 1007) {
           let subTitle = `😈登陆失效\n`
           let detail = "❕" +result.error.message
           message += subTitle+detail
            sams.log(detail)
        }
        
        //失败
        else {
           let subTitle = `💔失败详情\n`
           let detail = "❗" +result
           message += subTitle+detail
           sams.log(detail)
         }
        } catch (e) {
          sams.log(e, resp);
        } finally {
          resolve(data);
        }
      })
    })
  }
  
  function show(){
    let title = "梨涡签到领现金"
    sams.msg(title,money,message,option)
  }
   
   
   async function dotask() {
   await sign();
   await getmoney();
   await show()
 }
 
 dotask() 

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

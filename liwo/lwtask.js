//获取当前可参与的任务
//QX loon surge    

const sams = init()
const taskName = '😊梨涡闲时任务提醒⏰点击通知直达闲时'
const Val = sams.getdata('CookieJD')
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
"Cookie": Val,"Host": "ms.jr.jd.com",
"Origin": "https://btfront.jd.com",
"Referer": "https://btfront.jd.com/release/zoneAuth/index.html?source=207&backURL=https%3A%2F%2Flwxianshi.jd.com%2FidleHours%2Findex.html%23%2Fbridge",
"User-Agent":"jdapp;iPhone;4.0.0;13.5.1;00e75528501feabe305085bd1d74f9ad2a49cc97;network/wifi;ADID/BDAE754C-5799-461C-B226-BC666A103CE1;model/iPhone8,4;appBuild/428;jdSupportDarkMode/0;pv/55.1;pap/(null)|(null)|IOS 13.5.1;apprpd/;psn/00e75528501feabe305085bd1d74f9ad2a49cc97|554;usc/;jdv/;umd/;psq/0;ucp/;app_device/IOS;utr/;ref/;adk/;ads/;Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/yocial",}

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

/*var lookmsg = "【看看】\n"
var pickmsg = "【票选】\n"
var talkmsg = "【话题】\n"
var reviewmsg = "【调研】\n"
var invitemsg = "【测评】\n"
var message = ""
*/



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
    headers:headers
    }
    sams.get(params,
    (error,reponse,data) => {
      try {
        data = JSON.parse(data);
        if (data.resultCode == 0) {
        active += `🍄小蘑菇说：${data.resultData.bubbleInfoList[0].content}`
        sams.log(active)
        }
       else{active +=`Github：@iisams 制作`}
      } catch (e) {
        sams.log(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

function get_data(p){
  return new Promise((resolve)=>{
    sams.get(p,(error,response,data)=>{
      try{
        data = JSON.parse(data)
      }
      catch(e){
        sams.log(e,response)
      }
      finally{
        resolve(data)
      }
    }
    )
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
      sams.log(JSON.stringify(tasklist))
    }catch(e){
      sams.log(e)
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
      sams.log(JSON.stringify(tasklist))
    }catch(e){
      sams.log(e)
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
      sams.log(JSON.stringify(tasklist))
    }catch(e){
      sams.log(e)
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
      sams.log(JSON.stringify(tasklist))
    }catch(e){
      sams.log(e)
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
      sams.log(JSON.stringify(tasklist))
    }catch(e){
      sams.log(e)
    }finally{
      resolve(message)
    }
  }
  )
}

function show(){
  let subtitle = active
  sams.log(message)
  if (message){
  sams.msg(taskName,subtitle,message,option)
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

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body, option) => {
    if (isSurge()) $notification.post(title, subtitle, body, option["open-url"])
    if (isQuanX()) $notify(title, subtitle, body, option)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return {
    isSurge,
    isQuanX,
    msg,
    log,
    getdata,
    setdata,
    get,
    post,
    done
  }
}

$done({})

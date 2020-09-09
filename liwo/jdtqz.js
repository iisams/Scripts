//使用nobyda大佬的jdcookie
// cron "5 8 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdtqz.js, tag= 京东特权值


const sams = init()
let Val = sams.getdata('CookieJD')
const headers ={"Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": Val,
                "Host": "ms.jr.jd.com",
                "Origin": "https://btfront.jd.com",
                "Referer": "https://btfront.jd.com/release/growth/index.html",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1",}
                
var taskid = []
var taskname = []
var signinfo=[]

var message=""
var taskmsg = ""
const option = {"open-url":"openapp.jdmobile://virtual?params=%7B%22category%22:%22jump%22,%22des%22:%22m%22,%22url%22:%22https%3A%2F%2Fbtfront.jd.com%2Frelease%2Fgrowth%2Findex.html%23%2Fhome%22%7D"}


function userinfo() {
  return new Promise((resolve) => {
    var userparams = {
      url:"https://ms.jr.jd.com/gw/generic/bt/h5/m/queryEcologicUserInfo",
      headers:headers,
      body:"reqData={}"
    }
    sams.post(userparams,
    (error,reponse,data) => {
      try {
        data = JSON.parse(data);
        sams.log(JSON.stringify(data))
        if (data.resultCode == 0) {
          var list = data.resultData.ecologicUserInfo
          taskmsg += `👤『用户』${list.pin}\n🎖『活力值』${list.ecologicScore}\n🔰『等级』Lv${list.scoreLevel}\n`
          sams.log("获取用户信息成功:"+usermsg)
        }
       else{taskmsg += null}
      } catch (e) {
        sams.log(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

function gettaskid() {
  return new Promise((resolve) => {
    var nowtime = Date.now()
    var taskparams = {
      url:"https://ms.jr.jd.com/gw/generic/bt/h5/m/taskStatistics?_="+nowtime+"&reqData=%7B%22req%22:%7B%22pageSize%22:50,%22channelId%22:3%7D%7D",
      headers:headers
    }
    sams.get(taskparams,
    (error,reponse,data) => {
      try {
        data = JSON.parse(data);
        sams.log(JSON.stringify(data))
        sams.log("正在获取taskID")
        if (data.resultCode == 0) {
          var list = data.resultData.taskList
          for (var i in list) {
            taskid.push(list[i].taskId)
            taskname.push(list[i].subTitle)
          }
          sams.log("获取taskID和taskName成功:"+taskid+" \n "+taskname)
        }
       else{taskid += null}
      } catch (e) {
        sams.log(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

function dotaskid(id) {
  return new Promise((resolve) => {
    var dotaskparams = {
      url:"https://ms.jr.jd.com/gw/generic/bt/h5/m/doSpecifyClick?reqData=%7B%22req%22:%7B%22taskId%22:"+id+"%7D%7D",
      headers:headers
    }
    sams.get(dotaskparams,
    (error,reponse,data) => {
      try{
        data = JSON.parse(data)
      }
      catch(e){
        sams.log(e,response)
      }
      finally{
        resolve(data)
      }
    })
  })
}

function getsigninfo(){
  return new Promise((resolve)=>{
    var nowtime = Date.now()
    var params = {
      url:"https://ms.jr.jd.com/gw/generic/bt/h5/m/queryMailboxList?_="+nowtime+"&reqData=%7B%22req%22:%7B%22msgGroup%22:2,%22readStatus%22:0,%22bizSource%22:%222%22,%22pageSize%22:4%7D%7D",
      headers:headers
    }
    sams.get(params,(error,response,data)=>{
      try{
        data = JSON.parse(data)
        var d = data.resultData.list
        var i
          for (i=0;i<d.length;i++){
            if (d.length !== 0 ){
              signinfo.push({
                "bizGroup":d[i].bizGroup,
                "bizType":d[i].bizType,
                "msgName":d[i].msgName,
                "id":d[i].id,
                "uuid":d[i].uuid
              })
            }
          }
       sams.log(signinfo)
      }catch(e){sams.log(e,response)
      }finally{
        resolve(data)
        }
    }
    )
  }
  )
}

function dosigninfo(uuid,bizGroup,bizType){
  return new Promise((resolve) => {
      var params = {
        url:"https://ms.jr.jd.com/gw/generic/bt/h5/m/readMailbox?reqData=%7B%22req%22:%7B%22uuid%22:%22"+uuid+"%22,%22bizGroup%22:"+bizGroup+",%22bizType%22:"+bizType+"%7D%7D",
        headers:headers
      }
      sams.get(params,
      (error,reponse,data) => {
        try{
          data = JSON.parse(data)
        }
        catch(e){
          sams.log(e,response)
        }
        finally{
          resolve(data)
        }
      })
    })
}

async function doingsign(){
  await getsigninfo()
  if (signinfo.length !== 0){
    sams.log("正在领取任务")
    for (var i in signinfo){
      let d = await dosigninfo(signinfo[i].uuid,signinfo[i].bizGroup,signinfo[i].bizType)
      if (d.resultCode == 0){
        let subTitle = `❤领取${signinfo[i].msgName}活力值结果${d.resultData.info}\n`
        taskmsg += subTitle
        sams.log(subTitle)
      }
    }
  }
  else return
}

async function doing(){
  if (taskid){
    sams.log("正在逐个处理任务")
    for (var i in taskid){
       let d = await dotaskid(taskid[i]) 
       if (d.resultCode == 0) {
          let subTitle = `❤浏览${taskname[i]}${d.resultData.info}\n`
          taskmsg += subTitle
          sams.log(subTitle)
        }
    }
  }
else return
}


function Sign() {
  return new Promise((resolve) => {
    const signparams ={
         url:'https://ms.jr.jd.com/gw/generic/bt/h5/m/doSign?reqData=%7B%7D',
         headers:headers,
     }
    sams.get(signparams,
    (error,reponse,data) => {
      try {
        data = JSON.parse(data);
        if (data.resultCode == 0 && data.resultMsg == '操作成功') {
                subTitle = `❤特权活力值签到成功\n`
                message += subTitle
                sams.log(JSON.stringify(data))
              } else if (data.resultCode == 3) {
                  subTitle = `💔签到失败,请重新获取cookie\n`
                  message += subTitle
                  sams.log(JSON.stringify(data))
              } else {
                subTitle = `未知`
                detail = `❗ ${data.resultrMsg}\n`
                message += subTitle+detail
                sams.log(JSON.stringify(data))
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
    let title = "京东特权活力值签到并领取"
    sams.msg(title,message,taskmsg,option)
}

async function dotask() {
  await Sign();
  await gettaskid();
  await doing()
  await getsigninfo()
  await doingsign()
  await userinfo()
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

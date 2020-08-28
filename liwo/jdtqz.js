//使用jdcookie
// cron "5 8 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdtqz.js, tag= 京东特权值
// cron "0 0-22 * * *" tag=京东梨涡任务查看, script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/lwtask.js
//http-request https:\/\/api\.m\.jd\.com\/client\.action.*functionId=signBean tag=获取京东Cookie, script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdcookie.js

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
                
const signurl = 'https://ms.jr.jd.com/gw/generic/bt/h5/m/doSign?reqData=%7B%7D'
const nowtime = Date.now()
var taskid = []
var taskname = []
var message=""
var taskmsg = ""

var taskparams = {
  url:"https://ms.jr.jd.com/gw/generic/bt/h5/m/taskStatistics?_="+nowtime+"&reqData=%7B%22req%22:%7B%22pageSize%22:50,%22channelId%22:3%7D%7D",
  headers:headers
}

const signparams ={
     url:signurl,
     headers:headers,
 }

async function dotask() {
  await Sign();
  await gettaskid();
  await doing()
  await show()
}

dotask()

function gettaskid() {
  return new Promise((resolve) => {
    sams.get(taskparams,
    (error,reponse,data) => {
      try {
        data = JSON.parse(data);
        sams.log(data)
        sams.log("正在获取taskID")
        if (data.resultCode == 0) {
          var list = data.resultData.taskList
          for (var i in list) {
            taskid.push(list[i].taskId)
            taskname.push(list[i].subTitle)
          }
          sams.log("获取taskID和taskName成功:"+taskid+" | "+taskname)
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
      try {
        data = JSON.parse(data);
        if (data.resultCode == 0) {
          let subTitle = id+`>>执行任务${data.resultData.info}\n`
          sams.log(subTitle)
        }
       else{sams.log("没有任务或任务失败\n")}
      } catch (e) {
        sams.log(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

function doing(){
    if (taskid){
    sams.log("正在逐个处理任务")
    for (var i in taskid){
       var n = taskid[i]
       dotaskid(n)
       taskmsg += `❤完成浏览${taskname[i]}`
    }
  }
 else return
}


function Sign() {
  return new Promise((resolve) => {
    sams.get(signparams,
    (error,reponse,data) => {
      try {
        data = JSON.parse(data);
        if (data.resultCode == 0 && data.resultMsg == '操作成功') {
                subTitle = `❤签到成功\n`
                message += subTitle
                sams.log(data)
              } else if (data.resultCode == 3) {
                  subTitle = `💔签到失败,请重新获取cookie\n`
                  message += subTitle
                  sams.log(data)
              } else {
                subTitle = `未知`
                detail = `❗ ${data.resultrMsg}\n`
                message += subTitle+detail
                sams.log(data)
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
    let title = "京东特权活力值签到"
    sams.msg(title,message,taskmsg)
}

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
    msg = (title, subtitle, body) => {
      if (isSurge()) $notification.post(title, subtitle, body)
      if (isQuanX()) $notify(title, subtitle, body)
    }
    log = (message) => console.log(message)
    get = (url, cb) => {
      if (isSurge()) {
        $httpClient.get(url, cb)
      }
      if (isQuanX()) {
        url.method = 'GET'
        $task.fetch(url).then((resp) => cb(null, {}, resp.body))
      }
    }
    post = (url, cb) => {
      if (isSurge()) {
        $httpClient.post(url, cb)
      }
      if (isQuanX()) {
        url.method = 'POST'
        $task.fetch(url).then((resp) => cb(null, {}, resp.body))
      }
    }
    done = (value = {}) => {
      $done(value)
    }
    return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
  }



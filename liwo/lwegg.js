//这是梨涡每天10点的扭蛋机抽奖，有时会抽到立减支付券，撸羊毛挺合适，欢迎每天早上10点测试一下
//cron "0 10 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/lwegg.js, tag=梨涡10点扭蛋机



const $ = init()
const taskName = '😊梨涡10点天天扭蛋'
const eggVal = $.getdata('CookieJD')
const url = "https://ms.jr.jd.com/gw/generic/syh_yxmx/h5/m/getLuckDraw"
const option = {"open-url":"yocial://webview/?url=https%3A%2F%2Fm.jr.jd.com%2Fmember%2Fmc%2F"}
const header = {"Accept": "application/json, text/plain, */*","Accept-Encoding": "gzip, deflate, br","Accept-Language": "zh-cn","Connection": "keep-alive","Content-Length": "70","Content-Type": "application/x-www-form-urlencoded;charset=UTF-8","Cookie": eggVal,"Host": "ms.jr.jd.com","Origin": "https://jddb.jd.com","Referer": "https://jddb.jd.com/m/gashapon/index.html?sceneId=219&id=656","User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/yocial/5.1.2(iOS;14.0.1;com.jd.campustodo)",}

var message = ""

function dotask() {
  return new Promise((resolve) => {
    var params = {
    url:url,
    headers:header,
    body:`reqData={"sceneId":"219","activityId":"656"}`
    }
    $.post(params,
    (error,reponse,data) => {
      try {
        data = JSON.parse(data);
        $.log(JSON.stringify(data))
        if (data.resultCode == 0 && data.resultData.luckDrawType==1) {
        message += `恭喜获得${data.resultData.couponList[0].prizeName} ${data.resultData.couponList[0].assignedAmount} 点击通知查看优惠券`
        $.log(message)
        }
       else{message +=`已经抽过了或者抽完了 点击通知查看优惠券`}
      } catch (e) {
        $.log(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

function show(){
  let subtitle=""
  $.log(message)
  $.msg(taskName,subtitle,message,option)
}

async function doing() {
  await dotask()
  await show()
}

doing()

//ignore
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

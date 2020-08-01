//使用liwocookie
// cron "5 8 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdtqz.js, tag= 京东特权值
// cron "0 0-22 * * *" tag=京东梨涡任务查看, script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/lwtask.js
//http-request https:\/\/api\.m\.jd\.com\/client\.action.*functionId=signBean tag=获取京东Cookie, script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdcookie.js

const cookieName ='京东特权值'
const Key = 'CookieJD'
const sams = init()
let Val = sams.getdata(Key)
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
const params ={
    url:signurl,
    headers:headers,
}

sign()

function sign() {
    sams.get(params, (error, response, data) => {
      const result = JSON.parse(data)
      const title = `${cookieName}`
      let subTitle = ``
      let detail = ``
      if (result.resultCode == 0 && result.resultMsg == '操作成功') {
        subTitle = `❤京东特权值签到成功`
        sams.log(result)
      } else if (result.resultCode == 3) {
          subTitle = `💔京东特权值签到失败,请重新获取cookie`
          sams.log(result)
      } else {
        subTitle = `未知`
        detail = `❗ ${result.resultrMsg}`
        sams.log(result)
      }
      sams.msg(title, subTitle, detail)
    })
    sams.done()
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

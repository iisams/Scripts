/*【Loon 2.1+ 脚本配置】 
 *梨涡app下载⏬：https://bit.ly/33BRwHW
 * [Script]
 *梨涡签到领现金
 *cron "7 0 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/7days.js,tag=梨涡签到领现金
 *http-request https:\/\/api\.m\.jd\.com\/api\/v1\/sign\/doSign script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/7dayscookie.js, requires-body=true, timeout=10, tag=梨涡签到领现金Cookie
 *
 * [MITM]
 *
 *hostname = api.m.jd.com
 */
 
 //支持QX loon surge
const CookieName = '😀梨涡签到领钱'
const sams = init()
const lwKey = 'liwo'
const lwVal = $request.headers['Cookie']
const lwbody = $request.body
const lwbodyKey = "Body"

if (lwVal && lwbody){
  let cookie = sams.setdata(lwVal, lwKey)
  let body = sams.setdata(lwbody, lwbodyKey)
  let msg = `${CookieName}`
  if (cookie && body){
    sams.msg(msg, '❤梨涡签到写入成功', '详见日志')
    sams.log(msg)
    sams.log(lwVal)
    sams.log(lwbody)
    $done({})
    
  }
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

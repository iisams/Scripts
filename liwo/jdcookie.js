/*本获取京东cookie同样适用特权值签到与闲时任务提醒
 * 我的梨涡邀请码：dasaw
 * 邀请链接 http://2do.jd.com/events/red-envelopes/?inviter=1236228340192960513&channel=cash&extParam=1260048962852974594#/
 * 进野比大佬的京东京豆签到 bean.m.jd.com 再签到一下就能获取cookie了。
 *           ------------     已弃用（直接使用野比大佬的jdcookie）       -------------
 * 【Loon 2.1+ 脚本配置】:
 *
 * [Script]
 * cron "5 8 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdtqz.js, tag= 京东特权值
 * cron "0 0-22 * * *" tag=京东梨涡任务查看, script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/lwtask.js
 * http-request https:\/\/api\.m\.jd\.com\/client\.action.*functionId=signBean tag=获取京东Cookie, script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdcookie.js
 *
 * [MITM]
 *
 * hostname = api.m.jd.com
 */


const cookieName = '京东特权值、梨涡闲时任务'
const Key = 'CookieJD'
const sams = init()
const Val = $request.headers['Cookie']

if (Val) {
  if (sams.setdata(Val, Key)) {
    sams.msg(`${cookieName}`, '❤获取Cookie成功', '')
    sams.log(`[${cookieName}] ❤获取Cookie: 成功, cookie: ${Val}`)
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
 sams.done()

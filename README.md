# Sams Scripts 


![梨涡](https://raw.githubusercontent.com/bokuosusume/JavaScript/master/liwo/png/liwo.png)
## 梨涡（京东大学生特权app）的闲时任务提醒 与 签到
邀请码：dasaw  

 jdcookie 进 bean.m.jd.com 再签到下就可获取了；梨涡的签到签到一次就可以获取了。

[下载链接]( http://2do.jd.com/events/red-envelopes/?inviter=1236228340192960513&channel=cash&extParam=1260048962852974594#/)
[下载链接](https://bit.ly/33BRwHW)
[下载链接]( https://bit.ly/33BRwHW)
[下载链接](https://bit.ly/33BRwHW)
```properties
支持QX Loon Surge 其余自行配置

【Loon 2.1+ 脚本配置】

[Script]  

cron "5 8 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdtqz.js, tag= 京东特权活力值

cron "*/30 0-22 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/lwtask.js, tag=京东梨涡闲时任务提醒

cron "14,7 0 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/7days.js,tag=梨涡签到领现金

http-request https:\/\/api\.m\.jd\.com\/api\/v1\/sign\/doSign script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/7dayscookie.js, requires-body=true, timeout=10, tag=梨涡签到领现金Cookie

http-request https:\/\/api\.m\.jd\.com\/client\.action.*functionId=signBean script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdcookie.js, tag=获取京东Cookie

[MITM]  

hostname = api.m.jd.com


【QX远程 脚本配置】

[task_local]

*/5 0-22 * * * https://raw.githubusercontent.com/iisams/Scripts/master/liwo/lwtask.js, tag=梨涡闲时任务提醒, img-url=https://raw.githubusercontent.com/iisams/Scripts/master/png/liwoicon.png, enabled=true
21,8,2 8 * * * https://raw.githubusercontent.com/iisams/Scripts/master/liwo/7days.js, tag=梨涡签到领现金, img-url=https://raw.githubusercontent.com/iisams/Scripts/master/png/liwoicon.png, enabled=true
6 8 * * * https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdtqz.js, tag=京东特权活力值, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/jdczf.png, enabled=true

```

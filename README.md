# Sams Scripts 


![梨涡](https://raw.githubusercontent.com/bokuosusume/JavaScript/master/liwo/png/liwo.png)
## 梨涡（京东大学生特权app）的闲时任务查看与提醒
邀请码：dasaw 

[下载链接]( http://2do.jd.com/events/red-envelopes/?inviter=1236228340192960513&channel=cash&extParam=1260048962852974594#/)
[下载链接](https://2do.jd.com/events/red-envelopes2?inviter=1236228340192960513&channel=cash&extParam=1260048962852974594#/)
```properties
支持QX Loon Surge 其余自行配置

【Loon 2.1+ 脚本配置】

[Script]  

cron "5 8 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdtqz.js, tag= 京东特权活力值

cron "0 0-22 * * *" tag=京东梨涡闲时任务提醒, script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/lwtask.js

cron "7 0 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/7days.js,tag=梨涡签到领现金

http-request https:\/\/api\.m\.jd\.com\/api\/v1\/sign\/doSign script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/7dayscookie.js, requires-body=true, timeout=10, tag=梨涡签到领现金Cookie

http-request https:\/\/api\.m\.jd\.com\/client\.action.*functionId=signBean tag=获取京东Cookie, script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdcookie.js

[MITM]  

hostname = api.m.jd.com
```

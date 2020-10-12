# Sams Scripts 


![梨涡](https://raw.githubusercontent.com/bokuosusume/JavaScript/master/liwo/png/liwo.png)
## 梨涡App的闲时任务提醒、签到以及京东特权活力值签到领取
邀请码：dasaw  

 使用nobyda大佬的京东cookie

[下载链接]( https://2do.jd.com/events/invite_award/?channel=newcash&extParam=1260048962852974594&inviter=1236228340192960513)
[下载链接](https://2do.jd.com/events/invite_award/?channel=newcash&extParam=1260048962852974594&inviter=1236228340192960513)
[下载链接]( https://2do.jd.com/events/invite_award/?channel=newcash&extParam=1260048962852974594&inviter=1236228340192960513)
[下载链接](https://2do.jd.com/events/invite_award/?channel=newcash&extParam=1260048962852974594&inviter=1236228340192960513)
```properties
支持QX Loon Surge 其余自行配置

【Loon 2.1+ 脚本配置】

[Script]  

cron "5 8 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdtqz.js, tag= 京东特权活力值

cron "*/5 1-22 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/lwtask.js, tag=京东梨涡闲时任务提醒

cron "7 0 * * *" script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/7days.js,tag=梨涡签到领现金

http-request https:\/\/api\.m\.jd\.com\/api\/v1\/sign\/doSign script-path=https://raw.githubusercontent.com/iisams/Scripts/master/liwo/7dayscookie.js, requires-body=true, timeout=10, tag=梨涡签到领现金Cookie


[MITM]  

hostname = api.m.jd.com


【QX远程 脚本配置】

cookie获取重写订阅：  https://raw.githubusercontent.com/iisams/Scripts/master/QXcookie.conf 

[task_local]

*/5 0-22 * * * https://raw.githubusercontent.com/iisams/Scripts/master/liwo/lwtask.js, tag=梨涡闲时任务提醒, img-url=https://raw.githubusercontent.com/iisams/Scripts/master/png/liwoicon.png, enabled=true
17 0 * * * https://raw.githubusercontent.com/iisams/Scripts/master/liwo/7days.js, tag=梨涡签到领现金, img-url=https://raw.githubusercontent.com/iisams/Scripts/master/png/liwoicon.png, enabled=true
6 8 * * * https://raw.githubusercontent.com/iisams/Scripts/master/liwo/jdtqz.js, tag=京东特权活力值, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/jdczf.png, enabled=true

```


# 抽奖事件

> 数据格式，前端上传给后台服务
> 事件名：directiveEvent

```
data
├── scene                                   // 场景值，字符串，  0001：签到   0002：奖品抽奖   0003：随机大抽奖
├── type                                    // 操作类型，字符串，0：停止  1：开始  2：展示
├── title                                   // 标题名称
├── number                                  // 抽奖人数

```

> 数据格式，后台服务给前端
> 事件名：directiveEvent

```
data
├── code                                    // 操作标志  字符串， 0000：成功   9999：失败
├── message                                 // 操作提示信息，字符串
├── data                                    // 数据
|   ├── scene                               // 场景值，字符串，  0001：签到   0002：奖品抽奖   0003：随机大抽奖
|   ├── type                                // 操作类型，字符串，0：停止  1：开始  2：展示
|   ├── title                               // 标题名称
|   ├── number                              // 抽奖人数

```
签到信息上送接口：
http://192.180.51.111:8080/lottery/user_sign
post请求
参数示例：
{
	"user": {
		"updateTimeEnd": null,
		"openId": null,
		"nickName": "用户001",
		"signStatus": null,
		"updateTime": null,
		"lotteryType": null,
		"checkCode": null,
		"headImgUrl": null,
		"createTime": null,
		"winStatus1": null,
		"updateTimeBegin": null,
		"id": "1111",
		"winStatus3": null,
		"winStatus2": null
	},
	"nums": 10
}

返回：{"0000":"操作成功"},{"9999","操作失败"}




websocket测试地址：192.180.51.111:9090

控制台口令：666
大屏幕口令：000


返回操作码：
0000：操作成功
9999：操作失败


登录事件：loginEvent
请求参数示例：{"password":"000"}
返回结果：{"0000":"login success"},{"9999","非法登录"}


模拟用户签到操作：
http://192.180.51.111:8080/lottery/user_sign_test
（浏览器访问该地址后，服务端向控制台推送总签到人数，向客户端推送当前签到用户信息）

签到事件：signEvent
服务端推送消息
控制台接收签到总人数：{"nums":10}
大屏幕接收签到人详细信息：
{
	"updateTimeEnd": null,
	"openId": null,
	"nickName": "幸运观众2",
	"signStatus": null,
	"updateTime": null,
	"checkCode": null,
	"headImgUrl": null,
	"createTime": null,
	"winStatus1": null,
	"updateTimeBegin": null,
	"id": "002",
	"winStatus3": null,
	"winStatus2": null
}



控制台与大屏幕交互通用事件

控制器指令触发事件：consoleSendEvent
控制台发送指令，触发大屏幕展示信息
请求参数示例：
{
	"scene": "0001",
	"type": "2",
	"title": "特等奖",
	"number": "1"
}
控制台返回：{"0000":"操作成功"},{"9999","操作失败"}


大屏幕信息接收事件：screenAcceptEvent
大屏幕展示信息
{
	"scene": "0001",
	"type": "2",
	"title": "特等奖",
	"number": "1"
}

scene; // 场景值，字符串， 0001：签到 0002：奖品抽奖 0003：随机大抽奖
type; // 操作类型，字符串，0：停止 1：开始 2：展示
title; // 标题名称
number; // 抽奖人数


抽奖事件：luckEvent
控制台发送抽奖请求

请求参数示例：{"nums":"2","type":"2"}
抽奖类型：
1:顺序奖；2:随机奖

控制台返回：{"0000":"抽奖操作成功"},{"9999","抽奖操作失败"}



抽奖展示事件：luckShowEvent
控制台返回中奖人信息：
[{
	"updateTimeEnd": null,
	"openId": null,
	"nickName": "幸运观众2",
	"signStatus": null,
	"updateTime": null,
	"checkCode": null,
	"headImgUrl": null,
	"createTime": null,
	"winStatus1": null,
	"updateTimeBegin": null,
	"id": "002",
	"winStatus3": null,
	"winStatus2": null
}, {
	"updateTimeEnd": null,
	"openId": null,
	"nickName": null,
	"signStatus": null,
	"updateTime": null,
	"checkCode": null,
	"headImgUrl": null,
	"createTime": null,
	"winStatus1": null,
	"updateTimeBegin": null,
	"id": null,
	"winStatus3": null,
	"winStatus2": null
}]

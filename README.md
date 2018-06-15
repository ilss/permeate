# 渗透界面特效区域
```
预览方法：
讲publish下html5 目录里的文件放入webserver下运行，外部目录的为源码。
```
---
> 配置路径点坐标：
```
./src/config.js
初始化区域：
{  
    block_id: '000555', 
    block_name: '管理区', 
    server: [
        {server_id: 's00001'},
        {server_id: 's00001'}
        ],
        team: {
          group_id: 't00001',
          title: '成功击破'
        }
}
```

---
> 添加新区域：
>
> MAIN_PERMEATE_SCENE.PERMEATE_ADD_BLOCK(block_data)
```
* @desc 向舞台添加新的区域
* @param {object} block_data     
{  
    block_id: '000555', 
    block_name: '管理区', 
    server: [
        {server_id: 's00001'},
        {server_id: 's00001'}
        ],
        team: {
          group_id: 't00001',
          title: '成功击破'
        }
}
```
---

> Team渗透Server
> 
> MAIN_PERMEATE_SCENE.TEAM_ATTACK_SERVER(team_attack_data)
```
* @param {array} team_attack_data   
attack_completed  和  coin  为完成渗透时加入 否则不要加入这两个参数 
[
  { group_id: 't00002', group_name: 't00002', group_icon: '', attack_block_id: '000001', attack_server_id: 's00002', attack_completed: true, coin: 25 }
  ]   
```
---

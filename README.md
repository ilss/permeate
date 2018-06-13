cocos2d-Js 攻击特效

预览方法：
讲publish下html5 目录里的文件放入webserver下运行，外部目录的为源码。
---------------------------------------------------------------------------
配置路径点坐标：
./src/config.js

---------------------------------------------------------------------------
添加新区域：
 /**
* @func 
* @desc 向舞台添加新的区域
* @param {object} block_data     {  id: '000555', name: '管理区', server: [{id: 's00001'},{id: 's00001'}...]}
*/

PERMEATE_ADD_BLOCK(block_data)
---------------------------------------------------------------------------

Team渗透Server
 /**
* @func 
* @desc Team 开始渗透 Server
* @param {object} team_attack_data    { id: 't00002', name: 't00002', icon: '', attack_block_id: '000001', attack_server_id: 's00002', attack_completed: true, coin: 25 }   attack_completed  和  coin  为完成渗透时加入 否则不要加入这两个参数
*/
TEAM_ATTACK_SERVER(team_attack_data)
---------------------------------------------------------------------------
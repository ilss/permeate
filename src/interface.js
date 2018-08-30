/*
 * @Author: Liang Liang
 * @Date: 2018-06-01 10:18:04
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-08 18:01:28
 * @Description: 
 */
(function(window) {
    window.MAIN_PERMEATE_SCENE= {
    /**
     * @func
     * @desc 返回minNum 到 maxNum 之间的随机数，包括minNum 和 maxNum.
     * @param {number} minNum
     * @param {number} maxNum
     * @returns
     */
    randomNum: function(minNum, maxNum) {
      if (typeof minNum !== 'number' || typeof minNum !== 'number') {
        throw new Error('argument has to be Number');
      }
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
          return 0;
      }
    },
  };

  function initBlock(block_data) {
    MAIN_PERMEATE_SCENE._EFFECTS_MAIN_LAYER.initBlock(block_data);
  }

  function teamSucceed(team_data){
      if (GLOBAL_FUNC_SIMPLEEDU.objHasSomeProperty(team_data, [
          'group_name',
          'group_icon',
      ])) {
          MAIN_PERMEATE_SCENE._EFFECTS_MAIN_LAYER.alertTeamInfo(team_data);
      } else {
          cc.log('teamSucceed 数据应该是一个包含group_id title 的json对象');
      }
  }

  function addBlock(block_data) {
    if (GLOBAL_FUNC_SIMPLEEDU.objHasSomeProperty(block_data, [
        'block_id',
        'block_name',
        'server',
      ])) {
      MAIN_PERMEATE_SCENE._EFFECTS_MAIN_LAYER.saveNewBlockRequest(block_data);
    } else {
      cc.log('addBlock 数据应该是一个 json对象');
    }
  }

  function teamAttackServer(team_attack_data) {
    if (GLOBAL_FUNC_SIMPLEEDU.isArray(team_attack_data)) {
      for (var _i = 0, _len = team_attack_data.length; _i < _len; _i++) {
        var _element = team_attack_data[_i];
          MAIN_PERMEATE_SCENE._EFFECTS_MAIN_LAYER.saveTeamRequest(_element);
        // if (
        //   GLOBAL_FUNC_SIMPLEEDU.objHasSomeProperty(_element, [
        //     'group_id',
        //     'group_name',
        //     'group_icon',
        //     'attack_block_id',
        //     'attack_server_id',
        //   ])
        // ) {
        //   MAIN_PERMEATE_SCENE._EFFECTS_MAIN_LAYER.saveTeamRequest(_element);
        // }
      }
    } else {
      cc.log('teamAttackServer 参数格式错误');
      // throw new TypeError('TEAM_ATTACK_SERVER 参数格式错误');
    }
  }
    
    window.MAIN_PERMEATE_SCENE['PERMEATE_INIT_BLOCK'] = initBlock;
    window.MAIN_PERMEATE_SCENE['PERMEATE_ADD_BLOCK'] = addBlock;
    window.MAIN_PERMEATE_SCENE['TEAM_ATTACK_SERVER'] = teamAttackServer;
    window.MAIN_PERMEATE_SCENE['PERMEATE_TEAM_SUCCEED'] = teamSucceed;
})(window);

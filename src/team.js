/*
 * @Author: Liang Liang
 * @Date: 2018-05-30 09:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-01 18:10:04
 * @Description: 
 */
var Team_class = cc.Node.extend({
    _team_id: null,
    _team_name: null,
    _attack_block: null,
    _attack_server: null,
    _options: {
        //小蓝块变色动画时间
        action_time_interchanger_small: .3,
        team_move_action_distance: 280     //每秒移动 xx
    },
    // taem 默认头像
    _team_icon_def: [
        MAIN_PERMEATE_SCENE.res.sp_team_icon_1,
        MAIN_PERMEATE_SCENE.res.sp_team_icon_2,
        MAIN_PERMEATE_SCENE.res.sp_team_icon_3,
        MAIN_PERMEATE_SCENE.res.sp_team_icon_4,
        MAIN_PERMEATE_SCENE.res.sp_team_icon_5,
        MAIN_PERMEATE_SCENE.res.sp_team_icon_6
    ],
    ctor: function (obj) {
        this._super();
        this.setCascadeOpacityEnabled(true);
        this._team_id = obj.id || '000' + Math.round(Math.random() * 1000);
        this._team_name = obj.name || '';
        this._team_icon = obj.icon || this._team_icon_def[window["MAIN_PERMEATE_SCENE"].randomNum(this._team_icon_def.length - 1)];
        this._attack_block = obj.attack_block_id || '';
        this._attack_server = obj.attack_server_id || '';

        var _sp = new cc.Sprite(this._team_icon),
            _action = cc.sequence(cc.fadeIn(this._options.action_time_interchanger_small), cc.scaleTo(this._options.action_time_interchanger_small, 1, 1));

        _sp.x = 0;
        _sp.y = 0;
        _sp.setScale(.1);
        _sp.opacity = 0;
        this.addChild(_sp);
        _sp.runAction(_action);
    },
    attackServer: function () {
        var _action = cc.sequence(cc.scaleTo(this._options.action_time_interchanger_small, 0, 1), cc.scaleTo(this._options.action_time_interchanger_small, 1, 1)).repeatForever();
        this.cleanup();
        this.runAction(_action);
    },
    teamIntoServer: function () {
        // cc.log('teamIntoServer');
    },
    destroy: function () {
        this.cleanup();
        this.runAction(cc.sequence(cc.spawn(cc.fadeOut(this._options.action_time_interchanger_small), cc.moveBy(this._options.action_time_interchanger_small, cc.p(0, 20))), cc.callFunc(function (target) {
            target.removeFromParent();
        })));
    }
})
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
    is_lock: false,    //动画中锁定
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
        this.is_lock = false;
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
    moveToServer: function (_line_end_pos, _action, _action_time, _block, _obj) {
        this.is_lock = true;

        _action.push(cc.moveTo(_action_time, cc.pAdd(_line_end_pos, cc.p(0, 30))));
        _action.push(cc.callFunc(function (team) {
            team.attackServer(_obj);
            cc.log(11111)
            if (_block !== null) {
                _block.hitServer(_obj);
            }
        }));
        this.runAction(cc.sequence(_action));
    },
    attackServer: function (obj) {
        var _action = cc.sequence(cc.scaleTo(this._options.action_time_interchanger_small, 0, 1), cc.scaleTo(this._options.action_time_interchanger_small, 1, 1)),
            _action_array = [];
        _action_array.push(_action.clone());
        _action_array.push(_action.clone());
        _action_array.push(_action.clone());
        _action_array.push(_action.clone());

        //处理加分显示
        if (obj.hasOwnProperty("coin")) {
            var _sp_bg_coin = new cc.Scale9Sprite(MAIN_PERMEATE_SCENE.res.bg_add_coin, cc.rect(0, 0, 31, 37), cc.rect(15, 0, 10, 37));
            _sp_bg_coin.setAnchorPoint(0, .5);
            _sp_bg_coin.setCascadeOpacityEnabled(true);
            _sp_bg_coin.x = 15;
            _sp_bg_coin.height = 37;
            _sp_bg_coin.opacity = 0;

            var _team_name = new cc.LabelTTF(obj.name, 16);
            _team_name.setFontFillColor(cc.color(255, 186, 0));
            _team_name.setAnchorPoint(0, .5);
            _team_name.x = 25;
            _team_name.y = 20;
            _sp_bg_coin.addChild(_team_name, 1);

            var _coin_txt = new cc.LabelTTF('+' + obj.coin, 22);
            _coin_txt.setFontFillColor(cc.color(255, 50, 67));
            _coin_txt.setAnchorPoint(0, .5);
            _coin_txt.x = 45 + _team_name.getContentSize().width;
            _coin_txt.y = 22;
            _coin_txt.opacity = 0;
            _sp_bg_coin.addChild(_coin_txt, 1);
            _coin_txt.runAction(cc.sequence(cc.delayTime(this._options.action_time_interchanger_small * 10), cc.fadeIn(.3), cc.blink(.5, 3)));

            _sp_bg_coin.width = _team_name.getContentSize().width + _coin_txt.getContentSize().width + 60;
            this.addChild(_sp_bg_coin, 5);
            _action_array.push(cc.delayTime(3));
            _sp_bg_coin.runAction(cc.sequence(cc.delayTime(this._options.action_time_interchanger_small * 8), cc.fadeIn(.5), cc.delayTime(2), cc.fadeOut(this._options.action_time_interchanger_small), cc.callFunc(function (sp) {
                sp.removeFromParent();
            })));
        }

        _action_array.push(cc.spawn(cc.moveBy(this._options.action_time_interchanger_small, cc.p(0, -35)), cc.scaleTo(this._options.action_time_interchanger_small, 0, 0), cc.fadeOut(this._options.action_time_interchanger_small)));
        _action_array.push(cc.callFunc(function (team) {
            team.is_lock = false;
            team.getParent()._is_action_team--;
        }));
        this.cleanup();
        this.runAction(cc.sequence(_action_array));
    },
    destroy: function () {
        this.runAction(cc.sequence(cc.spawn(cc.fadeOut(this._options.action_time_interchanger_small), cc.moveBy(this._options.action_time_interchanger_small, cc.p(0, 20))), cc.callFunc(function (target) {
            target.removeFromParent();
        })));
    }
})
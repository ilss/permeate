/*
 * @Author: Liang Liang
 * @Date: 2018-05-30 09:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-01 18:10:04
 * @Description: 
 */
var Team_class = cc.Node.extend({
    _team_id: null,
    _options: {
        //小蓝块变色动画时间
        action_time_interchanger_small: .5
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
        var _sp = new cc.Sprite(MAIN_PERMEATE_SCENE.res.bg_block);
        _sp.x = 0;
        _sp.y = 0;
        this.addChild(_sp);
        this.initBlock(obj, direction);
    },
    initBlock: function (obj, direction) {
        var _sp = null,
            _this = this,
            _txt_name = null,
            _block_direction = this._block_direction[direction],
            _obj_server_direction = this._block_server[_block_direction];

        this._block_pc[_block_direction].pos.forEach(function (pos) {
            _sp = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_block_pc);
            _sp.setPosition(pos);
            _this.addChild(_sp, 1);
        });

        _obj_server_direction[obj.server.length].forEach(function (pos) {
            //添加底层红色图片
            _sp = new cc.Sprite(_this._block_server.icon[1]);
            _sp.setPosition(pos);
            _this.addChild(_sp, 1);
            //添加顶层蓝色图片
            _sp = new cc.Sprite(_this._block_server.icon[0]);
            _sp.setPosition(pos);
            _this.addChild(_sp, 2);
            _this._server_obj_array.push(_sp);
        });

        // _txt_name = new cc.LabelTTF(obj.name, 10);
        // _txt_name.setFontFillColor(cc.color(255, 187, 0));
        // _txt_name.setPosition(_obj_server_direction.txt_name.pos)
        // _txt_name.setRotation(_obj_server_direction.txt_name.rotation);
        // this.addChild(_txt_name, 1);

        var _sp_interchanger_small = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_interchanger_small);
        _sp_interchanger_small.setPosition(_obj_server_direction.interchanger_pos);
        this.addChild(_sp_interchanger_small, 2);

        _sp_interchanger_small.opacity = 0;
        _sp_interchanger_small.runAction(cc.sequence(cc.delayTime(.5), cc.fadeIn(this._options.action_time_interchanger_small)));
    },
    hitServer: function (num) {
        var _action = cc.sequence(cc.fadeOut(.3), cc.fadeIn(.3)).repeat(3);
        this._server_obj_array[num].runAction(_action);
    },
    getServerPos: function (num) {
        return this._server_obj_array[num].convertToWorldSpace(cc.p(11, 18));
    }
})
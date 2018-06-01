/*
 * @Author: Liang Liang
 * @Date: 2018-05-30 09:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-01 18:10:04
 * @Description: 
 */
MAIN_PERMEATE_SCENE.Permeate_main_layer = cc.Layer.extend({
    _opactions: {
        _default_action_time: 4
    },
    //几个区的不同布局
    block_server_num: {
        1: {
            block_pos: cc.p(330, 260),
            block_scale: 1.25
        }
    },
    _sp_cloud: null,
    _sp_lightning: null,
    _sp_firewall: null,
    _sp_interchanger: null,
    _winSize: null,
    _color_action: null,
    _webgl: true,
    _target: null,
    _streak: null,
    _item_index: 0,
    _dt: 0,
    _team_array: [],
    _team_change_index: 0,
    _pos_start_array: [

    ],
    _pos_end_array: [

    ],
    onEnter: function () {
        this._super();

        MAIN_PERMEATE_SCENE._EFFECTS_MAIN_LAYER = this;
        this._winSize = cc.director.getWinSize();

        this._webgl = 'opengl' in cc.sys.capabilities && cc._renderType === cc.game.RENDER_TYPE_WEBGL;

        this.addBg();
        var _json = {
            block_num: 1,
            num: 6,
            direction: 'up',
            name: '管理区'
        };
        this.initBlock(_json);

        var _bg_color = new cc.LayerColor(cc.color(0, 0, 0), this._winSize.width, this._winSize.height);
        this.addChild(_bg_color);
    },
    addBg: function () {
        this._sp_cloud = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_cloud);
        this._sp_cloud.x = 938;
        this._sp_cloud.y = 670;
        this.addChild(this._sp_cloud, 2);

        this._sp_lightning = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_lightning);
        this._sp_lightning.x = 885;
        this._sp_lightning.y = 592;
        this.addChild(this._sp_lightning, 2);

        this._sp_firewall = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_firewall);
        this._sp_firewall.x = 789;
        this._sp_firewall.y = 564;
        this.addChild(this._sp_firewall, 2);

        this._sp_interchanger = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_interchanger);
        this._sp_interchanger.x = 706;
        this._sp_interchanger.y = 478;
        this.addChild(this._sp_interchanger, 2);

        var _line = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_line_yellow);
        _line.x = 792;
        _line.y = 523;
        this.addChild(_line, 1);
        _line.setAnchorPoint(1, .5);
        _line.setRotation(-30);
        // _line.setScaleX(75.5);
        _line.runAction(cc.scaleBy(1, 102, 1));

    },
    initBlock: function (obj) {
        var _obj = this.block_server_num[obj.block_num],
            _block = new Block_class(obj);
        _block.setPosition(_obj["block_pos"]);
        this.addChild(_block, 2);

        _block.setScale(_obj["block_scale"]);

        //入场动画
        _block.setCascadeOpacityEnabled(true);
        _block.opacity = 0;

        _block.runAction(cc.fadeIn(.5));

        _block.hitServer(0);
        var _pos = _block.getServerPos(1);

        var _sp = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_interchanger_small);

        _sp.setPosition(_pos);
        this.addChild(_sp, 10);
    },

    drawLine: function () {

    },

    update: function (dt) {

    }
});

MAIN_PERMEATE_SCENE.HelloWorldScene = cc.Scene.extend({
    _main_layer: null,
    onEnter: function () {
        this._super();
        _main_layer = new MAIN_PERMEATE_SCENE.Permeate_main_layer();
        this.addChild(_main_layer);
    }
});
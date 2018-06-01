/*
 * @Author: Liang Liang
 * @Date: 2018-05-21 15:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-05-31 15:10:04
 * @Description: 
 */
MAIN_PERMEATE_SCENE.Permeate_main_layer = cc.Layer.extend({
    _opactions: {
        _default_action_time: 4
    },
    block_pc: {
        icon: MAIN_PERMEATE_SCENE.res.sp_block_pc,
        pos: [
            cc.p(277, 111),
            cc.p(225, 140),
            cc.p(174, 170)
        ]
    },
    block_server: {
        icon: [
            MAIN_PERMEATE_SCENE.res.sp_block_server_0,
            MAIN_PERMEATE_SCENE.res.sp_block_server_1
        ],
        up: {
            txt_name: {
                pos: cc.p(116, 58),
                rotation: 30
            },
            1: [
                cc.p(160, 52)
            ],
            2: [
                cc.p(140, 114),
                cc.p(190, 79)
            ],
            3: [
                cc.p(140, 114),
                cc.p(190, 79)
            ],
            4: [
                cc.p(140, 114),
                cc.p(190, 79)
            ],
            5: [
                cc.p(140, 114),
                cc.p(190, 79)
            ],
            6: [
                cc.p(135, 135),
                cc.p(182, 110),
                cc.p(230, 80),
                cc.p(94, 105),
                cc.p(188, 50),
                cc.p(140, 80)
            ],
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
        _line.runAction(cc.scaleBy(1, 75.5, 1));

    },
    initBlock: function (obj) {
        var _block = new cc.Sprite(MAIN_PERMEATE_SCENE.res.bg_block),
            _sp = null,
            _txt_name = null,
            _obj_server = this.block_server;
        _block.x = 444;
        _block.y = 326;
        this.addChild(_block, 2);

        this.block_pc.pos.forEach(function (pos) {
            _sp = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_block_pc);
            _sp.setPosition(pos);
            _block.addChild(_sp, 1);
        });

        _obj_server[obj["direction"]][obj.num].forEach(function (pos) {
            _sp = new cc.Sprite(_obj_server.icon[0]);
            _sp.setPosition(pos);
            _block.addChild(_sp, 1);
        });

        _txt_name = new cc.LabelTTF(obj.name, 10);
        _txt_name.setFontFillColor(cc.color(255, 187, 0));

        _txt_name.setPosition(_obj_server[obj["direction"]].txt_name.pos)
        _txt_name.setRotation(_obj_server[obj["direction"]].txt_name.rotation);
        _block.addChild(_txt_name, 1);

        // _block.setRotation(90);
        var _sp_interchanger_small = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_interchanger_small);
        _sp_interchanger_small.x = 200;
        _sp_interchanger_small.y = 188;
        _block.addChild(_sp_interchanger_small, 9);
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
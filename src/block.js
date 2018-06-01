/*
 * @Author: Liang Liang
 * @Date: 2018-05-30 09:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-05-31 15:10:04
 * @Description: 
 */
var Block_class = cc.Node.extend({
    _options: {
        action_time_interchanger_small: .5
    },
    _block_pc: {
        icon: MAIN_PERMEATE_SCENE.res.sp_block_pc,
        pos: [
            cc.p(105, 5),
            cc.p(51, 36),
            cc.p(0, 66)
        ]
    },

    _block_server: {
        icon: [
            MAIN_PERMEATE_SCENE.res.sp_block_server_0,
            MAIN_PERMEATE_SCENE.res.sp_block_server_1
        ],
        up: {
            interchanger_pos: cc.p(126, 74),
            txt_name: {
                pos: cc.p(-58, -42),
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
                cc.p(15, -48),
                cc.p(-31, -20),
                cc.p(-81, 7),
                cc.p(56, -22),
                cc.p(10, 11),
                cc.p(-39, 35)
            ],
        }

    },
    //缓存server obj
    _server_obj_array: [],

    ctor: function (obj) {
        this._super();
        var _sp = new cc.Sprite(MAIN_PERMEATE_SCENE.res.bg_block);
        _sp.x = 0;
        _sp.y = 0;
        this.addChild(_sp);
        this.initBlock(obj);
    },
    initBlock: function (obj) {
        var _sp = null,
            _this = this,
            _txt_name = null,
            _obj_server_direction = this._block_server[obj["direction"]];

        this._block_pc.pos.forEach(function (pos) {
            _sp = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_block_pc);
            _sp.setPosition(pos);
            _this.addChild(_sp, 1);
        });

        _obj_server_direction[obj.num].forEach(function (pos) {
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

        _txt_name = new cc.LabelTTF(obj.name, 10);
        _txt_name.setFontFillColor(cc.color(255, 187, 0));

        _txt_name.setPosition(_obj_server_direction.txt_name.pos)
        _txt_name.setRotation(_obj_server_direction.txt_name.rotation);
        this.addChild(_txt_name, 1);

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
        // cc.log(this._server_obj_array[num].convertToWorldSpace(cc.p(0, 0)));
    }
})
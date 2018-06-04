/*
 * @Author: Liang Liang
 * @Date: 2018-05-30 09:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-01 18:10:04
 * @Description: 
 */
var Block_class = cc.Node.extend({
    _options: {
        //小蓝块变色动画时间
        action_time_interchanger_small: .5
    },
    _block_direction: {
        1: ['up'],
        2: ['up'],
        3: ['left'],
        4: ['right'],
        5: ['left'],
        6: ['right'],
    },
    //3个蓝色pc配置
    _block_pc: {
        icon: MAIN_PERMEATE_SCENE.res.sp_block_pc,
        up: {
            pos: [
                cc.p(105, 5),
                cc.p(51, 36),
                cc.p(0, 66)
            ]
        },
        left: {
            pos: [
                cc.p(-87, 6),
                cc.p(-42, 32),
                cc.p(0, 59)
            ]
        },
        right: {
            pos: [
                cc.p(1, -51),
                cc.p(49, -26),
                cc.p(91, 0)
            ]
        }
    },
    //小蓝块的配置
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
        },
        left: {
            interchanger_pos: cc.p(-112, 88),
            txt_name: {
                pos: cc.p(-58, -42),
                rotation: 30
            },
            1: [
                cc.p(11, 5)
            ],
            2: [
                cc.p(-9, -16),
                cc.p(34, 11)
            ],
            3: [
                cc.p(-30, -29),
                cc.p(13, -4),
                cc.p(55, 21)
            ],
            4: [
                cc.p(-19, -10),
                cc.p(22, 15),
                cc.p(16, -31),
                cc.p(56, -6)
            ],
            5: [
                cc.p(-41, -22),
                cc.p(2, 4),
                cc.p(44, 26),
                cc.p(18, -34),
                cc.p(59, -10)
            ],
            6: [
                cc.p(-47, -26),
                cc.p(4, 4),
                cc.p(54, 31),
                cc.p(-4, -53),
                cc.p(48, -24),
                cc.p(97, 7)
            ],
        },
        right: {
            interchanger_pos: cc.p(133, -73),
            txt_name: {
                pos: cc.p(-66, 51),
                rotation: 30
            },
            1: [
                cc.p(-21, 19)
            ],
            2: [
                cc.p(-34, 4),
                cc.p(8, 27)
            ],
            3: [
                cc.p(-59, -10),
                cc.p(-17, 14),
                cc.p(26, 37)
            ],
            4: [
                cc.p(-20, -2),
                cc.p(22, 21),
                cc.p(-54, 19),
                cc.p(-14, 43)
            ],
            5: [
                cc.p(47, -19),
                cc.p(-4, 8),
                cc.p(39, 31),
                cc.p(-55, 19),
                cc.p(-14, 43)
            ],
            6: [
                cc.p(-44, -24),
                cc.p(7, 6),
                cc.p(55, 33),
                cc.p(-88, 4),
                cc.p(-39, 31),
                cc.p(11, 60)
            ],
        }

    },
    //缓存server obj
    _server_obj_array: [],

    ctor: function (obj, direction) {
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

        cc.log(this._block_pc[_block_direction])
        this._block_pc[_block_direction].pos.forEach(function (pos) {
            _sp = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_block_pc);
            _sp.setPosition(pos);
            _this.addChild(_sp, 1);
        });

        _obj_server_direction[obj["server"].length].forEach(function (pos) {
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
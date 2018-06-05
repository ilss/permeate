/*
 * @Author: Liang Liang
 * @Date: 2018-05-30 09:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-01 18:10:04
 * @Description: 
 */
MAIN_PERMEATE_SCENE.Permeate_main_layer = cc.Layer.extend({
    _opactions: {
        _add_block_fadeout_action_time: .5
    },
    //几个区的不同布局
    _block_server_num: {
        1: {
            block_pos: [
                cc.p(330, 260)
            ],
            block_scale: 1.25
        },
        2: {
            block_pos: [
                cc.p(276, 474),
                cc.p(710, 200)
            ],
            block_scale: 1
        },
        3: {
            block_pos: [
                cc.p(186, 344),
                cc.p(480, 162),
                cc.p(1028, 266)
            ],
            block_scale: 1
        },
        4: {
            block_pos: [
                cc.p(186, 344),
                cc.p(480, 162),
                cc.p(1028, 266),
                cc.p(370, 667)
            ],
            block_scale: 1
        }
    },
    _block_array: [],
    _sp_cloud: null,
    _sp_lightning: null,
    _sp_firewall: null,
    _sp_interchanger: null,
    _winSize: null,
    _team_array: [],
    _team_move_path: {
        4: [
            [cc.p(445, 325), cc.p(312, 420), cc.p(273, 390)],
            [cc.p(445, 325), cc.p(606, 236), cc.p(568, 208)],
            [cc.p(445, 325), cc.p(955, 326)],
            [cc.p(445, 325), cc.p(460, 616)]
        ]
    },
    onEnter: function () {
        this._super();
        var _json = [
            {
                id: '000001',
                name: '管理区',
                server: [
                    {
                        id: 's00001'
                    },
                    {
                        id: 's00001'
                    },
                    {
                        id: 's00001'
                    },
                    {
                        id: 's00001'
                    },
                    {
                        id: 's00001'
                    },
                    {
                        id: 's00001'
                    }
                ]
            },
            // {
            //     id: '000002',
            //     name: '管理区',
            //     server: [
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         }
            //     ]
            // },
            // {
            //     id: '000003',
            //     name: '管理区',
            //     server: [
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         }
            //     ]
            // },
            // {
            //     id: '000004',
            //     name: '管理区',
            //     server: [
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00001'
            //         }
            //     ]
            // }
        ];
        MAIN_PERMEATE_SCENE._EFFECTS_MAIN_LAYER = this;
        this._winSize = cc.director.getWinSize();

        this.addBg();

        this.initBlock(_json);
        this.drawLine(_json.length);
        // var _bg_color = new cc.LayerColor(cc.color(0, 0, 0), this._winSize.width, this._winSize.height);
        // this.addChild(_bg_color);
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
    },
    drawLine: function (num) {
        this._layer_line_yellow = new Draw_line_class(num);
        this._layer_line_yellow.setCascadeOpacityEnabled(true);
        this.addChild(this._layer_line_yellow, 1);
    },
    initBlock: function (obj) {
        for (var _index = 0, _len = obj.length; _index < _len; _index++) {
            var _pos_obj = this._block_server_num[_len];
            this.addBlock(obj[_index], _pos_obj, _index);
        }
    },

    addBlock: function (obj, pos_obj, index) {
        var _block = new Block_class(obj, index + 1);

        _block.setPosition(pos_obj["block_pos"][index]);
        this.addChild(_block, 4);

        _block.setScale(pos_obj["block_scale"]);
        //入场动画
        _block.setCascadeOpacityEnabled(true);
        _block.opacity = 0;

        _block.runAction(cc.fadeIn(this._opactions._add_block_fadeout_action_time));


        //击中效果
        _block.hitServer(0);

        this._block_array.push(_block);

    },
    addNewBlock: function (block_data) {
        var _index = 0,
            _len_block_array = this._block_array.length,
            _old_block = null,
            _new_pos = null;

        if (_len_block_array === 4) {
            return;
        }

        // 淡出
        // for (; _index < _len_block_array; _index++) {
        //     _block = this._block_array[_index];
        //     _block.runAction(cc.fadeOut(this._opactions._add_block_fadeout_action_time));
        // }

        //重置现有区的坐标和缩放
        if (_len_block_array < 3) {
            for (var _index = 0; _index < _len_block_array; _index++) {
                _old_block = this._block_array[_index];
                _new_pos = this._block_server_num[_len_block_array + 1]["block_pos"][_index];
                _old_block.runAction(cc.spawn(cc.moveTo(this._opactions._add_block_fadeout_action_time, _new_pos), cc.scaleTo(this._opactions._add_block_fadeout_action_time, 1)));
            }
        }

        this._layer_line_yellow.runAction(cc.fadeOut(.25));

        setTimeout(function () {
            this.addBlock(block_data, this._block_server_num[_len_block_array + 1], _len_block_array);

            this._layer_line_yellow.removeFromParent();
            this._layer_line_yellow = null;
            this.drawLine(this._block_array.length);

        }.bind(this), this._opactions._add_block_fadeout_action_time * 1000);
    }
});

MAIN_PERMEATE_SCENE.HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new MAIN_PERMEATE_SCENE.Permeate_main_layer());
    }
});
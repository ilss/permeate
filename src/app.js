/*
 * @Author: Liang Liang
 * @Date: 2018-05-30 09:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-01 18:10:04
 * @Description: 
 */

MAIN_PERMEATE_SCENE.path_pos_array = {
    1: [
        [cc.p(706, 473), cc.p(438, 320)]
    ],
    2: [
        //每个数组包含 一个起点与一个终点
        [cc.p(706, 473), cc.p(609, 418)],
        [
            //表示同时画N段线
            [cc.p(609, 418), cc.p(403, 546)],
            [cc.p(609, 418), cc.p(842, 275)],
        ],
        [
            [cc.p(403, 546), cc.p(363, 522)],
            [cc.p(842, 275), cc.p(797, 246)]
        ]
    ],
    3: [
        //每个数组包含 一个起点与一个终点
        [
            [cc.p(706, 473), cc.p(455, 327)],
            [cc.p(706, 473), cc.p(954, 325)]
        ],
        [
            //表示同时画N段线
            [cc.p(455, 327), cc.p(313, 413)],
            [cc.p(455, 327), cc.p(606, 231)],
        ],
        [
            [cc.p(314, 415), cc.p(274, 392)],
            [cc.p(606, 231), cc.p(568, 209)]
        ]
    ],
    4: [
        //每个数组包含 一个起点与一个终点
        [
            [cc.p(706, 473), cc.p(455, 325)],
            [cc.p(706, 473), cc.p(954, 325)],
            [cc.p(706, 473), cc.p(457, 619)]
        ],
        [
            //表示同时画N段线
            [cc.p(455, 327), cc.p(313, 413)],
            [cc.p(455, 327), cc.p(606, 231)],
        ],
        [
            [cc.p(314, 415), cc.p(274, 392)],
            [cc.p(606, 231), cc.p(568, 209)]
        ]
    ],
}


MAIN_PERMEATE_SCENE.Permeate_main_layer = cc.Layer.extend({
    _opactions: {
        _team_num_max: 10,
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
    _block_array: null,
    _sp_cloud: null,
    _sp_lightning: null,
    _sp_firewall: null,
    _sp_interchanger: null,
    _winSize: null,
    _team_array: null,
    _is_action: false,  //动画中不响应   Draw_line_class 里重置
    _team_move_path: {
        1: [
            [MAIN_PERMEATE_SCENE.path_pos_array["1"][0][1]]
        ],
        2: [
            [
                MAIN_PERMEATE_SCENE.path_pos_array["2"][1][0][0], MAIN_PERMEATE_SCENE.path_pos_array["2"][1][0][1], MAIN_PERMEATE_SCENE.path_pos_array["2"][2][0][1]
            ],
            [
                MAIN_PERMEATE_SCENE.path_pos_array["2"][1][1][0], MAIN_PERMEATE_SCENE.path_pos_array["2"][1][1][1], MAIN_PERMEATE_SCENE.path_pos_array["2"][2][1][1]
            ]
        ],
        3: [
            [
                MAIN_PERMEATE_SCENE.path_pos_array["3"][1][0][0], MAIN_PERMEATE_SCENE.path_pos_array["3"][1][0][1], MAIN_PERMEATE_SCENE.path_pos_array["3"][2][0][1]
            ],
            [
                MAIN_PERMEATE_SCENE.path_pos_array["3"][1][1][0], MAIN_PERMEATE_SCENE.path_pos_array["3"][1][1][1], MAIN_PERMEATE_SCENE.path_pos_array["3"][2][1][1]
            ],
            [
                MAIN_PERMEATE_SCENE.path_pos_array["3"][0][1][0], MAIN_PERMEATE_SCENE.path_pos_array["3"][0][1][1]
            ]
        ],
        4: [
            [cc.p(445, 325), cc.p(312, 420), cc.p(273, 390)],
            [cc.p(445, 325), cc.p(606, 236), cc.p(568, 208)],
            [cc.p(445, 325), cc.p(955, 326)],
            [cc.p(445, 325), cc.p(460, 616)]
        ]
    },
    onEnter: function () {
        this._super();
        this._is_action = false;
        this._block_array = [];
        this._team_array = [];
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
        // _block.hitServer(0);
        this._block_array.push(_block);
    },
    addNewBlock: function (block_data) {
        var _index = 0,
            _len_block_array = this._block_array.length,
            _old_block = null,
            _new_pos = null;

        if (_len_block_array === 4 || this._is_action) {
            return;
        }

        this._is_action = true;

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
    },
    /**
     * @func 
     * @desc 队伍入场
     * @param {object} obj  
     */
    addTeam: function (obj) {
        obj = obj || { id: '000333', name: '战队445', icon: '', attack_block_id: '000001', attack_server_id: 's00001' };
        var _result = null,
            _team = null;

        _result = MAIN_PERMEATE_SCENE.findObjFromArray(obj, "id", this._team_array, "_team_id");
        if (_result === -1) {
            // cc.log('新队伍');
            _team = new Team_class(obj);
            _team.setPosition(cc.pAdd(MAIN_PERMEATE_SCENE.path_pos_array["1"][0][0], cc.p(0, 30)));
            this.addChild(_team, 10);
            this._team_array.push(_team);
            this.teamMoveToBlock(_team, obj);
        } else {
            cc.log('队伍已存在    ' + _result);
            // this._team_array[_result].destroy();
            // this._team_array.splice(_result, 1);
            // cc.log(this._team_array);
        }
    },
    teamMoveToBlock: function (team, obj) {
        var _line_start_pos = team.getPosition(),
            _block_index = null,
            _path_array = null,
            _line_end_pos = null,
            _distance = null,
            _action_time = null,
            _action = [cc.delayTime(.5)];

        _block_index = MAIN_PERMEATE_SCENE.findObjFromArray(obj, "attack_block_id", this._block_array, "_block_id");

        if (_block_index < 0) {
            cc.log("此block不存在");
            return;
        }
        _path_array = this._team_move_path[this._block_array.length][_block_index];
        for (var _index = 0, _len = _path_array.length; _index < _len; _index++) {
            _line_end_pos = _path_array[_index];
            _distance = cc.pDistance(_line_start_pos, _line_end_pos);
            _action_time = _distance / team._options.team_move_action_distance;
            _action.push(cc.moveTo(_action_time, cc.pAdd(_line_end_pos, cc.p(0, 30))));
            _line_start_pos = _line_end_pos;
        }

        //移动到攻击的 具体server的上
        // _line_end_pos = this._block_array[_block_index].getServerPos();
        // _distance = cc.pDistance(_line_start_pos, _line_end_pos);
        // _action_time = _distance / team._options.team_move_action_distance;
        // _action.push(cc.moveTo(_action_time, cc.pAdd(_line_end_pos, cc.p(0, 30))));

        _action.push(cc.callFunc(function (team) {
            // team.removeFromParent();
            // _this._block_array[_block_index].addTeam(team, team.convertToNodeSpaceAR(team.getPosition()));
        }));
        team.runAction(cc.sequence(_action));
    }
});

MAIN_PERMEATE_SCENE.HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new MAIN_PERMEATE_SCENE.Permeate_main_layer());
    }
});
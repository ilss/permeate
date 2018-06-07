/*
 * @Author: Liang Liang
 * @Date: 2018-05-30 09:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-06 18:10:04
 * @Description: 
 */

MAIN_PERMEATE_SCENE.Permeate_main_layer = cc.Layer.extend({
    _dt: null,
    _block_array: null,
    _sp_cloud: null,
    _sp_lightning: null,
    _sp_firewall: null,
    _sp_interchanger: null,
    _winSize: null,
    _team_array: null,
    _is_action_block: null,
    _is_action_team: null,
    _add_block_array: null, //缓存加BLOCK请求 场上有team入场时暂缓处理
    _add_team_array: null, //缓存要上场的team
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
            [
                MAIN_PERMEATE_SCENE.path_pos_array["4"][1][0][0], MAIN_PERMEATE_SCENE.path_pos_array["4"][1][0][1], MAIN_PERMEATE_SCENE.path_pos_array["4"][2][0][1]
            ],
            [
                MAIN_PERMEATE_SCENE.path_pos_array["4"][1][1][0], MAIN_PERMEATE_SCENE.path_pos_array["4"][1][1][1], MAIN_PERMEATE_SCENE.path_pos_array["4"][2][1][1]
            ],
            [
                MAIN_PERMEATE_SCENE.path_pos_array["4"][0][1][0], MAIN_PERMEATE_SCENE.path_pos_array["4"][0][1][1]
            ],
            [
                MAIN_PERMEATE_SCENE.path_pos_array["4"][0][2][0], MAIN_PERMEATE_SCENE.path_pos_array["4"][0][2][1]
            ]
        ]
    },
    onEnter: function () {
        this._super();
        this._dt = 0;
        this._is_action_block = false;
        this._is_action_team = 0;
        this._block_array = [];
        this._team_array = [];
        this._add_block_array = [];
        this._add_team_array = [];
        var _json = [
            {
                id: '000001',
                name: '管理区',
                server: [
                    {
                        id: 's00001'
                    },
                    {
                        id: 's00002'
                    },
                    {
                        id: 's00003'
                    },
                    {
                        id: 's00004'
                    },
                    {
                        id: 's00005'
                    },
                    {
                        id: 's00006'
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
            //         // {
            //         //     id: 's00001'
            //         // },
            //         // {
            //         //     id: 's00001'
            //         // },
            //         // {
            //         //     id: 's00001'
            //         // },
            //         // {
            //         //     id: 's00001'
            //         // }
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
            //         // {
            //         //     id: 's00001'
            //         // },
            //         // {
            //         //     id: 's00001'
            //         // }
            //     ]
            // }
        ];
        MAIN_PERMEATE_SCENE._EFFECTS_MAIN_LAYER = this;
        this._winSize = cc.director.getWinSize();

        cc.spriteFrameCache.addSpriteFrames(MAIN_PERMEATE_SCENE.res.all_img_plist);
        this.addBg();
        this.initBlock(_json);
        this.drawLine(_json.length);
        // var _bg_color = new cc.LayerColor(cc.color(0, 0, 0), this._winSize.width, this._winSize.height);
        // this.addChild(_bg_color);


    },
    addBg: function () {
        this._sp_cloud = new cc.Sprite("#permeate_cloud.png");
        this._sp_cloud.x = 938;
        this._sp_cloud.y = 670;
        this.addChild(this._sp_cloud, 2);

        this._sp_lightning = new cc.Sprite("#permeate_lightning.png");
        this._sp_lightning.x = 885;
        this._sp_lightning.y = 592;
        this.addChild(this._sp_lightning, 2);

        this._sp_firewall = new cc.Sprite("#permeate_firewall.png");
        this._sp_firewall.x = 789;
        this._sp_firewall.y = 564;
        this.addChild(this._sp_firewall, 2);

        this._sp_interchanger = new cc.Sprite("#permeate_interchanger.png");
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
        if (!this._is_action_block) {
            this._is_action_block = true;
            setTimeout(function () { this._is_action_block = false; }.bind(this), 2000);
        }

        for (var _index = 0, _len = obj.length; _index < _len; _index++) {
            var _pos_obj = MAIN_PERMEATE_SCENE.block_server_num[_len];
            this.addBlock(obj[_index], _pos_obj, _index);
        }
    },
    addBlock: function (obj, pos_obj, index) {
        var _block = new Block_class(obj, index + 1);

        _block.setPosition(pos_obj["block_pos"][index]);
        this.addChild(_block, 4);

        this.setScale(pos_obj["block_scale"]);
        //入场动画
        _block.setCascadeOpacityEnabled(true);
        _block.opacity = 0;

        _block.runAction(cc.fadeIn(MAIN_PERMEATE_SCENE["_opactions"]["_add_block_fadeout_action_time"]));

        //击中效果
        // _block.hitServer(0);
        this._block_array.push(_block);
    },
    saveNewBlockRequest: function (block_data) {
        if (this._block_array.length < MAIN_PERMEATE_SCENE["_opactions"]["_block_show_num_max"]) {
            if (GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(block_data, "id", this._block_array, "_block_id") !== -1 && GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(block_data, "id", this._add_block_array, "id") !== -1) {
                cc.log('block' + block_data.id + ' 已存在！！');
                return;
            }
            this._add_block_array.unshift(block_data);
            if (!this._is_action_block && this._is_action_team === 0) {
                this.addNewBlock();
            } else {
                this.schedule(this.updateAddBlock, 2.0);
            }
        }
    },
    addNewBlock: function () {
        var _block_data = this._add_block_array.pop(),
            _index = 0,
            _len_block_array = this._block_array.length,
            _old_block = null,
            _old_block_old_pos = null,
            _new_pos = null;

        if (!this._is_action_block) {
            this._is_action_block = true;
            setTimeout(function () { this._is_action_block = false; }.bind(this), 1500);
        }
        //重置现有区的坐标和缩放
        //场景缩放
        this.runAction(cc.scaleTo(MAIN_PERMEATE_SCENE["_opactions"]["_add_block_fadeout_action_time"], MAIN_PERMEATE_SCENE.block_server_num[_len_block_array + 1]["block_scale"]));
        for (var _index = 0; _index < _len_block_array; _index++) {
            _old_block = this._block_array[_index];
            _old_block_old_pos = _old_block.getPosition();
            _new_pos = MAIN_PERMEATE_SCENE.block_server_num[_len_block_array + 1]["block_pos"][_index];
            _old_block.runAction(cc.spawn(cc.moveTo(MAIN_PERMEATE_SCENE["_opactions"]["_add_block_fadeout_action_time"], _new_pos)));

            for (var _index_team = 0, _len_team = this._team_array.length; _index_team < _len_team; _index_team++) {
                var _team = this._team_array[_index_team],
                    _team_new_pos = null;
                _team_new_pos = cc.pAdd(_team.getPosition(), cc.p(_new_pos.x - _old_block_old_pos.x, _new_pos.y - _old_block_old_pos.y));
                //场上需要同此block一起移动的team
                if (_team._attack_block === _old_block._block_id) {
                    _team.runAction(cc.moveTo(MAIN_PERMEATE_SCENE["_opactions"]["_add_block_fadeout_action_time"], _team_new_pos));
                }
            }
        }

        this._layer_line_yellow.runAction(cc.fadeOut(.25));

        setTimeout(function () {
            this.addBlock(_block_data, MAIN_PERMEATE_SCENE.block_server_num[_len_block_array + 1], _len_block_array);

            this._layer_line_yellow.removeFromParent();
            this._layer_line_yellow = null;
            this.drawLine(this._block_array.length);
        }.bind(this), MAIN_PERMEATE_SCENE["_opactions"]["_add_block_fadeout_action_time"] * 1000);
    },
    saveTeamRequest: function (team_data) {
        // cc.log(team_data);
        if (this._team_array.length < MAIN_PERMEATE_SCENE["_opactions"]["_team_show_num_max"]) {
            // this.addTeam(team_data);

            this._add_team_array.unshift(team_data);
            this.schedule(this.updateAddTeam, 1.0);
        }
    },
    /**
     * @func 
     * @desc 队伍入场
     * @param {object} obj  { id: '000333', name: '战队445', icon: '', attack_block_id: '000001', attack_server_id: 's00001' }
     */
    addTeam: function () {
        cc.log(this._is_action_block);
        if (this._is_action_block) {
            return;
        }
        var _obj = this._add_team_array.pop(),
            _result = null,
            _block_index = null,
            _team = null;
        _result = GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(_obj, "id", this._team_array, "_team_id");
        _block_index = GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(_obj, "attack_block_id", this._block_array, "_block_id");

        if (_block_index < 0) {
            cc.log("不存在ID " + _obj.attack_block_id + '的大区');
            return;
        }
        if (_result === -1) {
            // cc.log('新队伍');
            this._is_action_team++;
            _team = new Team_class(_obj);
            _team.setPosition(cc.pAdd(MAIN_PERMEATE_SCENE.path_pos_array.entry, cc.p(0, 30)));
            this.addChild(_team, 10);
            this._team_array.push(_team);
            this.teamMoveToBlock(_team, _obj);
            _team.teamIntoServer();
        } else {
            cc.log('队伍已存在    ' + _result);
        }
    },
    teamMoveToBlock: function (team, obj) {
        var _this = this,
            _line_start_pos = team.getPosition(),
            _block = null,
            _block_index = null,
            _path_array = null,
            _line_end_pos = null,
            _distance = null,
            _action_time = null,
            _action = [cc.delayTime(.5)];

        _block_index = GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(obj, "attack_block_id", this._block_array, "_block_id");
        _path_array = this._team_move_path[this._block_array.length][_block_index];
        for (var _index = 0, _len = _path_array.length; _index < _len; _index++) {
            _line_end_pos = _path_array[_index];
            _distance = cc.pDistance(_line_start_pos, _line_end_pos);
            _action_time = _distance / team._options.team_move_action_distance;
            _action.push(cc.moveTo(_action_time, cc.pAdd(_line_end_pos, cc.p(0, 30))));
            _line_start_pos = _line_end_pos;
        }

        //移动到攻击的 具体server的上
        _block = _this._block_array[_block_index];
        _line_end_pos = cc.pAdd(_block.getPosition(), this._block_array[_block_index].getServerPos(obj));
        _distance = cc.pDistance(_line_start_pos, _line_end_pos);
        _action_time = _distance / team._options.team_move_action_distance;
        _action.push(cc.moveTo(_action_time, cc.pAdd(_line_end_pos, cc.p(0, 30))));

        _action.push(cc.callFunc(function (team) {
            _this._is_action_team--;
            team.attackServer();
            _block.hitServer(obj);
        }));
        team.runAction(cc.sequence(_action));
    },
    updateAddBlock: function () {
        cc.log('updateAddBlock');
        if (this._block_array.length === MAIN_PERMEATE_SCENE["_opactions"]["_block_show_num_max"] || this._add_block_array.length === 0) {
            this.unschedule(this.updateAddBlock);
            return;
        }

        //处理 新增 block
        if (this._add_block_array.length > 0 && this._is_action_team === 0 && !this._is_action_block) {
            this.addNewBlock();
        }
    },
    updateAddTeam: function () {
        cc.log(this._add_team_array.length);
        if (this._add_team_array.length > 0) {
            this.addTeam();
        }
        // cc.log(cc.isScheduled(this.updateAddTeam));
    }
});

MAIN_PERMEATE_SCENE.HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new MAIN_PERMEATE_SCENE.Permeate_main_layer());
    }
});
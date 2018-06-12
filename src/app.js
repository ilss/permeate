/*
 * @Author: Liang Liang
 * @Date: 2018-05-30 09:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-08 18:10:04
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
    _layer_add_block_dialog: null,
    _is_action_block: null,
    _is_action_team: null,
    _add_block_array: null, //缓存加BLOCK请求 场上有team入场时暂缓处理
    _add_team_array: null, //缓存要上场的team
    onEnter: function () {
        this._super();
        this._dt = 0;
        this._layer_add_block_dialog = null;
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
            //     id: '000111',
            //     name: '管理区',
            //     server: [
            //         {
            //             id: 's00001'
            //         },
            //         {
            //             id: 's00002'
            //         },
            //         {
            //             id: 's00003'
            //         },
            //         {
            //             id: 's00004'
            //         },
            //         {
            //             id: 's00005'
            //         },
            //         {
            //             id: 's00006'
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
        this.schedule(this.updateAddTeam, 3.0);

        // var _bg_color = new cc.LayerColor(cc.color(0, 0, 0), this._winSize.width, this._winSize.height);
        // this.addChild(_bg_color);
    },
    addBg: function () {
        this._sp_cloud = new cc.Sprite("#permeate_cloud.png");
        this._sp_cloud.setPosition(MAIN_PERMEATE_SCENE.basic_pos_array.cloud);
        this.addChild(this._sp_cloud, 2);

        this._sp_lightning = new cc.Sprite("#permeate_lightning.png");
        this._sp_lightning.setPosition(MAIN_PERMEATE_SCENE.basic_pos_array.lightning);
        this.addChild(this._sp_lightning, 2);

        this._sp_firewall = new cc.Sprite("#permeate_firewall.png");
        this._sp_firewall.setPosition(MAIN_PERMEATE_SCENE.basic_pos_array.firewall);
        this.addChild(this._sp_firewall, 2);

        this._sp_interchanger = new cc.Sprite("#permeate_interchanger.png");
        this._sp_interchanger.setPosition(MAIN_PERMEATE_SCENE.basic_pos_array.interchanger);
        this.addChild(this._sp_interchanger, 2);
    },
    drawLine: function (num) {
        this._layer_line_yellow = new Draw_line_class(num);
        this._layer_line_yellow.setCascadeOpacityEnabled(true);
        this.addChild(this._layer_line_yellow, 1);
    },
    initBlock: function (obj) {
        if (!this._is_action_block) {
            var _this = this;
            this._is_action_block = true;
            setTimeout(function () { _this._is_action_block = false; }, 2000);
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

        this._block_array.push(_block);
    },
    /**
     * @desc 缓存新增大区请求
     * @param {object} block_data
     * @returns
     */
    saveNewBlockRequest: function (block_data) {
        if (this._block_array.length < MAIN_PERMEATE_SCENE["_opactions"]["_block_show_num_max"]) {
            if (GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(block_data, "id", this._block_array, "_block_id") !== -1 && GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(block_data, "id", this._add_block_array, "id") !== -1) {
                // cc.log('block' + block_data.id + ' 已存在！！');
                return;
            }
            this._add_block_array.unshift(block_data);
            //如果没有 动画中的大区 或 动画中的team 则开始新增大区
            if (!this._is_action_block && this._is_action_team === 0) {
                this.alertTeamInfo();
                // this.addNewBlock();
            } else {
                this.schedule(this.updateAddBlock, 2.0);
            }
        }
    },
    addNewBlock: function () {
        var _this = this,
            _block_data = this._add_block_array.pop(),
            _index = 0,
            _len_block_array = this._block_array.length,
            _old_block = null,
            _old_block_old_pos = null,
            _new_pos = null;
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
            _this.addBlock(_block_data, MAIN_PERMEATE_SCENE.block_server_num[_len_block_array + 1], _len_block_array);
            _this._layer_line_yellow.removeFromParent();
            _this._layer_line_yellow = null;
            _this.drawLine(_this._block_array.length);
        }, MAIN_PERMEATE_SCENE["_opactions"]["_add_block_fadeout_action_time"] * 1000);
    },
    alertTeamInfo: function () {
        if (this._add_block_array.length < 1) {
            return;
        }

        var _this = this,
            _size = null,
            _sp_team_icon_all = null,
            _sp_team_icon = null,
            _sp_team_icon_mask = null,
            _clip = null,
            _clipper = null,
            _team_name_ttf = null,
            _succeed_ttf = null,
            _bg_dialog = null,
            _bg_dialog_border_left = null,
            _bg_dialog_border_right = null,
            _bg_dialog_linghting_left = null,
            _bg_dialog_linghting_right = null,
            _clip_dialog_bottom_left = null,
            _clipper_dialog_bottom_left = null,
            _clip_dialog_bottom_right = null,
            _clipper_dialog_bottom_right = null,
            _bg_dialog_bottom_left = null,
            _bg_dialog_bottom_right = null,
            _sp_dialog_congratulations = null,
            _team = this._team_array[GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(this._add_block_array[0].team, "id", this._team_array, "_team_id")];

        if (_team === undefined) {
            cc.log('队伍从未入场');
            //在队伍入场缓存中查找该ID的队伍请求
            _team = this._team_array[GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(this._add_block_array[0].team, "id", this._add_team_array, "_team_id")];
        }

        if (_team === undefined) {
            cc.log('没有此队伍数据');
            //清除此条无效请求
            this._add_block_array.pop();
            return;
        }

        if (!this._is_action_block) {
            this._is_action_block = true;
            setTimeout(function () {
                _this._is_action_block = false;
            }, 5000);
        }

        this._layer_add_block_dialog = new cc.Layer();
        this._layer_add_block_dialog.setCascadeOpacityEnabled(true);
        this._layer_add_block_dialog.setScale(1.25 / MAIN_PERMEATE_SCENE.block_server_num[this._block_array.length]["block_scale"]);

        //处理team头像
        _sp_team_icon_all = new cc.Sprite();
        _sp_team_icon_all.setCascadeOpacityEnabled(true);
        _sp_team_icon = new cc.Sprite(_team._icon_img.getSpriteFrame());
        _clip = new cc.Sprite(MAIN_PERMEATE_SCENE.res.clipping_team_icon_dialog);
        _clipper = new cc.ClippingNode(_clip);
        _clipper.setCascadeOpacityEnabled(true);
        _clipper.alphaThreshold = 0;
        _size = _sp_team_icon.getContentSize();
        _sp_team_icon.setScale(106 / _size.width, 119 / _size.height);
        _clipper.addChild(_sp_team_icon);
        _sp_team_icon_all.addChild(_clipper, 1);

        _sp_team_icon_mask = new cc.Sprite("#permeate_dialog_team_icon_mask.png");
        _sp_team_icon_mask.setPosition(_clipper.getPosition());
        _sp_team_icon_all.addChild(_sp_team_icon_mask, 2);
        _sp_team_icon_all.opacity = 0;
        _sp_team_icon_all.setScale(.1, .1);
        _sp_team_icon_all.x = this._winSize.width / 2;
        _sp_team_icon_all.y = this._winSize.height / 2 + 170;
        this._layer_add_block_dialog.addChild(_sp_team_icon_all, 5);
        _sp_team_icon_all.runAction(cc.spawn(cc.fadeIn(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times), cc.scaleTo(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times, 1, 1)));

        //小翅膀
        _bg_dialog_linghting_right = new cc.Sprite("#permeate_dialog_wing_right.png");
        _bg_dialog_linghting_right.x = _sp_team_icon_all.x + 80;
        _bg_dialog_linghting_right.y = _sp_team_icon_all.y - 40;
        _bg_dialog_linghting_right.opacity = 0;
        _bg_dialog_linghting_right.setRotation(90);
        _bg_dialog_linghting_right.setAnchorPoint(0, 0);
        this._layer_add_block_dialog.addChild(_bg_dialog_linghting_right, 1);
        _bg_dialog_linghting_right.runAction(cc.spawn(cc.fadeIn(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times), cc.rotateBy(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times, -90)));

        _bg_dialog_linghting_left = new cc.Sprite("#permeate_dialog_wing_right.png");
        _bg_dialog_linghting_left.x = _sp_team_icon_all.x - 80;
        _bg_dialog_linghting_left.y = _sp_team_icon_all.y - 40;
        _bg_dialog_linghting_left.setScale(-1, 1);
        _bg_dialog_linghting_left.opacity = 0;
        _bg_dialog_linghting_left.setRotation(-90);
        _bg_dialog_linghting_left.setAnchorPoint(0, 0);
        this._layer_add_block_dialog.addChild(_bg_dialog_linghting_left, 1);
        _bg_dialog_linghting_left.runAction(cc.spawn(cc.fadeIn(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times), cc.rotateBy(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times, 90)));

        //背景
        _bg_dialog = new cc.Sprite("#permeate_dialog_bg.png");
        _bg_dialog.x = this._winSize.width / 2;
        _bg_dialog.y = this._winSize.height / 2;
        _bg_dialog.opacity = 0;
        this._layer_add_block_dialog.addChild(_bg_dialog, 0);
        _bg_dialog.runAction(cc.sequence(cc.delayTime(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times), cc.fadeIn(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times)));

        //team 名称
        _team_name_ttf = new cc.LabelTTF(_team._team_name, "Arial", 60);
        _team_name_ttf.setFontFillColor(cc.color(255, 206, 0));
        _team_name_ttf.x = this._winSize.width / 2;
        _team_name_ttf.y = this._winSize.height / 2 + 50 + 30;
        _team_name_ttf.opacity = 0;
        this._layer_add_block_dialog.addChild(_team_name_ttf, 2);
        _team_name_ttf.runAction(cc.sequence(cc.delayTime(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times * 3), cc.spawn(cc.fadeIn(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times), cc.moveBy(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times, cc.p(0, -30)))));

        _succeed_ttf = new cc.LabelTTF('恭喜渗透成功  开启本赛段新区域', "Arial", 30);
        _succeed_ttf.setFontFillColor(cc.color(245, 158, 0));
        _succeed_ttf.x = this._winSize.width / 2;
        _succeed_ttf.y = this._winSize.height / 2 - 60;
        _succeed_ttf.opacity = 0;
        this._layer_add_block_dialog.addChild(_succeed_ttf, 2);
        _succeed_ttf.runAction(cc.sequence(cc.delayTime(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times * 3), cc.spawn(cc.fadeIn(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times), cc.moveBy(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times, cc.p(0, 30)))));

        _bg_dialog_linghting_right = new cc.Sprite("#permeate_dialog_lighting_right.png");
        _bg_dialog_linghting_right.x = this._winSize.width / 2 + 296;
        _bg_dialog_linghting_right.y = this._winSize.height / 2;
        _bg_dialog_linghting_right.opacity = 0;
        this._layer_add_block_dialog.addChild(_bg_dialog_linghting_right, 1);
        _bg_dialog_linghting_right.runAction(cc.sequence(cc.delayTime(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times + 0.2), cc.fadeIn(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times)));

        _bg_dialog_linghting_left = new cc.Sprite("#permeate_dialog_lighting_right.png");
        _bg_dialog_linghting_left.x = this._winSize.width / 2 - 296;
        _bg_dialog_linghting_left.y = this._winSize.height / 2;
        _bg_dialog_linghting_left.setScale(-1, 1);
        _bg_dialog_linghting_left.opacity = 0;
        this._layer_add_block_dialog.addChild(_bg_dialog_linghting_left, 1);
        _bg_dialog_linghting_left.runAction(cc.sequence(cc.delayTime(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times + 0.2), cc.fadeIn(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times)));

        _bg_dialog_border_right = new cc.Sprite("#permeate_dialog_border_right.png");
        _bg_dialog_border_right.x = this._winSize.width / 2 + 296 + 30;
        _bg_dialog_border_right.y = this._winSize.height / 2 + 4;
        _bg_dialog_border_right.opacity = 0;
        this._layer_add_block_dialog.addChild(_bg_dialog_border_right, 1);
        _bg_dialog_border_right.runAction(cc.sequence(cc.delayTime(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times), cc.spawn(cc.fadeIn(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times), cc.moveBy(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times / 2, cc.p(-30, 0)))));

        _bg_dialog_border_left = new cc.Sprite("#permeate_dialog_border_right.png");
        _bg_dialog_border_left.x = this._winSize.width / 2 - 296 - 30;
        _bg_dialog_border_left.y = this._winSize.height / 2 + 4;
        _bg_dialog_border_left.setScale(-1, 1);
        _bg_dialog_border_left.opacity = 0;
        this._layer_add_block_dialog.addChild(_bg_dialog_border_left, 1);
        _bg_dialog_border_left.runAction(cc.sequence(cc.delayTime(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times), cc.spawn(cc.fadeIn(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times), cc.moveBy(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times / 2, cc.p(30, 0)))));

        //底部 congratulations
        _bg_dialog_bottom_right = new cc.Sprite("#permeate_dialog_bottom_right.png");
        _bg_dialog_bottom_right.x = 240;
        _clip_dialog_bottom_right = new cc.Sprite('#permeate_dialog_bottom_mask.png');
        _clipper_dialog_bottom_right = new cc.ClippingNode(_clip_dialog_bottom_right);
        _clipper_dialog_bottom_right.setCascadeOpacityEnabled(true);
        _clipper_dialog_bottom_right.x = this._winSize.width / 2 + 120;
        _clipper_dialog_bottom_right.y = this._winSize.height / 2 - 136;
        _clipper_dialog_bottom_right.alphaThreshold = 0;
        _size = _sp_team_icon.getContentSize();
        _clipper_dialog_bottom_right.addChild(_bg_dialog_bottom_right);
        this._layer_add_block_dialog.addChild(_clipper_dialog_bottom_right, 1);
        _bg_dialog_bottom_right.runAction(cc.sequence(cc.delayTime(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times * 2), cc.moveBy(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times, cc.p(-240, 0))));

        _bg_dialog_bottom_left = new cc.Sprite("#permeate_dialog_bottom_right.png");
        _bg_dialog_bottom_left.setScale(-1, 1);
        _bg_dialog_bottom_left.x = -240;
        _clip_dialog_bottom_left = new cc.Sprite('#permeate_dialog_bottom_mask.png');
        _clipper_dialog_bottom_left = new cc.ClippingNode(_clip_dialog_bottom_left);
        _clipper_dialog_bottom_left.setCascadeOpacityEnabled(true);
        _clipper_dialog_bottom_left.x = this._winSize.width / 2 - 120;
        _clipper_dialog_bottom_left.y = this._winSize.height / 2 - 136;
        _clipper_dialog_bottom_left.alphaThreshold = 0;
        _size = _sp_team_icon.getContentSize();
        _clipper_dialog_bottom_left.addChild(_bg_dialog_bottom_left);
        this._layer_add_block_dialog.addChild(_clipper_dialog_bottom_left, 1);
        _bg_dialog_bottom_left.runAction(cc.sequence(cc.delayTime(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times * 2), cc.moveBy(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times, cc.p(240, 0))));


        _sp_dialog_congratulations = new cc.Sprite("#permeate_dialog_congratulations.png");
        _sp_dialog_congratulations.x = this._winSize.width / 2;
        _sp_dialog_congratulations.y = this._winSize.height / 2 - 146;
        _sp_dialog_congratulations.opacity = 0;
        _sp_dialog_congratulations.setScale(.2, .2);
        this._layer_add_block_dialog.addChild(_sp_dialog_congratulations, 1);
        _sp_dialog_congratulations.runAction(cc.sequence(cc.delayTime(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times * 2), cc.spawn(cc.fadeIn(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times), cc.scaleTo(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times, 1, 1))));

        this.addChild(this._layer_add_block_dialog, 99);
        this._layer_add_block_dialog.runAction(cc.sequence(cc.delayTime(3), cc.fadeOut(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times), cc.delayTime(MAIN_PERMEATE_SCENE.opations_team_succeed_dialog.action_times), cc.callFunc(function () {
            _this._layer_add_block_dialog.removeFromParent();
            _this._layer_add_block_dialog = null;
            _this.addNewBlock();
        })));
    },
    /**
     * @desc 缓存队伍相关行为数据
     * @param {object} team_data
     */
    saveTeamRequest: function (team_data) {
        this._add_team_array.unshift(team_data);
        // if (this._is_action_block || this._add_block_array.length > 0) {
        //     this.schedule(this.updateAddTeam, 1.0);
        // } else {
        //     this.addTeam();
        // }
    },
    /**
     * @desc 处理队伍入场请求
     */
    addTeam: function () {
        if (this._is_action_block || this._add_block_array.length > 0) {
            return;
        }

        var _obj = this._add_team_array.pop(),
            _result_team_is_new = null,
            _result_server_has_action_team = null,
            _block_index = null,
            _action = null,
            _line_end_pos = null,
            _height_distance = null,
            _team = null;

        _result_team_is_new = GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(_obj, "id", this._team_array, "_team_id");
        _block_index = GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(_obj, "attack_block_id", this._block_array, "_block_id");
        _result_server_has_action_team = this.getServerActionTeamNum(_obj.attack_server_id);

        if (_block_index < 0) {
            cc.log("不存在ID " + _obj.attack_block_id + '的大区');
            this._add_team_array.unshift(_obj);
            return;
        }

        if (_result_team_is_new === -1) {
            cc.log('新队伍');
            _team = new Team_class(_obj);
            _team.setPosition(cc.pAdd(MAIN_PERMEATE_SCENE.basic_pos_array.entry, cc.p(0, 30)));
            this.addChild(_team, 10);
            this._team_array.push(_team);
            this.teamMoveToBlock(_team, _obj);
            _team.attack_block_id = _obj.attack_block_id;
            _team.attack_server_id = _obj.attack_server_id;
        } else {
            // cc.log('队伍已存在    ' + _result_team_is_new);

            //如果当前server上已经存在两个动画中的team时则暂缓响应
            if (_result_server_has_action_team.length === 2) {
                this._add_team_array.unshift(_obj);
                return;
            }

            _team = this._team_array[_result_team_is_new];
            _result_server_has_action_team = this.getServerActionTeamNum(_team.attack_server_id);

            //如果队伍正在动画中则稍后再处理
            if (_team.is_lock) {
                this._add_team_array.unshift(_obj);
                return;
            }

            _action = cc.spawn(cc.moveBy(_team._options.action_time_interchanger_small, cc.p(0, 35)), cc.scaleTo(_team._options.action_time_interchanger_small, 1, 1), cc.fadeIn(_team._options.action_time_interchanger_small));
            _team.cleanup();
            //避免新增block后坐标发生变化
            var _team_block = this._block_array[GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(_team, "attack_block_id", this._block_array, "_block_id")];
            _team.setPosition(cc.pAdd(_team_block.getPosition(), _team_block.getServerPos(_team)));

            //如果此server上已存在一个正在行动的team

            if (_result_server_has_action_team.length > 0) {
                //已经存在的team
                var _server_team = _result_server_has_action_team.pop();

                _height_distance = _server_team.getPosition().y - _team.y;
                if (_height_distance < 40) {
                    cc.log('_result_server_has_action_team = ' + _result_server_has_action_team.length);
                    _team.y += 20;
                    _team.setLocalZOrder(9);
                } else {
                    _team.setLocalZOrder(10);
                }
            } else {
                _team.setLocalZOrder(10);
            }

            var _this = this;
            _team.runAction(cc.sequence(_action, cc.delayTime(.3), cc.callFunc(function () {
                _this.teamMoveToServer(_team, _obj, true);
            })));
        }
    },
    /**
     * @desc  Team 移动到目标大区
     * @param {object} team  队伍对象
     * @param {object} obj  队伍行动数据Json
     */
    teamMoveToBlock: function (team, obj) {
        var _line_start_pos = team.getPosition(),
            _block_index = null,
            _path_array = null,
            _line_end_pos = null,
            _distance = null,
            _action_time = null,
            _action = [];

        this._is_action_team++;
        _block_index = GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(obj, "attack_block_id", this._block_array, "_block_id");
        _block = this._block_array[_block_index];

        // 判断是否是第一次入场
        if (team.attack_server_id === null) {
            _action.push(cc.delayTime(.5));
            _path_array = MAIN_PERMEATE_SCENE.path_pos_array[this._block_array.length][_block_index];
            for (var _index = 0, _len = _path_array.length; _index < _len; _index++) {
                _line_end_pos = _path_array[_index];
                _distance = cc.pDistance(_line_start_pos, _line_end_pos);
                _action_time = _distance / team._options.team_move_action_distance;
                _action.push(cc.moveTo(_action_time, cc.pAdd(_line_end_pos, cc.p(0, 30))));
                _line_start_pos = _line_end_pos;
            }
        } else {
            _action.push(cc.delayTime(.2));
        }

        var _this = this;
        _action.push(cc.callFunc(function () {
            _this.teamMoveToServer(team, obj);
        }));
        team.runAction(cc.sequence(_action));
    },
    teamMoveToServer: function (team, obj) {
        var _line_start_pos = team.getPosition(),
            _result_server_has_action_team = null,
            _block = null,
            _block_index = null,
            _target_block = null,
            _line_end_pos = null,
            _distance = null,
            _action_time = null;

        _block_index = GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(obj, "attack_block_id", this._block_array, "_block_id");
        _block = this._block_array[_block_index];
        team.attack_block_id = obj.attack_block_id;
        team.attack_server_id = obj.attack_server_id;
        //移动到具体server的上
        _line_end_pos = cc.pAdd(_block.getPosition(), this._block_array[_block_index].getServerPos(obj));
        _distance = cc.pDistance(_line_start_pos, _line_end_pos);
        _action_time = _distance / team._options.team_move_action_distance;
        //如果渗透完成 加2个参数
        _target_block = obj.hasOwnProperty("attack_completed") ? _block : null;

        _result_server_has_action_team = this.getServerActionTeamNum(obj.attack_server_id);

        if (_result_server_has_action_team.length > 0) {
            var _height_distance = _result_server_has_action_team.pop().getPosition().y - _line_end_pos.y;
            if (_height_distance < 40 && _height_distance > 28) {
                _line_end_pos.y += 20;
                team.setLocalZOrder(9);
            } else {
                team.setLocalZOrder(10);
            }
        } else {
            team.setLocalZOrder(10);
        }

        team.moveToServer(_line_end_pos, _action_time, _target_block, obj);
    },
    /**
     * @desc  返回目标server 上当前正在渗透的team数量
     * @param {string} target_server_id
     * @returns {array}
     */
    getServerActionTeamNum: function (target_server_id) {
        var _result = this._team_array.filter(function (team) {
            if (team.is_lock) {
                return team.attack_server_id === target_server_id;
            }
        });
        return _result;
    },
    updateAddBlock: function () {
        if (this._block_array.length === MAIN_PERMEATE_SCENE["_opactions"]["_block_show_num_max"] || this._add_block_array.length === 0) {
            this.unschedule(this.updateAddBlock);
            this._add_block_array.splice(0, this._add_block_array.length);
            return;
        }

        //处理 新增 block
        if (this._add_block_array.length > 0 && this._is_action_team === 0 && !this._is_action_block) {
            // this.addNewBlock();
            this.alertTeamInfo();
        }
    },
    updateAddTeam: function () {
        //如果有新增block请求则暂停处理新增team优先处理新增block请求
        if (this._add_block_array.length > 0) {
            return;
        }
        if (this._add_team_array.length > 0) {
            this.addTeam();
        }
    }
});

MAIN_PERMEATE_SCENE.HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new MAIN_PERMEATE_SCENE.Permeate_main_layer());
    }
});
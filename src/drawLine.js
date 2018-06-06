/*
 * @Author: Liang Liang
 * @Date: 2018-06-4 09:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-04 18:10:04
 * @Description: 
 */
var Draw_line_class = cc.Layer.extend({
    _options: {
        //1s 画多少ps
        draw_line_action_distance: 400
    },
    //每一段的间隔
    _draw_line_delay_time: 0,
    _line_pos_array: {
        1: [
            [cc.p(792, 523), cc.p(438, 320)]
        ],
        2: [
            //每个数组包含 一个起点与一个终点
            [cc.p(792, 523), cc.p(609, 418)],
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
                [cc.p(792, 523), cc.p(455, 327)],
                [cc.p(668, 493), cc.p(954, 325)]
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
                [cc.p(792, 523), cc.p(455, 325)],
                [cc.p(668, 493), cc.p(954, 325)],
                [cc.p(736, 457), cc.p(459, 619)]
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
    },
    ctor: function (num) {
        this._super();

        var _distance = null,
            _action_time = null,
            _obj = this._line_pos_array[num],
            _len = _obj.length,
            _line_start_pos = _obj[0][0],
            _line_end_pos = _obj[0][1];

        for (var index = 0; index < _len; index++) {
            var _len_sub = _obj[index].length;
            //处理要同时画的分支线段
            if (_obj[index][0] instanceof Array) {
                for (var index_sub = 0; index_sub < _len_sub; index_sub++) {
                    _line_start_pos = _obj[index][index_sub][0];
                    _line_end_pos = _obj[index][index_sub][1];
                    _distance = cc.pDistance(_line_start_pos, _line_end_pos);
                    _action_time = _distance / this._options.draw_line_action_distance;
                    this.drawLine(_line_start_pos, _line_end_pos, _distance, _action_time);
                }

                _action_time += 0.2;
                this._draw_line_delay_time += _action_time;

            } else {
                _line_start_pos = _obj[index][0];
                _line_end_pos = _obj[index][1];

                _distance = cc.pDistance(_line_start_pos, _line_end_pos);
                _action_time = _distance / this._options.draw_line_action_distance;
                this.drawLine(_line_start_pos, _line_end_pos, _distance, _action_time);
                this._draw_line_delay_time += _action_time;
            }
        }
    },
    /**
     * @desc 画线方法
     * @param {*} s_pos 起点
     * @param {*} e_pos 终点
     * @param {*} _distance 两点距离
     * @param {*} _action_time 动画时间
     */
    drawLine: function (s_pos, e_pos, _distance, _action_time) {
        var _rotate = null,
            _scale_size = null,
            _this = this,
            _line = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_line_yellow);
        _line.setPosition(s_pos);
        this.addChild(_line, 1);
        _line.setAnchorPoint(1, .5);
        _line.opacity = 0;

        //确定线的角度
        _rotate = MAIN_PERMEATE_SCENE.getRotate(s_pos, e_pos);
        _line.setRotation(_rotate);

        // 2点距离 / 线段图片宽度; 
        _scale_size = Math.round(_distance / 4);

        _line.runAction(cc.sequence(cc.delayTime(this._draw_line_delay_time), cc.fadeIn(0), cc.scaleBy(_action_time, _scale_size, 1), cc.callFunc(function () {
            _this.parent._is_action = false;
        })));

    }
})
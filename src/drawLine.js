/*
 * @Author: Liang Liang
 * @Date: 2018-06-4 09:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-04 18:10:04
 * @Description: 画黄线
 */
var Draw_line_class = cc.Layer.extend({
    _options: {
        //1s 画多少ps
        draw_line_action_distance: 600
    },
    //每一段的间隔
    _draw_line_delay_time: 0,

    ctor: function (num) {
        this._super();

        var _distance = null,
            _action_time = null,
            _obj = MAIN_PERMEATE_SCENE.path_pos_array[num],
            _line_start_pos = _obj[0][0],
            _line_end_pos = _obj[0][1];

        _line_start_pos = MAIN_PERMEATE_SCENE.basic_pos_array.entry;
        _line_end_pos = MAIN_PERMEATE_SCENE.path_pos_array["1"][0][0];
        _distance = cc.pDistance(_line_start_pos, _line_end_pos);
        _action_time = _distance / this._options.draw_line_action_distance;
        this.drawLine(_line_start_pos, _line_end_pos, _distance, _action_time);
        this._draw_line_delay_time += _action_time;

        for (var _i = 0, _leni = _obj.length; _i < _leni; _i++) {
            this._draw_line_delay_time = 0;
            for (var _j = 0, _lenj = _obj[_i].length - 1; _j < _lenj; _j++) {
                _line_start_pos = _obj[_i][_j];
                _line_end_pos = _obj[_i][_j + 1];
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
            _line = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_line_yellow);
        _line.setPosition(s_pos);
        this.addChild(_line, 1);
        _line.setAnchorPoint(1, .5);
        _line.opacity = 0;

        //确定线的角度
        _rotate = GLOBAL_FUNC_SIMPLEEDU.getRotate(s_pos, e_pos);
        _line.setRotation(_rotate);

        // 2点距离 / 线段图片宽度; 
        _scale_size = Math.round(_distance / 4);

        _line.runAction(cc.sequence(cc.delayTime(this._draw_line_delay_time), cc.fadeIn(0), cc.scaleBy(_action_time, _scale_size, 1)));

    }
})
/*
 * @Author: Liang Liang
 * @Date: 2018-06-4 09:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-04 18:10:04
 * @Description: 
 */
var Draw_line_class = cc.Layer.extend({
    _line_pos_array: {
        1: [
            cc.p(792, 523),
            cc.p(438, 320)
        ],
        2: [
            cc.p(792, 523),
            cc.p(609, 418),
            [
                cc.p(403, 546),
                cc.p(842, 275)
            ]
        ],
    },
    ctor: function (num) {
        this._super();
        var _rotate = null,
            _distance = null,
            _obj = this._line_pos_array[num],
            _line_start_pos = _obj[0],
            _line_end_pos = _obj[1],
            _line = new cc.Sprite(MAIN_PERMEATE_SCENE.res.sp_line_yellow);
        _line.setPosition(_obj[0]);
        this.addChild(_line, 1);
        _line.setAnchorPoint(1, .5);

        //确定线的角度
        _rotate = MAIN_PERMEATE_SCENE.getRotate(_line_start_pos, _line_end_pos);
        cc.log('线的角度: ' + _rotate);
        _line.setRotation(_rotate);

        //确定线的长度 = 2点距离 / 线段图片宽度
        _distance = Math.round(cc.pDistance(_line_start_pos, _line_end_pos) / 4);
        cc.log('线的长度： ' + _distance);
        // _line.setScaleX(75.5);
        _line.runAction(cc.scaleBy(1, _distance, 1));
    },
    hitServer: function (num) {

    },
    getServerPos: function (num) {
    }
})
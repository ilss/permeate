var Team_class = cc.Node.extend({
    _team_id: null,
    _team_name: null,
    _opactions: {
        _fade_time: .5
    },
    _sp: null,
    ctor: function (obj) {
        this._super();
        if (typeof obj !== 'object') {
            cc.log('Team_class 参数必须是obj');
            return;
        }
        this.initTeam(obj);
    },
    initTeam: function (obj) {
        this._sp = new cc.Sprite();
        this._sp.opacity = 0;
        this._sp.setCascadeOpacityEnabled(true);
        this.addChild(this._sp, 1);
        var _mask = new cc.Sprite(MAIN_EFFECTS_ACTION.res.team_bg);
        this._sp.addChild(_mask, 9);
        this.loadUrlImage(obj.url, this._sp);
        var _txt = new cc.LabelTTF("战队 A", 10);
        _txt.setFontFillColor(cc.color(7, 230, 230));
        _txt.y = 55;
        this._sp.addChild(_txt, 1);
        this._sp.runAction(cc.fadeIn(this._opactions._fade_time));
    },
    loadUrlImage: function (faceurl, node) {
        // && (/^https?:\/\/\w+/g).test(url)
        if (typeof faceurl === 'string') {
            cc.loader.loadImg(faceurl, { isCrossOrigin: false }, function (err, img) {
                if (err) {
                    cc.log("图片加载失败 " + err);
                }
                else {
                    var sprite = new cc.Sprite(img);
                    sprite.x = 0;
                    sprite.y = 0;
                    node.addChild(sprite);
                }
            });
        }
    },
    changeTeam: function (obj) {
        cc.log(obj);
        var _this = this;
        this._sp.runAction(cc.sequence(cc.fadeOut(this._opactions._fade_time), cc.callFunc(
            function () {
                _this._sp.removeFromParent();
                _this._sp = null;
                _this.initTeam(obj);
            }
        )));

    }
})
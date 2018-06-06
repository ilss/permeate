(function (window) {
    window["MAIN_PERMEATE_SCENE"] = {
        _EFFECTS_MAIN_LAYER: null,
        /**
         * @func 
         * @desc 返回minNum 到 maxNum 之间的随机数，包括minNum 和 maxNum.
         * @param {number} minNum 
         * @param {number} maxNum 
         * @returns 
         */
        randomNum: function (minNum, maxNum) {
            if (typeof minNum !== 'number' || typeof minNum !== 'number') {
                throw new Error('argument has to be Number')
            }
            switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * minNum + 1, 10);
                case 2:
                    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                default:
                    return 0;
            }
        },

        getRotate: function (pos1, pos2) {
            var o = pos1.x - pos2.x,
                a = pos1.y - pos2.y,
                _at = Math.atan(o / a) * 180 / Math.PI;
            if (a < 0) {
                if (o < 0)
                    _at = 180 + Math.abs(_at);
                else
                    _at = 180 - Math.abs(_at);
            }
            _at -= 90;
            return Math.round(_at);
        },

        findObjFromArray: function (obj, obj_key, array, array_key) {
            return array.findIndex(function (item) {
                return item[array_key] === obj[obj_key];
            });
        }
    }

    function addBlock (block_data) {
        MAIN_PERMEATE_SCENE._EFFECTS_MAIN_LAYER.addNewBlock(block_data);
    }

    function teamAttackServer (team_attack_data) {
        if (typeof team_attack_data !== 'object') {
            throw new Error('TEAM_ATTACK_SERVER 参数必须为json格式');
        }
        MAIN_PERMEATE_SCENE._EFFECTS_MAIN_LAYER.addTeam(team_attack_data);
    }

    window["PERMEATE_ADD_BLOCK"] = addBlock;
    window["TEAM_ATTACK_SERVER"] = teamAttackServer;
}(window));
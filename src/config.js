/*
 * @Author: Liang Liang
 * @Date: 2018-06-1 09:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-08 18:05:11
 * @Description: 
 */

//基础设置
MAIN_PERMEATE_SCENE._opactions = {
    _block_show_num_max: 6,
    _team_show_num_max: 10,
    _add_block_fadeout_action_time: .5
}

MAIN_PERMEATE_SCENE.basic_pos_array = {
    entry: cc.p(786, 520),
    cloud: cc.p(938, 670),
    lightning: cc.p(885, 592),
    firewall: cc.p(789, 564),
    interchanger: cc.p(706, 478),
}

//渗透成功对话框
MAIN_PERMEATE_SCENE.opations_team_succeed_dialog = {
    action_times: .33
}

//几个区的不同布局
MAIN_PERMEATE_SCENE.block_server_num = {
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
        block_scale: 1.15
    },
    3: {
        block_pos: [
            cc.p(230, 380),
            cc.p(538, 183),
            cc.p(1028, 266)
        ],
        block_scale: 1.075
    },
    4: {
        block_pos: [
            cc.p(186, 344),
            cc.p(480, 162),
            cc.p(1028, 266),
            cc.p(370, 667)
        ],
        block_scale: 1
    },
    5: {
        block_pos: [
            cc.p(186, 344),
            cc.p(480, 162),
            cc.p(880, 250),
            cc.p(370, 667),     //4
            cc.p(1100, 380),    //5
        ],
        block_scale: 1
    },
    6: {
        block_pos: [
            cc.p(186, 344),
            cc.p(480, 162),
            cc.p(880, 250),
            cc.p(303, 596),     //4
            cc.p(1100, 380),    //5
            cc.p(529, 723)      //6
        ],
        block_scale: 1
    }
}

//黄线路径
MAIN_PERMEATE_SCENE.path_pos_array = {
    1: [
        [cc.p(706, 473), cc.p(417, 307)]
    ],
    2: [
        //每个数组包含 一个起点与一个终点
        [cc.p(706, 473), cc.p(609, 418), cc.p(403, 546), cc.p(363, 522)],
        [cc.p(706, 473), cc.p(609, 418), cc.p(842, 275), cc.p(797, 246)],
    ],
    3: [
        //每个数组包含 一个起点与一个终点
        [cc.p(706, 473), cc.p(507, 358), cc.p(358, 450), cc.p(317, 426)],
        [cc.p(706, 473), cc.p(507, 358), cc.p(668, 253), cc.p(628, 229)],
        [cc.p(706, 473), cc.p(954, 325)]
    ],
    4: [
        //每个数组包含 一个起点与一个终点
        [cc.p(708, 471), cc.p(456, 326), cc.p(314, 413), cc.p(277, 390)],
        [cc.p(708, 471), cc.p(456, 326), cc.p(606, 231), cc.p(570, 209)],
        [cc.p(706, 470), cc.p(954, 325)],
        [cc.p(708, 472), cc.p(460, 618)]
    ],
    5: [
        //每个数组包含 一个起点与一个终点
        [cc.p(708, 471), cc.p(456, 326), cc.p(314, 413), cc.p(277, 390)],
        [cc.p(708, 471), cc.p(456, 326), cc.p(606, 231), cc.p(570, 209)],
        [cc.p(706, 471), cc.p(853, 388), cc.p(763, 334), cc.p(806, 309)],
        [cc.p(708, 472), cc.p(460, 618)],
        [cc.p(706, 471), cc.p(853, 388), cc.p(986, 466), cc.p(1026, 443)]
    ],
    6: [
        //每个数组包含 一个起点与一个终点
        [cc.p(708, 471), cc.p(456, 326), cc.p(314, 413), cc.p(277, 390)],
        [cc.p(708, 471), cc.p(456, 326), cc.p(606, 231), cc.p(570, 209)],
        [cc.p(706, 471), cc.p(860, 386), cc.p(765, 329), cc.p(801, 308)],
        [cc.p(708, 472), cc.p(530, 576), cc.p(435, 521), cc.p(392, 546)],
        [cc.p(706, 471), cc.p(860, 386), cc.p(984, 458), cc.p(1020, 438)],
        [cc.p(708, 472), cc.p(530, 576), cc.p(658, 650), cc.p(620, 673)]
    ],
}
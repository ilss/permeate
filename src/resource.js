MAIN_PERMEATE_SCENE.res = {
    sp_cloud: "res/permeate_cloud.png",
    sp_lightning: "res/permeate_lightning.png",
    sp_interchanger: "res/permeate_interchanger.png",
    bg_block: "res/permeate_block_bg.png",
    sp_block_pc: "res/permeate_pc.png",
    sp_block_server_0: "res/permeate_server_0.png",
    sp_block_server_1: "res/permeate_server_1.png",
    sp_line_yellow: "res/permeate_line_yellow.png",
    sp_interchanger_small: "res/interchanger_small.png",
    sp_firewall: "res/permeate_firewall.png"
};

MAIN_PERMEATE_SCENE.g_resources = [];
for (var i in MAIN_PERMEATE_SCENE.res) {
    MAIN_PERMEATE_SCENE.g_resources.push(MAIN_PERMEATE_SCENE.res[i]);
}
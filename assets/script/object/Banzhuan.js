cc.Class({
    extends: cc.Component,

    properties: {
        fly : false,
        v_x : 0,
        v_y : 0
    },

    update (dt) {
        // 如果离开了手
        if (this.fly) {
            var player = this.node.parent.getChildByName("Player");
            this.node.x += this.v_x * dt;
            // 模拟重力加速度
            this.v_y -= 500 * dt;
            this.node.y += this.v_y * dt;
            if (this.node.y < player.y - player.height) {
                this.node.destroy();
            }
        }
    },
});

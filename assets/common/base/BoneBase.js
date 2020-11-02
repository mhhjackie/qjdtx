/*
 * 过关动画
 */

import Base from 'Base';
cc.Class({
    extends: Base,

    properties: {

    },

    onLoad(isSuper) {
        isSuper && this._super();

        this.aramature = this.$(dragonBones.ArmatureDisplay);
        this.aramature.addEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
        this.defaultAnimName = 'newAnimation';
    },

    onDestroy() {
        // this.aramature.removeEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
    },

    onEnable() {
        this.aramature.playAnimation(this.defaultAnimName);
    },

    animationEventHandler(event) {
        let msg = event.detail || event;
        let name = msg.animationState.name;
        if (event.type === dragonBones.EventObject.COMPLETE) {
            if (name === this.defaultAnimName) {
                this.node.active = false;
            }
        }
    },
});

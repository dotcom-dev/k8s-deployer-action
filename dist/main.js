"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helm_1 = require("./utils/helm");
const main = async () => {
    // TODO: determine kubeconfig path
    // TODO: determine Helm
    // TODO: add default repo
    // TODO: add repo
    console.log('Done ✨', await (0, helm_1.obtainHelmPath)());
};
void main();
//# sourceMappingURL=main.js.map
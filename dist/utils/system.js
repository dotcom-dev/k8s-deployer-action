"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemExecutableExtension = exports.getSystemInfo = void 0;
const os = require("os");
/**
 * Get info about the current system.
 */
const getSystemInfo = () => {
    const { type, arch } = os;
    return {
        type: type,
        arch: arch,
    };
};
exports.getSystemInfo = getSystemInfo;
/**
 * Get executable file extension for the current system.
 */
const getSystemExecutableExtension = () => {
    if (os.type().match(/^Win/)) {
        return '.exe';
    }
    return '';
};
exports.getSystemExecutableExtension = getSystemExecutableExtension;
//# sourceMappingURL=system.js.map
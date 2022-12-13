"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemMap = exports.SystemArch = exports.SystemType = void 0;
var SystemType;
(function (SystemType) {
    SystemType["Windows"] = "Windows_NT";
    SystemType["Linux"] = "Linux";
    SystemType["Darwin"] = "Darwin";
})(SystemType = exports.SystemType || (exports.SystemType = {}));
var SystemArch;
(function (SystemArch) {
    SystemArch["X64"] = "x64";
    SystemArch["Arm"] = "arm";
    SystemArch["Arm64"] = "arm64";
})(SystemArch = exports.SystemArch || (exports.SystemArch = {}));
/**
 * Utility to help with mapping system types and archs to values.
 */
class SystemMap {
    map = new Map();
    constructor(definitions) {
        for (const [type, archDefinitions] of Object.entries(definitions)) {
            const archMap = new Map();
            if (archDefinitions) {
                for (const [archKey, archValue] of Object.entries(archDefinitions)) {
                    if (archValue) {
                        archMap.set(archKey, archValue);
                    }
                }
            }
            this.map.set(type, archMap);
        }
    }
    get(type, arch, formatter) {
        const value = this.map.get(type)?.get(arch);
        if (value && formatter) {
            return formatter(value);
        }
        return value;
    }
}
exports.SystemMap = SystemMap;
//# sourceMappingURL=SystemMap.js.map
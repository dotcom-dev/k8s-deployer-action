"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walkSync = void 0;
const fs = require("fs");
const path = require("path");
const core = require("@actions/core");
/**
 * Return an array containing all recursive files and directories under a given directory for a given file name
 *
 * @param directoryPath
 * @param fileToFind
 * @param foundFiles
 */
const walkSync = (directoryPath, fileToFind, foundFiles = []) => {
    const files = fs.readdirSync(directoryPath);
    files.forEach(function (file) {
        if (fs.statSync(path.join(directoryPath, file)).isDirectory()) {
            foundFiles = (0, exports.walkSync)(path.join(directoryPath, file), fileToFind, foundFiles);
        }
        else {
            core.debug(file);
            if (file == fileToFind) {
                foundFiles.push(path.join(directoryPath, file));
            }
        }
    });
    return foundFiles;
};
exports.walkSync = walkSync;
//# sourceMappingURL=fs.js.map
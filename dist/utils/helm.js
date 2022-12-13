"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtainHelmPath = void 0;
const fs = require("fs");
const util = require("util");
const tc = require("@actions/tool-cache");
const SystemMap_1 = require("./SystemMap");
const fs_1 = require("./fs");
const system_1 = require("./system");
const toolName = 'helm';
const defaultVersion = 'v3.10.2';
const downloadLinks = new SystemMap_1.SystemMap({
    [SystemMap_1.SystemType.Linux]: {
        [SystemMap_1.SystemArch.X64]: 'https://get.helm.sh/helm-%s-linux-amd64.tar.gz',
    },
});
const getDownloadUrl = (version) => {
    const { type, arch } = (0, system_1.getSystemInfo)();
    const url = downloadLinks.get(type, arch, (url) => url ? util.format(url, version) : undefined);
    if (!url) {
        throw new Error(`No Helm download link found for this system (${type} ${arch})`);
    }
    return url;
};
/**
 * Find the Helm executable path in a specific directory
 *
 * @param directoryPath
 */
const findHelmExecutable = (directoryPath) => {
    fs.chmodSync(directoryPath, '777');
    const foundFiles = (0, fs_1.walkSync)(directoryPath, `${toolName}${(0, system_1.getSystemExecutableExtension)()}`);
    if (!foundFiles.length) {
        throw new Error(`No Helm executable found in ${directoryPath}`);
    }
    return foundFiles[0];
};
/**
 * Download Helm archive, extract it, cache directory the directory and return the cached path
 *
 * @param version
 */
const downloadAndCache = async (version) => {
    const downloadUrl = getDownloadUrl(version);
    let helmArchivePath = await tc.downloadTool(downloadUrl);
    try {
        helmArchivePath = await tc.downloadTool(downloadUrl);
    }
    catch (error) {
        throw new Error(`Failed to download Helm from ${downloadUrl}. Error: ${error instanceof Error ? error.message : String(error)}`);
    }
    fs.chmodSync(helmArchivePath, '777');
    const unzippedPath = await tc.extractTar(helmArchivePath);
    return tc.cacheDir(unzippedPath, toolName, version);
};
/**
 * Obtain the path to the Helm executable. Either from cache or by downloading it.
 *
 * @param version
 */
const obtainHelmPath = async (version = defaultVersion) => {
    let cachedHelmDirectoryPath = tc.find(toolName, version);
    if (!cachedHelmDirectoryPath) {
        cachedHelmDirectoryPath = await downloadAndCache(version);
    }
    const helmExecutablePath = findHelmExecutable(cachedHelmDirectoryPath);
    if (!helmExecutablePath) {
        throw new Error(`Failed to find Helm executable in ${cachedHelmDirectoryPath}`);
    }
    fs.chmodSync(helmExecutablePath, '777');
    return helmExecutablePath;
};
exports.obtainHelmPath = obtainHelmPath;
//# sourceMappingURL=helm.js.map
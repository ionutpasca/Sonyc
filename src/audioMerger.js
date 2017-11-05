'use strict';

import * as fs from 'fs'
import Promise from 'bluebird'

export default class AudioMerger {
    constructor(filesToMerge, outputFile) {
        if (!fs.existsSync(outputFile)) {
            fs.closeSync(fs.openSync(outputFile, 'w'))
        }
        this.outputFilePath = outputFile
        this.writeStream = fs.createWriteStream(outputFile)
        this.filesToMerge = [].concat(filesToMerge)
    }

    async merge() {
        await this.addAllFilesToOutput(this.filesToMerge)
        this.writeStream.end('Done')
        return this.outputFilePath
    }

    async addAllFilesToOutput(filesPaths) {
        for (let file of filesPaths) {
            const res = await this.addFileToOutput(file)
        }
    }

    addFileToOutput = (filePath) => {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(filePath)
            stream.pipe(this.writeStream, { end: false })

            stream
                .on('error', function (err) {
                    reject(err);
                })
                .on('close', function () {
                    resolve();
                })
        })
    }
}


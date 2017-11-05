'use strict'

import * as path from 'path'

import AudioMerger from '../audioMerger'
import Constants from '../Constants'
import MapperGenerator from '../mapperGenerator'
import Utils from '../Utils'

export default class Encoder {
    static async  encode(base64String) {
        const audioFilesObjects = getAudioFilesForString(base64String)
        let audioFiles = Utils.getValuesFromArrayOfObjects(audioFilesObjects);
        audioFiles = applyAudioAssetsPathToFiles(audioFiles)

        return await concatAudioFiles(audioFiles)
    }
}

function getAudioFilesForString(base64String) {
    const audioMap = MapperGenerator.getAudioMap()

    return base64String.split('')
        .map((char) => Utils.findElementWithKey(audioMap, char))
        .filter((el) => el)
}

async function concatAudioFiles(audioFilePaths) {
    let resultPath = Constants.audioResultsPath
    const hash = `${Utils.createGuid()}.mp3`
    resultPath = path.join(resultPath, '/', hash);

    const audioMerger = new AudioMerger(audioFilePaths, resultPath)
    try {
        const result = await audioMerger.merge()
    } catch (error) {
        console.log("Error", error)
    }
}

function applyAudioAssetsPathToFiles(audioFilePaths) {
    const audioAssetsPath = Constants.audioAssetsPath
    return audioFilePaths.map((filePath) => path.join(audioAssetsPath, filePath))
}
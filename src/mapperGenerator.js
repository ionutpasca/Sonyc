
export default class MapperGenerator {
    static getAudioMap() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        return characters
            .split('')
            .map((char) => {
                return { [char]: `${characters.indexOf(char)}.mp3` }
            })
    }
}
'use strict'

import { flatten } from 'lodash'

export default class Utils {
    static createGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, (c) => {
                const r = Math.random() * 16 | 0
                const v = c == 'x' ? r : (r & 0x3 | 0x8)
                return v.toString(16);
            });
    }

    static findElementWithKey(array, elementKey) {
        return array.find((el) => el[elementKey])
    }

    static getValuesFromArrayOfObjects(array) {
        const values = array.map((obj) => {
            return Object.keys(obj).map((key) => obj[key])
        })
        return flatten(values)
    }
}
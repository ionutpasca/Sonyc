'use strict'

import Encoder from './src/encode/encoder'

const string = 'Test'
const base64String = Buffer.from(string).toString('base64');

Encoder.encode(base64String);
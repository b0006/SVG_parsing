'use strict'

let decoding = require('./decode');

window.storage = {}; // для пространства имен, что бы много мусора в window не пихать
window.storage.globalVar = decoding;

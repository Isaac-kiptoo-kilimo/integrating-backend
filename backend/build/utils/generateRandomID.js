"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomID = void 0;
function generateRandomID() {
    const min = 10000000;
    const max = 99999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.generateRandomID = generateRandomID;

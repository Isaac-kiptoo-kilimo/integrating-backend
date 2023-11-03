"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formateDates = void 0;
function formateDates() {
    let date = new Date();
    let newDate = date.toLocaleString();
    console.log(newDate);
    return newDate;
}
exports.formateDates = formateDates;
formateDates();

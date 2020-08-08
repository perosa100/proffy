"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertToHourToMinutes(time) {
    const [hour, minutes] = time.split(':').map(Number);
    const timeinMinutes = hour * 60 + minutes;
    return timeinMinutes;
}
exports.default = convertToHourToMinutes;

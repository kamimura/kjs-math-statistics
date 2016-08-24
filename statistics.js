(function () {
    'use strict';
    Array.prototype.sum = function () {
        var s = 0;

        this.forEach(function (num) {
            s += num;
        });
        return s;
    };
    Array.prototype.mean = function () {
        var s = this.sum(),
            n = this.length;

        return s / n;
    };
    Array.prototype.median = function () {
        var numbers = this.slice(),
            len = numbers.length,
            i1,
            i2,
            median;

        numbers.sort(function (x, y) {
            return x - y;
        });
        if (len % 2 === 0) {
            i1 = len / 2 - 1;
            i2 = i1 + 1;
            median = (numbers[i1] + numbers[i2]) / 2;
        } else {
            i1 = (len + 1) / 2 - 1;
            median = numbers[i1];
        }
        return median;
    };
    Array.prototype.modes = function () {
        var obj = {},
            count,
            num,
            max = 0,
            modes = [];

        this.forEach(function (num) {
            if (obj[num] === undefined) {
                obj[num] = 1;
                if (max === 0) {
                    max = 1;
                }
            } else {
                count = obj[num] + 1;
                obj[num] = count;
                if (count > max) {
                    max = count;
                }
            }
        });
        for (num in obj) {
            if (obj[num] === max) {
                modes.push(parseInt(num, 10));
            }
        }
        return modes;
    };
    Array.prototype.differences = function () {
        var mean = this.mean(),
            diff;

        diff = this.map(function (num) {
            return num - mean;
        });
        return diff;
    };
    Array.prototype.variance = function () {
        var diff = this.differences(),
            squared_diff,
            len = this.length;

        squared_diff = diff.map(function (x) {
            return Math.pow(x, 2);
        });
        return squared_diff.sum() / len;
    };
    Array.prototype.standard_deviation = function () {
        var variance = this.variance(),
            std_deviation = Math.sqrt(variance);

        return std_deviation;
    };
    Array.prototype.percentile = function (p) {
        var numbers = this.slice(),
            n = numbers.length,
            i = n * p / 100 + 0.5,
            k = Math.floor(i),
            f,
            result;

        numbers.sort(function (x, y) {
            return x - y;
        });
        if (k === i) {
            result = numbers[i];
        } else {
            f = i - k;
            result = (1 - f) * numbers[k - 1] + f * numbers[k]
        }
        return result;
    };
}(this));

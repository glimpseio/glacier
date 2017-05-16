"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
;
/**
 * Enumeration of all valid binary operator filter kinds
 */
exports.BinaryFilters = util_1.Enum("AND", "OR", "GT", "GTE", "LT", "LTE", "EQ", "NE", "LIKE");

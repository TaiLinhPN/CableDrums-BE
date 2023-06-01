"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ["admin", "planner", "supplyVendor", "projectContractor"],
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose_1.default.model("users", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map
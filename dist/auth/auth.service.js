"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const crypto_1 = require("crypto");
const authlog_schema_1 = require("./schemas/authlog.schema");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(jwtService, authLogModel, usersService) {
        this.jwtService = jwtService;
        this.authLogModel = authLogModel;
        this.usersService = usersService;
        this.otpStore = new Map();
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findByEmail(email);
        console.log(`validateUser: email=${email} userFound=${!!user}`);
        if (!user || !user.password)
            return null;
        try {
            const match = await bcrypt.compare(pass, user.password);
            if (match) {
                const u = user.toObject ? user.toObject() : user;
                delete u.password;
                return u;
            }
            return null;
        }
        catch (err) {
            console.error('validateUser: bcrypt.compare error', err);
            return null;
        }
    }
    async login(user, ip) {
        const payload = { sub: user._id, email: user.email };
        const token = this.jwtService.sign(payload);
        await this.authLogModel.create({ userId: user._id, ip, success: true });
        return { access_token: token };
    }
    async requestOtp(email, pass) {
        const user = await this.validateUser(email, pass);
        if (!user)
            return null;
        const code = (1000 + Math.floor(Math.random() * 9000)).toString();
        const expires = Date.now() + 5 * 60 * 1000;
        const key = (email || '').trim().toLowerCase();
        this.otpStore.set(key, { code, expires });
        await this.authLogModel.create({ userId: user._id, ip: null, success: true, note: 'otp_requested' });
        return code;
    }
    async verifyOtp(email, code, ip) {
        const key = (email || '').trim().toLowerCase();
        const rec = this.otpStore.get(key);
        console.log('verifyOtp rec=', rec);
        if (!rec)
            return null;
        if (rec.expires < Date.now()) {
            this.otpStore.delete(key);
            return null;
        }
        console.log(`verifyOtp: expected=${rec.code} provided=${code}`);
        if (rec.code !== code)
            return null;
        const user = await this.usersService.findByEmail(email);
        if (!user)
            return null;
        this.otpStore.delete(key);
        const payload = { sub: user._id, email: user.email };
        const token = this.jwtService.sign(payload);
        const refreshToken = (0, crypto_1.randomBytes)(64).toString('hex');
        const refreshHash = await bcrypt.hash(refreshToken, 10);
        try {
            await this.usersService.updateRefreshTokenHash(user._id, refreshHash);
        }
        catch (err) {
            console.error('Failed to store refresh token hash', err);
        }
        await this.authLogModel.create({ userId: user._id, ip, success: true, note: 'otp_verified' });
        return { access_token: token, refresh_token: refreshToken };
    }
    async refreshAccessToken(email, refreshToken) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !user.refreshTokenHash)
            return null;
        const ok = await bcrypt.compare(refreshToken, user.refreshTokenHash);
        if (!ok)
            return null;
        const payload = { sub: user._id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }
    async revokeRefreshToken(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            return;
        await this.usersService.updateRefreshTokenHash(user._id, null);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(authlog_schema_1.AuthLog.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
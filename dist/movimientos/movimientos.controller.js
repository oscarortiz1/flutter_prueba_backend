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
exports.MovimientosController = void 0;
const common_1 = require("@nestjs/common");
const movimientos_service_1 = require("./movimientos.service");
const create_movimiento_dto_1 = require("./dto/create-movimiento.dto");
const log = new common_1.Logger('MovimientosController');
let MovimientosController = class MovimientosController {
    constructor(movimientosService) {
        this.movimientosService = movimientosService;
    }
    create(dto) {
        log.debug(`create() received body: ${JSON.stringify(dto)}`);
        return this.movimientosService.create(dto);
    }
    findAll() {
        return this.movimientosService.findAll();
    }
    async remove(id) {
        const deleted = await this.movimientosService.removeById(id);
        if (!deleted)
            throw new common_1.NotFoundException();
        return { success: true };
    }
};
exports.MovimientosController = MovimientosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_movimiento_dto_1.CreateMovimientoDto]),
    __metadata("design:returntype", void 0)
], MovimientosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovimientosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovimientosController.prototype, "remove", null);
exports.MovimientosController = MovimientosController = __decorate([
    (0, common_1.Controller)('movimientos'),
    __metadata("design:paramtypes", [movimientos_service_1.MovimientosService])
], MovimientosController);
//# sourceMappingURL=movimientos.controller.js.map
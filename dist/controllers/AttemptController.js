"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptController = void 0;
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
const AttemptsTrySchema = new mongoose_1.default.Schema({
    phase: Number,
    passwords: [String],
    completionDate: Date,
    completed: Boolean,
    unlocked: Boolean,
    url: String,
});
const AttemptTrys = mongoose_1.default.model("AttemptsTrys", AttemptsTrySchema);
class AttemptController {
    attempt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tryValue } = req.body;
            const passwordArray = [tryValue];
            const phase = yield AttemptTrys.findOne({ passwords: passwordArray[0] });
            const phaseNumber = phase === null || phase === void 0 ? void 0 : phase.phase;
            const nextPhaseNumber = phaseNumber ? phaseNumber + 1 : 1;
            const nextPhase = yield AttemptTrys.findOne({
                phase: nextPhaseNumber,
            });
            const nextPhaseUrl = nextPhase === null || nextPhase === void 0 ? void 0 : nextPhase.url;
            function uptadatePhases() {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!(phase === null || phase === void 0 ? void 0 : phase.completed)) {
                        yield AttemptTrys.updateOne({ phase: phaseNumber }, { completed: true, completionDate: new Date() });
                        yield AttemptTrys.updateOne({ phase: nextPhaseNumber }, { unlocked: true });
                    }
                });
            }
            function sendKop(message) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!(phase === null || phase === void 0 ? void 0 : phase.completed)) {
                        const botUrl = process.env.BOT_URL || "http://localhost:3001/puzzle";
                        const postData = { message };
                        axios_1.default
                            .post(botUrl, postData)
                            .then((response) => {
                            console.log("Response:", response.data);
                        })
                            .catch((error) => {
                            console.log("O bot deve estar offline \n", message);
                        });
                    }
                });
            }
            if (phase && phase.unlocked) {
                sendKop(`Enigma ${phaseNumber} resolvido`);
                uptadatePhases();
                return res.status(200).json({ url: nextPhaseUrl });
            }
            res.status(400).json({ error: "Tente Novamente" });
        });
    }
    getCompletionDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phase } = req.body;
            const phaseObject = yield AttemptTrys.findOne({ phase, completed: true });
            const completionDate = phaseObject === null || phaseObject === void 0 ? void 0 : phaseObject.completionDate;
            if (completionDate) {
                return res.status(200).json({ completionDate });
            }
            return res.status(400).json({ error: "Ainda não foi completado" });
        });
    }
}
exports.AttemptController = AttemptController;

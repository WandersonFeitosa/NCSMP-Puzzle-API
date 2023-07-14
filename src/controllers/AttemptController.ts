import axios from "axios";
import { Request, Response } from "express";
import mongoose from "mongoose";

const AttemptsTrySchema = new mongoose.Schema({
  phase: Number,
  passwords: [String],
  completionDate: Date,
  completed: Boolean,
  unlocked: Boolean,
  url: String,
});

interface AttemptTrys extends mongoose.Document {
  phase: number;
  passwords: string[];
  completionDate: Date;
  completed: boolean;
  unlocked: boolean;
  url: string;
}

const AttemptTrys = mongoose.model("AttemptsTrys", AttemptsTrySchema);

export class AttemptController {
  async attempt(req: Request, res: Response) {
    const { tryValue } = req.body;

    const passwordArray = [tryValue];
    const phase = await AttemptTrys.findOne({ passwords: passwordArray[0] });
    const phaseNumber = phase?.phase;
    const nextPhaseNumber = phaseNumber ? phaseNumber + 1 : 1;
    const nextPhase = await AttemptTrys.findOne({
      phase: nextPhaseNumber,
    });
    const nextPhaseUrl = nextPhase?.url;

    async function uptadatePhases() {
      if (!phase?.completed) {
        await AttemptTrys.updateOne(
          { phase: phaseNumber },
          { completed: true, completionDate: new Date() }
        );
        await AttemptTrys.updateOne(
          { phase: nextPhaseNumber },
          { unlocked: true }
        );
      }
    }

    async function sendKop(message: string) {
      if (!phase?.completed) {
        const botUrl = process.env.BOT_URL || "http://localhost:3001/puzzle";
        const postData = { message };
        axios
          .post(botUrl, postData)
          .then((response) => {
            console.log("Response:", response.data);
          })
          .catch((error) => {
            console.log("O bot deve estar offline \n", message);
          });
      }
    }

    if (phase && phase.unlocked) {
      sendKop(`Enigma ${phaseNumber} resolvido`);
      uptadatePhases();
      return res.status(200).json({ url: nextPhaseUrl });
    }

    res.status(400).json({ error: "Tente Novamente" });
  }

  async getCompletionDate(req: Request, res: Response) {
    const { phase } = req.body;
    const phaseObject = await AttemptTrys.findOne({ phase, completed: true });
    const completionDate = phaseObject?.completionDate;

    if (completionDate) {
      return res.status(200).json({ completionDate });
    }

    return res.status(400).json({ error: "Ainda não foi completado" });
  }
  async checkUnlocked(req: Request, res: Response) {
    const url = req.params.url;
    if (url == "home") {
      return res.status(200).json({ unlocked: true });
    }
    const phaseObject = await AttemptTrys.findOne({ url: url });

    if (!phaseObject)
      return res.status(400).json({ error: "Fase não encontrada" });

    const unlocked = phaseObject.unlocked;

    res.status(200).json({ unlocked });
  }
}

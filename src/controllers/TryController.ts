import { Request, Response } from "express";
import mongoose from "mongoose";
import axios from "axios";

const logTrysSchema = new mongoose.Schema({
  phase1: Boolean,
  phase2: Boolean,
  phase3: Boolean,
  phase4: Boolean,
  phase5: Boolean,
  phase6: Boolean,
  phase7: Boolean,
  phase8: Boolean,
  phase9: Boolean,
  phase5CompletionDate: Date,
  phase9CompletionDate: Date,
});

const LogTrys = mongoose.model("LogTrys", logTrysSchema);

function sendKop(message: string) {
  const botUrl = "http://localhost:3001/puzzle";
  const postData = { message };
  axios
    .post(botUrl, postData)
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.log("Bot is not running");
      // console.error("Error:", error);
    });
}
function getNextDayAt18(date: Date): Date {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  nextDay.setHours(18, 0, 0, 0);
  return nextDay;
}
export class TryController {
  async try(req: Request, res: Response) {
    const { tryValue } = req.body;

    // FASE 1
    if (tryValue === "WORKING") {
      const nextPhaseStatus = await LogTrys.findOne({ phase2: false });

      if (nextPhaseStatus) {
        await LogTrys.updateOne({ phase2: false }, { phase2: true });
        sendKop("ENIGMA 1 RESOLVIDO");
      }

      return res.status(200).json({ url: "fdcd-bd80-8202-9905" });
    }

    // FASE 2
    if (tryValue === "EU PRECISO ME LEMBRAR DA MINHA HISTORIA") {
      const phaseStatus = await LogTrys.findOne({ phase2: false });
      const nextPhaseStatus = await LogTrys.findOne({ phase3: false });
      if (phaseStatus) {
        return res.status(400).json({ error: "Tente Novamente" });
      }

      if (nextPhaseStatus) {
        await LogTrys.updateOne({ phase3: false }, { phase3: true });
        sendKop("ENIGMA 2 RESOLVIDO");
      }

      return res.status(200).json({ url: "7f69-aaa4-7054-4ee6" });
    }

    // FASE 3
    if (tryValue === "SEIS" || tryValue == 6 || tryValue == "6") {
      const phaseStatus = await LogTrys.findOne({ phase3: false });
      const nextPhaseStatus = await LogTrys.findOne({ phase4: false });
      if (phaseStatus) {
        return res.status(400).json({ error: "Tente Novamente" });
      }

      if (nextPhaseStatus) {
        await LogTrys.updateOne({ phase4: false }, { phase4: true });
        sendKop("ENIGMA 3 RESOLVIDO");
      }

      return res.status(200).json({ url: "7d14-3c68-ef0a-9ebf" });
    }

    // FASE 4
    if (
      tryValue === "ELE SABE TUDO" ||
      tryValue === "Ele Sabe Tudo" ||
      tryValue === "Ele sabe tudo"
    ) {
      const phaseStatus = await LogTrys.findOne({ phase4: false });
      const nextPhaseStatus = await LogTrys.findOne({ phase5: false });

      if (phaseStatus) {
        return res.status(400).json({ error: "Tente Novamente" });
      }

      if (nextPhaseStatus) {
        await LogTrys.updateOne({ phase5: false }, { phase5: true });

        sendKop("ENIGMA 4 RESOLVIDO");
      }

      return res.status(200).json({ url: "nao-ta-aqui" });
    }

    // FASE 5
    if (tryValue === "SCULK" || tryValue === "Sculk" || tryValue === "sculk") {
      const phaseStatus = await LogTrys.findOne({ phase5: false });
      const nextPhaseStatus = await LogTrys.findOne({ phase6: false });
      if (phaseStatus) {
        return res.status(400).json({ error: "Tente Novamente" });
      }

      if (nextPhaseStatus) {
        await LogTrys.updateOne({ phase6: false }, { phase6: true });
        sendKop("ENIGMA 5 RESOLVIDO");
      }
      return res.status(200).json({ url: "1439-1d71-ecb8-d4fd" });
    }

    // FASE 6
    if (
      tryValue === "LIBERTE" ||
      tryValue === "Liberte" ||
      tryValue === "liberte"
    ) {
      const phaseStatus = await LogTrys.findOne({ phase6: false });
      const nextPhaseStatus = await LogTrys.findOne({ phase7: false });
      if (phaseStatus) {
        return res.status(400).json({ error: "Tente Novamente" });
      }

      if (nextPhaseStatus) {
        await LogTrys.updateOne({ phase7: false }, { phase7: true });
        sendKop("ENIGMA 6 RESOLVIDO");
      }

      return res.status(200).json({ url: "643f-701c-cb16-63ed" });
    }

    // FASE 7
    if (
      tryValue === "REGRET" ||
      tryValue === "Regret" ||
      tryValue === "regret"
    ) {
      const phaseStatus = await LogTrys.findOne({ phase7: false });
      const nextPhaseStatus = await LogTrys.findOne({ phase8: false });
      if (phaseStatus) {
        return res.status(400).json({ error: "Tente Novamente" });
      }

      if (nextPhaseStatus) {
        await LogTrys.updateOne({ phase8: false }, { phase8: true });
        sendKop("ENIGMA 7 RESOLVIDO");
      }

      return res.status(200).json({
        url: "Kr4d105s25p5Rn5f46d17s2Ar3d64s2Xe4f145d66s2Kr4d75s1Ar3d54s2Ne3s23p2Ar4s2Ar3d104s24p3Rn5f146d107s27p6",
      });
    }

    // FASE 7
    if (
      tryValue === "INFORMACAO" ||
      tryValue === "Informacao" ||
      tryValue === "informacao"
    ) {
      const phaseStatus = await LogTrys.findOne({ phase8: false });
      const nextPhaseStatus = await LogTrys.findOne({ phase9: false });
      if (phaseStatus) {
        return res.status(400).json({ error: "Tente Novamente" });
      }

      if (nextPhaseStatus) {
        await LogTrys.updateOne({ phase9: false }, { phase9: true });
        sendKop("ENIGMA 8 RESOLVIDO");
      }

      return res.status(200).json({ url: "0755-06c7-bdfe-eeda" });
    }

    // FASE 9
    if (tryValue === "RAIVA" || tryValue === "Raiva" || tryValue === "raiva") {
      const phaseStatus = await LogTrys.findOne({ phase9: false });

      const nextDayAt18 = getNextDayAt18(new Date());
      if (phaseStatus) {
        return res.status(400).json({ error: "Tente Novamente" });
      }

      console.log(nextDayAt18);

      await LogTrys.updateOne(
        { _id: process.env.COMPLETION_ID },
        { phase9CompletionDate: nextDayAt18 }
      );
      sendKop("ENIGMA 9 RESOLVIDO");
      return res.status(200).json({ url: "freedom" });
    }

    return res.status(400).json({ error: "Tente Novamente" });
  }
  async getCompletionDate(req: Request, res: Response) {
    const completionDate = await LogTrys.findOne({
      _id: process.env.COMPLETION_ID,
    });
    if (completionDate) {
      return res
        .status(200)
        .json({ completionDate: completionDate.phase9CompletionDate });
    }
  }
}

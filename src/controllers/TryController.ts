import { Request, Response } from "express";
import http from "http";

export class TryController {
  async try(req: Request, res: Response) {
    const { tryValue } = req.body;

    if (tryValue === "senha1") {
      return res.status(200).json({ url: "fdcd-bd80-8202-9905" });
    }
    if (tryValue === "senha2") {
      return res.status(200).json({ url: "7f69-aaa4-7054-4ee6" });
    }
    if (tryValue === "senha3") {
      const options = {
        hostname: "localhost",
        port: 3001,
        path: "/puzzle",
      };

      const request = http.get(options, (response) => {});

      return res.status(200).json({ url: "7d14-3c68-ef0a-9ebf" });
    }
    if (tryValue === "senha4") {
      return res.status(200).json({ url: "1439-1d71-ecb8-d4ff" });
    }
    if (tryValue === "senha5") {
      return res.status(200).json({ url: "1439-1d71-ecb8-d4fd" });
    }
    if (tryValue === "senha6") {
      return res.status(200).json({ url: "1439-1d71-ecb8-d4fc" });
    }
    if (tryValue === "senha7") {
      return res.status(200).json({ url: "cabo" });
    }

    return res.status(400).json({ error: "Tente Novamente" });
  }
}

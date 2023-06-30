import { Request, Response } from "express";
import http from "http";

export class TryController {
  async try(req: Request, res: Response) {
    const { tryValue } = req.body;

    if (tryValue === "WORKING") {
      return res.status(200).json({ url: "fdcd-bd80-8202-9905" });
    }
    if (tryValue === "EU PRECISO ME LEMBRAR DA MINHA HISTORIA") {
      return res.status(200).json({ url: "7f69-aaa4-7054-4ee6" });
    }
    if (tryValue === "senha3") {
      // const options = {
      //   hostname: "localhost",
      //   port: 3001,
      //   path: "/puzzle",
      // };
      // try {
      //   const request = http.get(options, (response) => {});
      // } catch (err) {
      //   console.log(err);
      // }
      return res.status(200).json({ url: "7d14-3c68-ef0a-9ebf" });
    }
    if (tryValue === "senha4") {
      return res.status(200).json({ url: "nao-ta-aqui" });
    }
    if (tryValue === "sculk") {
      return res.status(200).json({ url: "1439-1d71-ecb8-d4fd" });
    }
    if (tryValue === "senha6") {
      return res.status(200).json({ url: "1439-1d71-ecb8-d4fc" });
    }
    if (tryValue === "LIBERTE") {
      return res.status(200).json({ url: "1439-1d71-ecb8-d4fg" });
    }
    if (tryValue === "ajuda") {
      return res
        .status(200)
        .json({
          url: "Kr4d105s25p5Rn5f46d17s2Ar3d64s2Xe4f145d66s2Kr4d75s1Ar3d54s2Ne3s23p2Ar4s2Ar3d104s24p3Rn5f146d107s27p6",
        });
    }
    if (tryValue === "INFORMACAO") {
      return res.status(200).json({ url: "1439-1d71-ecb8-d4fh" });
    }
    if (tryValue === "RAIVA") {
      return res.status(200).json({ url: "1439-1d71-ecb8-d4fi" });
    }

    return res.status(400).json({ error: "Tente Novamente" });
  }
}

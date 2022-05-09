import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import LogUtil from "./LogUtil.ts";
import SettingUtil from "./SettingUtil.ts";
import WebApiUtilCore from "./WebApiUtilCore.ts";

class WebApiUtil {
  // class methods
  static async start() {
    const app = new Application();

    // logger
    app.use(async (ctx, next) => {
      await next();
      const rt = ctx.response.headers.get("X-Response-Time");
      LogUtil.info(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
    });

    // timing
    app.use(async (ctx, next) => {
      const start = Date.now();
      await next();
      const ms = Date.now() - start;
      ctx.response.headers.set("X-Response-Time", `${ms}ms`);
    });

    const router = new Router();
    router.get("/api/version", WebApiUtilCore.get_version);

    router.get("/api/grass", WebApiUtilCore.get_grass);
    router.get("/api/death_note", WebApiUtilCore.get_death_note);

    app.use(oakCors({ origin: "*" }));
    // app.use(
    //   oakCors({
    //     origin: "http://localhost:3000",
    //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //     allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    //     optionsSuccessStatus: 200,
    //     credentials: true,
    //   })
    // );
    app.use(router.routes());
    app.use(router.allowedMethods());

    LogUtil.info(
      "listen",
      `http://${SettingUtil.setting.host_name}:${SettingUtil.setting.port}`
    );
    await app.listen({
      hostname: SettingUtil.setting.host_name,
      port: SettingUtil.setting.port,
    });
  }
}

export default WebApiUtil;

import {
  RouterContext,
  RouteParams,
  helpers,
} from "https://deno.land/x/oak/mod.ts";
import { dayOfYear } from "https://deno.land/std/datetime/mod.ts";

import App from "../app.ts";
import LogUtil from "./LogUtil.ts";
import CommonUtil from "./CommonUtil.ts";
import HatenaUtil from "./HatenaUtil.ts";

type Res = {
  errCode: number;
  data: Map<string, any> | any | null;
};

class WebApiUtilCore {
  // GET /version
  // deno-lint-ignore no-explicit-any
  static get_version(context: any) {
    LogUtil.debug("get_version");
    const res: Res = { errCode: 0, data: App.Version };
    LogUtil.debug("res", res);
    context.response.body = res;
  }

  // GET /grass
  // deno-lint-ignore no-explicit-any
  static async get_grass(context: any) {
    LogUtil.debug("get_grass");
    let res: Res = { errCode: -1, data: null };
    const query = helpers.getQuery(context, { mergeParams: true });

    const bookmarks = await HatenaUtil.get1YearBookmarks(query.id);
    const days = Array(366).fill(0);
    bookmarks.forEach((bookmark) => {
      const dayIndex = dayOfYear(new Date(bookmark.dt)) - 1;
      days[dayIndex]++;
    });

    LogUtil.debug("days", days);

    LogUtil.debug("res", res);
    context.response.body = res;
  }

  // GET /death_note
  // deno-lint-ignore no-explicit-any
  static async get_death_note(context: any) {
    LogUtil.debug("get_death_note");
    let res: Res = { errCode: -1, data: null };
    const query = helpers.getQuery(context, { mergeParams: true });

    LogUtil.debug("res", res);
    context.response.body = res;
  }
}

export default WebApiUtilCore;

import { parse } from "https://deno.land/x/xml/mod.ts";

import LogUtil from "./LogUtil.ts";
import CommonUtil from "./CommonUtil.ts";

export type BookmarkType = {
  dt: string;
  // post: string;
  // tags: string[];
};

class HatenaUtil {
  // class methods

  static async get1YearBookmarks(id: string) {
    const bookmarks: BookmarkType[] = [];

    let count = 0;
    const res = await fetch(`https://b.hatena.ne.jp/${id}/bookmark.rss`);
    if (res) {
      const xmlText = await res.text();
      const xml: any = parse(CommonUtil.hexNumRefToString(xmlText));

      const description = xml["rdf:RDF"].channel.description;
      const m = description.match(/\(([0-9,]+)\)/);
      if (m && m.length > 0) {
        count = Number(m[1].replace(/,/, ""));
      }

      for (const item of xml["rdf:RDF"].item) {
        const dt = item["dc:date"];
        bookmarks.push({ dt });
      }
    }

    // const loopCount = Math.floor(count / 20);
    const loopCount = 1;
    for (let i = 0; i < loopCount; i++) {
      const res = await fetch(
        `https://b.hatena.ne.jp/${id}/bookmark.rss?page=${i + 2}`
      );
      if (res) {
        const xmlText = await res.text();
        const xml: any = parse(CommonUtil.hexNumRefToString(xmlText));

        for (const item of xml["rdf:RDF"].item) {
          const dt = item["dc:date"];
          bookmarks.push({ dt });
        }
      }
    }

    return bookmarks;
  }
}

export default HatenaUtil;

import LogUtil from "./LogUtil.ts";

class CommonUtil {
  // class methods
  static async exists(path: string) {
    try {
      await Deno.stat(path);
      return true;
    } catch (e) {
      // do nothing.
    }

    return false;
  }

  static hexNumRefToString(hexNumRef: string) {
    return hexNumRef.replace(/&#x([0-9a-f]+);/gi, (match, $1, idx, all) => {
      return String.fromCharCode(parseInt($1, 16));
    });
  }
}

export default CommonUtil;

import { parse, stringify } from "https://deno.land/std/encoding/yaml.ts";

import LogUtil from "./LogUtil.ts";
import CommonUtil from "./CommonUtil.ts";

type SettingType = {
  host_name: string;
  port: number;
};

class SettingUtil {
  // class variables
  static DefaultSetting: SettingType = {
    host_name: Deno.env.get("HOST") || "localhost",
    port: Number(Deno.env.get("PORT")) || 80,
  };

  static setting: SettingType = SettingUtil.DefaultSetting;
  static settingPath = "";

  // class methods
  static setup() {
    let home = Deno.env.get("HOME") || `${Deno.env.get("HOMEDRIVE")}${Deno.env.get("HOMEPATH")}`;
    if (home) {
      home = home.replaceAll("\\", "/");
    }

    const rootPath = `${home}/.hatena_widget_server`;
    LogUtil.debug("rootPath", rootPath);

    SettingUtil.settingPath = `${rootPath}/setting.hjson`;
    LogUtil.debug("settingPath", SettingUtil.settingPath);
  }

  static async load() {
    if (await CommonUtil.exists(SettingUtil.settingPath)) {
      try {
        const settingText = Deno.readTextFileSync(SettingUtil.settingPath);
        const setting = parse(settingText) as SettingType;
        LogUtil.debug("setting", setting);

        SettingUtil.setting = { ...SettingUtil.DefaultSetting, ...setting };
      } catch (e) {
        LogUtil.error(e.message);
      }
    }
  }
}

export default SettingUtil;

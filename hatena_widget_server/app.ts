import LogUtil from "./util/LogUtil.ts";
import SettingUtil from "./util/SettingUtil.ts";
import WebApiUtil from "./util/WebApiUtil.ts";

class App {
  static Version = "1.0.0.0";

  constructor() {}

  async start() {
    await LogUtil.setup();
    LogUtil.info("App start");
    LogUtil.info("version", App.Version);

    await SettingUtil.setup();
    SettingUtil.load();
    await WebApiUtil.start();
  }
}

export default App;

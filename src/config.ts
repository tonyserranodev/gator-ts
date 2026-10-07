import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(username: string) {
  const cfg = readConfig();
  cfg.currentUserName = username;
  writeConfig(cfg);
}

export function readConfig(): Config {
  const fullPath = getConfigFilePath();

  const json = fs.readFileSync(fullPath, {
    encoding: "utf-8",
  });
  const rawCfg = JSON.parse(json);

  return validateConfig(rawCfg);
}

function getConfigFilePath() {
  const filename = ".gatorconfig.json";
  const homeDir = os.homedir();
  return path.join(homeDir, filename);
}

function validateConfig(rawCfg: any): Config {
  if (!rawCfg.db_url || typeof rawCfg.db_url !== "string") {
    throw new Error("db_url is required in config file");
  }

  const cfg: Config = {
    dbUrl: rawCfg.db_url,
    currentUserName: rawCfg.current_user_name,
  };
  return cfg;
}

function writeConfig(cfg: Config) {
  const fullPath = getConfigFilePath();

  const rawConfig = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName,
  };
  const data = JSON.stringify(rawConfig);
  fs.writeFileSync(fullPath, data, {
    encoding: "utf-8",
  });
}

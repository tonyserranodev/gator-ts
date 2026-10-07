import {
  type CommandsRegistry,
  handlerLogin,
  registerCommand,
  runCommand,
} from "./commands";

function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log("usage: cli <command> [args]");
    process.exit(1);
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);
  const registery: CommandsRegistry = {};

  registerCommand(registery, "login", handlerLogin);

  try {
    runCommand(registery, cmdName, ...cmdArgs);
  } catch (e) {
    if (e instanceof Error) {
      console.log(`Error running command: ${e.message}`);
    } else {
      console.log(`Error running command: ${e}`);
    }
    process.exit(1);
  }
}

main();

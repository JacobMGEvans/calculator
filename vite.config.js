import { join, dirname } from "node:path";
import { URL, fileURLToPath } from "node:url";

export default {
  root: join(dirname(fileURLToPath(new URL(import.meta.url)))), // This is the default
};

import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: '/Users/spencejb/Documents/projects/tuucan/tina/__generated__/.cache/1782614022895', url: 'http://localhost:4001/graphql', token: '', queries,  });
export default client;
  
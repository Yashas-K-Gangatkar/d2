import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

export default defineCloudflareConfig({
  // Mark jose as external to prevent esbuild from trying to resolve
  // its "workerd" export condition (which is broken in jose v6)
  // The npm override forces jose@5, but this ensures bundling never fails
  // even if a nested dependency pulls in a different version.
  external: ["jose"],
});

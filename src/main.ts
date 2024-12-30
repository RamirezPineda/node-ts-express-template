import { Server } from '@/server';
import { Routes } from '@/routes';
import { EnvConfig } from '@/config';

async function main() {
  const server = new Server({
    port: EnvConfig.PORT,
    routes: Routes.routes,
  });

  server.start();
  return server;
}

(async () => {
  await main();
})();

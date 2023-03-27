import { Hocuspocus } from "@hocuspocus/server";

const server = new Hocuspocus({
  address: "0.0.0.0",
  port: 8080,
});

server.listen();

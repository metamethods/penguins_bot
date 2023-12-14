import Job from "@schemas/Job";
import File from "@classes/File";
import Log from "@schemas/Log";

import booleanSwitch from "@utility/booleanSwitch";

import { Level } from "@enums/level";

import type Service from "@schemas/Service";

export default new Job("Service Handler", async () => {
  const services = [];

  for (const file of await File.glob("services/**/*.{ts,js}", { useSrcDirectory: true })) {
    const service = await file.import<Service>({ default: true });

    services.push(service);
  }

  // Sort services by priority bigger to smaller
  services.sort((serviceA, serviceB) => (serviceB.options.priority ?? 0) - (serviceA.options.priority ?? 0));

  for (const service of services) {
    const handlerOptions = {};

    if (service.options.startImmediately)
      service.options.halt 
        ? await service.handler(handlerOptions) 
        : service.handler(handlerOptions);

    await booleanSwitch(
      service.options.interval === undefined,
      service.handler,
      async (handler) => service.options.halt 
        ? await handler(handlerOptions)
        : handler(handlerOptions),
      (handler) => setInterval(() => handler(handlerOptions),  service.options.interval)
    );

    Log.emit(`Loaded service ${service.name}`, Level.Debug);
  }
});
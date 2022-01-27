// eslint-disable-next-line no-restricted-globals
const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

const version = "v1::";

function fetchedFromNetwork(response: Response, ev: FetchEvent) {
  const cacheCopy = response.clone();

  console.log("WORKER: fetch response from network.", ev.request.url);

  caches.open(`${version}pages`).then(async (cache) => {
    await cache.put(ev.request, cacheCopy);
    console.log("WORKER: fetch response stored in cache.", ev.request.url);
  });

  return response;
}

function unableToResolve() {
  console.log("WORKER: fetch request failed in both cache and network.");

  return new Response("<h1>Service Unavailable</h1>", {
    status: 503,
    statusText: "Service Unavailable",
    headers: new Headers({
      "Content-Type": "text/html",
    }),
  });
}

sw.addEventListener("install", (ev) => {
  console.log("WORKER: install event in progress");

  ev.waitUntil(
    caches.open(`${version}files`).then(async (cache) => {
      await cache.addAll(["/", "/main.js", "/assets/Offset-regular.ttf"]);
      console.log("WORKER: install completed");
    })
  );
});

sw.addEventListener("fetch", (ev) => {
  console.log("WORKER: fetch event in progress");

  if (ev.request.method !== "GET") {
    console.log(
      "WORKER: fetch event ignored.",
      ev.request.method,
      ev.request.url
    );
    return;
  }

  ev.respondWith(
    caches.match(ev.request).then((cached) => {
      const networked = fetch(ev.request)
        .then((res) => {
          const host = `${sw.location.protocol}//${sw.location.host}`;

          return ev.request.url.startsWith(host)
            ? fetchedFromNetwork(res, ev)
            : res;
        }, unableToResolve)
        .catch(unableToResolve);

      console.log(
        "WORKER: fetch event",
        cached ? "(cached)" : "(network)",
        ev.request.url
      );
      return cached || networked;
    })
  );
});

sw.addEventListener("activate", (ev) => {
  console.log("WORKER: activate event in progress.");

  ev.waitUntil(
    caches.keys().then(async (keys) => {
      await Promise.all(
        keys
          .filter((key) => !key.startsWith(version))
          .map((key) => caches.delete(key))
      );
      console.log("WORKER: activate completed.");
    })
  );
});

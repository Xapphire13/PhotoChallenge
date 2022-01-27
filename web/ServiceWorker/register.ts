/// <reference lib="dom" />

if ("serviceWorker" in navigator) {
  console.log("CLIENT: service worker registration in progress.");
  navigator.serviceWorker.register("/sw.js").then(
    () => {
      console.log("CLIENT: service worker registration complete.");
    },
    () => {
      console.log("CLIENT: service worker registration failure.");
    }
  );
} else {
  console.log("CLIENT: service worker is not supported.");
}

self.addEventListener("push", function (event) {
  const message = event.data.json();
  console.log(message);
  self.registration.showNotification(message.title, {
    body: message.tex,
    data: message.data,
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      clients
        .openWindow(event.notification.data.url)
        .then((windowClient) => (windowClient ? windowClient.focus() : null));
    })
  );
});

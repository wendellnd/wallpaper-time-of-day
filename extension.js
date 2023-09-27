const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const Gio = imports.gi.Gio;

let settings;
let timeout;

function getURI() {
  const hour = new Date().getHours();

  const morning = hour > 6 && hour < 12;
  const noon = hour >= 12 && hour < 17;
  const sundown = hour >= 17 && hour < 20;

  uri = "file:///home/wendellnd/Imagens/onepiece-wallpapers";

  if (morning) {
    uri = uri + "/morning.jpg";
  } else if (noon) {
    uri = uri + "/noon.jpg";
  } else if (sundown) {
    uri = uri + "/sundown.jpg";
  } else {
    uri = uri + "/evening.jpg";
  }

  return uri;
}

function setBackground(schema, uri) {
  settings = new Gio.Settings({
    schema: schema,
  });
  settings.set_string("picture-uri", uri);
  settings.set_string("picture-uri-dark", uri);
}

function handleMainLoop() {
  uri = getURI();

  setBackground("org.gnome.desktop.background", uri);
  setBackground("org.gnome.desktop.screensaver", uri);

  Gio.Settings.sync();
}

function init() {}

function enable() {
  timeout = Mainloop.timeout_add_seconds(1, handleMainLoop);
}

function disable() {
  Mainloop.source_remove(timeout);
  settings = null;
}

const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const Gio = imports.gi.Gio;

let panelButton, panelButtonText;
let backgroundSetting, screensaverSetting;
let timeout;

function init() {
  panelButton = new St.Bin({
    style_class: "panel-button",
  });

  icon = new St.Icon({
    icon_name: "popup-menu-icon",
    style_class: "system-status-icon",
  });

  panelButton.set_child(icon);
}

function enable() {
  Main.panel._rightBox.insert_child_at_index(panelButton, 1);

  timeout = Mainloop.timeout_add_seconds(1, () => {
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

    backgroundSetting = new Gio.Settings({
      schema: "org.gnome.desktop.background",
    });
    backgroundSetting.set_string("picture-uri", uri);
    backgroundSetting.set_string("picture-uri-dark", uri);

    screensaverSetting = new Gio.Settings({
      schema: "org.gnome.desktop.screensaver",
    });
    screensaverSetting.set_string("picture-uri", uri);
    screensaverSetting.set_string("picture-uri-dark", uri);

    Gio.Settings.sync();
  });
}

function disable() {
  Mainloop.source_remove(timeout);
  Main.panel._rightBox.remove_child(panelButton);
  backgroundSetting = null;
  screensaverSetting = null;
}

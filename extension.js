const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;

let panelButton, panelButtonText, timeout;
let counter = 0;

function setButtonText() {
  counter++;
  panelButtonText.set_text(counter.toString());
  return true;
}

function init() {
  panelButton = new St.Bin({
    style_class: "panel-button",
  });

  panelButtonText = new St.Label({
    style_class: "examplePanelText",
    text: "Starting...",
  });

  panelButton.set_child(panelButtonText);
}

function enable() {
  Main.panel._rightBox.insert_child_at_index(panelButton, 1);
  timeout = Mainloop.timeout_add_seconds(1, setButtonText);
}

function disable() {
  Mainloop.source_remove(timeout);
  Main.panel._rightBox.remove_child(panelButton);
}

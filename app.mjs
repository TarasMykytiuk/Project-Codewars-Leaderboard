import { Controller } from "./controller.mjs";
import { View } from "./view.mjs";
import { Model } from "./model.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const controller = new Controller(new View(), new Model());
    controller.init();
});
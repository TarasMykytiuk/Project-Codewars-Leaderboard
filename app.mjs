import { Controller } from "./controller.mjs";
import { View } from "./view.mjs";
import { Model } from "./model.mjs";
import { ApiModel } from "./apiModel.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const controller = new Controller(new View(), new Model(), new ApiModel());
    controller.init();
});
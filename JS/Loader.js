//Loads the image and calls init when fully loaded
let imageBack = new Image();
imageBack.src = "./media/Images/Space-Background.jpg";
imageBack.onload = init;
//Exports and imports
export {imageBack};
import {init} from "./main.js";
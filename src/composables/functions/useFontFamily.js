import { ref } from "vue";

export const fontFamily = ref("Arial");

export const availableFonts = [
  "Arial",
  "Georgia",
  "Courier New",
  "Times New Roman",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Open Sans",   // buraya ekle
  "Roboto",      // Google Fonts’tan
  "Pacifico",    // Google Fonts’tan
  "Montserrat"   // Google Fonts’tan
];


export function setFontFamily(font) {
  fontFamily.value = font;
}

export function useFontFamily() {
  return {
    fontFamily,
    setFontFamily,
  };
}
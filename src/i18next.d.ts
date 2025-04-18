// import the original type declarations
import "i18next";
import en from "./services/languages/res/en";
// import all namespaces (for the default language, only)

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "translation";
    // custom resources type
    resources: {
      translation: typeof en;
    };
    // other
  }
}
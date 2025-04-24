# Language service

## Overview

The language service helps the app support multiple languages, like English and French. It uses the `i18n` configuration along with the `react-i18next` library to manage translations and switch languages easily.

## Service files

-  `provider.tsx`: Provides i18n context throughout the application
-  `index.ts`: Exports the main API for language management
-  Resources in `res/` folder:
   -  `en.ts`: English translations
   -  `fr.ts`: French translations

## Convention

### Key Naming Convention

- Use `snake_case` for all translation keys to maintain consistency and readability.
- Group keys logically by pages or components to avoid conflicts and improve organization.


```typescript
const en = {
   home_page: {
      welcome_message: "Welcome to the homepage!",
   },
};
```

```typescript
import { useTranslation } from "@/src/services/languages";

function HomePage() {
   const { t } = useTranslation();
   return <h1>{t("home_page.welcome_message")}</h1>;
}
```


### Handling Dynamic Data

For dynamic or looped data, always use translation keys instead of hardcoding text. This approach ensures that when the language is changed, the content is re-rendered with the correct translations, maintaining consistency and centralizing translation management.


```typescript
const en = {
   items: {
      item_1: "Item One",
      item_2: "Item Two",
      item_3: "Item Three",
   },
};
```

```typescript
import { useTranslation } from "@/src/services/languages";

const itemKeys = ["items.item_1", "items.item_2", "items.item_3"];

function ItemList() {
   const { t } = useTranslation();

   return (
      <ul>
         {itemKeys.map((key) => (
            <li key={key}>{t(key)}</li>
         ))}
      </ul>
   );
}
```

This approach ensures that translations are well-structured, easy to maintain, and adaptable to dynamic content.

## Usage

### Using translations with i18n

This section explains how to use the `useTranslation` hook provided by the language service to access and display translated text in your components. The hook provides a `t` function, which is used to translate keys defined in your `i18n` configuration.

```typescript
import { useTranslation } from "@/src/services/languages";

function MyComponent() {
	const { t } = useTranslation();
	return <div>{t("key.to.translate")}</div>;
}
```

### Adding a new translation key

To add a new translation key, follow these steps:

1. Open the appropriate translation file in the `res/` folder (e.g., `en.ts` for English).
2. Add the new key-value pair under the relevant section. For example:

   ```typescript
   // en.ts
   const en = {
   	home_page: {
   		welcome_message: "Welcome to the homepage!",
   	},
   	//...
   };

   export default en;
   ```

3. Use the `t` function in your component to reference the new key:

   ```typescript
   import { useTranslation } from "@/src/services/languages";

   function HomePage() {
   	const { t } = useTranslation();
   	return <h1>{t("home_page.welcome_message")}</h1>;
   }
   ```

This ensures the new translation key is properly integrated, adheres to the naming convention, and is accessible in the application.

### Switching languages

To dynamically switch the language and access the current language in your application, you can use the `i18n` instance provided by the `useTranslation` hook. Here's an example:

```jsx
import { useTranslation } from "@/src/services/languages";

function LanguageSwitcher() {
   const { t, i18n } = useTranslation();

   const toggleLang = () => {
      i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
   };

   return (
      <div>
         <p>Current Language: {i18n.language}</p>
         <button onClick={toggleLang}>
            {i18n.language === "en" ? t("switch_to_french") : t("switch_to_english")}
         </button>
      </div>
   );
}
```

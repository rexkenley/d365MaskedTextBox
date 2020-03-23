# d365MaskedTextBox

Enhanced textbox controlled by a "mask"

**Settings**

- value - the attribute
- mask - The masking string that defines the mask's behavior. A backslash will escape any character. Special format characters are: '9': [0-9] 'a': [a-zA-Z] '\*': [a-zA-Z0-9]
- maskChar - The character to show in place of unfilled characters of the mask

**Testing and Review**

- npm run storybook
  - Note: If you get an error, make sure you have a **\_\_results\_\_** folder in test and run **npm run test:output**
- npm run test

**Create deployment file**

- msbuild /t:build /restore /p:configuration=Release

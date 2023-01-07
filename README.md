# Scheduler

## Getting Started

## Setup and Run Local

```
git clone https://github.com/mohammedmagdyismael/Scheduler.git
cd ./Scheduler
yarn
yarn start
```

## App Localization

The app uses withTranslantion HOC to translate it.
to add new language follow the following steps:

1. Add new localization file in `public/localization` directory 
2. Add the new language (name & key) to `language` list in `app/helper` directory
Note: language key must be the same as language file name (ex: fr.json  =>  key: 'fr')
3. if the added language is a RTL language, add the language key to `rtl` list in `app/helper` directory

## App Styling

The app styling uses styled-components lib
Also you can customize some component styling using the following props in `App.js`

extendDataSlot
extendSlot
extendSlotTitle
extendSlotDesc


## App Views

The App supports Day and Week view, with a Date picker


For more, don't hesitate to contact me



# CurseForge API (Eternal API)


**Package is in development**

Implements methods for CurseForge API usage


## Installation

```javascript
  npm install curseforge-core-api
```

## Deployment

To import all functions use
```javascript
  const { CurseForgeApi } = require("curseforge-core-api");
  const ModsApi = new CurseForgeApi(API-KEY)
```

## Available methods

| Function name             | Description                                                                |
| ----------------- | ------------------------------------------------------------------ |
| getGames() | Get all games that are available to the provided API key. |
| getGame()  | Get information about provided modification - full info, versions, version types |
| getCategories() | Get all available classes and categories of the specified game. |
| searchMods() | Get all mods that match the search criteria. |
| getMod() | Get a single mod information |
| getModFile() | Get a single file of the specified mod |
| getVersions() | Get Minecraft Versions |




## Usage

```javascript
const { CurseForgeApi, CurseForgeGamesIDs, CurseForgeMcModLoader } = require("curseforge-core-api");
const ModsApi = new CurseForgeApi(API-KEY)


//Usage with top level await
//The data provided in methods is exemplary

await ModsApi.getGames()


await ModsApi.getGame({
  gameId: CurseForgeGamesIDs.Minecraft
})


await ModsApi.getCategories({
  gameId: CurseForgeGamesIDs.Minecraft
})


//All available parameters https://docs.curseforge.com/#search-mods
await ModsApi.searchMods({
  gameId: CurseForgeGamesIDs.Minecraft,
  searchFilter: "cool mod",
  modLoaderType: CurseForgeMcModLoader.Forge
})


await ModsApi.getMod({
  modId: 642
})

//Parameter fileId add parameters is optional
await ModsApi.getModFile({
  modId: 642,
  fileId: 32123.
  parameters: {
    gameVersion: "1.19.2",
    modLoaderType: CurseForgeMcModLoader.Forge
  }
})


//Minecraft specific

//Parameter version is optional
await ModsApi.getVersions({
  version: "1.19.2"
})

```
## Contact

If you have any feedback, please write to qiufilms@gmail.com


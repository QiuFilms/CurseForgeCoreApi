const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { URLSearchParams } = require('url')

class CurseForgeApi{
    constructor({api_key, gameId = ""}){
        this.gameId = gameId
        this.baseUrl = "https://api.curseforge.com"
        this.headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-api-key':api_key
          };
    }

    async getGames(){
        return fetch(new URL("/v1/games", this.baseUrl).toString(), {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }

    async getGame({gameId = this.gameId} = {}){  
        console.log(gameId);
        const promises = [
            fetch(new URL(`/v1/games/${gameId}`, this.baseUrl).toString(), {method: 'GET', headers: this.headers}),
            fetch(new URL(`/v1/games/${gameId}/versions`, this.baseUrl).toString(), {method: 'GET', headers: this.headers}),
            fetch(new URL(`/v1/games/${gameId}/version-types`, this.baseUrl).toString(), {method: 'GET', headers: this.headers})
        ]

        const [game, versions, versionTypes] = await Promise.allSettled(promises)
        return {
            game: await game.value.json(),
            versions: await versions.value.json(),
            versionTypes: await versionTypes.value.json()
        }
    }

    async getCategories({gameId = this.gameId} = {}){

        return fetch(new URL(`/v1/categories?gameId=${gameId}`, this.baseUrl).toString(), {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }


    async searchMods(parameters){
        const url = new URL(`/v1/mods/search`, this.baseUrl)

        for (const [key, value] of Object.entries(parameters)) {
            if(typeof value !== "undefined" || value !== ""){
                url.searchParams.set(key, value)
            }
        }

        return fetch(url.toString(), {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }


    async getMod({modId}){
        const promises = [
            fetch(new URL(`/v1/mods/${modId}`, this.baseUrl).toString(), {method: 'GET', headers: this.headers}),
            fetch(new URL(`/v1/mods/${modId}/description`, this.baseUrl).toString(), {method: 'GET', headers: this.headers})
        ]
        const [mod, description] = await Promise.allSettled(promises)

        return {
            mod: await mod.value.json(),
            description: await description.value.json(),
        }
    }

    async getMods({modIds}){
        const body = {
            modIds: modIds
        }

        return fetch(new URL(`/v1/mods`, this.baseUrl).toString(), {method: 'POST', headers: this.headers, body:JSON.stringify(body)})
        .then((res) => {
            return res.json();
        })
    }

    async getFeaturedMods({gameId = this.gameId, excludedModIds, gameVersionTypeId} = {}){
        const body = {
            gameId: gameId,
            excludedModIds: excludedModIds,
            gameVersionTypeId: gameVersionTypeId
        }

        return fetch(new URL(`/v1/mods/featured`, this.baseUrl).toString(), {method: 'POST', headers: this.headers, body:JSON.stringify(body)})
        .then((res) => {
            return res.json();
        })
    }

    async getModFile({modId, fileId}){
        const url = new URL(`/v1/mods/${modId}/files/${fileId}`, this.baseUrl)

        const promises = [
            fetch(url.toString(), {method: 'GET', headers: this.headers}),
            fetch(new URL(`/changelog`,url).toString(), {method: 'GET', headers: this.headers}),
            fetch(new URL(`/download-url`,url).toString(), {method: 'GET', headers: this.headers})
        ]

        const [modFile, changelog, downloadUrl] = await Promise.allSettled(promises)

        return {
            modFile: await modFile.value.json(),
            changelog: await changelog.value.json(),
            downloadUrl: await downloadUrl.value.json()
        }
    }


    async getModFiles({modId, parameters = {}}){
        const url = new URL(`/v1/mods/${modId}/files`, this.baseUrl)

        for (const [key, value] of Object.entries(parameters)) {
            if(typeof value !== "undefined" || value !== ""){
                url.searchParams.set(key, value)
            }
        }
        return fetch(url.toString(), {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }

    async getModsFiles({fileIds}){
        const body = {
            fileIds: fileIds
        }

        return fetch(new URL(`/v1/mods/files`, this.baseUrl), {method: 'POST', headers: this.headers, body:JSON.stringify(body)})
        .then((res) => {
            return res.json();
        })
    }

    async getVersions({version = "", parameters = {}}){
        const url = new URL(`/v1/minecraft/version/${version}`, this.baseUrl)

        for (const [key, value] of Object.entries(parameters)) {
            if(typeof value !== "undefined" || value !== ""){
                url.searchParams.set(key, value)
            }
        }
        return fetch(url.toString(), {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }

    async getModLoaders({modloader = "", parameters = {}}){
        const url = new URL(`/v1/minecraft/modloader/${modloader}`, this.baseUrl)

        for (const [key, value] of Object.entries(parameters)) {
            if(typeof value !== "undefined" || value !== ""){
                url.searchParams.set(key, value)
            }
        }

        return fetch(url.toString(), {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }
}

module.exports = CurseForgeApi
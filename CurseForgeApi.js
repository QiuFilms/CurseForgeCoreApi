const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { URLSearchParams } = require('url')

class CurseForgeApi{
    constructor({api_key}){
        this.gameId = 432
        this.baseUrl = "https://api.curseforge.com"
        this.headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-api-key':api_key
          };
    }

    async getGames(){        
        return fetch(`${this.baseUrl}/v1/games`, {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }

    async getGame({gameId}){        
        const game = await fetch(`${this.baseUrl}/v1/games/${gameId}`, {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })

        const versions = await fetch(`${this.baseUrl}/v1/games/${gameId}/versions`, {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })

        const versionTypes = await fetch(`${this.baseUrl}/v1/games/${gameId}/version-types`, {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })

        return {game, versions, versionTypes}
    }

    async getCategories({gameId}){
        return fetch(`${this.baseUrl}/v1/categories?gameId=${gameId}`, {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }


    async searchMods(parameters){
        const paramsObj = new URLSearchParams()
        for (const [key, value] of Object.entries(parameters)) {
            if(typeof value !== "undefined" || value !== ""){
                paramsObj.append(key,value)
            }
        }

        return fetch(`${this.baseUrl}/v1/mods/search?` + paramsObj.toString(), {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }


    async getMod({modId}){
        const mod = await fetch(`${this.baseUrl}/v1/mods/${modId}`, {method: 'GET', headers: this.headers, body:JSON.stringify(parameters)})
        .then((res) => {
            return res.json();
        })

        const description = await fetch(`${this.baseUrl}/v1/mods/${modId}/description`, {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })

        return {mod, description}
    }

    async getModFile({modId, fileId = "", parameters = {}}){
        const paramsObj = new URLSearchParams()
        for (const [key, value] of Object.entries(parameters)) {
            if(typeof value !== "undefined" || value !== ""){
                paramsObj.append(key,value)
            }
        }
        return fetch(`${this.baseUrl}/v1/mods/${modId}/files${fileId != "" ? "/"+fileId: ""}?` + paramsObj.toString(), {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }

    async getVersions({version = ""}){
        return fetch(`${this.baseUrl}/v1/minecraft/version/${version}`, {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }
}

module.exports = CurseForgeApi
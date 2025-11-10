export class Model {
    constructor() {
        this.usersNames = [];
        this.usersData = {};
        this.apiList = {
            getUser: "https://www.codewars.com/api/v1/users/"
        }
        this.notFoundUsers = [];
        this.languages = new Set();
        this.errors = [];
    }

    async readUsers(inputStr) {
        this.usersNames = [];
        this.notFoundUsers = [];
        this.usersNames = inputStr.split(",");
        await this.fetchUsers();
    }

    async fetchUsers() {
        this.usersData = {};
        this.languages = new Set();
        this.errors = [];
        for (const userName of this.usersNames) {
            const userData = await this.fetchUser(userName);
            if (Object.keys(userData).length != 0) {
                this.usersData[userName] = userData;
                Object.keys(userData.ranks.languages).forEach(element => this.languages.add(element));
            } else {
                this.notFoundUsers.push(userName);
            }
        }
    }

    async fetchUser(userName) {
        const apiUrl = this.apiList.getUser + userName;
        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                if (response.status == 404) throw new Error("User not found");
            }
        } catch (error) {
            this.errors.push(error + " - " + apiUrl);
            return {};
        }
    }

    getSortedTableData(lang) {
        let sortable = Object.entries(this.usersData);
        return sortable.filter(([username, data]) => {
            return lang === "overall" || data.ranks?.languages?.[lang] !== undefined;
        })
            .sort(([usernameA, dataA], [usernameB, dataB]) => {
                return this.getUserScore(lang, dataB) - this.getUserScore(lang, dataA);
            })
            .map(([username, data]) => ({
                name: username,
                clan: data.clan,
                score: this.getUserScore(lang, data)
            }));
    }

    getUserScore(lang, data) {
        return lang === "overall" ? data.ranks.overall.score : data.ranks?.languages?.[lang]?.score;
    }
}
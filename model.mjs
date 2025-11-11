export class Model {
    constructor() {
        this.usersData = {};
        this.notFoundUsers = [];
        this.languages = new Set();
        this.errors = [];
    }

    processData(fetchedData) {
        const sortable = Object.entries(fetchedData);
        for (const [userName, data] of sortable) {
            if (fetchedData[userName].hasOwnProperty("error")) {
                this.notFoundUsers.push(userName);
                this.errors.push(data["error"]);
            } else {
                this.usersData[userName] = data;
                Object.keys(data.ranks.languages).forEach(lang => this.languages.add(lang));
            }
        }
    }

    clearData() {
        this.usersData = {};
        this.notFoundUsers = [];
        this.languages = new Set();
        this.errors = [];
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
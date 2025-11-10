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
        for (const user_name of this.usersNames) {
            const user_data = await this.fetchUser(user_name);
            if (Object.keys(user_data).length != 0) {
                this.usersData[user_name] = user_data;
                Object.keys(user_data.ranks.languages).forEach(element => this.languages.add(element));
            } else {
                this.notFoundUsers.push(user_name);
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
        const sortedData = [];
        if (lang == "overall") {
            sortable.sort((a, b) => b[1].ranks.overall.score - a[1].ranks.overall.score);

            sortable.forEach(element => sortedData.push({
                name: element[0],
                clan: element[1].clan,
                score: element[1].ranks.overall.score
            }));
        } else {
            sortable = sortable.filter((element) => element[1].ranks.languages.hasOwnProperty(lang));
            sortable.sort((a, b) => b[1].ranks.languages[lang].score - a[1].ranks.languages[lang].score);

            sortable.forEach(element => sortedData.push({
                name: element[0],
                clan: element[1].clan,
                score: element[1].ranks.languages[lang].score
            }));
        }
        return sortedData;
    }
}
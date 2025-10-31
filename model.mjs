export class Model {
    constructor() {
        this.users_names = [];
        this.users_data = {};
        this.api_list = {
            get_user: "https://www.codewars.com/api/v1/users/"
        }
        this.not_found_users = [];
        this.languages = new Set();
    }

    async readUsers(input_str) {
        this.users_names = input_str.split(",");
        this.not_found_users = [];
        await this.fetchAllUsers();
    }

    async fetchAllUsers() {
        for (const user_name of this.users_names) {
            const user_data = await this.fetchUser(user_name);
            if (Object.keys(user_data).length != 0) {
                this.users_data[user_name] = user_data;
                Object.keys(user_data.ranks.languages).forEach(element => this.languages.add(element));
            } else {
                this.not_found_users.push(user_name);
            }
        }
    }

    async fetchUser(user_name) {
        const api_url = this.api_list.get_user + user_name;
        try {
            const response = await fetch(api_url);
            if (response.status != 404) {
                const data = await response.json();
                return data;
            } else {
                return {};
            }
        } catch (error) {
            console.log(error);
        }
    }

    getSortedTableData(lang) {
        let sortable = Object.entries(this.users_data);
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
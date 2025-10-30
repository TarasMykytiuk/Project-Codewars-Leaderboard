export class Model {
    constructor() {
        this.users_names = [];
        this.users_data = {};
        this.api_list = {
            get_user: "https://www.codewars.com/api/v1/users/"
        }
    }

    readUsers(input_str) {
        this.users_names = input_str.split(",");
    }

    async fetchAllUsers() {
        for (const user_name of this.users_names) {
            const user_data = await this.fetchUser(user_name)
            this.users_data[user_name] = user_data;
        }
    }

    async fetchUser(user_name) {
        const api_url = this.api_list.get_user + user_name;
        console.log(api_url);
        try {
            const response = await fetch(api_url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

}
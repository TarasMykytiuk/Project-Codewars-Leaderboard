export class ApiModel {
    constructor() {
        this.apiList = {
            getUser: "https://www.codewars.com/api/v1/users/"
        }
    }

    async fetchUser(userName) {
        const apiUrl = this.apiList.getUser + userName;
        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                return await response.json();
            } else {
                if (response.status == 404) throw new Error("User not found");
            }
        } catch (error) {
            return { error: error + " - " + apiUrl };
        }
    }

    async fetchUsers(usersNames) {
        const fetchedData = {};
        for (const userName of usersNames) {
            const fetchResult = await this.fetchUser(userName);
            if (Object.keys(fetchResult).length != 0) {
                fetchedData[userName] = fetchResult;
            }
        }
        return fetchedData;
    }
}
export class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }
    init() {
        this.view.elements.usrSubmit.addEventListener("click", (event) => {
            event.preventDefault();
            this.handleUsersSubmit();
        });
    }
    async handleUsersSubmit() {
        this.view.clearTable();
        const users_str = this.view.elements.usrInput.value.replaceAll(" ", "");
        this.model.readUsers(users_str);
        await this.model.fetchAllUsers();
        for (const user_name in this.model.users_data) {
            this.view.displayUserRow(this.model.users_data[user_name]);
        }
    }
}
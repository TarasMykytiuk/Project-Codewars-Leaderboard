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
        this.view.elements.langSelect.addEventListener("change", (event) => {
            this.handleLangSelect();
        })
    }

    async handleUsersSubmit() {
        const users_str = this.view.elements.usrInput.value.replaceAll(" ", "");
        await this.model.readUsers(users_str);

        this.view.populateLangSelect(this.model.languages);

        this.resetTable("overall");

        if (this.model.not_found_users.length != 0) {
            this.view.displayNotFoundUsers(this.model.not_found_users);
        }
    }

    resetTable(lang) {
        this.view.clearTable();
        const tableData = this.model.getSortedTableData(lang);
        const userData = this.model.users_data;
        tableData.forEach((user) => {
            this.view.displayUserRow(user.name, user.clan, user.score);
        });
    }

    handleLangSelect() {
        const lang = this.view.elements.langSelect.value;
        this.resetTable(lang);
    }
}
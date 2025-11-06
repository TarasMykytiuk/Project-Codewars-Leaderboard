export class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {

        this.view.bindUserSubmit(() => this.handleUsersSubmit());
        this.view.bindLangSelect(() => this.handleLangSelect());
    }

    async handleUsersSubmit() {
        const users_str = this.view.elements.usrInput.value.replaceAll(" ", "");
        await this.model.readUsers(users_str);

        this.view.populateLangSelect(this.model.languages);

        this.view.populateTable(this.model.getSortedTableData("overall"));

        if (this.model.not_found_users.length != 0) {
            this.view.displayNotFoundUsers(this.model.not_found_users);
        }
        if (this.model.errors.length != 0) {
            this.view.displayErrors(this.model.errors);
        }
    }

    handleLangSelect() {
        const lang = this.view.elements.langSelect.value;
        const tableData = this.model.getSortedTableData(lang);
        this.view.populateTable(tableData);
    }
}
export class Controller {
    constructor(view, model, apiModel) {
        this.view = view;
        this.model = model;
        this.apiModel = apiModel;
    }

    init() {
        this.view.bindUserSubmit(() => this.handleUsersSubmit());
        this.view.bindLangSelect(() => this.handleLangSelect());
    }

    async handleUsersSubmit() {
        this.model.clearData();
        const usersStr = this.view.elements.usrInput.value.replaceAll(" ", "");
        const fetchedData = await this.apiModel.fetchUsers(usersStr.split(","));
        this.model.processData(fetchedData);

        this.view.populateLangSelect(this.model.languages);
        this.view.populateTable(this.model.getSortedTableData("overall"));
        if (this.model.notFoundUsers.length != 0) {
            this.view.displayNotFoundUsers(this.model.notFoundUsers);
        }
        if (this.model.errors.length != 0) {
            this.view.logErrors(this.model.errors);
        }
    }

    handleLangSelect() {
        const lang = this.view.elements.langSelect.value;
        const tableData = this.model.getSortedTableData(lang);
        this.view.populateTable(tableData);
    }
}
export class Controller {
    constructor(view, model, apiModel) {
        this.view = view;
        this.model = model;
        this.apiModel = apiModel;
    }

    init() {
        this.view.bindUserSubmit((usersStr) => this.handleUsersSubmit(usersStr));
        this.view.bindLangSelect((lang) => this.handleLangSelect(lang));
    }

    async handleUsersSubmit(usersStr) {
        this.model.clearData();
        for (const userName of usersStr.split(",")) {
            const data = await this.apiModel.fetchUser(userName);
            this.model.addUser(userName, data);
        }
        this.view.populateLangSelect(this.model.getLanguages());
        this.view.populateTable(this.model.getSortedTableData("overall"));
        if (this.model.getNotFoundUsers().length != 0) {
            this.view.displayNotFoundUsers(this.model.getNotFoundUsers());
        }
        if (this.model.getErrors().length != 0) {
            this.view.logErrors(this.model.getErrors());
        }
    }

    handleLangSelect(lang) {
        const tableData = this.model.getSortedTableData(lang);
        this.view.populateTable(tableData);
    }
}
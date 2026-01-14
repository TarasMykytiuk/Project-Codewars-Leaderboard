export class View {
    #elements
    constructor() {
        this.#elements = {
            usrSubmit: document.getElementById("users_submit"),
            usrInput: document.getElementById("users_input"),
            langSelect: document.getElementById("lang-selector"),
            usrTable: document.getElementById("users_table_body"),
            notFound: document.getElementById("not_found_users")
        };
    }

    bindUserSubmit(handler) {
        const usersStr = this.#elements.usrInput.value.replaceAll(" ", "");
        this.#elements.usrSubmit.addEventListener("click", (event) => {
            event.preventDefault();
            handler(usersStr);
        });
    }

    bindLangSelect(handler) {
        this.#elements.langSelect.addEventListener("change", (event) => {
            const lang = this.#elements.langSelect.value;
            handler(lang);
        });
    }

    clearTable() {
        let rows = Array.from(this.#elements.usrTable.getElementsByClassName("user_row"));
        if (rows.length) {
            for (const row of rows) {
                row.remove();
            }
        }
    }

    displayUserRow(userName, clan, score) {
        const row = document.createElement("tr");
        row.classList.add("user_row");
        const userNameDom = document.createElement("td");
        userNameDom.innerText = userName;
        const userClanDom = document.createElement("td");
        userClanDom.innerText = clan;
        const userScoreDom = document.createElement("td");
        userScoreDom.innerText = score;
        row.appendChild(userNameDom);
        row.appendChild(userClanDom);
        row.appendChild(userScoreDom);
        this.#elements.usrTable.appendChild(row);
    }

    populateTable(tableData) {
        this.clearTable();
        tableData.forEach((user) => {
            this.displayUserRow(user.name, user.clan, user.score);
        });
    }

    displayNotFoundUsers(users) {
        const stringStart = users.length > 1 ? "Users: " : "User: "
        this.#elements.notFound.innerText = stringStart + users.join(", ") + " - not found!";
    }

    logErrors(errors) {
        errors.forEach(error => console.log(error));
    }

    populateLangSelect(languages) {
        while (this.#elements.langSelect.children.length > 1) {
            this.#elements.langSelect.removeChild(this.#elements.langSelect.lastChild);
        }
        languages.forEach(lang => this.addSelectOption(lang));
    }

    addSelectOption(value) {
        const option = document.createElement("option");
        option.value = value;
        option.innerText = value;
        this.#elements.langSelect.appendChild(option);
    }
}
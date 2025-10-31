export class View {
    constructor() {
        this.elements = {
            usrSubmit: document.getElementById("users_submit"),
            usrInput: document.getElementById("users_input"),
            langSelect: document.getElementById("lang-selector"),
            usrTable: document.getElementById("users_table_body"),
            notFound: document.getElementById("not_found_users"),
            errors: document.getElementById("errors")
        };
    }
    clearTable() {
        let rows = Array.from(this.elements.usrTable.getElementsByClassName("user_row"));
        if (rows.length) {
            for (const row of rows) {
                row.remove();
            }
        }
    }

    displayUserRow(user_name, clan, score) {
        const row = document.createElement("tr");
        row.classList.add("user_row");
        const user_name_dom = document.createElement("td");
        user_name_dom.innerText = user_name;
        const user_clan_dom = document.createElement("td");
        user_clan_dom.innerText = clan;
        const user_score_dom = document.createElement("td");
        user_score_dom.innerText = score;
        row.appendChild(user_name_dom);
        row.appendChild(user_clan_dom);
        row.appendChild(user_score_dom);
        this.elements.usrTable.appendChild(row);
    }

    populateTable(tableData) {
        this.clearTable();
        tableData.forEach((user) => {
            this.displayUserRow(user.name, user.clan, user.score);
        });
    }

    displayNotFoundUsers(users) {
        this.elements.notFound.innerText = "For names: " + users.join(", ") + " - no users found!";
    }

    displayErrors(errors) {
        this.elements.errors.innerHTML = '';
        errors.forEach(error => {
            const errorDom = document.createElement("p");
            errorDom.innerText = error;
            this.elements.errors.appendChild(errorDom);
        });
    }

    populateLangSelect(languages) {
        while (this.elements.langSelect.children.length > 1) {
            this.elements.langSelect.removeChild(this.elements.langSelect.lastChild);
        }
        languages.forEach(lang => this.addSelectOption(lang));
    }

    addSelectOption(value) {
        const option = document.createElement("option");
        option.value = value;
        option.innerText = value;
        this.elements.langSelect.appendChild(option);
    }
}
export class View {
    constructor() {
        this.elements = {
            usrSubmit: document.getElementById("users_submit"),
            usrInput: document.getElementById("users_input"),
            usrTable: document.getElementById("users_table")
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

    displayUserRow(user_data) {
        const row = document.createElement("tr");
        row.classList.add("user_row");
        const user_name_dom = document.createElement("td");
        user_name_dom.innerText = user_data.username;
        const user_clan_dom = document.createElement("td");
        user_clan_dom.innerText = user_data.clan;
        const user_score_dom = document.createElement("td");
        user_score_dom.innerText = user_data.ranks.overall.score;
        row.appendChild(user_name_dom);
        row.appendChild(user_clan_dom);
        row.appendChild(user_score_dom);
        this.elements.usrTable.appendChild(row);
    }

}
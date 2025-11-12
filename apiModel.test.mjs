import test from "node:test";
import assert from "node:assert";
import nock from "nock";
import { ApiModel } from "./apiModel.mjs";
const apiModel = new ApiModel();

test("mocks a fetchUser function with existing user", async () => {
    const existingUser = {
        "id": "6830b366b67d474225adaf58",
        "username": "existingUser",
        "name": "Existing User",
        "honor": 63,
        "clan": "Existing Clan",
        "leaderboardPosition": null,
        "skills": [],
        "ranks": {
            "overall": {
                "rank": -7,
                "name": "7 kyu",
                "color": "white",
                "score": 64
            },
            "languages": {
                "javascript": {
                    "rank": -7,
                    "name": "7 kyu",
                    "color": "white",
                    "score": 64
                }
            }
        },
        "codeChallenges": {
            "totalAuthored": 0,
            "totalCompleted": 15
        }
    }
    const scope = nock("https://www.codewars.com")
        .get("/api/v1/users/existingUser")
        .reply(200, existingUser);
    const parsedResponse = await apiModel.fetchUser("existingUser");
    assert(parsedResponse.name === "Existing User");
    assert(parsedResponse.ranks.overall.score === 64);
    assert(parsedResponse.ranks.languages.javascript.color === "white");
    assert(scope.isDone() === true, "No matching fetch request has been made");
});

test("mocks a fetchUser function with non-existing user", async () => {
    const nonExistingUser = {
        "success": false,
        "reason": "not found"
    };
    const scope = nock("https://www.codewars.com")
        .get("/api/v1/users/nonExistingUser")
        .reply(404, nonExistingUser);
    const parsedResponse = await apiModel.fetchUser("nonExistingUser");
    console.log(parsedResponse);
    assert(parsedResponse.error == 'Error: User not found - https://www.codewars.com/api/v1/users/nonExistingUser');
    assert(scope.isDone() === true, "No matching fetch request has been made");
});
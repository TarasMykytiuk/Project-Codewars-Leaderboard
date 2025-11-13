import test from "node:test";
import assert from "node:assert";
import nock from "nock";
import { Model } from "./model.mjs";
const model = new Model();
const mockData = {
    "UserOne": {
        "username": "UserOne",
        "clan": "CodeYourFuture",
        "ranks": {
            "overall": { "score": 64 },
            "languages": { "javascript": { "score": 64 } }
        }
    },
    "notExist": {
        "error": "Error: User not found - https://www.codewars.com/api/v1/users/notExist"
    },
    "UserTwo": {
        "username": "UserTwo",
        "clan": "CodeYourFuture",
        "ranks": {
            "overall": { "score": 1079 },
            "languages": { "javascript": { "score": 1075 }, "sql": { "score": 4 } }
        }
    },
    "userThree": {
        "username": "userThree",
        "clan": "CodeYourFuture",
        "ranks": {
            "overall": { "score": 942 },
            "languages": { "javascript": { "score": 938 }, "sql": { "score": 40 }, "go": { "score": 2 }, "ruby": { "score": 2 } }
        }
    }
}
model.processData(mockData);

test("not found users have to be stored in according models property", () => {
    const expectedNotFound = ['notExist'];
    assert.deepStrictEqual(model.notFoundUsers, expectedNotFound);
});

test("errors have to be stored in according property of the model", () => {
    const expectedError = ["Error: User not found - https://www.codewars.com/api/v1/users/notExist"];
    assert.deepStrictEqual(model.errors, expectedError);
});

test("all ranking languages for fetched users must be stored in according property of the model", () => {
    const expectedLanguages = new Set(["javascript", "sql", "go", "ruby"]);
    assert.deepStrictEqual(model.languages, expectedLanguages);
})

test("Users that have selected ranking option must be sorted in descending order", () => {
    const expectedSortedOverall = [
        { "name": "UserTwo", "clan": "CodeYourFuture", "score": 1079 },
        { "name": "userThree", "clan": "CodeYourFuture", "score": 942 },
        { "name": "UserOne", "clan": "CodeYourFuture", "score": 64 }
    ];
    assert.deepStrictEqual(model.getSortedTableData("overall"), expectedSortedOverall);
    const expectedSortedSql = [
        { "name": "userThree", "clan": "CodeYourFuture", "score": 40 },
        { "name": "UserTwo", "clan": "CodeYourFuture", "score": 4 }
    ]
    assert.deepStrictEqual(model.getSortedTableData("sql"), expectedSortedSql);
    const expectedSortedRuby = [
        { "name": "userThree", "clan": "CodeYourFuture", "score": 2 }
    ]
    assert.deepStrictEqual(model.getSortedTableData("ruby"), expectedSortedRuby);
});
import test from "node:test";
import assert from "node:assert";
import nock from "nock";
import { Model } from "./model.mjs";
const model = new Model();

test("mocks a fetchUser function with existing user", async () => {
    const scope = nock("https://example.com")
        .get(uri => uri.startsWith("/test/"))
        .reply(200, (uri) => {
            const user = uri.split("/").pop();
            return JSON.stringify({ user });
        });
    model.api_list.get_user = "https://example.com/test/";
    const parsedResponse = await model.fetchUser("someone_exist");
    assert(parsedResponse.user === "someone_exist");
    assert(scope.isDone() === true, "No matching fetch request has been made");
});

test("mocks a fetchUser function with non-existing user", async () => {
    const scope = nock("https://example.com")
        .get(uri => uri.startsWith("/test/"))
        .reply(404, {
            success: false,
            reason: "not found"
        });
    model.api_list.get_user = "https://example.com/test/";
    const parsedResponse = await model.fetchUser("someone_not_exist");
    console.log(model);
    assert(model.errors.includes("Error: User not found - " + model.api_list.get_user + "someone_not_exist"), true)// "'User not found' with url must be in errors log."
    assert(JSON.stringify(parsedResponse) === '{}');//fetchUser returns empty object if no user found
});
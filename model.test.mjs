import test from "node:test";
import assert from "node:assert";
import nock from "nock";
import { Model } from "./model.mjs";
const model = new Model();

test("mocks a fetch function", async () => {
    // Create a fetch request "mock" using the nock library, which "replaces"
    // real requests with fake ones that we can control in the test using nock
    // functions.
    // In this example, we set up nock so that it looks for GET requests to
    // https://example.com/test (no other URLs will work) and responds with a 200
    // HTTP status code, and the body {"user": "someone"}.
    const scope = nock("https://example.com").get("/test").reply(200, JSON.stringify({ user: "someone" }));

    // Check that the response we got back included the fake body we set up.
    const response_data = await model.fetchUser("not-existing-user");
    const parsedResponse = await response_data;
    assert(parsedResponse.user === "someone");

    // Ensure that a fetch request has been replaced by the nock library. This
    // helps ensure that you're not making real fetch requests that don't match
    // the nock configuration.
    assert(scope.isDone() === true, "No matching fetch request has been made");
});
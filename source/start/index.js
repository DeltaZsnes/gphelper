console.log("index.js");

const runAsync = async () => {
    var authUserResponse = await fetch("/auth/user", {
        "credentials": "omit",
        "headers": {},
        "body": null,
        "method": "GET",
        "mode": "cors"
    });
    console.log(authUserResponse);

    if (authUserResponse.status == 401){
        console.log(authUserResponse);
    }
};

runAsync().catch(e => {
    console.error(e);
});
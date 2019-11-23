console.log("index.js");

const loginRedirect = async () => {
    window.location.replace("/auth/google");
};

const runAsync = async () => {
    var authUserResponse = await fetch("/auth/user", {
        "body": null,
        "method": "GET",
        "mode": "cors"
    });
    console.log(authUserResponse);
    
    if (authUserResponse.status == 200){
        console.log(await authUserResponse.json());
    }

    if (authUserResponse.status == 401){
        await loginRedirect();
    }
};

runAsync().catch(e => {
    console.error(e);
});

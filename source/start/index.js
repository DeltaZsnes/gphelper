console.log("index.js");

const loginRedirect = async () => {
    window.location.replace("/auth/login");
};

const runAsync = async () => {
    const authUserResponse = await fetch("/auth/user", {
        "body": null,
        "method": "GET",
        "mode": "cors"
    });
    console.log(authUserResponse);

    if (authUserResponse.status == 200) {
        console.log(await authUserResponse.json());
    }

    if (authUserResponse.status == 401) {
        await loginRedirect();
    }
    
    await captureVideo();
};

const captureVideo = async () => {
    const video = document.querySelector('video');
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true
    });
    video.srcObject = stream;
};

runAsync().catch(e => {
    console.error(e);
});

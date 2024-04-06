export function tilt() {
    VanillaTilt.init(
        document.querySelectorAll(".js-tilt"), {
        max: 25,
        speed: 400,
        reverse: true,
        gyroscope: false
    }
    );

    let destroyAll = document.querySelectorAll(".js-tilt");

    let firstTime = 0;

    document.addEventListener("touchstart", disableOnMobile);

    function disableOnMobile() {
        if (firstTime < 1) {
            destroyAll.forEach(box => {
                box.vanillaTilt.destroy();
                console.log("Chargé");
            });
            firstTime = firstTime + 1;
            console.log(firstTime)
        }
    }
}
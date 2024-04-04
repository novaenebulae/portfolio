export function tilt() {
    VanillaTilt.init(
        document.querySelectorAll(".js-tilt"), {
        max: 25,
        speed: 400,
        reverse: true,
        gyroscope: false
    }
    );
}
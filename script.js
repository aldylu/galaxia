/* =====================================================
   FROM LUJÁN TO MIA
   GALAXIA DE GIRASOLES
===================================================== */


/* =====================================================
   CONFIGURACIÓN BÁSICA
===================================================== */

const canvas =
    document.getElementById("galaxy");

const scene =
    new THREE.Scene();


/* =====================================================
   CÁMARA
===================================================== */

const camera =
    new THREE.PerspectiveCamera(
        65,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );


camera.position.set(
    0,
    0,
    80
);


/* =====================================================
   RENDERIZADOR
===================================================== */

const renderer =
    new THREE.WebGLRenderer({

        canvas: canvas,

        antialias: true,

        alpha: true

    });


renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


/* =====================================================
   LUCES
===================================================== */

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        0.8
    );


scene.add(ambientLight);


const pointLight =
    new THREE.PointLight(
        0xffd36a,
        2,
        500
    );


pointLight.position.set(
    0,
    0,
    20
);


scene.add(pointLight);


/* =====================================================
   ESTRELLAS
===================================================== */

const starGeometry =
    new THREE.BufferGeometry();


const starCount = 3500;


const starPositions =
    new Float32Array(
        starCount * 3
    );


for (
    let i = 0;
    i < starCount;
    i++
) {

    const i3 = i * 3;


    starPositions[i3] =
        (Math.random() - 0.5) * 900;


    starPositions[i3 + 1] =
        (Math.random() - 0.5) * 600;


    starPositions[i3 + 2] =
        (Math.random() - 0.5) * 700;

}


starGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(
        starPositions,
        3
    )

);


const starMaterial =
    new THREE.PointsMaterial({

        color: 0xffffff,

        size: 1.3,

        transparent: true,

        opacity: 0.85,

        sizeAttenuation: true

    });


const stars =
    new THREE.Points(
        starGeometry,
        starMaterial
    );


scene.add(stars);


/* =====================================================
   CREAR GIRASOL
===================================================== */

function createSunflower(scale = 1) {

    const flower =
        new THREE.Group();


    /* -------------------------
       TALLO
    ------------------------- */

    const stemGeometry =
        new THREE.CylinderGeometry(
            0.10 * scale,
            0.15 * scale,
            4 * scale,
            8
        );


    const stemMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x315d24,

            roughness: 0.9

        });


    const stem =
        new THREE.Mesh(
            stemGeometry,
            stemMaterial
        );


    stem.position.y =
        -1.8 * scale;


    flower.add(stem);


    /* -------------------------
       CENTRO
    ------------------------- */

    const centerGeometry =
        new THREE.SphereGeometry(
            0.7 * scale,
            16,
            16
        );


    const centerMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x4b260f,

            roughness: 1

        });


    const center =
        new THREE.Mesh(
            centerGeometry,
            centerMaterial
        );


    flower.add(center);


    /* -------------------------
       PÉTALOS
    ------------------------- */

    const petalGeometry =
        new THREE.SphereGeometry(
            0.28 * scale,
            8,
            8
        );


    const petalMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xffc928,

            roughness: 0.7,

            emissive: 0x241600,

            emissiveIntensity: 0.1

        });


    const petalCount = 28;


    for (
        let i = 0;
        i < petalCount;
        i++
    ) {

        const angle =
            (i / petalCount) *
            Math.PI *
            2;


        const petal =
            new THREE.Mesh(
                petalGeometry,
                petalMaterial
            );


        petal.position.x =
            Math.cos(angle) *
            0.75 *
            scale;


        petal.position.z =
            Math.sin(angle) *
            0.75 *
            scale;


        petal.rotation.y =
            -angle;


        petal.scale.set(
            1.5,
            0.55,
            0.6
        );


        flower.add(petal);

    }


    /* -------------------------
       HOJAS
    ------------------------- */

    const leafGeometry =
        new THREE.SphereGeometry(
            0.45 * scale,
            8,
            8
        );


    const leafMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x3e792c,

            roughness: 0.9

        });


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const leaf =
            new THREE.Mesh(
                leafGeometry,
                leafMaterial
            );


        leaf.position.y =
            (-1.2 + i * 0.8) *
            scale;


        leaf.position.x =
            (i % 2 === 0 ? 0.45 : -0.45) *
            scale;


        leaf.rotation.z =
            i % 2 === 0
                ? -0.5
                : 0.5;


        leaf.scale.set(
            1.5,
            0.5,
            0.35
        );


        flower.add(leaf);

    }


    return flower;
}


/* =====================================================
   CREAR GALAXIA DE GIRASOLES
===================================================== */

const sunflowerGroup =
    new THREE.Group();


scene.add(
    sunflowerGroup
);


const sunflowers = [];


const sunflowerCount = 130;


for (
    let i = 0;
    i < sunflowerCount;
    i++
) {

    const scale =
        0.35 +
        Math.random() * 0.8;


    const flower =
        createSunflower(scale);


    /*
       Distribución en espiral
       para dar sensación de galaxia
    */

    const angle =
        Math.random() *
        Math.PI *
        2;


    const radius =
        15 +
        Math.random() * 55;


    const spiral =
        radius *
        0.35;


    flower.position.x =
        Math.cos(angle) *
        radius +
        Math.sin(angle) *
        spiral;


    flower.position.z =
        Math.sin(angle) *
        radius;


    flower.position.y =
        (Math.random() - 0.5) *
        70;


    /*
       Rotaciones aleatorias
    */

    flower.rotation.x =
        Math.random() * Math.PI;


    flower.rotation.y =
        Math.random() * Math.PI;


    flower.rotation.z =
        Math.random() * Math.PI;


    /*
       Guardamos velocidades
    */

    flower.userData = {

        rotationSpeed:
            (Math.random() - 0.5) *
            0.008,

        floatSpeed:
            0.002 +
            Math.random() *
            0.004,

        originalY:
            flower.position.y,

        offset:
            Math.random() *
            Math.PI *
            2

    };


    sunflowerGroup.add(
        flower
    );


    sunflowers.push(
        flower
    );

}


/* =====================================================
   POLVO CÓSMICO
===================================================== */

const dustGeometry =
    new THREE.BufferGeometry();


const dustCount = 1200;


const dustPositions =
    new Float32Array(
        dustCount * 3
    );


for (
    let i = 0;
    i < dustCount;
    i++
) {

    const i3 =
        i * 3;


    dustPositions[i3] =
        (Math.random() - 0.5) * 350;


    dustPositions[i3 + 1] =
        (Math.random() - 0.5) * 200;


    dustPositions[i3 + 2] =
        (Math.random() - 0.5) * 350;

}


dustGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(
        dustPositions,
        3
    )

);


const dustMaterial =
    new THREE.PointsMaterial({

        color: 0xffd76a,

        size: 0.5,

        transparent: true,

        opacity: 0.45

    });


const dust =
    new THREE.Points(
        dustGeometry,
        dustMaterial
    );


scene.add(dust);


/* =====================================================
   MENSAJES
===================================================== */

const messages = [

    {

        thai:
            "🌸 สุขสันต์วันฤดูใบไม้ผลินะ มีอา จากอาร์เจนตินา 🇦🇷🌻",

        spanish:
            "🌸 Feliz primavera Mia desde Argentina 🇦🇷🌻"

    },

    {

        thai:
            "🌻 มอบดอกไม้เหล่านี้ให้เธอด้วยความรักมากมาย 💛",

        spanish:
            "🌻 Te regalo con mucho cariño estas flores 💛"

    },

    {

        thai:
            "☀️ ขอให้เธอมีวันที่สวยงามนะ 🌷✨",

        spanish:
            "☀️ Te deseo un hermoso día 🌷✨"

    },

    {

        thai:
            "📚 ตั้งใจเรียนนะ เธอทำได้แน่นอน! 💪🌻",

        spanish:
            "📚 Estudia mucho, tú puedes 💪🌻"

    },

    {

        thai:
            "💗 ฉันก็อยากทำหน้าที่เพื่อนที่ดีให้ดีที่สุดเหมือนกัน 🌷",

        spanish:
            "💗 También quiero hacer un buen trabajo como amiga 🌷"

    },

    {

        thai:
            "🤗 ส่งกอดจากระยะไกลไปให้เธอ 🌎💛",

        spanish:
            "🤗 Te mando abrazos a la distancia 🌎💛"

    },

    {

        thai:
            "🌻 ขอให้เธอมีความสุขเสมอนะ 💕✨",

        spanish:
            "🌻 Sé feliz siempre 💕✨"

    },

    {

        thai:
            "🧟‍♀️ อย่ากลายเป็นซอมบี้เหมือนฉันนะ 555 😂🌻",

        spanish:
            "🧟‍♀️ No te conviertas en zombie como yo 555 😂🌻"

    },

    {

        thai:
            "💐 หวังว่าเธอจะชอบนะ มีอา 💗🌻",

        spanish:
            "💐 Espero te guste, Mia 💗🌻"

    }

];


let currentMessage = -1;


/* =====================================================
   ELEMENTOS HTML
===================================================== */

const thaiText =
    document.getElementById(
        "thai-text"
    );


const spanishText =
    document.getElementById(
        "spanish-text"
    );


const messageCard =
    document.getElementById(
        "message-card"
    );


const counter =
    document.getElementById(
        "counter"
    );


const centerMessage =
    document.getElementById(
        "center-message"
    );


/* =====================================================
   MOSTRAR MENSAJE
===================================================== */

function showMessage(index) {

    if (
        index < 0 ||
        index >= messages.length
    ) {

        return;

    }


    currentMessage = index;


    const message =
        messages[index];


    messageCard.classList.remove(
        "visible"
    );


    setTimeout(() => {

        thaiText.textContent =
            message.thai;


        spanishText.textContent =
            message.spanish;


        counter.textContent =
            `${index + 1} / ${messages.length}`;


        messageCard.classList.add(
            "visible"
        );

    }, 250);

}


/* =====================================================
   MOVIMIENTO
===================================================== */

let targetRotationX = 0;
let targetRotationY = 0;

let currentRotationX = 0;
let currentRotationY = 0;


let targetCameraX = 0;

let currentCameraX = 0;


/* =====================================================
   MOUSE
===================================================== */

let mouseDown = false;

let previousMouseX = 0;
let previousMouseY = 0;


canvas.addEventListener(
    "mousedown",
    (event) => {

        mouseDown = true;

        previousMouseX =
            event.clientX;

        previousMouseY =
            event.clientY;

    }
);


window.addEventListener(
    "mouseup",
    () => {

        mouseDown = false;

    }
);


canvas.addEventListener(
    "mousemove",
    (event) => {

        if (!mouseDown) {

            return;

        }


        const deltaX =
            event.clientX -
            previousMouseX;


        const deltaY =
            event.clientY -
            previousMouseY;


        previousMouseX =
            event.clientX;


        previousMouseY =
            event.clientY;


        targetRotationY +=
            deltaX * 0.003;


        targetRotationX +=
            deltaY * 0.003;


        /*
           Movimiento horizontal
           para descubrir mensajes
        */

        if (
            Math.abs(deltaX) > 2
        ) {

            if (
                deltaX < 0
            ) {

                nextMessage();

            }

            else {

                previousMessage();

            }

        }

    }
);


/* =====================================================
   TOUCH / CELULAR
===================================================== */

let touchStartX = 0;
let touchStartY = 0;


canvas.addEventListener(
    "touchstart",
    (event) => {

        const touch =
            event.touches[0];


        touchStartX =
            touch.clientX;


        touchStartY =
            touch.clientY;

    },
    { passive: true }
);


canvas.addEventListener(
    "touchend",
    (event) => {

        const touch =
            event.changedTouches[0];


        const deltaX =
            touch.clientX -
            touchStartX;


        const deltaY =
            touch.clientY -
            touchStartY;


        /*
           Movimiento vertical
           mueve la galaxia
        */

        targetRotationX +=
            deltaY * 0.004;


        /*
           Movimiento horizontal
           cambia mensajes
        */

        if (
            Math.abs(deltaX) > 40
        ) {

            if (
                deltaX < 0
            ) {

                nextMessage();

            }

            else {

                previousMessage();

            }

        }

    },
    { passive: true }
);


/* =====================================================
   TECLADO
===================================================== */

window.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "ArrowLeft"
        ) {

            previousMessage();

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextMessage();

        }


        if (
            event.key === "ArrowUp"
        ) {

            targetRotationX -= 0.15;

        }


        if (
            event.key === "ArrowDown"
        ) {

            targetRotationX += 0.15;

        }

    }
);


/* =====================================================
   SIGUIENTE MENSAJE
===================================================== */

function nextMessage() {

    if (
        currentMessage <
        messages.length - 1
    ) {

        showMessage(
            currentMessage + 1
        );

    }

}


/* =====================================================
   MENSAJE ANTERIOR
===================================================== */

function previousMessage() {

    if (
        currentMessage > 0
    ) {

        showMessage(
            currentMessage - 1
        );

    }

}


/* =====================================================
   BOTÓN INICIAL
===================================================== */

const startButton =
    document.getElementById(
        "start-button"
    );


const startScreen =
    document.getElementById(
        "start-screen"
    );


startButton.addEventListener(
    "click",
    () => {

        startScreen.classList.add(
            "hidden"
        );

    }
);


/* =====================================================
   ANIMACIÓN
===================================================== */

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    /*
       Rotación suave de la galaxia
    */

    sunflowerGroup.rotation.y +=
        0.0008;


    stars.rotation.y +=
        0.00005;


    dust.rotation.y +=
        0.0001;


    /*
       Movimiento individual
       de los girasoles
    */

    sunflowers.forEach(
        (flower) => {

            flower.rotation.y +=
                flower.userData.rotationSpeed;


            flower.position.y =
                flower.userData.originalY +
                Math.sin(
                    time *
                    flower.userData.floatSpeed *
                    100 +
                    flower.userData.offset
                ) *
                0.25;

        }
    );


    /*
       Suavizar movimiento
    */

    currentRotationX +=
        (
            targetRotationX -
            currentRotationX
        ) * 0.06;


    currentRotationY +=
        (
            targetRotationY -
            currentRotationY
        ) * 0.06;


    currentCameraX +=
        (
            targetCameraX -
            currentCameraX
        ) * 0.05;


    sunflowerGroup.rotation.x =
        currentRotationX * 0.35;


    sunflowerGroup.rotation.z =
        currentRotationY * 0.15;


    camera.position.x =
        currentCameraX;


    /*
       Pequeño movimiento de cámara
    */

    camera.position.y =
        Math.sin(time * 0.15) * 2;


    camera.lookAt(
        0,
        0,
        0
    );


    renderer.render(
        scene,
        camera
    );

}


animate();


/* =====================================================
   AJUSTAR A VENTANA
===================================================== */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);
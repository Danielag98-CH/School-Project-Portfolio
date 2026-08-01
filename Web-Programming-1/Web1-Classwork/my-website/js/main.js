window.addEventListener("load", function() {
    const images = [
        { path: "./images/loaf-kitty.jpg", description: "My cat in a loaf form." },
        { path: "./images/sleeping-kitty.jpg", description: "My sleeping white and orange kitty." },
        { path: "./images/sushi.jpg", description: "My black cat." },
        { path: "./images/void-kitty.jpg", description: "My wide-eyed black cat." }
    ];

    let currentImg = 0
    const mainImg = document.getElementById("mainImg");
    const caption = document.getElementById("caption");
    const btnPrev = document.getElementById("btnPrev");
    const btnNext = document.getElementById("btnNext");
    console.log(mainImg, caption, btnPrev, btnNext); 

    function showImage(imgObj) {
        mainImg.src = imgObj.path;
        mainImg.alt = imgObj.description;
        caption.textContent = imgObj.description;
    }

    showImage(images[currentImg]);

    btnNext.addEventListener("click", function() {
        currentImg++;
        if (currentImg >= images.length) {
            currentImg = 0;
        }
        showImage(images[currentImg]);
    });

    btnPrev.addEventListener("click", function() {
        currentImg--;
        if (currentImg < 0) {
            currentImg = images.length - 1; 
        }
        showImage(images[currentImg]);
    });

    const menuButton = document.getElementById("menu-button");
    const navBar = document.getElementById("main-nav");
    menuButton.addEventListener("click", function() {
        if (navBar.classList.contains("open")) {
            navBar.classList.remove("open");
        } else {
            navBar.classList.add("open");
        }
    });
});





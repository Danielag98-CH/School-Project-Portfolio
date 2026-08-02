
window.addEventListener('load', function(){

  // Here's the data that we'll use to populate the image gallery
  const images = [
    {path: "images/Desert.jpg", description:"A hot desert.", artist:"Bob Smith", "date": "3/31/2018", tags:["dessert", "landscape"]},
    {path: "images/Lighthouse.jpg", description:"A lighthouse on the ocean", artist:"Betty Carter", "date": "2/01/2014", tags:["oceian", "landscape"]},
    {path: "images/Tulips.jpg", description:"Some beautiful tulips", artist:"Bob Smith", "date": "2/14/2015", tags:["plants", "tulips", "landscape"]}
  ];


  // STEP 1
  // Get handles on the elements we need to work with
  const mainImg = document.getElementById("mainImg");
  const captionDiv = document.getElementById("caption");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");

  let currentImg = 0;

  // STEP 2
  // Create a function to display an image object
  const showImage = (imgObj) => {
    mainImg.src = imgObj.path;
    mainImg.alt = imgObj.description;
    captionDiv.innerHTML = imgObj.description;
  }

  showImage(images[currentImg]);

  // STEP 3
  // add an event handler function to the 'next' button
  btnNext.addEventListener("click", () => {
    currentImg++;
    if(currentImg == images.length){
      currentImg = 0;
    }
    showImage(images[currentImg]);
  })

  // STEP 4
  // add an event handler function to the 'prev' button
  btnPrev.addEventListener("click", ()=>{
    currentImg--;
    if(currentImg < 0){
      currentImg = images.length - 1;
    }
    showImage(images[currentImg]);
  });


});
window.addEventListener('load', function(){

  // Here's the data that we'll use to populate the image gallery
  var images = [
    {path: "images/Desert.jpg", description:"A hot desert."},
    {path: "images/Jellyfish.jpg", description:"A cool jelly fish."},
    {path: "images/Koala.jpg", description:"A cute koala bear"},
    {path: "images/Lighthouse.jpg", description:"A lighthouse on the ocean"},
    {path: "images/Penguins.jpg", description:"Lots of penguins"},
    {path: "images/Tulips.jpg", description:"Some beautiful tulips"}
  ];


  // STEP 1
  // Get handles on the elements we need to work with
  const mainImg = document.getElementById("mainImg");
  const caption = document.getElementById("Caption");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  console.log(mainImg, caption, btnPrev, btnNext);


  // STEP 2
  // Create a function to display an image object
  function showImage(imgObj){
    myImg.scr = imgObj.path;
    myImg.alt = imgObj.description;
    caption.innerHTML = imgObj.description;
  }
  showImage(images[currentImg]);


  // STEP 3
  // add an event handler function to the 'next' button
  btnNext.addEventListener("click", function(){
    currentImg++;
    if(currentImg == images.length){
      currentImg = 0;
    }
    showImage(images[currentImg]);
  });

  // STEP 4
  // add an event handler function to the 'prev' button
  btnPrev.addEventListener("click", function(){
    currentImg --;
    if(currentImg < 0){
      current = images.length - 1;
    }
    showImage(images[currentImg]);
  });


});

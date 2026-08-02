/**
 * Creates an image gallery within a specified HTML element.
 * The gallery includes navigation buttons to cycle through a list of images.
 *
 * @param {HTMLElement} el - The container element where the gallery will be rendered.
 * @param {Array<{path: string, description: string}>} images - An array of image objects, where each object contains:
 *   - `path` (string): The URL or path to the image.
 *   - `description` (string): A textual description of the image.
 *
 * @example
 * const galleryContainer = document.getElementById("gallery");
 * const imageList = [
 *   { path: "image1.jpg", description: "Image 1 description" },
 *   { path: "image2.jpg", description: "Image 2 description" }
 * ];
 * createGallery(galleryContainer, imageList);
 */

const createGallery = (el, images) => {
	const template = `<img id="mainImg" src="" />
					<h3 id="caption"></h3>
					<input type="button" id="btnPrev" value="Prev" />
					<input type="button" id="btnNext" value="Next" />
					`;

	el.innerHTML = template; 
	const mainImg = el.querySelector("#mainImg");
	const h3 = el.querySelector("#caption");
	const btnPrev = el.querySelector("#btnPrev");
	const btnNext = el.querySelector("#btnNext");

	let currentImg = 0;

	const showImage = (imgObj) => {
		mainImg.src = imgObj.path;
		caption.innerHTML = imgObj.description;
	}

	showImage(images[0]);

	btnNext.addEventListener("click", () => {
		currentImg++;
		if(currentImg > images.length -1){
			currentImg = 0;
		}
		showImage(images[currentImg]);
	})

	btnPrev.addEventListener("click", () => {
		currentImg--;
		if(currentImg < 0){
			currentImg = images.length -1;
		}
		showImage(images[currentImg]);
	})

}
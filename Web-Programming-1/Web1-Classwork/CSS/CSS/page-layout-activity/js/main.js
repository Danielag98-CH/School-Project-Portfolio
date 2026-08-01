window.addEventListener("load", function(){
	
	const menuButton = document.getElementById("menu-button");
	const navBar = document.getElementById("nav-bar");
	
	menuButton.addEventListener("click", function(){
		if(navBar.classList.contains("open")){
			navBar.classList.remove("open");
		}else{
			navBar.classList.add("open");
		}
	});

});
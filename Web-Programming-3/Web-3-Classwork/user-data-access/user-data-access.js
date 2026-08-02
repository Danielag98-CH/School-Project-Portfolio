
class UserDataAccess{

	///////////////////////////////////////////////
	// PRIVATE INSTANCE VARIABLES (start with #)
	///////////////////////////////////////////////
	
	// We'll use the dummyData to populate the localStorage database
	#dummyData = [
	    {id:1, firstName:"Jane", lastName:"Doe", email:"jdoe@acme.com"},
	    {id:2, firstName:"Tony", lastName:"Thompsom", email:"tony@acme.com"},
	    {id:3, firstName:"Jesse", lastName:"Jones", email:"jesse@acme.com"}
	];


	//////////////////////////////////
	// CONSTRUCTOR
	//////////////////////////////////
	constructor(){
		// check to see if the localStorage db already exists.
		// if not, then create it an populate it with the dummy data
		if(!localStorage.getItem("userData")){
		    localStorage.setItem("userData", JSON.stringify(this.#dummyData));
		}
		
	}

	
	//////////////////////////////////
	// PUBLIC METHODS
	//////////////////////////////////
	getAllUsers(){
		const str = localStorage.getItem("userData");
		const users = JSON.parse(str);
		return users;
	}

	getUserById(id){
		const str = localStorage.getItem("userData");
		const users = JSON.parse(str);
		const user = users.find(u => u.id == id);
		return user;
	}

	insertUser(newUser){
		// Set the new user's id:
		newUser.id = this.#getMaxId() + 1;
		const str = localStorage.getItem("userData");
		const users = JSON.parse(str);
		users.push(newUser); // we really should validate newUser before adding it!
		localStorage.setItem("userData", JSON.stringify(users));
	}

	updateUser(updatedUser){
		// again, we should validate updatedUser before putting it in the database
		const str = localStorage.getItem("userData");
		const users = JSON.parse(str);
		const indexOfUserToUpdate = users.findIndex(u => updatedUser.id == u.id);
		users[indexOfUserToUpdate] = updatedUser;
		localStorage.setItem("userData", JSON.stringify(users));
	}

	deleteUser(id){
		const str = localStorage.getItem("userData");
		const users = JSON.parse(str);
		const indexOfUserToRemove = users.findIndex(u => id == u.id);
		users.splice(indexOfUserToRemove,1);
		localStorage.setItem("userData", JSON.stringify(users));
	}


	//////////////////////////////////
	// PRIVATE METHODS
	//////////////////////////////////
	#getMaxId(){
		const str = localStorage.getItem("userData");
		const users = JSON.parse(str);
		let maxId = 0;
		for(let x = 0; x < users.length; x++){
			if(users[x].id > maxId){
				maxId = users[x].id;
			}
		}
		return maxId;
	}

}
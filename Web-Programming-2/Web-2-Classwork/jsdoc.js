/**
 * Class representing user data access.
 * Provides methods to interact with user data stored in the localStorage.
 */
class UserDataAccess {

	///////////////////////////////////////////////
	// PRIVATE INSTANCE VARIABLES (start with #)
	///////////////////////////////////////////////

	// We'll use the dummyData to populate the localStorage database
	/**
	 * Dummy data to be used when initializing the localStorage database.
	 * @private
	 * @type {Array<Object>}
	 */
	#dummyData = [
	    {id:1, firstName:"Jane", lastName:"Doe", email:"jdoe@acme.com"},
	    {id:2, firstName:"Tony", lastName:"Thompsom", email:"tony@acme.com"},
	    {id:3, firstName:"Jesse", lastName:"Jones", email:"jesse@acme.com"}
	];

	//////////////////////////////////
	// CONSTRUCTOR
	//////////////////////////////////
	/**
	 * Creates an instance of UserDataAccess.
	 * Initializes the localStorage with dummy data if the 'userData' key is not found.
	 */
	constructor(){
		// check to see if 'userData' key is already in the localStorage database
		// if not, then create it, and populate it with the dummy data
		if(!localStorage.getItem("userData")){
		    localStorage.setItem("userData", JSON.stringify(this.#dummyData));
		}
	};

	//////////////////////////////////
	// PUBLIC METHODS
	//////////////////////////////////
	
	/**
	 * Retrieves all users from the localStorage.
	 * @returns {Array<Object>} An array of all users stored in localStorage.
	 */
    getAllUsers(){
        const str = localStorage.getItem("userData");
        const users = JSON.parse(str);
        return users;
    };
    
    /**
     * Retrieves a user by their unique ID.
     * @param {number} id - The ID of the user to retrieve.
     * @returns {Object|undefined} The user object if found, otherwise undefined.
     */
    getUserById(id){
        const str = localStorage.getItem("userData");
        const users = JSON.parse(str);
        const user = users.find((u) => u.id == id);
        return user;
    };
    
    /**
     * Inserts a new user into the localStorage.
     * @param {Object} newUser - The new user object to insert.
     * @param {number} newUser.id - The ID of the new user (will be assigned automatically).
     * @param {string} newUser.firstName - The first name of the new user.
     * @param {string} newUser.lastName - The last name of the new user.
     * @param {string} newUser.email - The email of the new user.
     */
    insertUser(newUser){
        // We really should validate newUser before inserting it!
        // Set the new user's id:
        newUser.id = this.#getMaxId() + 1;
        const str = localStorage.getItem("userData");
        const users = JSON.parse(str);
        users.push(newUser);
        localStorage.setItem("userData", JSON.stringify(users));
    };

    /**
     * Updates an existing user's data in the localStorage.
     * @param {Object} updatedUser - The user object with updated data.
     * @param {number} updatedUser.id - The ID of the user to update.
     * @param {string} updatedUser.firstName - The updated first name of the user.
     * @param {string} updatedUser.lastName - The updated last name of the user.
     * @param {string} updatedUser.email - The updated email of the user.
     */
    updateUser(updatedUser){
        // again, we should validate updatedUser before putting it in the database
        const str = localStorage.getItem("userData");
        const users = JSON.parse(str);
        const indexOfUserToUpdate = users.findIndex(u => updatedUser.id == u.id);
        users[indexOfUserToUpdate] = updatedUser;
        localStorage.setItem("userData", JSON.stringify(users));
    };

    /**
     * Deletes a user from the localStorage.
     * @param {number} id - The ID of the user to delete.
     */
    deleteUser(id){
        const str = localStorage.getItem("userData");
        const users = JSON.parse(str);
        const indexOfUserToRemove = users.findIndex(u => id == u.id);
        users.splice(indexOfUserToRemove, 1);
        localStorage.setItem("userData", JSON.stringify(users));
    };

	//////////////////////////////////
	// PRIVATE METHODS (start with #)
	//////////////////////////////////
    
    /**
     * Retrieves the maximum user ID from the localStorage.
     * @private
     * @returns {number} The maximum user ID found in the localStorage.
     */
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
    };

}

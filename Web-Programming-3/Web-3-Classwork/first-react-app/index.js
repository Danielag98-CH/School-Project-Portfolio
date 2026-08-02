// 1. instantiate our data access component
const uda = new UserDataAccess();

// 2. import the React functions that we'll use
const {useState, useEffect} = React

// 3. define the 'root' component **every React app needs a root component**
function RootComponent(){

    console.log("rendering root component......");

    // 4. declare the state for this component
    const [users, setUsers] = useState([]); // note that we pass an empty array into useState
    
    const [selectedUserId, setSelectedUserId] = useState(-1);

    // setUsers((users) => [...users, {firstName:"John", lastName:"Doe"}])

    useEffect(() => {
        setUsers(uda.getAllUsers());
    }, []) /* use effect uses a function(parameter 1) and an empty array (parameter) */

    const handleAddUser = (evt) => {
        setSelectedUserId(0);
    }

    // const handleAddUser = (evt) => {
    //     setUsers([...users, {firstName:"John", lastName:"Doe"}])
    // }old code**
    // const handleAddUser = (evt) => {
    //     console.log("button clicked!");
    //     console.log(evt);
    // } note to self

    // const handleUserSelected = (userId) => {
    //     console.log("ID of user selected:", userId);
    // }old code

    const handleUserSelected = (userId) => {
        setSelectedUserId(userId)
    }

    const handleUserSaved = (updatedUser) => {

        if(updatedUser.id > 0){
            uda.updateUser(updatedUser);
            setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u))
        }else{
            uda.insertUser(updatedUser);
            setUsers([...users, updatedUser])
        }
    
        // hide the user form
        setSelectedUserId(-1);
    
    }

    const handleUserDeleted = (id) => {
        // delete the user from the database
        uda.deleteUser(id);
        // update the 'users' state
        setUsers(users.filter(user => user.id !== id));
        // hide the user form
        setSelectedUserId(-1);
    }

    // 5. return JSX **react components return JSX = mix of HTML and JavaScript**
    return (
        <div>
            <h1>User Manager</h1>
            <button onClick={handleAddUser}>Add User</button>
            <p>Number of users: {users.length}</p>
            <UserList users={users} onUserSelected={handleUserSelected} />
            {selectedUserId > -1 && <UserForm key={selectedUserId} userId={selectedUserId} onUserSaved={handleUserSaved} onUserDeleted={handleUserDeleted} />}
            {/* {JSON.stringify(users)} old code*/}
        </div>
    );

}

// The UserList component
function UserList({users, onUserSelected}){

    return (
        <div className="user-list">
            <h2>User List</h2>
            <ul>
                {users.map(u => (
                    <li key={u.id} onClick={()=>{onUserSelected(u.id)}}>{u.firstName + ' ' + u.lastName}</li>
                ))}
            </ul>
        </div>
    );

}

// The UserForm component
function UserForm({userId, onUserSaved, onUserDeleted}){

    console.log("rendering UserForm component...");

    useEffect(() => {
        if(userId > 0){
            const user = uda.getUserById(userId);
            //console.log("User to display:", user)
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
        }
    }, [userId]); // by adding userId to the array, it will trigger the callback whenever the userId prop changes

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
    
        // TODO: we should validate the user input, but we'll skip it
        // for now to keep things simple
    
        // create an 'updated' user object based on the state variables
        const updatedUser = {id: userId, firstName, lastName, email};
        //console.log("TODO: save the updated user: ", updatedUser);
        onUserSaved(updatedUser);
    }

    return (
        <div className="user-form-container">
            <h2>User Details</h2>
            <p>User ID: {userId}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input name="firstName" value={firstName} onChange={ evt => setFirstName(evt.target.value) } />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input name="lastName" value={lastName} onChange={ evt => setLastName(evt.target.value) }/>
                </div>
                <div>
                    <label>Email:</label>
                    <input name="email" value={email} onChange={ evt => setEmail(evt.target.value) } />
                </div>
                <div>
                    <input type="submit" id="btnSubmit" name="submit button" />
                    {userId > 0 && <input type="button" value="Delete" onClick={() => {onUserDeleted(userId)}} />}
                </div>
            </form>
            {JSON.stringify({firstName, lastName, email})}
        </div>
    )
}

// 6. initialze a React application
const app = ReactDOM.createRoot(document.querySelector("#app"))

// 7. display/render the root component
app.render(<RootComponent />);
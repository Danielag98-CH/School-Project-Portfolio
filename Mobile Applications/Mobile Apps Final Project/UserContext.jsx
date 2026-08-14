// import { createContext, useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
 
 
// export const UserContext = createContext(null);
 
 
// export const UserProvider = ({ children }) => {
 
 
//     const [currentUser, setCurrentUser] = useState(async () => {
//         const user = await AsyncStorage.getItem("currentUser");
//         return user ? JSON.parse(user) : null;
//     });
 
 
//     // On currentUser state change, update the AsyncStorage accordingly
//     useEffect(() => {
//         if(currentUser){
//             AsyncStorage.setItem("currentUser", JSON.stringify(currentUser))
//         }else{
//             AsyncStorage.removeItem('currentUser');
//         }
//     }, [currentUser]);
 
 
//     return (
//         <UserContext.Provider value={{ currentUser, setCurrentUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// } changed this to allow for isLoaded and useEffect

// import { createContext, useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isUserLoaded, setIsUserLoaded] = useState(false);

//   // Load once on app start
//   useEffect(() => {
//     (async () => {
//       try {
//         const stored = await AsyncStorage.getItem('currentUser');
//         setCurrentUser(stored ? JSON.parse(stored) : null);
//       } catch (err) {
//         console.log('Failed to load currentUser:', err);
//         setCurrentUser(null);
//       } finally {
//         setIsUserLoaded(true);
//       }
//     })();
//   }, []);

//   // Persist on changes (only after initial load finishes)
//   useEffect(() => {
//     if (!isUserLoaded) return;

//     (async () => {
//       try {
//         if (currentUser) {
//           await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
//         } else {
//           await AsyncStorage.removeItem('currentUser');
//         }
//       } catch (err) {
//         console.log('Failed to save currentUser:', err);
//       }
//     })();
//   }, [currentUser, isUserLoaded]);

//   return (
//     <UserContext.Provider value={{ currentUser, setCurrentUser, isUserLoaded }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
// idea for header after user login in and explore site headerRight: () => (
//   <Text style={{ marginRight: 12 }}>
//     {user ? `Hi, ${user.firstName}` : ""}
//   </Text>
// )
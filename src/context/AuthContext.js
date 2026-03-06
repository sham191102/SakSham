// // import { createContext, useState, useEffect } from "react"

// // export const AuthContext = createContext()

// // export const AuthProvider = ({ children }) => {

// //   const [user, setUser] = useState(null)

// //   useEffect(() => {
// //     const storedUser = JSON.parse(localStorage.getItem("user"))
// //     if (storedUser) setUser(storedUser)
// //   }, [])

// //   // const signup = (userData) => {
// //   //   localStorage.setItem("user", JSON.stringify(userData))   // 🔥 important
// //   //   setUser(userData)
// //   // }

// //   // const login = (data) => {
// //   //   localStorage.setItem("user", JSON.stringify(data))
// //   //   setUser(data)
// //   // }

// //   // const logout = () => {
// //   //   localStorage.removeItem("user")
// //   //   setUser(null)
// //   // }
// // const signup = (userData) => {
// //   localStorage.setItem("registeredUser", JSON.stringify(userData))
// //   setUser(userData)
// // }

// // const login = (data) => {
// //   const registeredUser = JSON.parse(localStorage.getItem("registeredUser"))

// //   if (
// //     registeredUser &&
// //     registeredUser.email === data.email &&
// //     registeredUser.password === data.password
// //   ) {
// //     localStorage.setItem("user", JSON.stringify(registeredUser))
// //     setUser(registeredUser)
// //   } else {
// //     alert("Invalid Credentials")
// //   }
// // }
// //   return (
// //     <AuthContext.Provider value={{ user, login, signup, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   )
// // }

// import { createContext, useState, useEffect } from "react"

// export const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {

//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"))
//     if (storedUser) {
//       setUser(storedUser)
//     }
//   }, [])

//   // LOGIN FUNCTION
//   const login = (email, password) => {
//     const fakeUser = { email }
//     setUser(fakeUser)
//     localStorage.setItem("user", JSON.stringify(fakeUser))
//   }

//   // ✅ LOGOUT FUNCTION (THIS WAS MISSING)
//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem("user")
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }


// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
  
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const login = (email, password) => {
//     const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

//     if (
//       storedUser &&
//       storedUser.email === email &&
//       storedUser.password === password
//     ) {
//       localStorage.setItem("user", JSON.stringify(storedUser));
//       setUser(storedUser);
//       return true;
//     }

//     return false;
//   };


//   const signup = (name, email, password) => {
//     const newUser = { name, email, password };
//     localStorage.setItem("registeredUser", JSON.stringify(newUser));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // Check user in localStorage on page load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // LOGIN FUNCTION
  const login = (email, password) => {

    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setUser(storedUser);
      localStorage.setItem("user", JSON.stringify(storedUser));
      return true;
    }

    return false;
  };

  // SIGNUP FUNCTION
  const signup = (name, email, password) => {

    const newUser = {
      name,
      email,
      password
    };

    localStorage.setItem("registeredUser", JSON.stringify(newUser));
  };

  // LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
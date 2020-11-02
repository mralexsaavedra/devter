import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAfLB2G7-vz6l27-0MnIERBjMJi6mUb9Kw",
  authDomain: "devter-4828f.firebaseapp.com",
  databaseURL: "https://devter-4828f.firebaseio.com",
  projectId: "devter-4828f",
  storageBucket: "devter-4828f.appspot.com",
  messagingSenderId: "921324974156",
  appId: "1:921324974156:web:fc7912d6e3c8b8e9e5c4e9",
  measurementId: "G-38CRC77GKP"
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase
    .auth()
    .onAuthStateChanged(user => {
      const normalizedUser = mapUserFromFirebaseAuthToUser(user)
      onChange(normalizedUser)
    })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
}

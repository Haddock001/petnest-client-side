import { useEffect, useState } from 'react'
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth'
import { AuthContext } from './AuthContext'
import { auth } from '../firebase/firebase.init.js'
import axiosSecure from '../api/axiosSecure'

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [dbUser, setDbUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [roleLoading, setRoleLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()

    const createJwtSession = async (user) => {
        if (!user?.email) return null

        const res = await axiosSecure.post('/jwt', {
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
        })

        setDbUser(res.data.user)
        return res.data.user
    }

    const createUser = async (email, password) => {
        setLoading(true)
        const result = await createUserWithEmailAndPassword(auth, email, password)
        await createJwtSession(result.user)

        return result
    }

    const loginUser = async (email, password) => {
        setLoading(true)
        const result = await signInWithEmailAndPassword(auth, email, password)
        await createJwtSession(result.user)

        return result
    }

    const loginWithGoogle = async () => {
        setLoading(true)
        const result = await signInWithPopup(auth, googleProvider)
        await createJwtSession(result.user)

        return result
    }

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile).then(() => {
            setCurrentUser({ ...auth.currentUser })
            return createJwtSession(auth.currentUser)
        })
    }

    const logoutUser = async () => {
        setLoading(true)
        await axiosSecure.post('/logout')
        setDbUser(null)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setRoleLoading(true)
            try {
                if (user) {
                    await createJwtSession(user)
                } else {
                    setDbUser(null)
                }

                setCurrentUser(user)
            } finally {
                setLoading(false)
                setRoleLoading(false)
            }
        })

        return () => unsubscribe()
    }, [])

    const authInfo = {
        currentUser,
        dbUser,
        role: dbUser?.role || 'user',
        isAdmin: dbUser?.role === 'admin',
        loading,
        roleLoading,
        createUser,
        loginUser,
        loginWithGoogle,
        logoutUser,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

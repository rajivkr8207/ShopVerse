import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../app/app.store'
import { Navigate } from 'react-router-dom'

const Protected = ({ children, role = 'buyer' }: { children: React.ReactNode, role?: string }) => {
    const user = useSelector((state: RootState) => state.auth.user)
    const loading = useSelector((state: RootState) => state.auth.loading)

    if (loading) {
        return <div>Loading...</div>
    }
    if (!user) {
        return <Navigate to="/login" />
    }
    if (role && user.role !== role) {
        return <Navigate to="/" />
    }
    return children
}

export default Protected
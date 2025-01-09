import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isLogin} = useAuthStore()
	if (!isLogin) {
		return <Navigate to='/login' replace />;
	}
	return children;
};

export const RedirectAuthenticatedUser = ({ children }: { children: ReactNode }) => {
	const { isLogin, user } = useAuthStore();
	if (isLogin && user?.success) {
		return <Navigate to='/dashboard' replace />;
	}

	return children;
};
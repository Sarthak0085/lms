import { ErrorCard } from "@/components/auth/error-card";

const AuthErrorPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-slate-800 bg-white">
            <ErrorCard />
        </div>
    )
}

export default AuthErrorPage;
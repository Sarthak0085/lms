import { PageContainer } from "@/components/admin/layout/page-container"
import { LoginForm } from "@/components/auth/login-form"

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-slate-800 bg-white">
            <LoginForm />
        </div>
    )
}

export default LoginPage;
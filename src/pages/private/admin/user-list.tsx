
import { Navigate } from 'react-router';
import { impersonateUser } from '@/app/auth';
import { AdminUserList } from '@/app/admin/components/user-list';
import { toast } from 'sonner';
import { useSession } from '@/config/auth';

export default function AdminUserListPage() {
    const { data: session, isPending: isLoading } = useSession();
    if (isLoading) return null;
    if (!session?.user?.isAdmin || session?.user?.role!=='admin') {
        return <Navigate to="/not-found" replace />;
    }

    const handleImpersonate = async (userId: string) => {
        try {
            await impersonateUser?.({ userId });
            window.location.reload();
        } catch {
            console.error('Failed to impersonate user:', userId);
            toast('Failed to impersonate user. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-meko-blue-dark flex flex-col items-center py-8 px-4">
            <AdminUserList onImpersonate={handleImpersonate} />
        </div>
    );
}
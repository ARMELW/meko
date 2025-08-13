

import { Navigate } from 'react-router';
import { impersonateUser } from '@/app/auth';
import { AdminUserList } from '@/app/admin/components/user-list';
import { toast } from 'sonner';
import { useSession } from '@/config/auth';
import { useTranslation } from 'react-i18next';


export default function AdminUserListPage() {
    const { t } = useTranslation();
    const { data: session, isPending: isLoading } = useSession();
    if (isLoading) return null;
    if (!session?.user?.isAdmin || session?.user?.role !== 'admin') {
        return <Navigate to="/not-found" replace />;
    }

    const handleImpersonate = async (userId: string) => {
        try {
            await impersonateUser?.({ userId });
            window.location.reload();
        } catch {
            console.error(t('admin.impersonate.errorLog', 'Failed to impersonate user:'), userId);
            toast(t('admin.impersonate.errorToast', 'Failed to impersonate user. Please try again later.'));
        }
    };

    return (
        <div className="min-h-screen bg-meko-blue-dark flex flex-col items-center py-8 px-4">
            <AdminUserList onImpersonate={handleImpersonate} />
        </div>
    );
}
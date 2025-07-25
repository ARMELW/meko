
import SubscriptionPlanDemo from '@/components/molecules/view/subscription-plan';
import { useSession } from '@/config/auth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export default function ChangeSubscriptionPage() {
    const { data: session, isPending } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isPending && !session) {
            navigate('/login');
        }
    }, [session, isPending, navigate]);

    return (
        <div className="min-h-screen bg-meko-blue-dark flex flex-col items-center justify-start py-8 px-4">
            <div className="w-full max-w-5xl">
                <SubscriptionPlanDemo useChange />
            </div>
        </div>
    );
}

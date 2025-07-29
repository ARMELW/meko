import { useTranslation } from 'react-i18next';
import { useChildLimit } from '../hooks/use-child-limit';
import { Typography, Button, Card } from '@/components';
import { useNavigate } from 'react-router';

interface ChildLimitGuardProps {
    children: React.ReactNode;
}

export function ChildLimitGuard({ children }: ChildLimitGuardProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { hasReachedLimit, maxChildren } = useChildLimit();

    if (hasReachedLimit) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-md p-6 text-center">
                    <Typography 
                        className="mb-4 text-meko-blue-light-1"
                    >
                        {t('subscription.childLimit.reached')}
                    </Typography>
                    
                    <Typography className="mb-6 text-gray-400">
                        {t('subscription.childLimit.message', { limit: maxChildren })}
                    </Typography>

                    <Button
                        color="secondary"
                        onClick={() => navigate('/subscription/upgrade')}
                    >
                        {t('subscription.childLimit.upgrade')}
                    </Button>
                </Card>
            </div>
        );
    }

    return <>{children}</>;
}
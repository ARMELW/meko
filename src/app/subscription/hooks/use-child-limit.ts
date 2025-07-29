import { useChildren } from '@/app/children/hooks/use-children';
import { useCurrentSubscription } from './use-current-subscription';

export const useChildLimit = () => {
    const { data: subscription } = useCurrentSubscription();
    const { data: children } = useChildren();

    const maxChildren = subscription?.maxChildren ?? 1;
    const currentChildCount = children?.data.length ?? 0;
    const hasReachedLimit = currentChildCount >= maxChildren;

    return {
        maxChildren,
        currentChildCount,
        hasReachedLimit,
        remainingSlots: Math.max(0, maxChildren - currentChildCount)
    };
};
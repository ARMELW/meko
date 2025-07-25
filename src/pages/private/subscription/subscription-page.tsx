import SubscriptionPlanDemo from '@/components/molecules/view/subscription-plan';

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-meko-blue-dark flex flex-col items-center justify-start py-8 px-2">
      <div className="w-full max-w-5xl">
        <SubscriptionPlanDemo />
      </div>
    </div>
  );
}

import { Outlet, RouteObject } from "react-router";

import { LandingPage } from "@/pages/public/landing/landing-page";
import { CreateParentAccountPage } from "@/pages/public/auth/create-parent-account-page";
import { LoginPage } from "@/pages/public/auth/login-page";
import { ForgotPasswordPage } from "@/pages/public/auth/forgot-password-page";
import { CreateNewPasswordPage } from "@/pages/public/auth/create-new-password-page";

import { ChooseProfilePage } from "@/pages/private/onboarding/choose-profile-page";
import { CreateChildAccountPage } from "@/pages/private/onboarding/create-child-account-page";
import { WelcomePage } from "@/pages/private/onboarding/welcome-page";
import { ChooseAvatarPage } from "@/pages/private/onboarding/choose-avatar-page";

import { HomePage } from "@/pages/private/learning/home-page";
import { ModuleDetailPage } from "@/pages/private/learning/module-detail-page";
import { LessonPage } from "@/pages/private/learning/lesson-page";

import { ChildMonitoringPage } from "@/pages/private/monitoring/child-monitoring-page";
import { ResultSearchPage } from "@/pages/private/monitoring/result-search-page";

import { SettingPage } from "@/pages/private/settings/setting-page";

import { ChooseSubscriptionPage } from "@/pages/private/subscription/choose-subscription-page";
import { SubscriptionSettingPage } from "@/pages/private/subscription/subscription-setting-page";
import { PaymentPage } from "@/pages/private/subscription/payment-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { ProtectedLayout } from "./components/protected-layout";
import { UiPage } from "@/pages/ui-page";
import { VerifyOtpPage } from "@/pages/public/auth/verify-otp-page";
import { Header } from "@/components/molecules/layout/header";
import Footer from '@/components/molecules/layout/footer';

const privateRoutes: RouteObject[] = [
	{
		path: "/profile",
		children: [
			{
				path: "choose",
				element: <ChooseProfilePage />,
			},
			{
				path: "create-child",
				element: <CreateChildAccountPage />,
			},
			{
				path: "welcome",
				element: <WelcomePage />,
			},
			{
				path: "avatar",
				element: <ChooseAvatarPage />,
			},
		],
	},
	{
		path: "/home",
		element: <HomePage />,
	},
	{
		path: "/modules",
		children: [
			{
				path: ":moduleId",
				element: <ModuleDetailPage />,
			},
		],
	},
	{
		path: "/lessons",
		children: [
			{
				path: ":lessonId",
				element: <LessonPage />,
			},
		],
	},
	{
		path: "/monitoring",
		children: [
			{
				index: true,
				element: <ChildMonitoringPage />,
			},
			{
				path: "search",
				element: <ResultSearchPage />,
			},
		],
	},
	{
		path: "/settings",
		element: <SettingPage />,
	},
	{
		path: "/subscription",
		children: [
			{
				path: "choose",
				element: <ChooseSubscriptionPage />,
			},
			{
				path: "settings",
				element: <SubscriptionSettingPage />,
			},
			{
				path: "payment",
				element: <PaymentPage />,
			},
		],
	},


];

const routes: RouteObject[] = [
	{
		element: (
			<>
				<div className="px-4 lg:px-32 xl:px-32 max-w-screen-2xl">
					<Header />
					<div className="z-10 relative w-full h-full overflow-auto">
						<Outlet />
					</div>
				</div>
				<Footer />
			</>
		),
		children: [
			{
				path: "/ui",
				element: <UiPage />,
			},
			{
				path: "/",
				children: [
					{
						index: true,
						element: <LandingPage />,
					},
					{
						path: "register",
						element: <CreateParentAccountPage />,
					},
					{
						path: "login",
						element: <LoginPage />,
					},
					{
						path: 'verify-otp',
						element: <VerifyOtpPage />
					},
					{
						path: "forgot-password",
						element: <ForgotPasswordPage />,
					},
					{
						path: "reset-password",
						element: <CreateNewPasswordPage />,
					},
				],
			},
			{
				element: <ProtectedLayout />,
				loader: async () => {
					console.log("call loader");
					await new Promise((resolve) => setTimeout(resolve, 3000));
				},
				children: privateRoutes,
			},
			// Optional: Catch-all route for unmatched top-level paths
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];

export default routes;

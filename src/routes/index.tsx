import { RouteObject } from "react-router";
import PublicLayout from './public-layout';
import PrivateLayout from './private-layout';

import { LandingPage } from "@/pages/public/landing/landing-page";
import { LoginPage } from "@/pages/public/auth/login-page";
import { ForgotPasswordPage } from "@/pages/public/auth/forgot-password-page";
import { CreateNewPasswordPage } from "@/pages/public/auth/create-new-password-page";

import { ChooseProfilePage } from "@/pages/private/onboarding/choose-profile-page";
import { CreateChildAccountPage } from "@/pages/private/onboarding/create-child-account-page";
import { WelcomePage } from "@/pages/private/onboarding/welcome-page";
import { ChooseAvatarPage } from "@/pages/private/onboarding/choose-avatar-page";

import { HomePage } from "@/pages/private/learning/home-page";
import { ModuleDetailPage } from "@/pages/private/learning/module-detail-page";

import { ChildMonitoringPage } from "@/pages/private/monitoring/child-monitoring-page";
import { AddChildPage } from "@/pages/private/monitoring/add-child-page";
import { ChildSettingsPage } from "@/pages/private/monitoring/child-settings-page";
import { SubscriptionManagementPage } from "@/pages/private/monitoring/subscription-management-page";
import { ChildStatisticsPage } from "@/pages/private/monitoring/child-statistics-page";
import { ChildDashboardPage } from "@/pages/private/child/child-dashboard-page";

import { SettingPage } from "@/pages/private/settings/setting-page";
import { ChangeAvatarPage } from "@/pages/private/settings/change-avatar-page";

import { ChooseSubscriptionPage } from "@/pages/private/subscription/choose-subscription-page";
import PaymentSuccessPage from '@/pages/private/subscription/payment-success';
import PaymentCancelPage from '@/pages/private/subscription/payment-cancel';
import ChangeSubscriptionPage from '@/pages/private/subscription/change-subscription';
import { NotFoundPage } from "@/pages/public/auth/not-found-page";
import { ProtectedLayout } from "./components/protected-layout";
import { UiPage } from "@/pages/ui-page";
import GameSearchPage from '@/pages/private/learning/game-search-page';
import SubscriptionPage from "@/pages/private/subscription/subscription-page";
import { CreateParentAccountPage } from "@/pages/public/auth/create-parent-account-page";

import AdminUserListPage from '@/pages/private/admin/user-list';
import GamePlay from "@/app/game-sessions/components/unity/game-play";

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
			}
		],
	},
	{
		path: "/child/statistic",
		element: <ChildStatisticsPage />,
	},
	{
		path: "/profile/change-avatar",
		element: <ChangeAvatarPage />,
	},
	{
		path: "/home",
		element: <HomePage />,
	},
	{
		path: "/learning",
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "modules/:moduleId",
				element: <ModuleDetailPage />,
			},
		],
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
		path: "/monitoring",
		children: [
			{
				index: true,
				element: <ChildMonitoringPage />,
			},
			{
				path: "child",
				children: [
					{
						path: "subscriptions",
						element: <SubscriptionManagementPage />,
					},
					{
						path: "add",
						element: <AddChildPage />,
					},
					{
						path: "settings",
						element: <ChildSettingsPage />,
					}
				],
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
				path: "payment-success",
				element: <PaymentSuccessPage />,
			},
			{
				path: "payment-cancel",
				element: <PaymentCancelPage />,
			},
			{
				path: "change",
				element: <ChangeSubscriptionPage />,
			},
		],
	},
	{
		path: "/games/search",
		element: <GameSearchPage />,
	},
	{
		path: "/child/dashboard",
		element: <ChildDashboardPage />,
	},
	{
		path: "/admin/user-list",
		element: <AdminUserListPage />,
	}


];

const publicRoutes: RouteObject[] = [
	{
		path: '/ui',
		element: <UiPage />,
	},
	{
		path: '/',
		children: [
			{
				index: true,
				element: <LandingPage />,
			},
			{
				path: 'register',
				element: <CreateParentAccountPage />,
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'forgot-password',
				element: <ForgotPasswordPage />,
			},
			{
				path: 'reset-password',
				element: <CreateNewPasswordPage />,
			},

			{
				path: '/subscription',
				element: <SubscriptionPage />,
			}
		],
	},
];

const routes: RouteObject[] = [
	{
		element: <PublicLayout />,
		children: [
			...publicRoutes,
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		element: <ProtectedLayout />,
		children: [
			{
				element: <PrivateLayout />,
				children: privateRoutes,
			},
		],
	},
];

export default routes;

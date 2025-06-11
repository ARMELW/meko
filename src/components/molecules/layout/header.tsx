import { Button } from '@/components/atoms/actions/button';
import { MenuOption } from '@/components/atoms/actions/menu-option';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authClient, useSession } from '@/config/auth';
import { useSession as useChildrenSession } from '@/services/session/store';
import { Typography } from '@/components/atoms/typography/typography';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import UserAvatar from '@/components/atoms/view/user-avatar';
import { Input } from '@/components/atoms/forms/input';
import { NavItem } from '@/components/atoms/actions/nav-item';
import { LastActivityIcon } from '@/components/atoms/icons/last-activity-icon';
import { StatisticIcon } from '@/components/atoms/icons/statistic-icon';

export function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: session } = useSession();
    const sessionChild = useChildrenSession(state => state.selectedChild);
    const logout = useChildrenSession(state => state.logout);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const isAuthenticated = !!session;

    const displayName = sessionChild ? sessionChild.firstname + " " + sessionChild.lastname : session?.user?.name || 'User';
    const displayImage = sessionChild ? sessionChild.avatarUrl : session?.user?.image;

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            if (sessionChild) {
                logout();
                navigate('/profile/choose');
            } else {
                await authClient.signOut();
                navigate('/');
            }

        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const renderAuthOptions = () => {
        if (isAuthenticated) {
            return (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="flex flex-row items-center gap-3 focus:outline-none cursor-pointer">
                            <Typography
                                as="h3"
                                styleCase="uppercase"
                                weight="bold"
                                variant="small"
                                color={"default"}
                            >
                                {displayName}
                            </Typography>
                            <UserAvatar avatarUrl={displayImage || ''} className="border border-white rounded-full w-12 h-12" size={50} username={displayName} alt={'Avatar'} />

                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            className="z-50 bg-meko-blue-darker shadow-lg rounded-md min-w-[200px]"
                            sideOffset={5}
                            align="end"
                        >
                            {/* Menu pour les parents */}
                            {!sessionChild && (
                                <>
                                    <DropdownMenu.Item
                                        className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1  px-4 py-2  text-xs cursor-pointer"
                                        onSelect={() => navigate('/monitoring')}
                                    >
                                        {t('common.dashboard')}
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item
                                        className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1 px-4 py-2   text-xs cursor-pointer"
                                        onSelect={() => navigate('/profile/choose')}
                                    >
                                        {t('common.changeProfile')}
                                    </DropdownMenu.Item>
                                </>
                            )}

                            {/* Menu pour les enfants */}
                            {sessionChild && (
                                <>
                                    <DropdownMenu.Item
                                        className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1 px-4 py-2   text-xs cursor-pointer"
                                        onSelect={() => navigate('/home')}
                                    >
                                        {t('common.home')}
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item
                                        className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1 px-4 py-2   text-xs cursor-pointer"
                                        onSelect={() => navigate('/profile/choose')}
                                    >
                                        {t('common.changeProfile')}
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item
                                        className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1 px-4 py-2 rounded  text-xs cursor-pointer"
                                        onSelect={() => navigate('/profile/avatar')}
                                    >
                                        {t('common.changeAvatar')}
                                    </DropdownMenu.Item>
                                </>
                            )}

                            <DropdownMenu.Item
                                className="flex text-meko-blue-light-1 uppercase items-center  hover:bg-meko-blue-transparent-1 px-4 py-2 rounded  text-xs cursor-pointer disabled:cursor-not-allowed"
                                onSelect={handleLogout}
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? (
                                    <>
                                        {t('auth.loggingOut')}
                                    </>
                                ) : (
                                    <>
                                        {t('auth.logout')}
                                    </>
                                )}
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            );
        }

        return (
            <>
                <MenuOption
                    onClick={() => navigate('/login')}
                    label={t('auth.login')}
                />
                <Button
                    onClick={() => navigate('/register')}
                    variant={'primary'}
                    size={'small'}
                >
                    {t('common.trial')}
                </Button>
            </>
        );
    };

    const renderMobileAuthOptions = () => {
        if (isAuthenticated) {
            return (
                <div className="flex flex-col items-center gap-4">
                    <img
                        src={displayImage || "https://i.pravatar.cc/300"}
                        alt="Avatar"
                        className="border-2 border-white rounded-full w-20 h-20"
                    />
                    <Typography
                        as="h3"
                        weight="bold"
                        color={"default"}
                    >
                        {displayName}
                    </Typography>

                    <MenuOption
                        onClick={() => {
                            navigate('/profile/choose');
                            setMobileMenuOpen(false);
                        }}
                        label={t('common.dashboard')}
                    />

                    <div className="bg-gray-700 my-2 w-full h-px" />

                    <MenuOption
                        onClick={() => {
                            if (!isLoggingOut) {

                                handleLogout();

                                setMobileMenuOpen(false);
                            }
                        }}
                        label={
                            isLoggingOut ? t('auth.loggingOut') : t('auth.logout')
                        }
                    />
                </div>
            );
        }

        return (
            <>
                <MenuOption
                    onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                    }}
                    label={t('auth.login')}
                />
                <Button
                    variant={'primary'}
                    size={'small'}
                    className="w-full"
                    onClick={() => {
                        navigate('/register');
                        setMobileMenuOpen(false);
                    }}
                >
                    {t('common.trial')}
                </Button>
            </>
        );
    };
    const renderChildrenOptions = () => {
        if (!sessionChild) return null;
        return (
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className="flex items-center gap-2 ml-4 focus:outline-none cursor-pointer">
                        <img src='/assets/images/icons/menu.png' alt="Enfants" className="w-6 h-6" />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className="z-50 bg-meko-blue-darker shadow-lg rounded-md min-w-[200px]"
                        sideOffset={5}
                        align="end"
                    >
                        {/* Header/Title for the dropdown */}
                        <div className="bg-meko-blue-transparent-2 py-3 px-4 border-b border-meko-blue-transparent-1">
                            <Typography variant="small" weight="bold" styleCase="uppercase" color="default">
                                {t('menu.childOptions.title')}
                            </Typography>
                        </div>
                        
                        <DropdownMenu.Item
                            className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1 px-4 py-2 text-xs cursor-pointer"
                            onSelect={() => navigate('/monitoring/child')}
                        >
                            {t('menu.childOptions.subscriptions')}
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1 px-4 py-2 text-xs cursor-pointer"
                            onSelect={() => navigate('/monitoring/child')}
                        >
                            {t('menu.childOptions.addChild')}
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1 px-4 py-2 text-xs cursor-pointer"
                            onSelect={() => navigate('/monitoring/child/settings')}
                        >
                            {t('menu.childOptions.settings')}
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );
    }
    return (
        <div className="z-50 w-full">
            <div className="hidden md:flex flex-row justify-between items-center px-4 lg:px-6 py-2">
                <div className="flex items-center gap-3">
                    <Link to={sessionChild ? "/home" : "/"} className="flex items-center">
                        <img
                            src={sessionChild ? '/favicon.png' : '/small-logo.svg'}
                            alt="Logo"
                            className={sessionChild ? "w-12 h-auto" : "w-auto"}
                        />
                    </Link>
                    {sessionChild && (
                        <div className="flex flex-row">
                            {renderChildrenOptions()}
                            <Input
                                type="text"
                                size='small'
                                name="search"
                                placeholder={t('common.search')}
                                className="ml-4 w-64 bg-meko-blue-transparent-2 text-white focus:border-meko-blue-light-1 focus:border-2 outline-none rounded-lg px-3 py-1"
                                onChange={(e) => {
                                    // Handle search input change
                                    console.log(e.target.value);
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className='flex flex-row items-center gap-8 cursor-pointer'>
                    {sessionChild && (
                        <div className="flex flex-row gap-10 items-center">
                            <NavItem label="Dernière activité" icon={<LastActivityIcon />} />
                            <NavItem label="Statistiques" icon={<StatisticIcon />} />
                        </div>
                    )}
                    {renderAuthOptions()}
                </div>
            </div>

            <div className="md:hidden flex flex-row justify-between items-center px-4 py-3">
                <Link to={sessionChild ? "/home" : "/"} className="flex items-center">
                    <img
                        src={sessionChild ? '/favicon.png' : '/small-logo.svg'}
                        alt="Logo"
                        className="w-auto h-7"
                    />
                </Link>
                <button
                    onClick={toggleMobileMenu}
                    className="focus:outline-none text-white"
                    aria-label="Menu principal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden top-14 right-0 left-0 z-50 absolute flex flex-col gap-4 shadow-lg px-4 py-5 border-white border-t meko-bg">
                    {renderMobileAuthOptions()}
                </div>
            )}
        </div>
    );
}
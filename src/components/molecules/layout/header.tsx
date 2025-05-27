import { Button } from '@/components/atoms/actions/button';
import { MenuOption } from '@/components/atoms/actions/menu-option';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authClient, useSession } from '@/config/auth';
import { useSession as useChildrenSession } from '@/services/session/store';
import { Typography } from '@/components/atoms/typography/typography';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: session } = useSession();
    const selectedChild = useChildrenSession(state => state.selectedChild);
    const logout = useChildrenSession(state => state.logout);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const isAuthenticated = !!session;

    const displayName = selectedChild ? selectedChild.firstname : session?.user?.name || 'User';
    const displayImage = selectedChild ? selectedChild.avatarUrl : session?.user?.image;

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            if (selectedChild) {
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
                            <img
                                src={displayImage || "https://i.pravatar.cc/300"}
                                alt="Avatar"
                                className="border border-white rounded-full w-12 h-12"
                            />
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            className="z-50 bg-meko-blue-darker shadow-lg rounded-md min-w-[200px]"
                            sideOffset={5}
                            align="end"
                        >
                            {!selectedChild && (
                                <>
                                    <DropdownMenu.Item
                                        className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1  px-4 py-2  text-xs cursor-pointer"
                                        onSelect={() => navigate('/children/home')}
                                    >
                                        {t('common.dashboard')}
                                    </DropdownMenu.Item>
                                </>
                            )}
                            {selectedChild && (
                                <>
                                    <DropdownMenu.Item
                                        className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1 px-4 py-2   text-xs cursor-pointer"
                                        onSelect={() => navigate('/profile/choose')}
                                    >
                                        Changer de profile
                                    </DropdownMenu.Item>

                                      <DropdownMenu.Item
                                        className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1 px-4 py-2 rounded  text-xs cursor-pointer"
                                        onSelect={() => navigate('/profile/choose')}
                                    >
                                        Changer d'avatar
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

    return (
        <div className="z-50 w-full">
            <div className="hidden md:flex flex-row justify-between items-center px-4 lg:px-6 py-3">
                <Link to={"/"} className="flex items-center">
                    <img src='/small-logo.svg' alt="Logo" className="w-auto" />
                </Link>
                <div className='flex flex-row items-center gap-3 cursor-pointer'>
                    {renderAuthOptions()}
                </div>
            </div>

            <div className="md:hidden flex flex-row justify-between items-center px-4 py-3">
                <Link to={"/"} className="flex items-center">
                    <img src='/small-logo.svg' alt="Logo" className="w-auto h-7" />
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
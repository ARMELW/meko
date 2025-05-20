import { Button } from '@/components/atoms/actions/button';
import { MenuOption } from '@/components/atoms/actions/menu-option';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authClient, useSession } from '@/config/auth';
import { Typography } from '@/components/atoms/typography/typography';

export function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const isAuthenticated = !!session;

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await authClient.signOut();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const renderAuthOptions = () => {
        if (isAuthenticated) {
            return (
                <>
                   <Link to={'/profile/choose'}>
                    <div className='flex flex-row items-center gap-3'>
                        
                        <Typography
                            as="h3"
                            styleCase="uppercase"
                            weight="bold"
                            variant="small"
                            color={"default"}
                        >
                            {session.user?.name || 'User'}
                        </Typography>
                        <p className='font-bold text-white'></p>
                        <img
                            src={session.user?.image || "https://i.pravatar.cc/300"}
                            alt="Avatar"
                            className="border border-3 border-white rounded-full w-12 h-12"
                        />

                    </div>
                    </Link>
                </>
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
                <>
                    <MenuOption
                        onClick={() => {
                            navigate('/dashboard');
                            setMobileMenuOpen(false);
                        }}
                        label={t('common.dashboard')}
                    />
                    <img
                        src="https://i.pravatar.cc/300"
                        alt="Avatar"
                        className="rounded-2xl w-20 h-20"
                    />
                    <MenuOption
                        onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                        }}
                        label={
                            isLoggingOut ? (
                                t('auth.loggingOut')
                            ) : (
                                t('auth.logout')
                            )
                        }
                    />
                </>
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
                <div className='flex flex-row items-center gap-3'>
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
                <div className="md:hidden top-14 right-0 left-0 z-50 absolute flex flex-col gap-4 shadow-lg px-4 py-3 border-white border-t meko-bg">
                    {renderMobileAuthOptions()}
                </div>
            )}
        </div>
    );
}
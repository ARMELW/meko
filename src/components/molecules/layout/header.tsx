import { Button } from '@/components/atoms/actions/button';
import { MenuOption } from '@/components/atoms/actions/menu-option';
import { Link, useNavigate, useLocation } from 'react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authClient, useSession } from '@/config/auth';
import { useSession as useChildrenSession } from '@/services/session/store';
import { Typography } from '@/components/atoms/typography/typography';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import UserAvatar from '@/components/atoms/view/user-avatar';
import { NavItem } from '@/components/atoms/actions/nav-item';
import { LastActivityIcon } from '@/components/atoms/icons/last-activity-icon';
import { StatisticIcon } from '@/components/atoms/icons/statistic-icon';
import { LastActivityModal, useLastActivity } from '@/app/game-sessions';
import { GameSimulationModal } from '@/app/game-sessions';
import { formatDisplayName } from '@/utils/text';
import { SearchInput } from '@/components/molecules/form/search-input';

export function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { data: session } = useSession();
    const sessionChild = useChildrenSession(state => state.selectedChild);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isLastActivityModalOpen, setIsLastActivityModalOpen] = useState(false);
    const [gameModalState, setGameModalState] = useState<{
        isOpen: boolean;
        gameId: string;
        gameTitle: string;
    }>({
        isOpen: false,
        gameId: '',
        gameTitle: ''
    });

    const isAuthenticated = !!session;
    const { data: lastActivityData } = useLastActivity(sessionChild?.id || '');


    // Parent trial info (when no child selected)
    const parentTrial = isAuthenticated ? {
        isTrialActive: session?.user?.isTrialActive,
        trialStartDate: session?.user?.trialStartDate,
        trialEndDate: session?.user?.trialEndDate
    } : null;

    

    // Days left in trial
    const getDaysLeft = (start?: string, end?: string) => {
        if (!start || !end) return null;
        const now = new Date();
        const endDate = new Date(end);
        const diff = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    };
    const daysLeft = parentTrial?.isTrialActive ? getDaysLeft(parentTrial.trialStartDate, parentTrial.trialEndDate) : null;

    // Trial progress (0-100)

    const handleCloseLastActivityModal = () => {
        setIsLastActivityModalOpen(false);
    };

    const handleRelaunchGame = () => {
        if (lastActivityData?.data) {
            setGameModalState({
                isOpen: true,
                gameId: lastActivityData.data.game.id,
                gameTitle: lastActivityData.data.game.title
            });
            setIsLastActivityModalOpen(false);
        }
    };

    const handleCloseGameModal = () => {
        setGameModalState({
            isOpen: false,
            gameId: '',
            gameTitle: ''
        });
    };

    const displayName = sessionChild
        ? formatDisplayName(sessionChild.firstname, '', 25)
        : session?.user?.name || 'User';
    const shortDisplayName = sessionChild
        ? formatDisplayName(sessionChild.firstname, '', 15)
        : session?.user?.name || 'User';
    const mobileDisplayName = sessionChild
        ? formatDisplayName(sessionChild.firstname, '', 12)
        : session?.user?.name || 'User';
    const displayImage = sessionChild ? sessionChild.avatarUrl : session?.user?.image;

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

    const handleGoToLastActivity = () => {
        if (lastActivityData?.data) {
            const moduleId = lastActivityData.data.module.id;
            const gameId = lastActivityData.data.game.id;
            navigate(`/modules/${moduleId}`, {
                state: {
                    scrollToGameId: gameId,
                    highlightGameId: gameId
                }
            });
        }
    };

    const renderAuthOptions = () => {
        if (isAuthenticated) {
            return (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button
                            className="flex flex-row items-center gap-3 focus:outline-none cursor-pointer max-w-xs"
                            title={sessionChild ? `${sessionChild.firstname} ${sessionChild.lastname}` : displayName}
                        >
                            <div className="min-w-0 flex-shrink">
                                <Typography
                                    as="h3"
                                    styleCase="uppercase"
                                    weight="bold"
                                    variant="small"
                                    color={"default"}
                                    className="truncate text-right hidden xl:block"
                                >
                                    {displayName}
                                </Typography>
                                <Typography
                                    as="h3"
                                    styleCase="uppercase"
                                    weight="bold"
                                    variant="small"
                                    color={"default"}
                                    className="truncate text-right hidden lg:block xl:hidden"
                                >
                                    {shortDisplayName}
                                </Typography>
                                <Typography
                                    as="h3"
                                    styleCase="uppercase"
                                    weight="bold"
                                    variant="small"
                                    color={"default"}
                                    className="truncate text-right lg:hidden"
                                >
                                    {mobileDisplayName}
                                </Typography>
                            </div>
                            <UserAvatar avatarUrl={displayImage || ''} className="border border-white rounded-full w-12 h-12 flex-shrink-0" size={50} username={displayName} alt={'Avatar'} />
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            className="z-50 bg-meko-blue-darker shadow-lg rounded-md min-w-[200px]"
                            sideOffset={5}
                            align="end"
                        >
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
                                        onSelect={() => navigate('/profile/change-avatar')}
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
                        src={displayImage || ""}
                        alt="Avatar"
                        className="border-2 border-white rounded-full w-16 h-16 lg:w-20 lg:h-20"
                        title={sessionChild ? `${sessionChild.firstname} ${sessionChild.lastname}` : displayName}
                    />
                    <Typography
                        as="h3"
                        weight="bold"
                        color={"default"}
                        className="text-center truncate max-w-xs"
                    >
                        {shortDisplayName}
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
        if (!sessionChild || !isAuthenticated) return null;
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

                        <div className="bg-meko-blue-transparent-2 py-3 px-4 border-b border-meko-blue-transparent-1">
                            <Typography variant="small" weight="bold" styleCase="uppercase" color="default">
                                {t('menu.childOptions.title')}
                            </Typography>
                        </div>
                        <DropdownMenu.Item
                            className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1 px-4 py-2 text-xs cursor-pointer"
                            onSelect={() => navigate('/monitoring')}
                        >
                            Tableau de bord
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1 px-4 py-2 text-xs cursor-pointer"
                            onSelect={() => navigate('/monitoring/child/subscriptions')}
                        >
                            {t('menu.childOptions.subscriptions')}
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            className="flex text-meko-blue-light-1 uppercase items-center hover:bg-meko-blue-transparent-1 px-4 py-2 text-xs cursor-pointer"
                            onSelect={() => navigate('/monitoring/child/add')}
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
    // Liste des routes où le header doit être masqué
    const hideHeaderRoutes = [
        '/profile/choose',
        '/profile/welcome',
        '/profile/avatar',
        '/profile/create-child',
        '/onboarding/profile',
        '/onboarding/welcome',
        '/onboarding/avatar',
    ];
    if (hideHeaderRoutes.includes(location.pathname)) {
        return null;
    }
    return (
        <div className="z-50 w-full">
            {parentTrial &&  parentTrial.isTrialActive && (
                <div className="bg-meko-blue-light-2 text-meko-blue-darker px-2 py-0.5 flex flex-row items-center justify-center text-xs min-h-[36px]">
                    <button
                        type="button"
                        onClick={() => navigate('/monitoring/child/subscriptions')}
                        className="flex justify-center items-center gap-2 flex-1 min-w-0 px-2 py-2 bg-gradient-to-r from-meko-blue-dark via-meko-blue-light-1 to-meko-blue-dark cursor-pointer focus:outline-none rounded-xl  text-xs"
                        aria-label="Voir abonnement"
                    >
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-green-500 text-white">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/></svg>
                                </span>
                                <span className="font-bold">Essai gratuit Meko Academy&nbsp;:</span>
                                <span className="font-normal">{daysLeft} jours restants</span>
                            </span>
                    </button>
                </div>
            )}
            <div className="hidden md:flex flex-row justify-between items-center px-4 lg:px-6 py-2">
                <div className="flex items-center gap-3">
                    <Link to={(sessionChild && isAuthenticated) ? "/home" : "/"} className="flex items-center">
                        <img
                            src={(sessionChild && isAuthenticated) ? '/favicon.png' : '/small-logo.svg'}
                            alt="Logo"
                            className={(sessionChild && isAuthenticated) ? "w-12 h-auto" : "w-auto"}
                        />
                    </Link>
                    {(sessionChild && isAuthenticated) && (
                        <div className="flex flex-row">
                            {renderChildrenOptions()}
                            <SearchInput />
                        </div>
                    )}
                </div>
                <div className='flex flex-row items-center gap-4 lg:gap-8 cursor-pointer min-w-0'>
                    {(sessionChild && isAuthenticated) && (
                        <div className="flex flex-row gap-6 lg:gap-10 items-center">
                            {lastActivityData?.data && (
                                <NavItem
                                    label={t('common.lastActivity')}
                                    icon={<LastActivityIcon />}
                                    onClick={handleGoToLastActivity}
                                />
                            )}
                            <NavItem label={t('common.statistics')} icon={<StatisticIcon />} onClick={() => navigate('/child/dashboard')} />
                        </div>
                    )}
                    {renderAuthOptions()}
                </div>
            </div>

            <div className="md:hidden flex flex-row justify-between items-center px-4 py-3">
                <Link to={(sessionChild && isAuthenticated) ? "/home" : "/"} className="flex items-center">
                    <img
                        src={(sessionChild && isAuthenticated) ? '/favicon.png' : '/small-logo.svg'}
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

            <LastActivityModal
                isOpen={isLastActivityModalOpen}
                onClose={handleCloseLastActivityModal}
                onRelaunch={handleRelaunchGame}
                lastActivity={lastActivityData?.data || null}
            />
            <GameSimulationModal
                isOpen={gameModalState.isOpen}
                onClose={handleCloseGameModal}
                gameId={gameModalState.gameId}
                gameTitle={gameModalState.gameTitle}
            />
        </div>
    );
}
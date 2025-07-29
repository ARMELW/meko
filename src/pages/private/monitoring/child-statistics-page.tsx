import { Card, CardContent, CardTitle, Typography } from "@/components";
import { useTranslation } from "react-i18next";
import { useSession as useChildrenSession } from "@/services/session/store";
import UserAvatar from "@/components/atoms/view/user-avatar";
import { useNavigate } from "react-router";
import { appPath } from "@/routes/path";
import { formatDisplayName } from "@/utils/text";
import { SubscriptionRequiredGuard } from "@/routes/components/subscription-required-guard";

export function ChildStatisticsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sessionChild = useChildrenSession(state => state.selectedChild);

  if (!sessionChild) {
    return (
      <div className="min-h-screen text-white p-4 md:p-8 flex items-center justify-center">
        <Card className="p-8 text-center">
          <Typography variant="h2" weight="bold" className="mb-4">
            Aucun enfant sélectionné
          </Typography>
          <Typography className="mb-4">
            Veuillez sélectionner un enfant pour voir les statistiques
          </Typography>
          <button 
            onClick={() => navigate(appPath.private.profile.choose)}
            className="bg-meko-blue-light-1 text-white px-4 py-2 rounded hover:bg-meko-blue-light-2 transition-colors"
          >
            {t('common.changeProfile')}
          </button>
        </Card>
      </div>
    );
  }

  const displayName = formatDisplayName(sessionChild.firstname, '', 30);

  return (
    <SubscriptionRequiredGuard>
    <div className="min-h-screen text-white p-2 sm:p-4 md:p-8 bg-white">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-10">
        {/* Header avec informations de l'enfant */}
        <Card className="mb-6 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <UserAvatar 
              avatarUrl={sessionChild.avatarUrl || ''} 
              size={80} 
              username={`${sessionChild.firstname} ${sessionChild.lastname}`}
              alt="Avatar enfant"
              className="border-2 border-white rounded-full flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
            />
            <div className="min-w-0 flex-1">
              <Typography 
                variant="h1" 
                weight="bold" 
                className="mb-2"
                title={`${sessionChild.firstname} ${sessionChild.lastname}`}
              >
                Statistiques de {displayName}
              </Typography>
              <Typography color="secondary">
                Tableau de bord des performances
              </Typography>
            </div>
          </div>
        </Card>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <Card className="bg-[#000F4799] p-4">
            <Typography 
              as="span" 
              styleCase="uppercase" 
              color="secondary" 
              weight="bold"
              className="text-sm"
            >
              {t('common.dashboard')} - Jeux terminés
            </Typography>
            <Typography 
              as="span" 
              color="default" 
              weight="bold" 
              className="block text-2xl mt-2"
            >
              12
            </Typography>
          </Card>

          <Card className="bg-[#000F4799] p-4">
            <Typography 
              as="span" 
              styleCase="uppercase" 
              color="secondary" 
              weight="bold"
              className="text-sm"
            >
              Jeux en cours
            </Typography>
            <Typography 
              as="span" 
              color="default" 
              weight="bold" 
              className="block text-2xl mt-2"
            >
              5
            </Typography>
          </Card>

          <Card className="bg-[#000F4799] p-4">
            <Typography 
              as="span" 
              styleCase="uppercase" 
              color="secondary" 
              weight="bold"
              className="text-sm"
            >
              Progression
            </Typography>
            <Typography 
              as="span" 
              color="default" 
              weight="bold" 
              className="block text-2xl mt-2"
            >
              8.5%
            </Typography>
          </Card>

          <Card className="bg-[#000F4799] p-4">
            <Typography 
              as="span" 
              styleCase="uppercase" 
              color="secondary" 
              weight="bold"
              className="text-sm"
            >
              Temps passé
            </Typography>
            <Typography 
              as="span" 
              color="default" 
              weight="bold" 
              className="block text-2xl mt-2"
            >
              32h 30mn
            </Typography>
          </Card>
        </div>

        {/* Graphiques et détails */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <Card className="bg-[#0040B6] p-6">
            <CardTitle
              title="Activité hebdomadaire"
              className="mb-4"
              titleColor="default"
            />
            <CardContent>
              <div className="h-48 flex items-center justify-center">
                <Typography color="secondary">
                  Graphique à venir
                </Typography>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0040B6] p-6">
            <CardTitle
              title="Taux de progression"
              className="mb-4"
              titleColor="default"
            />
            <CardContent>
              <div className="h-48 flex items-center justify-center">
                <Typography color="secondary">
                  Graphique à venir
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques détaillées */}
        <Card className="bg-[#000F4799] p-4 sm:p-6 mb-6">
          <CardTitle
            title="Statistiques détaillées"
            className="mb-4"
            titleColor="default"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-sm">
            <div className="bg-meko-blue-transparent-2 p-3 rounded">
              <Typography color="secondary" className="mb-1">
                Modules terminés
              </Typography>
              <Typography weight="bold">2</Typography>
            </div>
            <div className="bg-meko-blue-transparent-2 p-3 rounded">
              <Typography color="secondary" className="mb-1">
                Leçons complétées
              </Typography>
              <Typography weight="bold">8</Typography>
            </div>
            <div className="bg-meko-blue-transparent-2 p-3 rounded">
              <Typography color="secondary" className="mb-1">
                Taux de réussite
              </Typography>
              <Typography weight="bold">80%</Typography>
            </div>
            <div className="bg-meko-blue-transparent-2 p-3 rounded">
              <Typography color="secondary" className="mb-1">
                Jeux joués
              </Typography>
              <Typography weight="bold">36</Typography>
            </div>
            <div className="bg-meko-blue-transparent-2 p-3 rounded">
              <Typography color="secondary" className="mb-1">
                Temps de jeu
              </Typography>
              <Typography weight="bold">8h 21m</Typography>
            </div>
            <div className="bg-meko-blue-transparent-2 p-3 rounded">
              <Typography color="secondary" className="mb-1">
                Temps moyen par jeu
              </Typography>
              <Typography weight="bold">31m</Typography>
            </div>
            <div className="bg-meko-blue-transparent-2 p-3 rounded">
              <Typography color="secondary" className="mb-1">
                Nb. sessions
              </Typography>
              <Typography weight="bold">3</Typography>
            </div>
            <div className="bg-meko-blue-transparent-2 p-3 rounded">
              <Typography color="secondary" className="mb-1">
                Durée moyenne session
              </Typography>
              <Typography weight="bold">2h 05m</Typography>
            </div>
          </div>
        </Card>

        {/* Progression par module */}
        <Card className="bg-[#0040B6] p-4 sm:p-6">
          <CardTitle
            title="Progression par module"
            className="mb-4"
            titleColor="default"
          />
          <CardContent>
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-meko-blue-transparent-2 p-3 sm:p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <Typography weight="bold">Module 1: Les Formes</Typography>
                  <Typography color="secondary">100%</Typography>
                </div>
                <div className="w-full bg-meko-blue-darker rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className="bg-meko-blue-transparent-2 p-3 sm:p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <Typography weight="bold">Module 2: Les Couleurs</Typography>
                  <Typography color="secondary">75%</Typography>
                </div>
                <div className="w-full bg-meko-blue-darker rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="bg-meko-blue-transparent-2 p-3 sm:p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <Typography weight="bold">Module 3: Les Nombres</Typography>
                  <Typography color="secondary">25%</Typography>
                </div>
                <div className="w-full bg-meko-blue-darker rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </SubscriptionRequiredGuard>
  );
}

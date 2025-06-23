import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography } from '@/components';
import { Radio } from '@/components';
import { useSettings } from '@/services/settings';

export function ChildSettingsPage() {
  const { t } = useTranslation();
  const {
    currency,
    language,
    changeCurrency,
    changeLanguage
  } = useSettings();

  const [isSaving, setIsSaving] = useState(false);

  const handleCurrencyChange = async (newCurrency: string) => {
    try {
      await changeCurrency(newCurrency as 'euro' | 'chf');
    } catch (error) {
      console.error('Erreur lors du changement de devise:', error);
    }
  };

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      setIsSaving(true);
      await changeLanguage(newLanguage as 'fr' | 'en');
    } catch (error) {
      console.error('Erreur lors du changement de langue:', error);
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="min-h-screen p-4">
      <div className='max-w-2xl mx-auto'>
       <div className="mb-6">
          <Typography as="h3" weight="bold" className="text-3xl mb-2">
            {t('settings.title')}
          </Typography>
          <hr className="my-2 text-white" />
          
        </div>

        {/* Section Général */}
        <Card className="border-none mb-6">
          <CardContent className="p-0">
            {/* Header de section */}
            <div className="px-6 py-4 bg-meko-blue-darker rounded-2xl">
              <Typography weight="bold" className="text-white uppercase text-sm">
                {t('settings.general')}
              </Typography>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Devise utilisée */}
              <div>
                <Typography className="text-blue-200 mb-4 text-sm">
                  {t('settings.currency.title')}
                </Typography>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <Radio
                      name="currency"
                      value="euro"
                      checked={currency === 'euro'}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                      aria-label="Euro"
                      className="text-red-500"
                    />
                    <Typography className="text-white">
                      {t('settings.currency.euro')}
                    </Typography>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <Radio
                      name="currency"
                      value="chf"
                      checked={currency === 'chf'}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                      aria-label="Franc suisse"
                    />
                    <Typography className="text-white">
                      {t('settings.currency.chf')}
                    </Typography>
                  </label>
                </div>
              </div>

              {/* Langue */}
              <div>
                <Typography className="text-blue-200 mb-4 text-sm">
                  {t('settings.language.title')}
                </Typography>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <Radio
                      name="language"
                      value="fr"
                      checked={language === 'fr'}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      aria-label="Français"
                      className="text-red-500"
                      disabled={isSaving}
                    />
                    <Typography className="text-white">
                      {t('settings.language.french')}
                    </Typography>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <Radio
                      name="language"
                      value="en"
                      checked={language === 'en'}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      aria-label="Anglais"
                      disabled={isSaving}
                    />
                    <Typography className="text-white">
                      {t('settings.language.english')}
                    </Typography>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

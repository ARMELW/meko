import { Button } from "@/components/atoms/actions/button";
import { Typography } from "@/components/atoms/typography/typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useSession } from "@/config/auth"; 

export default function HeroSection() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: session } = useSession();
    const isAuthenticated = !!session; 
    
    const handleButtonClick = () => {
        if (isAuthenticated) {
            navigate('/profile/choose');
        } else {
            navigate('/register');
        }
    };
    
    return (
        <section className="py-4 md:py-6 lg:py-8 overflow-hidden text-white">
            <div className="flex md:flex-row flex-col justify-between items-center gap-6 md:gap-8 lg:gap-10 mx-auto px-4 sm:px-6 container">
                <div className="flex flex-col w-full md:max-w-md lg:max-w-xl">
                    <Typography as={'h1'} className="mb-4 font-bold text-3xl sm:text-4xl md:text-4xl lg:text-5xl">
                        {t('landing.heroTitle')}
                    </Typography>
                    <p className="mb-6 text-white/90 text-sm sm:text-base md:text-lg">
                        {t('landing.heroDescription')}
                    </p>
                    <div className="flex justify-center md:justify-start">
                        <Button 
                            variant={'primary'} 
                            onClick={handleButtonClick} 
                            className="w-full sm:w-auto" 
                            size={'small'}
                        >
                            {isAuthenticated 
                                ? t('common.ready') 
                                : t('common.trial')  
                            }
                        </Button>
                    </div>
                </div>

                <div className="hidden md:flex justify-center mt-6 md:mt-0 w-full md:w-1/2 lg:w-auto">
                    <img
                        src="/assets/mascot.png"
                        alt="Mascotte Meko"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
}
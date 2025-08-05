import { Card, CardContent, CardFooter } from '@/components';
import { Typography } from '@/components';
import { useTranslation } from 'react-i18next';

type CardModuleProps = {
  image: string;
  title: string;
  status:  'not_started' | 'completed' | 'in_progress' | 'blocked';
  progress?: string;
  onClick?: () => void;
};

function CardModule({ image, title, status, progress, onClick }: CardModuleProps) {
  const { t } = useTranslation();
  console.log('status', status)
  const statusColors: Record<CardModuleProps['status'], string> = {
    'not_started': 'bg-[#000F4799] text-white',
    'completed': 'bg-[#00AF42] text-white',
    'in_progress': 'bg-[#FF7F32] text-white',
    'blocked': 'bg-red-500 text-white'
  };
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (onClick) onClick();
  };
  return (
    <div className="w-full cursor-pointer" onClick={handleClick}>
      <Card style={{ boxShadow: "rgb(255 255 255 / 19%) 0px -1px 1px" }}>
        <CardContent className="p-1 sm:p-2 md:p-3">
          <div className="w-full card-image">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-36 sm:h-44 md:h-48 lg:h-52 object-cover rounded-xl transition-transform duration-200 hover:scale-105" 
            />
          </div>
          <div className="card-title">
            <Typography 
              as="p" 
              align="center" 
              styleCase="uppercase" 
              weight="bold" 
              className="py-2 px-1 sm:py-4 sm:px-2 text-base sm:text-lg md:text-xl line-clamp-2" 
              title={title}
              label={title} 
            >
              {title}
            </Typography>
          </div>
        </CardContent>
        <CardFooter className={`${statusColors[status]}`}> 
          <Typography as="p" align="center" styleCase="uppercase" weight="bold" className="text-xs sm:text-sm md:text-base" shadow="sm">
            {status === 'in_progress' && progress ? `${t(`modules.status.${status}`)} ${progress}` : t(`modules.status.${status}`)}
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export { CardModule };

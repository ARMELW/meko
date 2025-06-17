import { Card, CardContent, CardFooter } from '@/components';
import { Typography } from '@/components';
import { useTranslation } from 'react-i18next';

type CardModuleProps = {
  image: string;
  title: string;
  status:  'not_started' | 'completed' | 'in_progress';
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
  };

  return <div className="w-full home-wrapper cursor-pointer" onClick={onClick}>
    <Card style={{ boxShadow: "rgb(255 255 255 / 19%) 0px -1px 1px" }}>
      <CardContent className="p-2">
        <div className="w-full card-image">
          <img src={image} alt={title} className="w-full h-[186px] object-cover rounded-xl" />
        </div>
        <div className="card-title">

          <Typography as="p" align={"center"} styleCase={"uppercase"} weight={"bold"} className="p-4">
            {title}
          </Typography>
        </div>

      </CardContent>
      <CardFooter className={`${statusColors[status]}`}>
        <Typography as="p" align={"center"} styleCase={"uppercase"} weight={"bold"} className="text-sm" shadow={"sm"}>
          {status === 'in_progress' && progress ? `${t(`modules.status.${status}`)} ${progress}` : t(`modules.status.${status}`)}
        </Typography>
      </CardFooter>
    </Card>
  </div>
}

export { CardModule };

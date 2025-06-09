import { Card, CardContent, CardFooter } from '@/components';
import { Typography } from '@/components';

type CardModuleProps = {
  image: string;
  title: string;
  status: 'À DÉCOUVRIR' | 'TERMINÉ' | 'EN COURS';
  progress?: string;
};

function CardModule({ image, title, status, progress }: CardModuleProps) {

  const statusColors = {
    'À DÉCOUVRIR': 'bg-[#000F4799] text-white',
    'TERMINÉ': 'bg-[#00AF42] text-white',
    'EN COURS': 'bg-[#FF7F32] text-white',
  };


  return <div className="w-full home-wrapper">
    <Card>
      <CardContent className="p-2">
        <div className="w-full card-image">
          <img src={image} alt={title} className="w-full h-[186px] object-cover rounded rounded-xl" />
        </div>
        <div className="card-title">

          <Typography as="p" align={"center"} styleCase={"uppercase"} weight={"bold"} className="p-4">
            {title}
          </Typography>
        </div>

      </CardContent>
      <CardFooter className={`${statusColors[status]}`}>
        <Typography as="p" align={"center"} styleCase={"uppercase"} weight={"bold"} className="text-sm" shadow={"sm"}>
          {status === 'EN COURS' && progress ? `${status} ${progress}` : status}
        </Typography>
      </CardFooter>
    </Card>
  </div>
}

export { CardModule };

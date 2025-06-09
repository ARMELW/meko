import { Button, Card, CardContent, Typography } from "@/components";

function ModuleDetailPage() {
  return (
    <div className="min-h-screen text-white  sm:w-full lg:w-[70%] mx-auto">

      {/* Module Info */}
      <div className="p-6 mb-8 flex flex-col md:flex-row gap-6">
        <div className="card-image-detail w-4/12">
          <Card style={{ boxShadow: "rgb(255 255 255 / 19%) 0px -1px 1px" }}>
            <CardContent className="p-2">
              <img
                src="/assets/images/cards/image-detail.png"
                alt="Module"
                className="w-full aspect-square object-cover rounded rounded-xl"
              />
            </CardContent>
          </Card>


        </div>
        <div className="w-8/12 space-y-3">
          <Typography as="h3" shadow={null}>
            LES MAITRES DES ADDITIONS
          </Typography>
          <Typography as="span" styleCase={"uppercase"} className="inline-block bg-[#FF7F32] px-2 py-0.5  text-xs font-semibold">
            En cours
          </Typography>
          <p className="text-sm leading-relaxed">
            Plonge toi dans le monde des additions et à travers des leçons interactives et des jeux amusants,
            apprends à additionner avec facilité tout en relevant des défis ludiques. <br />
            Prêt à devenir un maître des additions ?
          </p>

          {/* Stats */}
          <div className="flex gap-4 mt-2 bg-[#000F4726] justify-center py-3">
            <div className="flex-1 px-3  rounded text-center text-xs">
              <Typography as="span" className="block text-[30px]" weight={"bold"} shadow={"sm"} align="center" styleCase={"uppercase"}>
                4
              </Typography>
              <Typography
                as="span"
                align="center"
                styleCase="uppercase"
                shadow="sm"
                weight="bold"
                color="secondary"
                className="text-[14px]"
              >
                LEÇONS
              </Typography>
            </div>

            <div className="flex-1 px-3  text-center text-xs border-x border-x-[#7EDAFD]">
              <Typography as="span" className="block text-[30px]" weight={"bold"} shadow={"sm"} align="center" styleCase={"uppercase"}>
                8
              </Typography>
              <Typography
                as="span"
                align="center"
                styleCase="uppercase"
                shadow="sm"
                weight="bold"
                color="secondary"
                className="text-[14px]"
              >
                JEUX
              </Typography>
            </div>

            <div className="flex-1 px-3  rounded text-center text-xs">
              <Typography as="span" className="block text-[30px]" weight={"bold"} shadow={"sm"} align="center" styleCase={"uppercase"}>
                3
              </Typography>
              <Typography
                as="span"
                align="center"
                styleCase="uppercase"
                shadow="sm"
                weight="bold"
                color="secondary"
                className="text-[14px]"
              >
                TERMINÉS
              </Typography>
            </div>
          </div>

        </div>
      </div>

      {/* Lessons List */}
      <div className="relative border-l-8 border-[#08488b]">
        {/* Lesson 1 */}
        <div className="relative mb-10 pl-28">
          <div className="absolute -left-14 w-28 top-0 bg-[#08488b] text-white font-bold text-sm">
            <div className="w-full relative  px-2 py-1">
              <div className="absolute w-full top-[-6px]  left-0 bg-[#08488b] h-3 z-0" style={{ transform: "skew(0deg, -5deg)" }}></div>
              <div className="w-full relative z-2">
                <Typography
                  as="span"
                  align="center"
                  styleCase="uppercase"
                  shadow="sm"
                  weight="bold"
                  color={"default"}
                  className="text-[14px] block"
                >
                  Leçon
                </Typography>
                <Typography as="h1" className="bg-gradient-to-r from-[#FA4616] to-[#FF7F32] bg-clip-text !text-transparent" weight={"bold"} shadow={"sm"} align="center" styleCase={"uppercase"}>
                  1
                </Typography>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <LessonItem
              image="/assets/images/cards/fig-1.png"
              title="ADDITION EXPRESS"
              status="TERMINÉ"
            />
            <LessonItem
              image="/assets/images/cards/fig-2.png"
              title="MISSION +1"
              status="TERMINÉ"
            />
            <LessonItem
              image="/assets/images/cards/fig-3.png"
              title="LES CHIFFRES MAGIQUES"
              status="À DÉCOUVRIR"
            />
          </div>
        </div>
        {/* Lesson 2 */}
        <div className="relative mb-10 pl-28">
          <div className="absolute -left-14 w-28 top-0 bg-[#08488b] text-white font-bold text-sm">
            <div className="w-full relative  px-2 py-1">
              <div className="absolute w-full top-[-6px]  left-0 bg-[#08488b] h-3 z-0" style={{ transform: "skew(0deg, -5deg)" }}></div>
              <div className="w-full relative z-2">
                <Typography
                  as="span"
                  align="center"
                  styleCase="uppercase"
                  shadow="sm"
                  weight="bold"
                  color={"default"}
                  className="text-[14px] block"
                >
                  Leçon
                </Typography>
                <Typography as="h1" className="bg-gradient-to-r from-[#FA4616] to-[#FF7F32] bg-clip-text !text-transparent" weight={"bold"} shadow={"sm"} align="center" styleCase={"uppercase"}>
                  2
                </Typography>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <LessonItem
              image="/assets/images/cards/fig-1.png"
              title="ADDITION EXPRESS"
              status="TERMINÉ"
            />
            <LessonItem
              image="/assets/images/cards/fig-2.png"
              title="MISSION +1"
              status="TERMINÉ"
            />
            <LessonItem
              image="/assets/images/cards/fig-3.png"
              title="LES CHIFFRES MAGIQUES"
              status="À DÉCOUVRIR"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

type LessonItemProps = {
  image: string;
  title: string;
  status: 'TERMINÉ' | 'À DÉCOUVRIR' | 'EN COURS';
};

function LessonItem({ image, title, status }: LessonItemProps) {
  const statusColor = {
    TERMINÉ: 'bg-green-500',
    'À DÉCOUVRIR': 'bg-blue-800',
    'EN COURS': 'bg-orange-500',
  };

  return (

    <Card style={{ boxShadow: "rgb(255 255 255 / 19%) 0px -1px 1px" }}>
      <CardContent className="p-2">
        <div className="flex items-center gap-4 pe-3">
          <img src={image} alt={title} className="w-[120px] h-[120px] object-cover rounded rounded-xl" />
          <div className="flex-1">
            <h3 className="font-bold text-white text-sm">{title}</h3>
            <span className={`inline-block ${statusColor[status]} px-2 py-0.5 rounded text-xs`}>
              {status}
            </span>
          </div>

          <Button>
            <Typography as="span" styleCase={"uppercase"} shadow={"sm"} weight={"bold"}>
              LANCER
            </Typography>
          </Button>
        </div>
      </CardContent>
    </Card>


  );
}

export { ModuleDetailPage };

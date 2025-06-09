import { } from '@/components';
import { CardModule } from '@/components/molecules/view/card-module';

type CardStatus = 'À DÉCOUVRIR' | 'TERMINÉ' | 'EN COURS';

type CardType = {
  image: string;
  title: string;
  status: CardStatus;
  progress?: string;
};


function HomePage() {

  const cards: CardType[] = [
    {
      image: '/assets/images/cards/addition-card.png',
      title: 'LES MAITRES DES ADDITIONS',
      status: 'À DÉCOUVRIR',
    },
    {
      image: '/assets/images/cards/addition-card-2.png',
      title: 'LES MAITRES DES ADDITIONS',
      status: 'À DÉCOUVRIR',
    },
    {
      image: '/assets/images/cards/addition-card-3.png',
      title: 'LES MAITRES DES ADDITIONS',
      status: 'TERMINÉ',
    },
    {
      image: '/assets/images/cards/addition-card-4.png',
      title: 'LES MAITRES DES ADDITIONS',
      status: 'EN COURS',
      progress: '2/8',
    },
    {
      image: '/assets/images/cards/addition-card-5.png',
      title: 'LES MAITRES DES ADDITIONS',
      status: 'EN COURS',
      progress: '2/8',
    },
    {
      image: '/assets/images/cards/addition-card-6.png',
      title: 'LES MAITRES DES ADDITIONS',
      status: 'À DÉCOUVRIR',
      progress: '2/8',
    },
    {
      image: '/assets/images/cards/addition-card-7.png',
      title: 'LES MAITRES DES ADDITIONS',
      status: 'À DÉCOUVRIR',
      progress: '2/8',
    },
    {
      image: '/assets/images/cards/addition-card-8.png',
      title: 'LES MAITRES DES ADDITIONS',
      status: 'À DÉCOUVRIR',
      progress: '2/8',
    },
  ];

  return <div className="w-full home-wrapper">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {cards.map((card, index) => (
        <CardModule key={index} {...card} />
      ))}
    </div>
  </div>
}

export { HomePage };

import React from 'react';

interface UnityAsideProps {
  title: string;
  coverUrl?: string;
  description?: string;
  game: string;
  isValidGame: boolean;
}

const UnityAside: React.FC<UnityAsideProps> = ({ title, coverUrl, description, game, isValidGame }) => (
  <aside className="w-1/3 bg-meko-blue-flat p-8 flex flex-col justify-center border-r border-meko-blue-transparent-1">
    {isValidGame ? (
      <>
        <h2 className="text-2xl font-bold mb-4 capitalize text-meko-blue-darker dark:text-white">{title}</h2>
        {coverUrl && (
          <img
            src={coverUrl}
            alt={title}
            className="w-full max-h-40 object-contain rounded mb-4 border border-meko-blue-light-2 shadow"
          />
        )}
        <p className="text-meko-blue-dark dark:text-meko-blue-light-1 mb-2">
          {description ? description : <>Bienvenue dans le jeu <b>{title}</b> !</>}
        </p>
      </>
    ) : (
      <div className="text-red-600 font-semibold">Le jeu <b>{game}</b> n'existe pas ou n'est pas disponible.</div>
    )}
  </aside>
);

export default UnityAside;

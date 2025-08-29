import React from 'react';

interface UnityAsideProps {
  title: string;
  coverUrl?: string;
  description?: string;
  isValidGame: boolean;
}

const UnityAside: React.FC<UnityAsideProps> = ({ title, coverUrl, description, isValidGame }) => (
  <aside className="w-1/3 bg-meko-blue-flat p-8 flex flex-col justify-center border-r border-white">
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
      <div className="text-red-600 font-semibold flex flex-row justify-center items-center">??</div>
    )}
  </aside>
);

export default UnityAside;

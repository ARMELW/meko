import { Button } from "@/components/atoms/actions/button";
import { Typography } from "@/components/atoms/typography/typography";

export default function HeroSection() {
    return (
        <section className="text-white">
            <div className="flex md:flex-row flex-col justify-between items-center gap-10 mx-auto container">
                <div className="flex flex-col max-w-xl">
                    <Typography as={'h1'}>
                        Apprendre les maths  en s’amusant !
                    </Typography>
                    <p className="mb-6 text-white/90 text-base md:text-lg">
                        Avec Meko Academy, l’apprentissage des maths devient un jeu ! Grâce à une interface immersive et des défis interactifs, votre enfant progresse en addition, soustraction, multiplication et division tout en s’amusant.
                    </p>
                    <Button variant={'primary'} className="max-w-3xs" size={'small'}>
                        Essai gratuit de 7 jours
                    </Button>
                </div>

                <div className="flex justify-center md:justify-end px-12 w-full md:w-auto">
                    <img
                        src="/assets/mascot.png"
                        alt="Mascotte Meko"
                        className="max-w-xl h-auto"
                    />
                </div>
            </div>
        </section>
    );
}

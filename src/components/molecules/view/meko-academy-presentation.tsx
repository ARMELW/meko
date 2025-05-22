import React, { useState, useRef } from 'react';
import { Typography } from '@/components/atoms/typography/typography';

interface YouTubeEmbedProps {
    videoId: string;
    autoplay?: boolean;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, autoplay = false }) => {
    return (
        <div className="relative aspect-video">
            <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

interface VideoPlayerProps {
    videoId: string;
    thumbnailSrc: string;
    alt: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, thumbnailSrc, alt }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const videoContainerRef = useRef<HTMLDivElement>(null);

    const togglePlay = (): void => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="shadow-lg border-[#FF7F32] border-2 rounded-2xl sm:rounded-3xl w-full overflow-hidden" ref={videoContainerRef}>
            <div className="relative">
                {isPlaying ? (
                    <YouTubeEmbed videoId={videoId} autoplay={true} />
                ) : (
                    <div className="relative bg-gray-800 aspect-video">
                        <img
                            src={thumbnailSrc}
                            alt={alt}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-20 transition-opacity duration-300"></div>
                    </div>
                )}

                {!isPlaying && (
                    <div className="absolute inset-0 flex justify-center items-center">
                        <button
                            className="z-10 flex justify-center items-center hover:scale-105 transition-all duration-300 cursor-pointer transform"
                            onClick={togglePlay}
                            aria-label="Lire la vidéo"
                        >
                            <img src='/assets/play.svg' className="ml-1 w-16 sm:w-16 h-16 sm:h-16 text-white" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

interface MekoAcademyProps {
    videoId?: string;
    thumbnailSrc?: string;
}

const MekoAcademy: React.FC<MekoAcademyProps> = ({
    videoId = "bu5IDmDxUA4",
    thumbnailSrc = "/small-logo.svg"
}) => {
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-8 lg:py-12 w-full">
            <div className="flex flex-col items-center mx-auto max-w-4xl">
                <div className="mb-6 sm:mb-8 md:mb-10 w-full text-center">
                    <Typography
                        as={'h2'}
                        className="font-bold text-xl sm:text-2xl md:text-3xl tracking-wide"
                        align='center'
                    >
                        DÉCOUVREZ MEKO ACADEMY EN ACTION !
                    </Typography>
                </div>

                <VideoPlayer
                    videoId={videoId}
                    thumbnailSrc={thumbnailSrc}
                    alt="Miniature vidéo Meko Academy"
                />
            </div>
        </section>
    );
};

export default MekoAcademy;
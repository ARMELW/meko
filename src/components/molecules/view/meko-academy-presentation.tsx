import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Typography } from '@/components/atoms/typography/typography';

const MekoAcademy = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };


    return (
        <div className="px-4">
            <div className="flex flex-row justify-center py-12">
                <Typography as={'h2'}>
                    DÉCOUVREZ MEKO ACADEMY EN ACTION !
                </Typography>
            </div>

            <div className="mx-auto border-[#FF7F32] border-2 rounded-3xl max-w-4xl overflow-hidden">
                <div className="relative">
                    {isPlaying ? (
                        <div className="relative aspect-video">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/bu5IDmDxUA4"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <div className="relative bg-gray-800 aspect-video">
                            <img
                                src="/small-logo.svg"
                                alt="Miniature vidéo"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                        </div>
                    )}

                    {!isPlaying && (
                        <div className="absolute inset-0 flex justify-center items-center">
                            <button
                                className="z-10 flex justify-center items-center bg-orange-500 rounded-full w-16 h-16 cursor-pointer"
                                onClick={togglePlay}
                            >
                                <Play className="ml-1 w-8 h-8 text-white" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default MekoAcademy;
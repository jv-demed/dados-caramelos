'use client'
import { useState, useEffect } from 'react';

export function useMedia(minWidth){

    const [media, setMedia] = useState();

    useEffect(() => {
        if(typeof window != undefined){
            function handleResize() {
                setMedia(window.innerWidth <= minWidth);
            }
            handleResize();
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [minWidth]);

    return media;
}
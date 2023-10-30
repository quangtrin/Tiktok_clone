import React, { useEffect, useState, useRef } from 'react';
import VideoCard from '../../components/VideoCard';
import BottomNavbar from '../../components/BottomNavbar';
import TopNavbar from '../../components/TopNavbar';
import "../../App.css"

function Home() {
    const videoUrls = [
    {
        url: require('../../videos/video1.mp4'),
        profilePic: 'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg',
        username: 'csjackie',
        description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
        song: 'Original sound - Famed Flames',
        likes: 430,
        comments: 13,
        saves: 23,
        shares: 1,
    },
    {
        url: require('../../videos/video2.mp4'),
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqmtD0ODid67CFDYpMh0nvpRqsyO7vCJ8Ztw&usqp=CAU',
        username: 'dailydotdev',
        description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
        song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
        likes: '13.4K',
        comments: 3121,
        saves: 254,
        shares: 420,
    },
    {
        url: require('../../videos/video3.mp4'),
        profilePic: 'https://media.istockphoto.com/id/1223747984/vector/smiling-man-in-glasses-head-avatar-beautiful-human-face-male-cartoon-character-portrait.jpg?s=170667a&w=0&k=20&c=esLL5NALw7hXSi0Szg8z2hI8eEQAoj9Qv6ySqOybwRQ=',
        username: 'wojciechtrefon',
        description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
        song: 'help so many people are using my sound - Ezra',
        likes: 5438,
        comments: 238,
        saves: 12,
        shares: 117,
    },
    {
        url: require('../../videos/video4.mp4'),
        profilePic: 'https://as2.ftcdn.net/v2/jpg/03/85/50/01/1000_F_385500115_T8QiYsPeliQ5tE3npwOuJNUfunqFBo1U.jpg',
        username: 'faruktutkus',
        description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
        song: 'orijinal ses - Computer Science',
        likes: 9689,
        comments: 230,
        saves: 1037,
        shares: 967,
    },
    ];

    const [videos, setVideos] = useState([]);
    const videoRefs = useRef([]);

    useEffect(() => {
        setVideos(videoUrls);
    }, []);
    
    useEffect(() => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const videoElement = entry.target;
            videoElement.play();
        } else {
            const videoElement = entry.target;
            videoElement.pause();
        }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
        observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
        observer.disconnect();
    };
    }, [videos]);

    // This function handles the reference of each video
    const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
    };
    return <>
     <div className="container">
        <TopNavbar className="top-navbar" />
        {/* Here we map over the videos array and create VideoCard components */}
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === 0}
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>
    </>;
}

export default Home;

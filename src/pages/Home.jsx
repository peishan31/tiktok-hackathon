// importing Link from react-router-dom to navigate to 
// different end points.
import VideoCard from '../components/VideoCard';
import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/TopNavbar';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from "firebase/firestore/lite";
  
const Home = () => {
    const [videos, setVideos] = useState([]);
    const videoRefs = useRef([]);
  
    async function getVideos() {
      const videosCollection = collection(db, "videos");
      const videosSnapshot = await getDocs(videosCollection);
      const videosList = videosSnapshot.docs.map((doc) => doc.data());
      console.log(videosList);
      setVideos(videosList);
    }
  
    useEffect(() => {
      getVideos()
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

  return (
    <div className="app">
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
    </div>
  );
};
  
export default Home;
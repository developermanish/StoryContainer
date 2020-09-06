import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import openSocket from 'socket.io-client';

import { IoMdEye } from "react-icons/io";
import { getStory } from "../../services/story";

const ViewStory = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [userId, setuserId] = useState('');
  const router = useRouter()

  useEffect(() => {
    const id = localStorage.getItem('storyId');
    const views = localStorage.getItem('totalViews');

    const socket = openSocket("http://localhost:5000/");
    socket.on('connect', () => {
      console.log('connection made')
    })

    setInterval(() => {
      socket.emit('room', id)
    }, 1000)

    //data not setting
    socket.on('socketId', (data) => {
      setuserId(data)
      console.log(userId)
    })

    socket.on('countViews', (data) => {
      console.log(data.length)
      setCount(data.length);
    })

    const handleRouteChange = async () => {
      // alert('App is changing to: ', url)
      console.log(userId)
      socket.emit('leaveroom', id)

    }
    router.events.on('routeChangeStart', handleRouteChange)
    //   setSocket(socket)


    async function fetchData() {
      const resultData = await getStory(id, views);
      console.log(resultData)
      setData(resultData);
      // Object.values(resultData).map(item => setData((prevArray) => [...prevArray, item]));
    }
    fetchData();
  }, [])

  return (
    <div className="my-10 mt-20">
      <div className="px-10">
        <div className="flex justify-between">
          <h1 className="px-3">Title : {data.title}</h1>
          <div className="px-5 py-2">
            <span className="px-2">Total Views :</span>    <IoMdEye /> {data.count ? data.count : 0}
          </div>
          <div className="px-5 py-2">
            <span className="px-2">Current Views :</span>    <IoMdEye /> {count ? count : 0}
          </div>
        </div>
        <hr />
        <div>
          <div className="py-10 px-3 font-normal text-lg text-justify">
              {data.story}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ViewStory;
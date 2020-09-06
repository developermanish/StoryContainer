import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";

import Paginate from 'react-js-pagination';
import { IoMdEye } from "react-icons/io";

import Button from '../common/Button';
import { count, allStories } from "../../services/story";

const Home = () => {
    const [activePage, setActivePage] = useState(1);
    const [items, setItems] = useState(0);
    const [data, setData] = useState([]);

    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber);
        setData([]);
    }
    useEffect(() => {
        async function fetchData() {

            const result = await count();
            setItems(result.count);
            const resultData = await allStories(activePage);
            setData(resultData);
            // Object.values(resultData).map(item => setData((prevArray) => [...prevArray, item]));
        }
        fetchData();
    }, [activePage])

    const handleView = (id, count) => {
        console.log(id)
        var totalViews = count + 1
        localStorage.setItem('storyId', id);
        localStorage.setItem('totalViews', totalViews);

        Router.push("/story");
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="w-full md:w-3/5 mx-auto p-8">
                    <h1 className="text-center my-5"><strong>Stories</strong></h1>
                    <div className="shadow-md mt-5">
                        {
                            data && data.map(items => (
                                <div key={items._id} className="tab w-full overflow-hidden border-t">
                                    <input className="absolute opacity-0 " id={`${items._id}`} type="checkbox" name="tabs" />
                                    <label className="block p-5 leading-normal cursor-pointer" htmlFor={`${items._id}`}>Title : {items.title}</label>
                                    <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                                        <div className="p-5 flex justify-between">
                                            <div className="p-2">
                                                <Button onClick={() => handleView(items.storyId, items.count)}>View Full Story</Button>
                                            </div>
                                            <div className="p-4">
                                            <IoMdEye />{items.count?items.count:0}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="paginationWrapper">

                <Paginate
                    activePage={activePage}
                    itemsCountPerPage={5}
                    totalItemsCount={items}
                    pageRangeDisplayed={5}
                    onChange={(e) => handlePageChange(e)}
                />
            </div>
        </div>
    )
}
export default Home;
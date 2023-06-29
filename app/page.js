"use client";
import React from "react";
import useSWR from "swr";
import Diff7days from "../components/Fillter7Date";
import Diff14days from "../components/Fillter14Date";
import Diff30days from "../components/Fillter30Date";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

function page() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR("/api/", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //console.log(data);

  return (
    <div className="container mx-auto">
      <h1 className="pt-3 pb-3 mt-3 mb-2 text-xl font-bold text-center bg-blue-400 rounded-md shadow-xl">
        ระบบแจ้งเตือนระยะเวลาประกันผลงานของโครงการ กปภ.ข.๖
      </h1>
      <Diff7days jsonData={data} />
      <div>
        <br />
      </div>
      <Diff14days jsonData={data} />
      <div>
        <br />
      </div>
      <Diff30days jsonData={data} />
    </div>
  );
}

export default page;

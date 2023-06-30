"use client";
import React from "react";
import useSWR from "swr";
import DueIn3Days from "../components/DueIn3Days";
import DueIn7Days from "../components/DueIn7Days";
import DueIn14days from "../components/DueIn14Days";
import DueIn30days from "../components/DueIn30Days";
import DueIn31to60Days from "../components/DueIn31to60Days";
import Link from "next/link";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

function Page() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR("/api/", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //console.log(data);

  return (
    <div className="container mx-auto mb-1">
      <h1 className="pt-3 pb-3 mt-3 mb-2 text-xl font-bold text-center bg-blue-400 rounded-md shadow-xl">
        ระบบแจ้งเตือนระยะเวลาประกันผลงานของโครงการ กปภ.ข.๖
      </h1>
      <DueIn3Days jsonData={data} />
      <div>
        <br />
      </div>
      <DueIn7Days jsonData={data} />
      <div>
        <br />
      </div>
      <DueIn14days jsonData={data} />
      <div>
        <br />
      </div>
      <DueIn30days jsonData={data} />
      <div>
        <br />
      </div>
      <DueIn31to60Days jsonData={data} />
      <div className="pb-10 mt-0 mb-10">
        {" "}
        <Link
          href={"/contract/expired"}
          alt="Expired"
          className="block w-full p-6 font-semibold text-center text-gray-700 border border-gray-200 rounded-lg shadow bg-slate-200 hover:bg-gray-100"
        >
          โครงการที่หมดระยะประกัน
        </Link>
      </div>
    </div>
  );
}

export default Page;

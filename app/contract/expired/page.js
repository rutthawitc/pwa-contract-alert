"use client";
import React from "react";
import useSWR from "swr";
import Expired from "../../../components/OverDueDate";
import { useRouter } from "next/navigation";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

function Page() {
  const router = useRouter();
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR("/api/", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //console.log(data);
  return (
    <div className="flex flex-col justify-center">
      <div className="mt-5">
        <button
          className="w-full p-4 font-bold text-center text-gray-700 border border-gray-200 rounded-lg shadow-md bg-slate-200 hover:bg-gray-100"
          type="button"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
      <br />
      <div>
        <Expired jsonData={data} className="w-auto" />
      </div>
      <div className="mt-2 mb-5">
        <button
          className="w-full p-4 font-bold text-center text-gray-700 border border-gray-200 rounded-lg shadow-md bg-slate-200 hover:bg-gray-100"
          type="button"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Page;

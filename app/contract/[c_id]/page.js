"use client";
import useSWR from "swr";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

function Page({ params }) {
  const router = useRouter();
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR("/api/", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //console.log(data);
  //console.log(params.c_id);

  //const c_id = params.c_id;
  // Find the specific data item based on the ID
  const specificDataItem = data.find((item) => item.SEQ === params.c_id);
  //console.log(specificDataItem);
  if (!specificDataItem) {
    return <div>ไม่มีข้อมูล</div>;
  }

  //Thai Currency
  const formatCurrency = (value) => {
    return value.toLocaleString("th-TH", {
      style: "currency",
      currency: "THB",
    });
  };

  //Thai format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="py-10">
      <div className="flex justify-between px-2 py-5 text-gray-200 bg-white rounded-lg">
        <div>
          <button
            className="block w-full p-2 font-semibold text-center text-gray-700 border border-gray-200 rounded-lg shadow bg-slate-200 hover:bg-gray-100"
            type="button"
            onClick={() => router.back()}
          >
            Back
          </button>

          <div className="pl-3 pr-3 mt-2 bg-gray-200 rounded-md shadow-md ">
            <h2 className="py-3 text-xl font-bold text-gray-700">
              เลขที่สัญญา: {specificDataItem.contract_no}
            </h2>
            <p className="text-gray-700">
              <strong>โครงการ:</strong> {specificDataItem.project_name}
            </p>
            <p className="text-gray-700">
              <strong>สาขา:</strong> {specificDataItem.branch}
            </p>
            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
            <p className="text-gray-700">
              <strong>ผู้รับจ้าง:</strong> {specificDataItem.contractor_name}
            </p>
            <p className="text-gray-700">
              <strong>จำนวนเงินในสัญญา (รวม VAT):</strong>{" "}
              {formatCurrency(specificDataItem.amount_inc_vat)}
            </p>
            <p className="text-gray-700">
              <strong>วันที่ลงนาม:</strong> {specificDataItem.sign_date}
            </p>
            <p className="text-gray-700">
              <strong>วันที่ส่งมอบ:</strong> {specificDataItem.deliver_date}
            </p>
            <p className="text-gray-700">
              <strong>วันที่ตรวจรับ:</strong> {specificDataItem.inspection_date}
            </p>
            <p className="text-gray-700">
              <strong>รับประกันงาน:</strong> {specificDataItem.guarantee}
            </p>
            <p className="text-gray-700">
              <strong>หลักประกันสัญญา:</strong>{" "}
              {specificDataItem.contract_collateral}
            </p>

            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
            <p className="pb-5 text-gray-700">
              <strong>ครบกำหนด:</strong> {formatDate(specificDataItem.due_date)}
            </p>
            {/* Display other properties of the specific data item */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

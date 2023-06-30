"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const OverDueDate = ({ jsonData }) => {
  const [overDueDateData, setOverDueDateData] = useState([]);
  useEffect(() => {
    const currentDate = new Date();

    // Filter the JSON data based on the condition
    const filteredData = jsonData.filter((item) => {
      const dueDate = new Date(item.due_date);
      //const timeDifference = dueDate.getTime() - currentDate.getTime();
      //const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      //return daysDifference <= 3 && daysDifference >= 0;
      return dueDate < currentDate;
    });

    setOverDueDateData(filteredData);
  }, []);
  //console.log(overDueDateData);

  //---Count--
  const expiredCount = overDueDateData.length;
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
    <div>
      <h2 className="pt-2 pb-2 mb-2 text-xl font-bold text-center bg-red-200 rounded-md shadow-xl">
        โครงการที่หมดระยะเวลาประกันผลงาน <br />
        มีจำนวน {expiredCount} โครงการ
      </h2>
      <ul>
        {overDueDateData.map((item) => (
          <div
            key={item.c_id}
            className="p-4 mb-4 bg-gray-100 rounded-md shadow-md"
          >
            <Link href={`/contract/${item.SEQ}`}>
              {" "}
              <strong>เลขที่สัญญา: {item.contract_no}</strong>
            </Link>
            - ครบกำหนด{" "}
            <strong className="font-semibold text-red-500">
              {formatDate(item.due_date)}
            </strong>
            <br />
            <p>
              <strong>โครงการ : </strong>
              {item.project_name}
            </p>
            <p>
              <strong>จำนวนเงินในสัญญา (รวม VAT) :</strong>{" "}
              {formatCurrency(item.amount_inc_vat)}
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default OverDueDate;
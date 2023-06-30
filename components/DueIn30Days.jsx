"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const DisplayCloseDueDateData = ({ jsonData }) => {
  const [closeDueDateData, setCloseDueDateData] = useState([]);

  useEffect(() => {
    const currentDate = new Date();

    // Filter the JSON data based on the condition
    const filteredData = jsonData.filter((item) => {
      const dueDate = new Date(item.due_date);
      const timeDifference = dueDate.getTime() - currentDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      return daysDifference <= 30 && daysDifference >= 15;
    });

    setCloseDueDateData(filteredData);
  }, [jsonData]); // Include jsonData in the dependency array

  const duedateCount = closeDueDateData.length;

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
      <h2 className="pt-2 pb-2 mb-2 text-xl font-bold text-center bg-green-300 rounded-md shadow-xl">
        โครงการที่ใกล้ครบกำหนดระยะเวลาประกันผลงาน ในระยะ 30 วัน มีจำนวน{" "}
        {duedateCount} โครงการ
      </h2>
      <ul>
        {closeDueDateData.map((item) => (
          <div
            key={item.c_id}
            className="p-4 mb-4 bg-gray-100 rounded-md shadow-md hover:bg-gray-300"
          >
            <Link href={`/contract/${item.SEQ}`}>
              {" "}
              <strong>เลขที่สัญญา: {item.contract_no}</strong> - ครบกำหนด{" "}
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
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DisplayCloseDueDateData;

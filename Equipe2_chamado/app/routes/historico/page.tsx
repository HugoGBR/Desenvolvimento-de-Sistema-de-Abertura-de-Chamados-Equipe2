'use client'

import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      content: "....",
      status: "Aberto",
    },
    {
      id: "728ed52f",
      content: "....",
      status: "Aberto",
    },
    {
      id: "728ed52f",
      content: "....",
      status: "Aberto",
    },
  ];
}

export default function Dashboard() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-6xl p-4">
        <div className="flex flex-col gap-4">
          <div className="w-full p-6 rounded-2xl shadow-xl  shadow-blue-800 border-2 border-gray-400">
            <div className="text-center font-bold text-2xl pb-6">Histórico de Chamados</div>
            <div className="min-h-[300px]">
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
}

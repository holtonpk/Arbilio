"use client";
import React, { useState } from "react";
// import { DataTable } from "@/components/account-table";
import GridView from "./grid/grid-view";
import TableView from "./table/table-view";
import { AccountDataType } from "@/types";

const AccountDatabase = ({ data }: { data: AccountDataType[] }) => {
  const [displayType, setDisplayType] = useState<"grid" | "columns">("grid");

  console.log("dd", data);

  return (
    <>
      {displayType === "grid" ? (
        <GridView
          data={data}
          displayType={displayType}
          setDisplayType={setDisplayType}
        />
      ) : (
        <TableView
          data={data}
          displayType={displayType}
          setDisplayType={setDisplayType}
        />
      )}
    </>
  );
};

export default AccountDatabase;

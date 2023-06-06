"use client";
import React, { useState } from "react";
// import { DataTable } from "@/components/account-table";
import GridView from "./grid/grid-view";
import TableView from "./table/table-view";

const AccountDatabase = ({ originalData }: any) => {
  const [displayType, setDisplayType] = useState<"grid" | "columns">("grid");

  return (
    <>
      {displayType === "grid" ? (
        <GridView
          data={originalData}
          displayType={displayType}
          setDisplayType={setDisplayType}
        />
      ) : (
        <TableView
          data={originalData}
          displayType={displayType}
          setDisplayType={setDisplayType}
        />
      )}
    </>
  );
};

export default AccountDatabase;

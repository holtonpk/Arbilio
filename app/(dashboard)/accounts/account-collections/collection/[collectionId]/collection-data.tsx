"use client";
import React, { useState } from "react";
import GridView from "./grid/grid-view";
import TableView from "./table/table-view";
import { AccountCollectionTable } from "@/types";
const AccountDatabase = ({ data }: { data: AccountCollectionTable[] }) => {
  const [displayType, setDisplayType] = useState<"grid" | "columns">("columns");

  console.log("data", data);

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

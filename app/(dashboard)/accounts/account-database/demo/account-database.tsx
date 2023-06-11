"use client";
import React, { useState } from "react";
// import { DataTable } from "@/components/account-table";
import GridView from "../grid/grid-view";
import TableView from "../table/table-view";
import { AccountDataType } from "@/types";
import { LinkButton } from "@/components/ui/link";

const AccountDatabase = ({ data }: { data: AccountDataType[] }) => {
  const [displayType, setDisplayType] = useState<"grid" | "columns">("grid");

  return (
    <>
      {displayType === "grid" ? (
        <GridView
          data={data}
          displayType={displayType}
          setDisplayType={setDisplayType}
          isDemo={true}
        />
      ) : (
        <TableView
          data={data}
          displayType={displayType}
          setDisplayType={setDisplayType}
          isDemo={true}
        />
      )}
    </>
  );
};

export default AccountDatabase;

import React, { useState, ReactNode, useRef, useContext } from "react";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import ScrollBar from "@/components/scroll-bar";
import Skeleton from "@/components/ui/custom-skeleton";
import { Button } from "@/components/ui/button";
import {
  ProductDisplay,
  StatDisplay,
  AccountDisplay,
} from "@/components/table-components";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { accountDatabaseConfig } from "@/config/dashboard";
import { UpdateCollectionButton } from "@/components/update-collection-button";
import { Icons } from "@/components/icons";
import { UpdateMultiCollectionButton } from "@/components/update-multi-collection-button";
import CreateCollectionButton from "@/components/create-collection-button";
const PrimaryHeaders = accountDatabaseConfig.tableHeaders.primaryHeaders;
const SecondaryHeaders = accountDatabaseConfig.tableHeaders.secondaryHeaders;

interface TableContextData {
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  tableData: any;
}

// Create the context
const TableContext = React.createContext<TableContextData | undefined>(
  undefined
);

// Create a provider component
interface TableProviderProps {
  children: ReactNode;
  data: any;
}

const TableProvider: React.FC<TableProviderProps> = ({ children, data }) => {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const tableData = data;
  return (
    <TableContext.Provider
      value={{
        selectedRows,
        setSelectedRows,
        tableData,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

interface TableProps {
  data: any;
  setDescending: (value: boolean) => void;
  setSortParam: (value: string) => void;
}

const Table = ({ data, setDescending, setSortParam }: TableProps) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const heightRef = useRef<HTMLDivElement | null>(null);
  const headerHeightRef = useRef<HTMLDivElement | null>(null);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const [showScrollBar, setShowScrollbar] = useState(false);

  return (
    <TableProvider data={data}>
      <SelectedPreview />
      <div className="w-full relative  h-fit border rounded-md  ">
        <ScrollBar
          tableRef={tableRef}
          scrollContainerRef={scrollContainerRef}
          heightRef={heightRef}
          headerHeightRef={headerHeightRef}
          buttonContainerRef={buttonContainerRef}
          showScrollBar={showScrollBar}
          setShowScrollbar={setShowScrollbar}
        />

        <div
          ref={tableRef}
          className="flex w-full overflow-x-scroll scrollbar-hide relative "
        >
          <div
            ref={heightRef}
            className="min-w-[600px] w-[50%] flex flex-col sticky left-0 z-20 "
          >
            <div ref={headerHeightRef} className="h-fit ">
              <PrimaryHeader />
            </div>
            {showScrollBar && (
              <span
                ref={scrollContainerRef}
                className="min-h-[16px] w-full z-30"
              />
            )}

            {data.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-background w-full p-4 grid grid-cols-[40px_1fr_1fr_1fr] sticky items-center  border border-b-0 border-x-0   h-20"
              >
                <PrimaryRow data={item} />
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full ">
            <div className=" flex-grow overflow-hidden p-4  flex  relative max-h-[60px] ">
              {SecondaryHeaders.map((item: any, i: any) => (
                <SecondaryHeader
                  key={i}
                  item={item}
                  setDescending={setDescending}
                  setSortParam={setSortParam}
                />
              ))}
            </div>
            {showScrollBar && <span className="min-h-[16px]  w-full" />}

            {data.map((data: any, i: number) => (
              <div
                key={i}
                className="bg-background w-full overflow-hidden p-4  flex relative border border-x-0  border-b-0  h-20 pr-10"
              >
                <SecondaryRow data={data} />
              </div>
            ))}
          </div>
        </div>

        <div
          ref={buttonContainerRef}
          className="flex flex-col absolute right-0 z-20  top-0  h-fit border-t "
        >
          {data.map((data: any, indx: number) => (
            <div
              key={indx}
              className=" w-10 z-20  grid grid-rows-2 items-center border-b border-border border-l  bg-background h-20 "
            >
              <RowButtons data={data} />
            </div>
          ))}
        </div>
      </div>
    </TableProvider>
  );
};

export default Table;

const PrimaryHeader = () => {
  return (
    <div className="w-full p-4 grid grid-cols-[40px_1fr_1fr_1fr] sticky  min-h-[60px] items-center   ">
      <SelectorAll />
      {PrimaryHeaders.map((item: any, i: any) => (
        <div key={i} className="flex items-center text-muted-foreground">
          {item.title}
        </div>
      ))}
    </div>
  );
};

const SecondaryHeader = ({ item, setDescending, setSortParam }: any) => {
  // const { setDescending, setSortParam } = useAccountDataBase();
  const [descend, setDescend] = useState(false);

  const handleClick = () => {
    setDescend(!descend);
    setDescending(!descend);
    setSortParam(item.value);
  };
  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="sm"
      className="min-w-[150px]  max-h-full flex items-center justify-between text-muted-foreground hover:text-primary"
    >
      {item.title}
      <BiChevronDown
        className={`${
          descend ? "rotate-0" : "rotate-180"
        } h-6 w-6 ml-2 transition-all`}
      />
    </Button>
  );
};

const PrimaryRow = ({ data }: any) => {
  return (
    <>
      <Selector item={data} />
      <AccountDisplay data={data} />
      <ProductDisplay data={data} />
      <Link
        target="_blank"
        href={data.bioLink || "/"}
        className="text-sm underline whitespace-nowrap text-ellipsis overflow-hidden"
      >
        {data.bioLink}
      </Link>
    </>
  );
};

const SecondaryRow = ({ data }: any) => {
  return (
    <>
      <span className="min-w-[150px] pr-10 flex items-center">
        <StatDisplay displayValue={data.stats.followers} />
      </span>
      <span className="min-w-[150px]  pr-10 flex items-center">
        <StatDisplay displayValue={data.stats.likes} />
      </span>
      <span className="min-w-[150px] pr-10 flex items-center">
        <StatDisplay displayValue={data.stats.posts} />
      </span>
    </>
  );
};

const RowButtons = ({ data }: any) => {
  return (
    <>
      <UpdateCollectionButton
        account={data}
        variant="secondary"
        size={"xsm"}
        className="w-full justify-center  flex  h-full items-center rounded-none bg-transparent"
      />

      <Link
        href={`/accounts/account/${data.recordId}`}
        className={cn(
          buttonVariants({
            variant: "secondary",
            size: "xsm",
          }),
          "w-full justify-center  flex  h-full items-center rounded-none bg-transparent"
        )}
      >
        <Icons.analytics className="h-5 w-5" />
      </Link>
    </>
  );
};

const SelectedPreview = () => {
  const { selectedRows, setSelectedRows } = useContext(TableContext)!;

  return (
    <>
      {selectedRows.length > 0 && (
        <div className="fixed bottom-10 z-40 fade-in left-1/2 -translate-x-1/2 h-fit p-2 w-fit border rounded-md bg-background mb-2 flex justify-between gap-4 items-center mx-auto">
          <h1 className="font-bold">{`${selectedRows.length} ${
            selectedRows.length > 1 ? "accounts" : "account"
          } selected`}</h1>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedRows([])}
          >
            reset
          </Button>

          <UpdateMultiCollectionButton
            accountArray={selectedRows}
            setSelectedRows={setSelectedRows}
          />
          <CreateCollectionButton
            variant="default"
            accountArray={selectedRows}
          />
        </div>
      )}
    </>
  );
};

const Selector = ({ item }: any) => {
  const { selectedRows, setSelectedRows } = useContext(TableContext)!;

  const selected = selectedRows.includes(item.recordId);

  const handleClick = () => {
    if (selected) {
      setSelectedRows(
        selectedRows.filter((_item: any) => _item !== item.recordId)
      );
    } else {
      setSelectedRows([...selectedRows, item.recordId]);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="h-6 w-6 border rounded-md hover:bg-muted flex items-center justify-center"
    >
      {selected && <Icons.check className="h-4 w-4" />}
    </button>
  );
};

const SelectorAll = () => {
  const { selectedRows, setSelectedRows, tableData } =
    useContext(TableContext)!;
  const selected = selectedRows.length === tableData.length;

  console.log("selected", selected, selectedRows.length, tableData.length);

  const handleClick = () => {
    if (selected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map((item: any) => item.recordId));
    }
  };

  return (
    <button
      onClick={handleClick}
      className="h-6 w-6 border rounded-md hover:bg-muted flex items-center justify-center"
    >
      {selected && <Icons.check className="h-4 w-4" />}
    </button>
  );
};

import React, { useState, ReactNode, useRef, useContext } from "react";
import Link from "next/link";
import ScrollBar from "@/components/scroll-bar";
import {
  ProductDisplay,
  StatDisplay,
  AccountDisplay,
} from "@/components/table-components";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { accountCollectionsConfig } from "@/config/dashboard";
import { Icons } from "@/components/icons";
import { RemoveCollectionButton } from "@/components/remove-collection-button";
import { CollectionType } from "@/types";
import { RemoveMultiAccountCollectionButton } from "@/components/remove-multi-collection-button";
import CreateCollectionButton from "@/components/create-collection-button";
const PrimaryHeaders = accountCollectionsConfig.tableHeaders.primaryHeaders;
const SecondaryHeaders = accountCollectionsConfig.tableHeaders.secondaryHeaders;

interface TableContextData {
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  tableData: any;
  hideItems: (recordIdArray: string[]) => void;
  collection: CollectionType;
  setDescending: (param: boolean) => void;
  setSortParam: (param: string) => void;
}

// Create the context
const TableContext = React.createContext<TableContextData | undefined>(
  undefined
);

// Create a provider component
interface TableProviderProps {
  children: ReactNode;
  data: any;
  hideItems: (recordIdArray: string[]) => void;
  collection: CollectionType;
  setDescending: (param: boolean) => void;
  setSortParam: (param: string) => void;
}

const TableProvider: React.FC<TableProviderProps> = ({
  children,
  data,
  hideItems,
  collection,
  setDescending,
  setSortParam,
}) => {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const tableData = data;
  return (
    <TableContext.Provider
      value={{
        selectedRows,
        setSelectedRows,
        tableData,
        hideItems,
        collection,
        setDescending,
        setSortParam,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

interface TableProps {
  data: any;
  collection: CollectionType;
  setSortParam: (param: string) => void;
  setDescending: (param: boolean) => void;
  hideItems: (recordIdArray: string[]) => void;
}

const Table = ({
  data,
  collection,
  setSortParam,
  setDescending,
  hideItems,
}: TableProps) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const heightRef = useRef<HTMLDivElement | null>(null);
  const headerHeightRef = useRef<HTMLDivElement | null>(null);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const [showScrollBar, setShowScrollbar] = useState(false);

  return (
    <TableProvider
      data={data}
      hideItems={hideItems}
      collection={collection}
      setDescending={setDescending}
      setSortParam={setSortParam}
    >
      <SelectedPreview />
      <div className="w-full relative max-h-full overflow-hidden  border rounded-md ">
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
          className="flex w-full overflow-x-scroll rounded-md scrollbar-hide relative "
        >
          <div
            ref={heightRef}
            className="min-w-[600px] w-[50%] flex flex-col sticky left-0 z-20 divide-y divide-border  "
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
                className="bg-background w-full p-4 grid grid-cols-[40px_1fr_1fr_1fr]  sticky items-center     h-20"
              >
                <PrimaryRow item={item} />
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full divide-y divide-border  ">
            <div className=" flex-grow overflow-hidden p-4  flex  relative min-h-[60px] ">
              {SecondaryHeaders.map((item: any, i: any) => (
                <SecondaryHeader key={i} item={item} />
              ))}
            </div>
            {showScrollBar && <span className="min-h-[16px]  w-full" />}

            {data.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-background w-full p-4 grid grid-cols-3 sticky items-center    h-20"
              >
                <SecondaryRow item={item} />
              </div>
            ))}
          </div>
        </div>

        <div
          ref={buttonContainerRef}
          className="flex flex-col absolute right-0 z-20 divide-y divide-border   top-0  h-fit"
        >
          {data.map((item: any, i: number) => (
            <div
              key={i}
              className=" w-10 z-20  grid grid-rows-2 items-center border-l    bg-background h-20 "
            >
              <RowButtons item={item} />
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
    <div className="w-full p-4 grid grid-cols-[40px_1fr_1fr_1fr] sticky  min-h-[60px] items-center  ">
      <SelectorAll />
      {PrimaryHeaders.map((item: any, i: any) => (
        <div key={i} className="flex items-center text-muted-foreground">
          {item.title}
        </div>
      ))}
    </div>
  );
};

const SecondaryHeader = ({ item }: any) => {
  const { setDescending, setSortParam } = useContext(TableContext)!;
  const [descend, setDescend] = useState(false);
  const handleClick = () => {
    setDescend(!descend);
    setDescending(!descend);
    setSortParam(item.value);
  };
  return (
    <button
      onClick={handleClick}
      className="min-w-[150px] pr-10 flex items-center text-muted-foreground hover:text-primary"
    >
      {item.title}
      <Icons.chevronDown
        className={`${
          descend ? "rotate-0" : "rotate-180"
        } h-6 w-6 ml-2 transition-all`}
      />
    </button>
  );
};

const PrimaryRow = ({ item }: any) => {
  return (
    <>
      {/* <div className="h-6 w-6 border rounded-md "></div> */}
      <Selector item={item} />
      <AccountDisplay data={item} />
      <ProductDisplay data={item} />
      <Link
        target="_blank"
        href={item.bioLink || "/"}
        className="text-sm underline whitespace-nowrap text-ellipsis overflow-hidden"
      >
        {item.bioLink}
      </Link>
    </>
  );
};

const SecondaryRow = ({ item }: any) => {
  return (
    <>
      <span className="min-w-[150px] pr-10 flex items-center   ">
        <StatDisplay displayValue={item.stats.likes} />
      </span>
      <span className="min-w-[150px]  pr-10 flex items-center">
        <StatDisplay displayValue={item.stats.followers} />
      </span>
      <span className="min-w-[150px] pr-10 flex items-center">
        <StatDisplay displayValue={item.stats.posts} />
      </span>
    </>
  );
};

const RowButtons = ({ item }: any) => {
  const { collection, hideItems } = useContext(TableContext)!;
  return (
    <>
      <RemoveCollectionButton
        variant="secondary"
        size="xsm"
        accountId={item.recordId}
        collection={collection}
        hideItems={hideItems}
        className="bg-transparent w-full justify-center  flex  h-full items-center rounded-none"
      />
      <Link
        href={`accounts/account/${item.recordId}`}
        className={cn(
          buttonVariants({
            variant: "secondary",
            size: "xsm",
          }),
          "w-full justify-center  flex  h-full items-center rounded-none bg-transparent"
        )}
      >
        <Icons.analytics className="h-5 w-5 " />
      </Link>
    </>
  );
};

const SelectedPreview = () => {
  const { selectedRows, setSelectedRows, tableData, hideItems, collection } =
    useContext(TableContext)!;

  return (
    <>
      {selectedRows.length > 0 && (
        <div className="fixed bottom-10 z-40 fade-in left-1/2 -translate-x-1/2 h-10 w-fit border rounded-md bg-background mb-2 flex justify-between p-2 gap-4 items-center mx-auto">
          <h1 className="font-bold">{`${selectedRows.length} ${
            selectedRows.length > 1 ? "accounts" : "account"
          } selected`}</h1>

          <Button
            variant="outline"
            size="xsm"
            onClick={() => setSelectedRows([])}
          >
            reset
          </Button>
          <RemoveMultiAccountCollectionButton
            accountList={selectedRows}
            setSelectedRows={setSelectedRows}
            collection={collection}
            hideItems={hideItems}
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

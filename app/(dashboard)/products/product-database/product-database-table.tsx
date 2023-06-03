import React, { useState, ReactNode, useRef, useContext } from "react";
import Image from "next/image";
import ScrollBar from "@/components/scroll-bar";
import Skeleton from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types";

import { productDatabaseConfig } from "@/config/dashboard";
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";
import { Icons } from "@/components/icons";
import { UpdateMultiCollectionButton } from "@/components/buttons/update-multi-collection-button";
import CreateCollectionButton from "@/components/buttons/create-collection-button";
import { LinkButton } from "@/components/ui/link";

const PrimaryHeaders = productDatabaseConfig.tableHeaders.primaryHeaders;
const SecondaryHeaders = productDatabaseConfig.tableHeaders.secondaryHeaders;

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
  data: ProductType[];
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
      <div className="w-full relative  h-fit border rounded-md ">
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
          className="flex w-full overflow-x-scroll scrollbar-hide relative bg-background rounded-md"
        >
          <div
            ref={heightRef}
            className="min-w-[600px] w-[100%] flex flex-col sticky left-0 z-20 "
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
                className="bg-background w-full p-4 grid grid-cols-[40px_2fr_1fr] sticky items-center  border border-b-0 border-x-0   h-32"
              >
                <PrimaryRow item={item} />
              </div>
            ))}
          </div>
          {/* <div className="flex flex-col w-full  ">
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

            {data.map((item: ProductType, i: number) => (
              <div
                key={i}
                className="bg-background w-full overflow-hidden p-4  flex relative border border-x-0  border-b-0  h-32 pr-10"
              >
                <SecondaryRow item={item} />
              </div>
            ))}
          </div> */}
        </div>

        <div
          ref={buttonContainerRef}
          className="flex flex-col absolute right-0 z-20  top-0  h-fit border-t "
        >
          {data.map((data: any, indx: number) => (
            <div
              key={indx}
              className=" w-10 z-20  grid grid-rows-2 items-center border-b border-border border-l  bg-background h-32 "
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
    <div className="w-full p-4 grid grid-cols-[40px_2fr_1fr] sticky  min-h-[60px] items-center   ">
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
      <Icons.chevronDown
        className={`${
          descend ? "rotate-0" : "rotate-180"
        } h-6 w-6 ml-2 transition-all`}
      />
    </Button>
  );
};

interface PrimaryRowProps {
  item: ProductType;
}

const PrimaryRow = ({ item }: PrimaryRowProps) => {
  return (
    <>
      <Selector item={item} />
      <div className="grid grid-cols-[80px_1fr] gap-4 items-center">
        <div className="h-20 w-20 relative rounded-md overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className="font-bold">{item.title}</h1>
      </div>
      <LinkButton
        target="_blank"
        variant="link"
        href={item.supplierUrl || "/"}
        className="text-sm underline whitespace-nowrap text-ellipsis overflow-hidden w-fit "
      >
        <Icons.aliExpress className="text-primary b-b" />
      </LinkButton>
    </>
  );
};

interface SecondaryRowProps {
  item: ProductType;
}

const SecondaryRow = ({ item }: SecondaryRowProps) => {
  return (
    <>
      <span className="min-w-[150px] pr-10 flex items-center">
        {item.accounts.length}
      </span>
      <span className="min-w-[150px]  pr-10 flex items-center">12</span>
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
      >
        <Icons.addCollection className="h-5 w-5 " />
      </UpdateCollectionButton>

      <LinkButton
        variant="secondary"
        size="xsm"
        className="w-full justify-center  flex  h-full items-center rounded-none bg-transparent"
        href={`/accounts/account/${data.recordId}`}
      >
        <Icons.analytics className="h-5 w-5" />
      </LinkButton>
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
          >
            <Icons.addCollection className="h-5 w-5 " />
            Add to a collection
          </UpdateMultiCollectionButton>
          <CreateCollectionButton
            variant="default"
            accountArray={selectedRows}
          />
        </div>
      )}
    </>
  );
};

interface SelectorProps {
  item: ProductType;
}

const Selector = ({ item }: SelectorProps) => {
  const { selectedRows, setSelectedRows } = useContext(TableContext)!;

  const selected = selectedRows.includes(item.id);

  const handleClick = () => {
    if (selected) {
      setSelectedRows(selectedRows.filter((_item: any) => _item !== item.id));
    } else {
      setSelectedRows([...selectedRows, item.id]);
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

  const handleClick = () => {
    if (selected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map((item: any) => item.id));
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

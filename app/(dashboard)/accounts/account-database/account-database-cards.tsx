import { AccountCard, AccountCardSkeleton } from "@/components/display-cards";

const CardDisplay = ({ accountDataBaseData }: any) => {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 h-full  ">
      {accountDataBaseData ? (
        <>
          {accountDataBaseData.map((account: any, i: number) => (
            <AccountCard key={i} data={account} />
          ))}
        </>
      ) : (
        <>
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <AccountCardSkeleton key={i} />
            ))}
        </>
      )}
    </div>
  );
};

export default CardDisplay;

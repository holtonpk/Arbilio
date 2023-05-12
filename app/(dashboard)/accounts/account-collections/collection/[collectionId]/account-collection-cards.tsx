import {
  CollectionCard,
  AccountCardSkeleton,
} from "@/components/display-cards";

const CardDisplay = ({ accountDataBaseData, collection }: any) => {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 ">
      {accountDataBaseData ? (
        <>
          {accountDataBaseData.map((account: any) => (
            <CollectionCard key={account.id} data={account} />
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

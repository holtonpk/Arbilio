const Skeleton = ({ height, width }: any) => {
  return (
    <div
      className="w-ful h-full bg-accent rounded-md   loading-skeleton"
      style={{ height: height, width: width }}
    ></div>
  );
};

export default Skeleton;

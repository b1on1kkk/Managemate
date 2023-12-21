export default function Loading() {
  const fakeArray = new Array(3).fill(0);

  return (
    <div className="w-full flex justify-center mt-3 gap-3 items-center">
      {fakeArray.map((_, idx) => {
        return (
          <div className="w-3 h-3 bg-indigo-500 rounded-full" key={idx}>
            <div className="w-3 h-3 bg-indigo-500 animate-ping rounded-full"></div>
          </div>
        );
      })}
    </div>
  );
}

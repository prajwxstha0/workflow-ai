function HowItWorks() {
  const columns = [
    { label: "To Do", color: "bg-violet-200 text-violet-900" },
    { label: "Doing", color: "bg-amber-100 text-amber-900" },
    { label: "Done", color: "bg-pink-200 text-pink-900" },
  ];

  return (
    <section id="howitwork" className="max-w-5xl mx-auto px-6 pb-20 mt-20">
      <div className="rounded-2xl overflow-hidden bg-gray-900 p-10 flex items-center justify-center gap-4">
        {columns.map((col) => (
          <div
            key={col.label}
            className={`${col.color} rounded-lg px-8 py-6 font-bold text-2xl rotate-[-2deg] shadow-lg`}
          >
            {col.label}
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
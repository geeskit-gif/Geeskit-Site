import React from "react";

type Answer = {
  question: string;
  answer: string;
  action: string;
  tool: "tool-job-profit" | "tool-hourly-rate" | "tool-interruption";
};

const ANSWERS: Answer[] = [
  {
    question: "How to Calculate Job Profit",
    answer: "Subtract materials, labor, overhead, and taxes from the revenue you collected. Compare the result with the hours worked to see both net profit and effective hourly earnings.",
    action: "OPEN JOB PROFIT CALCULATOR",
    tool: "tool-job-profit",
  },
  {
    question: "How to Calculate Your Hourly Rate",
    answer: "Add the income, expenses, and profit buffer you need, then divide by your real billable hours after non-billable time and time off. That gives you a rate built around your actual capacity.",
    action: "OPEN HOURLY RATE CALCULATOR",
    tool: "tool-hourly-rate",
  },
  {
    question: "How Much Do Employee Interruptions Cost?",
    answer: "Multiply employees by interruptions per day and minutes lost per interruption, then apply the average hourly wage. Annualizing the result shows the cost, hours lost, and approximate FTE capacity consumed.",
    action: "OPEN INTERRUPTION COST CALCULATOR",
    tool: "tool-interruption",
  },
  {
    question: "How Much Should I Charge for a Job?",
    answer: "Start with every direct and indirect cost, account for taxes, and set the margin you want to keep. The calculator works backward from those inputs to show the revenue your job needs.",
    action: "OPEN JOB PROFIT CALCULATOR",
    tool: "tool-job-profit",
  },
];

export default function Answers({ onOpen }: { onOpen: (tool: Answer["tool"]) => void }) {
  return (
    <section className="mx-auto max-w-[1000px] px-5 md:px-8 py-12 md:py-20">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] tracking-[0.28em] text-[#E11D33] mono">02 / ANSWERS</span>
          <span className="w-10 h-px bg-white/10" />
        </div>
        <h1 className="text-[32px] md:text-[48px] leading-[0.95] font-bold tracking-[-0.01em]">
          <span className="text-white">CLEAR ANSWERS.</span> <span className="text-[#E11D33]">USEFUL ACTION.</span>
        </h1>
        <p className="mt-5 max-w-[620px] text-[14px] leading-[1.7] text-[#A1A1AA]">
          Short explanations for common pricing, profit, and productivity questions—with a calculator ready when you need a number.
        </p>
      </div>

      <div className="grid gap-4">
        {ANSWERS.map((item, index) => (
          <article key={item.question} className="border border-white/[0.07] bg-[#101014] p-6 md:p-7" style={{ clipPath: "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)" }}>
            <div className="flex items-start gap-4">
              <span className="text-[11px] tracking-[0.2em] text-[#E11D33] mono border border-[#E11D33]/20 px-2 py-1 bg-[#E11D33]/10">0{index + 1}</span>
              <div className="flex-1">
                <h2 className="text-[18px] font-semibold text-white">{item.question}</h2>
                <p className="mt-3 text-[13px] leading-[1.7] text-[#A1A1AA]">{item.answer}</p>
                <button onClick={() => onOpen(item.tool)} className="mt-5 flex items-center gap-3 text-[11px] tracking-[0.16em] text-white hover:text-[#E11D33] transition-colors">
                  {item.action}<span className="text-[16px]">→</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

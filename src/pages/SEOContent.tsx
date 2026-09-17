import React from "react";

interface SEOContentProps {
  onTool: (tool: "tool-job-profit" | "tool-hourly-rate" | "tool-interruption") => void;
}

const articles = [
  {
    title: "How to Calculate Job Profit",
    description:
      "Understand what a job really earns after materials, labor, overhead, and taxes.",
    tool: "tool-job-profit" as const,
    sections: [
      ["Revenue", "Start with the total amount the customer pays for the job."],
      ["Costs", "Account for materials, labor, and overhead rather than looking only at revenue."],
      ["Net profit", "After costs and applicable taxes, the amount left is your estimated net profit."]
    ]
  },
  {
    title: "How to Calculate Your Hourly Rate",
    description:
      "Work out an hourly rate that accounts for your income goals, expenses, taxes, and billable time.",
    tool: "tool-hourly-rate" as const,
    sections: [
      ["Start with what you need", "Include the income you want plus the expenses your work must cover."],
      ["Account for taxes", "Your rate needs to leave enough room for the portion of income that goes to taxes."],
      ["Account for non-billable time", "Not every working hour can be charged to a client, so your available billable hours matter."]
    ]
  },
  {
    title: "How Much Do Employee Interruptions Cost?",
    description:
      "See how repeated interruptions can turn small amounts of lost time into a measurable business cost.",
    tool: "tool-interruption" as const,
    sections: [
      ["Measure the interruption", "Estimate how often interruptions happen and how long each one lasts."],
      ["Multiply across employees", "A small loss repeated across a team can become significant."],
      ["Put a value on the time", "Using an hourly labor cost turns lost time into a measurable financial figure."]
    ]
  },
  {
    title: "How Much Should I Charge for a Job?",
    description:
      "A practical way to think about pricing using your real costs and desired profit.",
    tool: "tool-job-profit" as const,
    sections: [
      ["Know your costs", "Identify materials, labor, and overhead before deciding what to charge."],
      ["Think about margin", "A markup on costs is not automatically the same as your desired profit margin."],
      ["Work backward", "Start with the profit you want and determine the revenue required to reach it."]
    ]
  }
];

export default function SEOContent({ onTool }: SEOContentProps) {
  return (
    <main className="min-h-screen bg-[#050507] text-[#F5F5F7] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-[#E11D33] mb-4">
          GEESKIT / ANSWERS
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
          Questions worth answering.
        </h1>

        <p className="text-lg text-white/60 max-w-2xl mb-16">
          Practical answers to money, work, and business questions — with
          useful tools when you need to go further.
        </p>

        <div className="space-y-16">
          {articles.map((article) => (
            <article
              key={article.title}
              className="border-l-2 border-white/10 pl-6 md:pl-10"
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                {article.title}
              </h2>

              <p className="text-white/50 max-w-3xl mb-8">
                {article.description}
              </p>

              <div className="space-y-6 max-w-3xl">
                {article.sections.map(([heading, text]) => (
                  <section key={heading}>
                    <h3 className="text-lg font-medium mb-2">{heading}</h3>
                    <p className="text-white/60 leading-7">{text}</p>
                  </section>
                ))}
              </div>

              <button
                onClick={() => onTool(article.tool)}
                className="mt-8 px-6 py-3 border border-[#E11D33]/50 text-sm tracking-[0.15em] hover:bg-[#E11D33]/10 transition"
              >
                USE THE GEESKIT TOOL →
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
    }

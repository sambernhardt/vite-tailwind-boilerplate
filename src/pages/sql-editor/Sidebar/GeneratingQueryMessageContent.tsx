import { useEffect, useMemo, useRef, useState } from "react";

// Constants
const TICK_MS = 25;
const PX_PER_CHAR = 8;

type Part =
  | { type: "code"; width: number; key: string }
  | { type: "spacer"; width: number; key: string };

type Line = Part[];

// Build parts per line (no animationDelay; we’ll stream by count)
function makeLines(code: string): Line[] {
  const lines = code.split("\n");
  let seq = 0;
  return lines.map((line) => {
    const parts = line.split(/(\s+)/);
    return parts.map<Part>((part) => {
      const width =
        part.trim() === ""
          ? part.length * PX_PER_CHAR
          : part.length * PX_PER_CHAR;
      const type = part.trim() === "" ? "spacer" : "code";
      return { type, width, key: `${seq++}` };
    });
  });
}

// Flatten <-> group helpers
function flattenLines(lines: Line[]): Part[] {
  return lines.flat();
}

function groupToLines(parts: Part[], originalLines: Line[]): Line[] {
  const out: Line[] = [];
  let cursor = 0;
  for (const line of originalLines) {
    const take = parts.slice(cursor, cursor + line.length);
    cursor += line.length;
    if (take.length) out.push(take);
  }
  return out;
}

const Spacer = ({ width }: { width: number }) => (
  <div className="shrink-0" style={{ width, height: 0 }} />
);

const Code = ({ width }: { width: number }) => (
  <div
    className="shrink-0 h-1.5 rounded-[4px] bg-muted-foreground/20 will-change-transform animate-[fadeInUp_150ms_ease-out]"
    style={{ width }}
  />
);

// Streams N parts visible over time
function useStream(total: number, tickMs = TICK_MS) {
  const [visible, setVisible] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    function step(ts: number) {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const next = Math.min(total, Math.floor(elapsed / tickMs));
      if (next !== visible) setVisible(next);
      if (next < total) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [total, tickMs]); // eslint-disable-line react-hooks/exhaustive-deps

  return visible;
}

const codeSample = `

-- Welcome to the SQL Editor
-- Write your SQL queries here

SELECT 
    users.id,
    users.name,
    users.email,
    COUNT(orders.id) as order_count,
    SUM(orders.total) as total_spent
FROM users
LEFT JOIN orders ON users.id = orders.user_id
WHERE users.created_at >= '2024-01-01'
GROUP BY users.id, users.name, users.email
HAVING COUNT(orders.id) > 0
ORDER BY total_spent DESC
LIMIT 100;

-- You can write multiple queries
-- Each query can be executed separately

SELECT * FROM products 
WHERE category = 'electronics' 
AND price BETWEEN 100 AND 1000
ORDER BY price ASC;

-- More sample content to demonstrate scrolling
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- Another query example
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', order_date) as month,
        SUM(total) as monthly_total
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT 
    month,
    monthly_total,
    LAG(monthly_total) OVER (ORDER BY month) as prev_month,
    ROUND(
        ((monthly_total - LAG(monthly_total) OVER (ORDER BY month)) / 
         LAG(monthly_total) OVER (ORDER BY month)) * 100, 2
    ) as growth_rate
FROM monthly_sales
ORDER BY month;
`.trim();

const PlaceholderLinesOfCode = () => {
  const originalLines = useMemo(() => makeLines(codeSample), []);
  const flat = useMemo(() => flattenLines(originalLines), [originalLines]);
  const visibleCount = useStream(flat.length, TICK_MS);
  const visibleParts = flat.slice(0, visibleCount);
  const visibleLines = groupToLines(visibleParts, originalLines);

  return (
    <div className="flex flex-col gap-1.5 overflow-hidden transition-[height] duration-300 ease-out">
      {visibleLines.map((line, i) => (
        <div key={`line-${i}`} className="flex gap-0.5">
          {line.map((p) =>
            p.type === "code" ? (
              <Code key={p.key} width={p.width} />
            ) : (
              <Spacer key={p.key} width={p.width} />
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default function GeneratingQueryMessageContent({
  content,
}: {
  content: string;
}) {
  return (
    <div className="border border-border/50 rounded-lg w-full mt-1 overflow-hidden bg-accent">
      {/* <p className="text-[13px] text-muted-foreground">{content}</p> */}
      <div className="relative p-4 ">
        <div className="flex items-end h-[40px]">
          <PlaceholderLinesOfCode />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent" />
      </div>
    </div>
  );
}

/* CSS (Tailwind + a tiny keyframe)
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
*/

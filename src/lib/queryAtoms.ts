import { atom } from 'jotai';

// Default SQL content
const DEFAULT_SQL = `-- Welcome to the SQL Editor
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
ORDER BY month;`;

// Atom for the current query title
export const queryTitleAtom = atom<string>('Aave TVL by asset');

// Atom for the current SQL query text
export const querySqlAtom = atom<string>(DEFAULT_SQL);

// Derived atom that combines both for easy access
export const queryContextAtom = atom((get) => ({
  title: get(queryTitleAtom),
  sql: get(querySqlAtom),
}));

import pandas as pd
import json

# ======================
# LOAD DATA
# ======================
sales = pd.read_csv("data/sales_train_validation.csv")
prices = pd.read_csv("data/sell_prices.csv")

# ======================
# TOTAL SALES
# ======================
sales["total_sales"] = sales.iloc[:, 6:].sum(axis=1)

# ======================
# TOP PRODUCTS (80/20)
# ======================
top = sales.groupby("item_id")["total_sales"].sum().sort_values(ascending=False)
top10 = top.head(10)

top_share = round(top10.sum() / top.sum() * 100, 2)

# ======================
# SEASONALITY
# ======================
daily_sales = sales.iloc[:, 6:].sum().values.tolist()

# ======================
# PRICE VS SALES
# ======================
price_avg = prices.groupby("item_id")["sell_price"].mean()
sales_avg = sales.groupby("item_id")["total_sales"].sum()

df = pd.concat([sales_avg, price_avg], axis=1).dropna()
df.columns = ["sales", "price"]
df = df.sample(min(400, len(df)))

# ======================
# OUTPUT
# ======================
output = {
    "insights": {
        "top_share": top_share
    },
    "top_products": {
        "labels": top10.index.tolist(),
        "values": top10.values.tolist()
    },
    "seasonality": daily_sales[:500],
    "price_scatter": {
        "x": df["price"].tolist(),
        "y": df["sales"].tolist()
    }
}

with open("website/data.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2)

print("OK")
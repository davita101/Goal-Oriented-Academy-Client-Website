car = {
    # key  : value
    "brand": "ford",
    "year" : 1965,
}
# get items from dictionary
print(car["brand"]) # ford
print(car.get("brand")) # ford

# add item to dictionary
car["color"] = "red"
car.setdefault("type", "mustang")

print(car)
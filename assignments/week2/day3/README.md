# Aggregation Framework

1. Find all the zip codes in Iowa state.

```javascript
db.zips.aggregate([
	{$match: {state: 'IA'}},
	{$group: {
		_id: '$state',
		state: {$first: '$state'},
		zip_codes: {$addToSet: '$_id'}}
	},
	{$project: {
		_id: 0,
		state: 1,
		zip_codes: 1
	}}
])
```

```javascript
db.zips.aggregate([
	{$match: {state: 'IA'}},
	{$project: {
		_id: 0,
		state: 1,
		zip_code: '$_id'
	}}
])
```

2. Find all the zip codes with a population less than 1000.

```javascript
db.zips.aggregate([
	{$match: {pop: {$lt: 1000}}},
	{$project: {
		_id: 0,
		zip_code: '$_id',
		pop: 1
	}}
])
```

3. Find all cities that have more than one zip code, sort the results based by state and city name.

```javascript
db.zips.aggregate([
	{$group: {_id: "$city"}},
	{$project: {
		_id: 0,
		zip_code: '$_id',
		pop: 1
	}}
])
```

4. Display the least populated city in each state.

```javascript

```
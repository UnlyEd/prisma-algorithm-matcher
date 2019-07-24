
# Conditional Operator   
 This document describes the list of every conditional operator available in src/conditionalOperators.ts  
 
## Flags  
in this algorithm you can add some flag in the context (see example for applications) those flags are used to add a  specific behavior to this variable for the moment only the flag i (no hard case is implemented)  
  
### example  
```js  
const context = {  
 'name':'Unly',  
 'name__flags':['i']}  
```  
  
## Equal
 
### definition  
	 This operator compares two elements and return true if there are equal for the objects the equivalent is base on the content. it's also the default conditional operator 

### alias  
* equals  
* eq  
  
### example  
```js  
const context = {  
 'school':{  
 'name':'Unly',  
 'city':'lyon',  
 'city__flags':['i'],  
 'Postal_code':69000,
 }  
}  
check(context, 'school_name__eq', 'Unly'); //true  
check(context, 'school_name__equals', 'unly'); //false  
check(context, 'school_city__equals', 'LYON'); //true  
check(context, 'school', {'name':'Unly','Postal_code':69000,}); //true  
```  
  
## Not Equal  
  
### definition  
	 check if two objects are different   
   
### alias  
* notEquals  
* ne  
  
### example  
```js  
const context = {  
 'school':{  
 'name':'Unly',  
 'city':'lyon',  
 'city__flags':['i'],  
 'Postal_code':69000,
 }  
}  
check(context, 'school_name__ne', 'Unly'); //false  
check(context, 'school_name__notEquals', 'unly'); //true  
check(context, 'school_city__notEquals', 'LYON'); //false  
check(context, 'school__ne', {'name':'Unly','Postal_code':69000,}); //false  
```  
  
## StartsWith  

### definition  
	 check if a string start with another
   
### alias  
* startsWith  
* sw  
  
### example  
```js  
const context = {  
 'school':{  
 'name':'Unly',  
 'city':'lyon',  
 'city__flags':['i'],  
 'Postal_code':69000,  
 }  
}  
check(context, 'school_name__sw', 'Un'); //true  
check(context, 'school_name__sw', 'un'); //false  
check(context, 'school_city__sw', 'LY'); //true  
```  
  
## EndWith  
  
### definition   
	 check if a string finish by another

### alias
 * endsWith  
* ew  
  
### example  
  
```js  
const context = {  
 'school':{  
 'name':'Unly',  
 'city':'lyon',  
 'city__flags':['i'],  
 'Postal_code':69000,  
 }  
}  
  
check(context, 'school_name__sw', 'ly'); //true  
check(context, 'school_name__sw', 'LY'); //false  
check(context, 'school_city__sw', 'ON'); //true  
```  
  
## Contains  
  
### definition   
	check if a string contains a given string, if an array contained a specific element or if an object contained another object

 ### alias  
* contains  
* includes  
* in

### example

```js  
const context = {  
 "name":"Paul",  
 "location":{  
  "city":"lyon",  
  "post_code":69000  
 },  
 "campus":[42, "Unly"]  
 "campus__flags":['i']  
}  
check(context, 'school_name__in', 'aul'); //true  
check(context, 'school_location__in', {'city':"lyon"}); //true  
check(context, 'school_campus__in', 42); //true  
check(context, 'school_campus__in', 'Unly'); //true  
check(context, 'school_campus__in', 'unly'); //true  
```

## Contains  
  
### definition   
	the opposite of « contain » check if a string does not contain another given string, if an array don't contain a specific element or if an object doesn't contain another object 

### alias  
* notContains  
* notIncludes  
* nin

### example

```js  
const context = {  
 "name":"Paul",  
 "location":{  
  "city":"lyon",  
  "post_code":69000  
 },  
 "campus":[42, "Unly"]  
 "campus__flags":['i']  
}  
check(context, 'school_name__in', 'aul'); //flase  
check(context, 'school_location__in', {'city':"lyon"}); //false  
check(context, 'school_campus__in', 42); //false
check(context, 'school_campus__in', 'Unly'); //false
check(context, 'school_campus__in', 'unly'); //false 
```

## GreaterThan

### definition   
	check if a value is greater than another 

### alias  
* greaterThan  
* gt

### example

```js  
const context = {  
 "name":"Paul",
 'GPA':3,
} 
check(context, 'GPA__gt', 2) //true
check(context, 'GPA__gt', '2') //true
```

## GreaterThanEquals

## definition 
	check if a value is greater or equal than another 


### alias  
* greaterThanEquals  
* gte

### example

```js  
const context = {  
 "name":"Paul",
 'GPA':3,
}  
check(context, 'GPA__gte', 3) //true
check(context, 'GPA__gte', '2') //true
```

## LessThan

### definition   
	check if a value is less than another 


### alias  
* lessThan  
* lt

### example

```js  
const context = {  
 "name":"Paul",
 'GPA':3,
} 
check(context, 'GPA__lt', 4) //true
check(context, 'GPA__lt', '4') //true
```
## LessThanEquals

## definition 
	check if a value is less or equal than another 

### alias  
* lessThanEquals  
* lte
### example

```js  
const context = {  
 "name":"Paul",
 'GPA':3,
}  
check(context, 'GPA__lte', 3) //true
check(context, 'GPA__lte', '4') //true
```

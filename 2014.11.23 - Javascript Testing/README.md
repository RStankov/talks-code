Testing Javascript
==================

Demo code for my "Testing Javascript" talk at [js.next();](http://jsnext.net)

Slides can be found at [Speaker Deck](https://speakerdeck.com/rstankov/testing-javascript).


### Installation:

```
bower install
npm install
```

### Running tests

With grunt:

```
grunt --example=test_rspec_style
grunt --example=test_xunit_style
grunt --example=search_1_initial
grunt --example=search_2_test_split
grunt --example=search_3_bdd_style
grunt --example=search_4_extract_object
grunt --example=search_5_extracted_object_with_test
grunt --example=async_test
```

In browser:

```
open ./runner.html?example=test_rspec_style
open ./runner.html?example=test_xunit_style
open ./runner.html?example=search_1_initial
open ./runner.html?example=search_2_test_split
open ./runner.html?example=search_3_bdd_style
open ./runner.html?example=search_4_extract_object
open ./runner.html?example=search_5_extracted_object_with_test
open ./runner.html?example=async_test
```

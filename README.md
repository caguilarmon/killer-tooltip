Killer Tooltips library
======

What is Killer-Tooltips?
------
Killer-Tooltips is an ES6/jQuery library to add tooltips with custom settings...

[Click here for a live preview.](https://caguilarmon.github.io/killer-tooltip/test/)

Operating instructions
------
**Parameters**

|Name                       |Type    |Description                                                  |Required |
|---------------------------|--------|-------------------------------------------------------------|---------|
|settings.tooltipPosition   |string  |Tooltip position                                             |Yes      |


**Sample initialization:**
```javascript
tooltip({tooltipClass:'.tooltip', tooltipPosition:'bottom'});
```

Directory Layout
------
```
├── /src/                       # The source code for Killer Tooltips
│   ├── /css/                   # The styles used to create the tooltips
│   ├── /js/                    # JS source code for the tooltip
├── /test/                      # Contains sample tooltips in use
│   ├── /css/                   # The styles for the sample tooltips
│   ├── /js/                    # JS initialization sample for the tooltips
│   └── index.html              # The tooltip's index file
│── .gitignore                  # Git ignore rules
└── README.md                   # Information about Killer Tooltips
```

Author
------
**Carlos Aguilar Montoya**
 * [github.com/caguilarmon](https://github.com/caguilarmon)

Copyright and licensing information
------
Copyright (c) 2018 Carlos Aguilar Montoya Released under the MIT license

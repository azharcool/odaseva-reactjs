# Odaseva Subupquery UI


## Source Data

We loaded source data as if it was coming from the Odaseva platform internal services, in the `src-data` folder.


### Individual Object descriptions
For individual object parent/children/field information, the data is located in:
```
./src-data/SObjects/min/<OBJECTAPINAME>.min.json
```


`"l":` is the label (public name) of the object

`"p":` is a collection of the **parent** objects

`"c":` is a collection of the **children** objects


Inside the collection, each related object is represented by a key of its API name (e.g. `"Account":`), and is an array of the different fields and their relation name (public name) that creates the relationship with the current object.

`"rf":` is the field API name

`"rl":` is the label (public name) of the field (aka relationship name)

**EXAMPLE of the data format with the truncated `Account.json` for the `Account` standard object**
```
{
    "l": "Account",
    "p": {
        "Account": [
            {
                "rf": "ParentId",
                "rl": "Parent Account ID"
            },
            {
                "rf": "OwnerId",
                "rl": "Owner ID"
            },
            {
                "rf": "DandbCompanyId",
                "rl": "D&B Company ID"
            }
        ]
    },
    "c": {
        "Account": [
            {
                "rf": "ParentId",
                "rl": "ChildAccounts"
            }
        ],
        "AccountChangeEvent": [
            {
                "rf": "ParentId",
                "rl": ""
            }
        ],
        "AccountCleanInfo": [
            {
                "rf": "AccountId",
                "rl": "AccountCleanInfos"
            }
        ],
        "AccountContactRole": [
            {
                "rf": "AccountId",
                "rl": "AccountContactRoles"
            }
        ],
        "AccountContactRoleChangeEvent": [
            {
                "rf": "AccountId",
                "rl": ""
            }
        ],
        "AccountFeed": [
            {
                "rf": "ParentId",
                "rl": "Feeds"
            }
        ],
        "AccountHistory": [
            {
                "rf": "AccountId",
                "rl": "Histories"
            }
        ]
    }
}
```


## Output Data

Output data is the `SubUpQueries` JSON Array. Below is the template

### What is a Subquery or an Upquery?

**Subquery:** the Target Record is a child record = has a field that contains the ID of the parent record we currently know

`SELECT * FROM TargetObject WHERE TargetRecord.TargetFielId = CurrentObject.Id`

**Upquery:** the Target Record is a parent record = we search for the parent with its ID, from the field value we currently know in the child


`SELECT * FROM TargetObject WHERE TargetRecord.Id = CurrentObject.FieldContainingRelationshipInSource`

**Note the place of `Id` in the two above examples.**

### What the back-end needs to process the subupqueries

**Template available in `src-data/subupquerytemplate.json`:**
```
"SubUpQueries": [
    {
      "nodeId": "UUID",//UUID autogenerate
      "parentNodeId": null, // nodeId
      "nodeLabel":"", // userfriendly name
      "queryMode": "Root", // Root, Upquery, Subquery
      "rootInput":, // null, All, Nodes
      "sourceNodeIds": ["UUID","UUID"], // Array of Node IDs should be null if querymode is not Root, if null behavior is parentNodeId
      "objectName":"ObjectTargetedAPIName",
      "fieldName":"FieldContainingRelationshipInTarget",
      "parentNodeFieldName":"FieldContainingRelationshipInSource",
      "filterType": "customArithmetic", // customString, customArithmetic
      "customArithmetic":"(1AND2)OR(3AND4)",
      "filter": [["name", "=", "name1"], ["custom__c","=","test"],["name", "=", "name1"], ["custom__c","=","test"]],
      "recordsSampling":[
        {
            "limit":500,
            "orderBys":[
                {
                    "fieldName":"",
                    "direction":"",//ASC OU DESC
                    "nullOption":""// NULLS {FIRST|LAST}
                }
            ]
        }
      ],
      "extractionParameters":{
        "api":"REST"
        //ADD query specific parameters (from Backup, see what is useful: batch size, all BULK query parameters)
      }
      
    }
]
```

`"nodeId"` (UUID) the node ID to generate for each node

`"parentNodeId"` (UUID) the parent node, used to build the tree

`"nodeLabel"` (string) user friendly display name that can be created by the user

`"queryMode"` (`root`, `upquery`, `subquery`) 3 options to define how the back end interprets the field definitions

`"rootInput"` (`null`, `all`, `nodes`) if querymode is ROOT: 3 options to define what mode of source IDs we're using in the back end

`"sourceNodeIds"` (Array of UUIDs) if `queryMode` is `root` and `rootInput` is `nodes`, the user can define which nodes we're taking the IDs from

`"objectName"` (String) the API name (e.g. `Account` or `Custom_Object__c`) of the object we're targeting

`"fieldName"` (String) the API name of the **targeted** field that contains the relationship

`"parentNodeFieldName"` (String) the API name of the **source** field that contains the other end of the relationship

`"filterType"` TBD

`"customArithmetic"` TBD

`"filter"` TBD

`"recordsSampling"` TBD

`"extractionParameters"` TBD
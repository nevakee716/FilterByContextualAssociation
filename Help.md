| **Name** | **Filter By Contextual Association** | **Version** | 1.0 |
| --- | --- | --- | --- |
| **Updated by** | Mathias PFAUWADEL |

## Description 
Allow you to filter items on a node depending on a Contextual association with the first parent

## Installation
https://github.com/casewise/cpm/wiki

## Parameter setup 

DisplayName : Set the layout javascript class name you want to use to display this node

Filter In : Set the id of the node which should be display if the Contextual association exist

Filter Out : Set the id of the node which should be display if the Contextual association not exist

## How to set association filter
### Exemple 1
Here with have the following metamodel
country associated with organisation
organisation associated with sites
country associated with sites

We want to display the following list :
- country
  - organisation
    - sites

If we use the classic list, we would obtain this

![](https://raw.githubusercontent.com/nevakee716/FilterByContextualAssociation/master/screen/1.png) 

Here we can see a problem, cause S&E Europe contains cities from Belgium and France, so we have french cities under Belgium 

To solve this situation, we need to use the layout filter by contextual Association, like this : 
![](https://raw.githubusercontent.com/nevakee716/FilterByContextualAssociation/master/screen/3.png)
and here is the result

![](https://raw.githubusercontent.com/nevakee716/FilterByContextualAssociation/master/screen/2.png)

### Exemple 2
Here with have the following metamodel
Sites associated with MacroProcess
MacroProcess with BusinessProcess
BusinessProcess associated with SubProcess
We also have Sites associated with SubProcess

We want to display
- Sites
  - MacroProcess
    - BusinessProcess
      - SubProcess

And like exemple 1, some SubProcess are not present in some Sites. 
By configuring Filter By Contextual Association like this : 
![](https://raw.githubusercontent.com/nevakee716/FilterByContextualAssociation/master/screen/4.jpg)
We can display the SubProcess whichare present in the site and the ones not present in the site.
![](https://raw.githubusercontent.com/nevakee716/FilterByContextualAssociation/master/screen/6.png)

![](https://raw.githubusercontent.com/nevakee716/FilterByContextualAssociation/master/screen/7.png)
Using custom display string, we can apply the style we want to our present and not present SubProcess and obtain this result
![](https://raw.githubusercontent.com/nevakee716/FilterByContextualAssociation/master/screen/5.png)

### Exemple 3
Here with have the following metamodel
Sites associated with Domains
Domains with MacroProcess
MacroProcess with BusinessProcess
BusinessProcess associated with Application
We also have Sites associated with BusinessProcess 
We also have Sites associated with Application

We want to display
- Sites
  - Domains 
    - MacroProcess
      - BusinessProcess
        - Application

And like exemple 1 and 2, some BusinessProcess and some Application are not present in some Sites. 

By configuring Filter By Contextual Association like this : 
![](https://raw.githubusercontent.com/nevakee716/FilterByContextualAssociation/master/screen/8.png)
We can display BusinessProcess which are present in the site and the ones not present in the site and we can also add
Application which are present in the site.
You can add as many node as you want in filter in, filter out.

**Be carefull the filter node should always be at the end **
If you look at the exemple the node site_20131_294625913(Business Process - Sites) is after the node Business Process - Application

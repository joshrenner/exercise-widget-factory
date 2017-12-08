# exercise-widget-factory

Create a single page app, using any frameworks of your choice, to accomplish the following task: 

Display multiple sets of widget production data and a user interface for modifying the way the data is displayed.

* The data should be presented in columns.
* The user should be able to add or remove columns.
* Each column should have a way for the user to change which data is displayed in the column.

User inputs for displaying data in a column:

* A timeframe with a numerical value, and a unit.  E.g. value: "5", unit: "hours". Units can be "hours" or "minutes". The timeframe is how far into the past to look.
* A factory. There are two factories, "Primary" and "Secondary".
* The data shown when a user changes the inputs for a column should change to reflect the input.

The data to display in a column is:

* The number and types of widgets from the given factory, that were produced within the selected timeframe.

For example: If the user selects "5 hours" and "Primary" factory, then the column will show the types and amounts of widgets produced in the last 5 hours from the Primary factory. 

Note: For the purposes of the exercise, you can assume the current time is "18:00" (6pm), and the sample data will have relative hours and minutes already calculated.

Example entry in the data set:

  {
    "time": "14:10:00",
    "hours_ago": 4,
    "minutes_ago": 230,
    "factory": "Primary",
    "widgets": {... }
  }

In this case, "hours_ago": 4 means that the data would be included if "4 hours" or greater or "230 minutes" or greater were selected in a column's timeframe, and the factory selected was "Primary".

You can load the sample data set in any way you want.

Sample data set: https://gist.github.com/gschueler/64c507964b8a275dc456a25d66a8ccc4

Deliverable:

* a source repo, (or zip of source code) 
* the source should include a file "index.html" and any other necessary files (including sample data)
* upon loading index.html in a browser, the solution interface should be presented

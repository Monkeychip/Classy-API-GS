function oneOffClassyF (){   

   cGoa.GoaApp.setPackage (PropertiesService.getScriptProperties() , {
    clientId:'',
    clientSecret:'',
    packageName: 'classy',
    service:'classy'
  });
}

function testClassyF () {

  var goa = cGoa.make('classy', PropertiesService.getScriptProperties());

  // check it worked
  if (!goa.hasToken()) {
    throw 'no token';
  }
  
  // use it
  var result = UrlFetchApp.fetch("https://api.classy.org/2.0//campaigns/148049/fundraising-pages?aggregates=true", {
    headers: {
      authorization:"Bearer " + goa.getToken()
    }
  });
  response_parsed = JSON.parse(result.getContentText()); //parsing the JSON
    Logger.log(response_parsed.data);
//    return response_parsed.data; //pull outside of object holding the array
  
  
  //Logger.log(result.getContentText())
    return response_parsed.data;
}



function pushSpreadsheet(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.setActiveSheet(ss.getSheets()[1]);
  var data = testClassyF(); //return parsed data array of an array 20 rows with xx data points
  var rows = [];
  var length = data.length; //speed up for loop
  for (i = 0; i < length; i++) {
    //use try statement in case of error
      dataTitle = data[i].title; 
      dataGoal = data[i].goal;
      dataTotal = data[i].total_donations; 
      dataRaised = data[i].total_raised;
      dataAvg = data[i].average_donation; 
      dataLgst = data[i].largest_donation; 
      dataPercent = data[i].percent_to_goal;
    
 //push to rows   
    rows.push([dataTitle]);    
    rows[i].push([dataGoal]); //pushing on another column
    rows[i].push([dataTotal]);
    rows[i].push([dataRaised]);
    rows[i].push([dataAvg]);
    rows[i].push([dataLgst]);
    rows[i].push([dataPercent]);
    
    Logger.log(rows);
  }

  // Logger.log(rows[1])
  dataRange = sheet.getRange(2, 1, rows.length, 7); 
  dataRange.setValues(rows);
 
}

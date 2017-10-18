function oneOffClassyD (){   

   cGoa.GoaApp.setPackage (PropertiesService.getScriptProperties() , {
    clientId:'',
    clientSecret:'',
    packageName: 'classy',
    service:'classy'
  });
}

function testClassyD () {

  var goa = cGoa.make('classy', PropertiesService.getScriptProperties());

  // check it worked
  if (!goa.hasToken()) {
    throw 'no token';
  }
  
  // use it
  var result = UrlFetchApp.fetch("https://api.classy.org/2.0/organizations/21095/transactions", {
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



function pushSpreadsheetD(){

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.setActiveSheet(ss.getSheets()[0]);
  var data = testClassyD(); //return parsed data array of an array 20 rows with xx data points
  var rows = [];
  var length = data.length; //speed up for loop

  for (i = 0; i < length; i++) {
    //use try statement in case of error
      dataCreated = data[i].purchased_at; //"purchased at"
      dataFN = data[i].member_name; //"member name"
      dataTotal = data[i].raw_total_gross_amount; //"raw_total_gross_amount
      dataCity = data[i].billing_city; //"billing city"
      dataState = data[i].billing_state; //"billing state"
      dataEmail = data[i].member_email_address; //"member email address"
      dataComment = data[i].comment; //"comment"

    rows.push([dataFN]); //pushing on another column
    rows[i].push([dataTotal]);
    rows[i].push([dataCity]);
    rows[i].push([dataState]);
    rows[i].push([dataEmail]);
    rows[i].push([dataComment]);
  }
  Logger.log(rows)
  dataRange = sheet.getRange(2, 1, rows.length, 6); 
  dataRange.setValues(rows);
 
}

//Run to remove duplicates
function removeDuplicates() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var newData = new Array();
  for(i in data){
    var row = data[i];
    var duplicate = false;
    for(j in newData){
      if(row.join() == newData[j].join()){
        duplicate = true;
      }
    }
    if(!duplicate){
      newData.push(row);
    }
  }
  sheet.clearContents();
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
}

  

function oneOffClassy (){   

   cGoa.GoaApp.setPackage (PropertiesService.getScriptProperties() , {
    clientId:'',
    clientSecret:'',
    packageName: 'classy',
    service:'classy'
  });
}

function testClassy () {
  // use it
  var goa = cGoa.make('classy', PropertiesService.getScriptProperties());

  // check it worked
  if (!goa.hasToken()) {
    throw 'no token';
  }
  
  // use it
  var result = UrlFetchApp.fetch("https://api.classy.org/2.0/organizations/21095/activity", {
    headers: {
      authorization:"Bearer " + goa.getToken()
    }
  });
  
  Logger.log (result.getContentText());
  
}
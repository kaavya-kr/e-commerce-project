const path= require('path');
        //path.dirname to get a path to directory                    //this procc=ess.mainmodule.filename gives the path to the file that is responsible for the fact that our application is running 
module.exports = path.dirname(process.mainModule.filename);

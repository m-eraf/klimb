var mongoose  =  require('mongoose');  
   
var Schema = new mongoose.Schema({  
    name:{  
        type:String  
    },  
    email:{  
        type:String,  
        unique: true
    },    
    no:{  
        type:Number  
    },    
    bob:{  
        type:String  
    },    
    experience:{  
        type:String  
    },    
    resume:{  
        type:String  
    },    
    location:{  
        type:String  
    },    
    address:{  
        type:String  
    },    
    currcom:{  
        type:String  
    },    
    role:{  
        type:String  
    }
});  
   
module.exports = mongoose.model('schema',Schema);  
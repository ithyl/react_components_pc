 export const utils={
     getHttpStat: (param)=>{
         let req = new XMLHttpRequest();
         req.open('GET', param, false);
         req.send(null);
         let headers = req.getAllResponseHeaders().toLowerCase();
        let status = req.status
         alert(status)
     }

 }
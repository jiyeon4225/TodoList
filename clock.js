const current = document.getElementById("clock");


function setTime()
{
    const date=new Date();
    const hours= String(date.getHours()).padStart(2,"0");
    const minutes=String(date.getMinutes()).padStart(2,"0");
    current.innerHTML= '&#9200;  '+ hours+" : "+minutes;
    
}

setTime();
setInterval(setTime,1000);

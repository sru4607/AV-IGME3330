function GetRandomColor()
{
    return "rgb("+GetRandomInt(0,255)+","+GetRandomInt(0,255)+","+GetRandomInt(0,255)+")";
}
function GetRandomInt(min, max)
{
    return Math.round(min + Math.random()*(max+1));
}
export {GetRandomColor};
//Gets the random color as a string
function getRandomColor()
{
    return "rgb("+getRandomInt(0,255)+","+getRandomInt(0,255)+","+getRandomInt(0,255)+")";
}
//Gets a random in between the min and max
function getRandomInt(min, max)
{
    return Math.round(min + Math.random()*(max+1));
}
export {getRandomColor};
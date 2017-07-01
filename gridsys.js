/* Note Grid System (gridsys.js)
 * written by Kevin Yang
 * suggestions and ideas by Karen Lee and Kevin Yang
 * The Cup Note (6/27/2014)
 */

function createSingleBox(prefWidth, prefHeight, prefColor){
	var gridAtt = document.createElement("div");
	var gridAttIn = document.createElement("div");
	gridAtt.setAttribute("class", "gridbox");
	//gridAtt.className = "gridbox";
	gridAtt.style.width = prefWidth + "px";
	gridAtt.style.height = prefHeight + "px";
	gridAtt.style.background = prefColor;
	gridAttIn.setAttribute("class","gridboxin");
	gridAttIn.setAttribute("align","center");
	gridAtt.appendChild(gridAttIn);
	return gridAtt;
}

function isWholeNum(num) {
   return typeof num === 'number' && num % 1 == 0;
}

function optimizeColumns(colsize, gbWidth, col){
	if(isWholeNum(colsize=Math.floor(gbWidth/col))){
		if(colsize < 189){
			colsize = colsize + (189 - colsize);
			console.log(colsize);
		}
		return colsize;
	}
	return optimizeColumns(colsize,gbWidth--,col);
}

//Alex V from Stack Overflow
function addEvent(elem, type, eventHandle) {
    if (elem == null || typeof(elem) == 'undefined') return;
    if ( elem.addEventListener ) {
        elem.addEventListener( type, eventHandle, false );
    } else if ( elem.attachEvent ) {
        elem.attachEvent( "on" + type, eventHandle );
    } else {
        elem["on"+type]=eventHandle;
    }
};

function optimizeForScreen(gb, columns, color){
	var colsize;
	//var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	//var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	var w = gb.offsetWidth;
	var h = gb.offsetHeight;
	var bdy = document.getElementsByTagName("html");
	var horBox = optimizeColumns(colsize,w,columns);
	var rows = Math.floor(h/horBox);
	var tempPref = new Array((horBox), (h/rows), color, rows, columns);
	//for(var i = 0; i < tempPref.length; i++){console.log("[" + tempPref[i] + "]")}
	//console.log(rows+":"+horBox+":"+gb.clientWidth+"x"+gb.clientHeight);
	//console.log(w+":"+h);
	if(gb.offsetHeight > bdy.clientHeight){
		gb.style.marginRight = "-"+(window.innerWidth - bdy.clientWidth)+"px";
	}
	return tempPref;
}

function populateGrid(){
	var gridCheck = new Array();
	var gridTemp = new Array();
	var gridBox;
	var gridBody = document.getElementById("gridbody");
	//test array for colors
	//[0]: pref width, [1]: pref height, [2]: pref color, [3]: rows, [4]:columns
	var testColors = new Array("red","green","blue","orange","purple","grey", "yellow");
	var gridArr = optimizeForScreen(gridBody, 10, "red");
	// testColor[0] is red, [1] is green, etc for prevColor and curColor
	var prevColor = 0;
	var curColor = 6;
	while ( gridBody.firstChild ) gridBody.removeChild( gridBody.firstChild );
	for(var i = 0; i < (gridArr[3]*gridArr[4]); i++ ){
		gridBox = createSingleBox(gridArr[0], gridArr[1], testColors[curColor]/*gridArr[2]*/);
		gridBody.appendChild(gridBox);
	}
}
populateGrid();
addEvent(window, "resize", populateGrid());
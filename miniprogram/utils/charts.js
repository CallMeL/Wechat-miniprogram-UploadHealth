
/**

Created by trigkit4 on 2016/10/24.
type:pie饼图,bar柱状图
point:圆心坐标
radius:圆心半径
*/
var Charts = function (params) {
var type = params.type,
data = params.data,
colors = params.colors || [''],
canvasId = params.canvasId,
point = params.point || '',
radius = params.radius,
context = wx.createContext(),
total = 0;
for (var i = 0; i < data.length; i++) {
total += data[i];//累加
}
//饼图
if (type == 'pie') {
var start = 0;
var end = 0;
for (var j = 0; j < data.length; j++) {
context.beginPath();
if (j == 0) {
end = start + (data[j] / total) * 2 * Math.PI;
} else {
start = end;
end = start + (data[j] / total) * 2 * Math.PI;
}
console.log("第 " + j + "个扇形，起点终点弧度为[ " + start + "," + end + "]");
context.arc(point.x, point.y, radius, start, end);

  context.lineTo(point.x, point.y);

  context.setFillStyle(colors[j]);

  context.fill();
  context.closePath();
}
this.data = data;

wx.drawCanvas({
  canvasId: canvasId,
  actions: context.getActions()
})
} else if (type == "ring") {
var start = 0;
var end = 0;
for (var j = 0; j < data.length; j++) {
context.beginPath();
if (j == 0) {
end = start + (data[j] / total) * 2 * Math.PI;
} else {
start = end;
end = start + (data[j] / total) * 2 * Math.PI;
}
console.log("第 " + j + "个扇形，起点终点弧度为[ " + start + "," + end + "]");
context.arc(point.x, point.y, radius, start, end);
context.setLineWidth(radius / 3);
context.setStrokeStyle(colors[j]);
// context.setGlobalAlpha(0.9);
context.stroke();

  context.closePath();
  context.beginPath();

  context.arc(point.x, point.y, radius / 1.5, start, end);
  context.setLineWidth(radius / 16);
  context.setStrokeStyle('#f6f6f6');
  context.stroke();
  context.closePath();
}
this.data = data;

wx.drawCanvas({
  canvasId: canvasId,
  actions: context.getActions()
})
}
//平滑曲线图
else if (type == 'curve') {
    var arr = params.data,
        showYAxis = params.showYAxis,
        colors = params.colors || "#fb999a",
        cHeight = params.cHeight || 300,//表格高度
        cWidth = params.cWidth || 500,//表格宽度
        bWidth = params.bWidth,//每根柱状图宽度
        xCaption = params.xCaption || '', //x轴底部说明文字
        yCaption = params.yCaption || '', //y轴底部说明文字
        bMargin = params.bMargin;//柱子间距


    var cxt = wx.createContext();
    //chart property
    var cMargin, cSpace;
    var cMarginSpace, cMarginHeight;

    //single bar property
    var totalBars, maxValue;

    //bar animation
    var flag, t100, speed;

    //Y axis property
    var totLabelsOnYAxis;

    function chartSet() {

        // chart properties
        cMargin = -50;//图表与canvas边界距离
        cSpace = 50;
        if (showYAxis) {
            cMargin = 10;
        }
        cMarginSpace = cMargin + cSpace;//0,y轴与左边文字距离
        cMarginHeight = 40 * 2 + cHeight;//canvas顶部距离
        // bar properties
        totalBars = arr.length;
        // find maximum value on chart
        maxValue = 0;
        for (var i = 0; i < arr.length; i++) {
            var arrVal = arr[i].split(",");
            var barVal = parseInt(arrVal[1]);
            if (parseInt(barVal) > parseInt(maxValue))
                maxValue = barVal;//获取最大值
        }
        totLabelsOnYAxis = 10;
        // 初始化动画参数
        flag = 0;
        t100 = 100;
        speed = 100;
    }

    // draw chart axis, labels and markers
    function drawAxisLabelMarkers() {
        cxt.lineWidth = "1.0";
        // draw y axis
        drawAxis(cMarginSpace, cMarginHeight, cMarginSpace, cMargin);
        // draw x axis
        //x轴与y轴水平距离,x与y垂直距离，x轴宽度
        drawAxis(cMarginSpace, cMarginHeight, cMarginSpace + cWidth + 20, cMarginHeight);
        cxt.lineWidth = "1.0";
        drawMarkers();
    }

    //画轴
    function drawAxis(x, y, X, Y) {
        cxt.beginPath();
        cxt.moveTo(x, y);
        cxt.lineTo(X, Y);
        cxt.setStrokeStyle("#cccccc");//x Axis and y Axis border color
        cxt.closePath();
        cxt.stroke();
    }

    // 画轴文字
    function drawMarkers() {
        var numMarkers = parseInt(maxValue / totLabelsOnYAxis);
        cxt.textAlign = "center";
        // Y Axis
        for (var a = 0; a <= totLabelsOnYAxis; a++) {
            var markerVal = a * numMarkers;
            var markerValHt = a * numMarkers * cHeight;
            var xMarkers = cMarginSpace - 25;//y轴数值与Y轴距离
            var yMarkers = cMarginHeight - (markerValHt / maxValue);
            cxt.setFontSize(10);
            cxt.fillText(markerVal, xMarkers, yMarkers);
        }
        // X Axis
        cxt.textAlign = 'center';
        for (var b = 0; b < totalBars; b++) {
            var arrVal = arr[b].split(",");
            var name = arrVal[0];
            var markerXPos = (cMarginSpace + bMargin)
                + (b * (bWidth + bMargin)) + (bWidth / 2) - 10;
            var markerYPos = cMarginHeight + 20;//x轴数值与x轴距离
            cxt.setFontSize(10);
            cxt.fillText(name, markerXPos, markerYPos);//x轴底部文字
        }
        cxt.save();
        // Add Y Axis title
        cxt.translate(cMargin + 10, cHeight / 2);
        cxt.rotate(Math.PI * -90 / 180);
        cxt.fillText(yCaption, 0, 0);
        cxt.restore();
        // Add X Axis Title
        cxt.setFontSize(10);
        cxt.fillText(xCaption, cMarginSpace +
        (cWidth / 4), 20);//底部文字与x轴距离
    }

    //画数据
    function drawChartWithAnimation() {
        if (flag < t100) {
            flag = flag + 1;
            setTimeout(drawChartWithAnimation, speed);
        }

        var point = [];
        for (i = 0; i < arr.length; i++) {
            var y = arr[i].split(",");
            var bVal = parseInt(y[1]);//获取树状图数值

            var bHt = (bVal * cHeight / maxValue) / flag;//bar height

            var bX = cMarginSpace + (i * (bWidth + bMargin)) + bMargin;
            var bY = cMarginHeight - bHt - 2;//cMarginHeight=> 380

            point.push({x: bX, y: bY});
        }

        cxt.strokeStyle = "gray";
        cxt.lineWidth = 2;
        cxt.beginPath();
        cxt.font = "15px Arial";
        cxt.fillStyle = "#888888";
        for (var i = 0; i < point.length; i++) {

            var y = arr[i].split(",");
            var bVal = parseInt(y[1]);//获取树状图数值
            var bHt = (bVal * cHeight / maxValue) / flag;//bar height
            var bY = cMarginHeight - bHt - 2;//cMarginHeight=> 380

            if (i == 0) {
                cxt.moveTo(point[i].x, point[i].y);
            } else {//注意是从1开始
                var ctrlP = getCtrlPoint(point, i - 1);
                cxt.bezierCurveTo(ctrlP.pA.x, ctrlP.pA.y, ctrlP.pB.x, ctrlP.pB.y, point[i].x, point[i].y);
                //cxt.fillText("("+point[i].x+","+point[i].y+")",point[i].x,point[i].y);
                cxt.setFillStyle("#000000");//singer bar number color
                cxt.fillText(bVal, point[i].x + 4, point[i].y);//singer bar number
            }
        }
        cxt.stroke();
    }

    function getCtrlPoint(ps, i, a, b) {
        if (!a || !b) {
            a = 0.25;
            b = 0.25;
        }
        //处理两种极端情形
        if (i < 1) {
            var pAx = ps[0].x + (ps[1].x - ps[0].x) * a;
            var pAy = ps[0].y + (ps[1].y - ps[0].y) * a;
        } else {
            var pAx = ps[i].x + (ps[i + 1].x - ps[i - 1].x) * a;
            var pAy = ps[i].y + (ps[i + 1].y - ps[i - 1].y) * a;
        }
        if (i > ps.length - 3) {
            var last = ps.length - 1
            var pBx = ps[last].x - (ps[last].x - ps[last - 1].x) * b;
            var pBy = ps[last].y - (ps[last].y - ps[last - 1].y) * b;
        } else {
            var pBx = ps[i + 1].x - (ps[i + 2].x - ps[i].x) * b;
            var pBy = ps[i + 1].y - (ps[i + 2].y - ps[i].y) * b;
        }
        return {
            pA: {x: pAx, y: pAy},
            pB: {x: pBx, y: pBy}
        }
    }

    //初始化
    chartSet();
    //画数轴
    drawAxisLabelMarkers();
    //画数据
    drawChartWithAnimation();

    wx.drawCanvas({
        canvasId: canvasId,
        actions: cxt.getActions()
    });
}
else if (type == 'fold') {
    var arr = params.data,
        showYAxis = params.showYAxis,
        colors = params.colors || "#fb999a",
        cHeight = params.cHeight || 300,//表格高度
        cWidth = params.cWidth || 500,//表格宽度
        bWidth = params.bWidth || 20,//每根柱状图宽度
        xCaption = params.xCaption || '', //x轴底部说明文字
        yCaption = params.yCaption || '', //y轴底部说明文字
        bMargin = params.bMargin || 16;//柱子间距

    var cxt = wx.createContext();
    //chart property
    var cMargin, cSpace;
    var cMarginSpace, cMarginHeight;

    //single bar property
    var totalBars, maxValue;

    //bar animation
    var flag, t100, speed;

    //Y axis property
    var totLabelsOnYAxis;

    function chartSet() {

        // chart properties
        cMargin = -50;//图表与canvas边界距离
        cSpace = 50;
        if (showYAxis) {
            cMargin = 10;
        }
        cMarginSpace = cMargin + cSpace;//0,y轴与左边文字距离
        cMarginHeight = 40 * 2 + cHeight;//canvas顶部距离
        // bar properties
        totalBars = arr.length;
        // find maximum value on chart
        maxValue = 0;
        for (var i = 0; i < totalBars; i++) {
            var arrVal = arr[i].split(",");
            var barVal = parseInt(arrVal[1]);
            if (parseInt(barVal) > parseInt(maxValue))
                maxValue = barVal;//获取最大值
        }
        totLabelsOnYAxis = 10;
        // 初始化动画参数
        flag = 0;
        t100 = 100;
        speed = 10;
    }

    // draw chart axis, labels and markers
    function drawAxisLabelMarkers() {
        cxt.lineWidth = "1.0";
        // draw y axis
        drawAxis(cMarginSpace, cMarginHeight, cMarginSpace, cMargin);
        // draw x axis
        //x轴与y轴水平距离,x与y垂直距离，x轴宽度
        drawAxis(cMarginSpace, cMarginHeight, cMarginSpace + cWidth + 20, cMarginHeight);
        cxt.lineWidth = "1.0";
        drawMarkers();
    }

    //画轴
    function drawAxis(x, y, X, Y) {
        cxt.beginPath();
        cxt.moveTo(x, y);
        cxt.lineTo(X, Y);
        cxt.setStrokeStyle("#cccccc");//x Axis and y Axis border color
        cxt.closePath();
        cxt.stroke();
    }

    // draw chart markers on X and Y Axis
    function drawMarkers() {
        var numMarkers = parseInt(maxValue / totLabelsOnYAxis);
        cxt.textAlign = "center";
        // Y Axis
        for (var a = 0; a <= totLabelsOnYAxis; a++) {
            var markerVal = a * numMarkers;
            var markerValHt = a * numMarkers * cHeight;
            var xMarkers = cMarginSpace - 25;//y轴数值与Y轴距离
            var yMarkers = cMarginHeight - (markerValHt / maxValue);
            cxt.setFontSize(20);
            cxt.fillText(markerVal, xMarkers, yMarkers);
        }
        // X Axis
        cxt.textAlign = 'center';
        for (var b = 0; b < totalBars; b++) {
            var arrVal = arr[b].split(",");
            var name = arrVal[0];
            var markerXPos = (cMarginSpace + bMargin)
                + (b * (bWidth + bMargin)) + (bWidth / 2) - 10;
            var markerYPos = cMarginHeight + 20;//x轴数值与x轴距离
            cxt.setFontSize(20);
            cxt.fillText(name, markerXPos, markerYPos);//x轴底部文字
        }
        cxt.save();
        // Add Y Axis title
        cxt.translate(cMargin + 10, cHeight / 2);
        cxt.rotate(Math.PI * -90 / 180);
        cxt.fillText(yCaption, 0, 0);
        cxt.restore();
        cxt.setFontSize(20);
        // Add X Axis Title
        cxt.fillText(xCaption, cMarginSpace +
        (cWidth / 4), 20);//底部文字与x轴距离
    }

    //动画
    function drawChartWithAnimation() {
        if (flag < t100) {
            flag = flag + 1;
            setTimeout(drawChartWithAnimation, speed);
        }
        var lastbX = 0;
        var lastbY = 0;

        for (var i = 0; i < totalBars; i++) {
            var arrVal = arr[i].split(",");
            var bVal = parseInt(arrVal[1]);//获取树状图数值

            var bHt = (bVal * cHeight / maxValue) / flag;//bar height
            var bX = cMarginSpace + (i * (bWidth + bMargin)) + bMargin;
            var bY = cMarginHeight - bHt - 2;//cMarginHeight=> 380
            var textY = cMarginHeight - bHt - 10;

            if (lastbX > 0)
                drawRectangle(lastbX, lastbY, bX, bY, bWidth, bHt);

            lastbX = bX;
            lastbY = bY;
            // draw(bX,bY,bWidth,maxValue-bHt);
            cxt.setFillStyle("#000000");//singer bar number color
            cxt.fillText(bVal, bX + 4, textY);//singer bar number

        }

        // Loop through the total bars and draw

    }

    function drawRectangle(lx, ly, x, y, w, h) {
        cxt.beginPath();
        cxt.moveTo(lx + w / 2, ly);
        cxt.lineTo(x + w / 2, y);
        cxt.setStrokeStyle("#0000ff");//x Axis and y Axis border color
        cxt.setLineWidth(4)
        cxt.closePath();
        cxt.stroke();
    }

    chartSet();
    drawAxisLabelMarkers();
    drawChartWithAnimation();

    wx.drawCanvas({
        canvasId: canvasId,
        actions: cxt.getActions()
    });
}
//柱状图
else if (type == 'bar') {
var arr = params.data,
showYAxis = params.showYAxis,
bgColors = params.bgColors || "#fb999a",
color = params.color,
cHeight = params.cHeight || 300,//表格高度
cWidth = params.cWidth || 500,//表格宽度
bWidth = params.bWidth || 20,//每根柱状图宽度
xCaption = params.xCaption || '', //x轴底部说明文字
yCaption = params.yCaption || '', //y轴底部说明文字
bMargin = params.bMargin || 16;//柱子间距

var cxt = wx.createContext();
//chart property
var cMargin, cSpace;
var cMarginSpace, cMarginHeight;

//single bar property
var totalBars, maxValue;

//bar animation
var flag, t100, speed;

//Y axis property
var totLabelsOnYAxis;

function chartSet() {

  // chart properties
  cMargin = -60;//图表与canvas边界距离
  cSpace = 50;
  if (showYAxis) {
    cMargin = 10;
  }
  cMarginSpace = cMargin + cSpace;//0,y轴与左边文字距离
  cMarginHeight = 40 * 2 + cHeight;//canvas顶部距离
  // bar properties
  totalBars = arr.length;
  // find maximum value on chart
  maxValue = 0;
  for (var i = 0; i < totalBars; i++) {
    var arrVal = arr[i].split(",");
    var barVal = parseInt(arrVal[1]);
    if (parseInt(barVal) > parseInt(maxValue))
      maxValue = barVal;//获取最大值
  }
  totLabelsOnYAxis = 10;
  // 初始化动画参数
  flag = 0;
  t100 = 100;
  speed = 10;
}
// draw chart axis, labels and markers
function drawAxisLabelMarkers() {
  cxt.lineWidth = "1.0";
  // draw y axis
  drawAxis(cMarginSpace, cMarginHeight, cMarginSpace, cMargin);
  // draw x axis
  //x轴与y轴水平距离,x与y垂直距离，x轴宽度
  drawAxis(cMarginSpace, cMarginHeight, cMarginSpace + cWidth + 20, cMarginHeight);
  cxt.lineWidth = "1.0";
  drawMarkers();
}

//画轴
function drawAxis(x, y, X, Y) {
  cxt.beginPath();
  cxt.moveTo(x, y);
  cxt.lineTo(X, Y);
  cxt.setStrokeStyle("#dddddd");//x Axis and y Axis border color
  cxt.closePath();
  cxt.stroke();
}

// draw chart markers on X and Y Axis
function drawMarkers() {
  var numMarkers = parseInt(maxValue / totLabelsOnYAxis);
  cxt.textAlign = "center";
  // Y Axis
  for (var a = 0; a <= totLabelsOnYAxis; a++) {
    var markerVal = a * numMarkers;
    var markerValHt = a * numMarkers * cHeight;
    var xMarkers = cMarginSpace - 25;//y轴数值与Y轴距离
    var yMarkers = cMarginHeight - (markerValHt / maxValue);
    cxt.fillText(markerVal, xMarkers, yMarkers);
  }
  // X Axis
  cxt.textAlign = 'center';
  for (var b = 0; b < totalBars; b++) {
    var arrVal = arr[b].split(",");
    var name = arrVal[0];
    var markerXPos = (cMarginSpace + bMargin)
      + (b * (bWidth + bMargin)) + (bWidth / 2) - 10;
    var markerYPos = cMarginHeight + 20;//x轴数值与x轴距离
    cxt.setFontSize(12);
    cxt.setFillStyle(color);
    cxt.fillText(name, markerXPos, markerYPos);//x轴底部文字

  }
  cxt.save();
  // Add Y Axis title
  cxt.translate(cMargin + 10, cHeight / 2);
  cxt.rotate(Math.PI * -90 / 180);
  cxt.fillText(yCaption, 0, 0);
  cxt.restore();
  // Add X Axis Title
  cxt.fillText(xCaption, cMarginSpace +
    (cWidth / 4), 20);//底部文字与x轴距离
}
//动画
function drawChartWithAnimation() {
  if (flag < t100) {
    flag = flag + 1;
    setTimeout(drawChartWithAnimation, speed);
  }
  for (var i = 0; i < totalBars; i++) {
    var arrVal = arr[i].split(",");
    var bVal = parseInt(arrVal[1]);//获取树状图数值
    var bHt = (bVal * cHeight / maxValue) / flag;//bar height
    var bX = cMarginSpace + (i * (bWidth + bMargin)) + bMargin;
    var bY = cMarginHeight - bHt - 2;//cMarginHeight=> 380
    var textY = cMarginHeight - bHt - 10;
    drawRectangle(bX, bY, bWidth, bHt);
    // draw(bX,bY,bWidth,maxValue-bHt);
    cxt.setFillStyle("#000000");//singer bar number color
    cxt.fillText(bVal, bX, textY);//singer bar number
  }
  // Loop through the total bars and draw
}
function drawRectangle(x, y, w, h) {
  cxt.beginPath();
  cxt.rect(x, y, w, h);
  cxt.setStrokeStyle("#ffffff");//single bar border color
  cxt.setFillStyle(bgColors);//single bar bgcolor
  cxt.stroke();
  cxt.fill();
  cxt.closePath();
}
chartSet();
drawAxisLabelMarkers();
drawChartWithAnimation();

wx.drawCanvas({
  canvasId: canvasId,
  actions: cxt.getActions()
});
this.arr = arr;
this.cWidth = cWidth;
}
};
module.exports = Charts;
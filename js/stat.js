'use strict';

var drawCloud = function (ctx, x0, y0, width, height, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.moveTo(width / 2 + x0, y0);
  ctx.quadraticCurveTo(x0, y0, x0, height / 2 + y0);
  ctx.quadraticCurveTo(x0, width / 2 + x0, x0 + x0, height + y0);
  ctx.quadraticCurveTo(x0 + x0 + 20, width / 2 + x0, x0 + x0 + 20, height + y0);
  ctx.quadraticCurveTo(width + x0, width / 2 + x0, width + x0, height / 2 + y0);
  ctx.quadraticCurveTo(width + x0, y0, width / 2 + x0, y0);
  ctx.stroke();
  ctx.fill();
};

var drawText = function (ctx, textColor, textSize, textFamily, text, cloudSpaceWidth, marginLeft, marginTop) {
  ctx.fillStyle = textColor;
  ctx.font = textSize + ' ' + textFamily;
  var lineHeight = parseInt(textSize, 10) * 1.5;
  var maxWidth = cloudSpaceWidth;

  var words = text.split(' ');
  var countWords = words.length;
  var line = '';
  for (var i = 0; i < countWords; i++) {
    var testLine = line + words[i] + ' ';
    var testWidth = ctx.measureText(testLine).width;
    if ((testWidth + marginLeft) > maxWidth) {
      ctx.fillText(line, marginLeft, marginTop);
      line = words[i] + ' ';
      marginTop += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, marginLeft, marginTop);
};

var roundNumbers = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] = Math.round(arr[i]);
  }
  return arr;
};

var getMaximum = function (arr) {
  var maximum = arr[0];
  for (var i = 1; i < arr.length; i++) {
    maximum = maximum < arr[i] ? arr[i] : maximum;
  }
  return maximum;
};

var timeResultToHistoHeights = function (arr, maximum, histoHeight) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr[i] = arr[i] * histoHeight / maximum;
  }
  return newArr;
};

var getRandomBlueOpacity = function () {
  return 'rgba(2, 3, 226,' + Math.random() + ')';
};

var drawHisto = function (ctx, drawHistoTimes, drawHistoNames, histoHeight, indentation, columnWidth, drawHistox0ForStart) {
  var times = roundNumbers(drawHistoTimes);
  var maximum = getMaximum(times);
  var histoHeights = timeResultToHistoHeights(times, maximum, histoHeight);
  histoHeights = roundNumbers(histoHeights);
  var y0ForColumn;
  var x0ForColumn;

  for (var i = 0; i < drawHistoNames.length; i++) {
    y0ForColumn = histoHeights[i];
    x0ForColumn = i * (columnWidth + indentation) + drawHistox0ForStart;

    ctx.fillStyle = drawHistoNames[i] === 'Вы' ? 'rgba(175, 43, 30,1)' : getRandomBlueOpacity();

    ctx.fillRect(x0ForColumn, 245 - y0ForColumn, columnWidth, y0ForColumn);
    ctx.fillStyle = '#000000';
    ctx.fillText(drawHistoNames[i], x0ForColumn, 265);
    ctx.fillText(times[i], x0ForColumn, 85);
  }
};

window.renderStatistics = function (ctx, names, times) {
  var cloudX = 110;
  var cloudY = 10;
  var cloudWidth = 420;
  var cloudHeight = 270;
  var cloudColor = '#ffffff';

  var shadowX = cloudX + 10;
  var shadowY = cloudY + 10;
  var shadowColor = 'rgba(0, 0, 0, 0.7)';

  var textColor = '#000000';
  var textSize = '16px';
  var textFamily = 'PT Mono';
  var text = 'Ура вы победили! Список результатов:';
  var marginLeft = 227;
  var marginTop = 30;

  var histoHeight = 150;
  var indentation = 50;
  var columnWidth = 40;
  var x0ForStart = 150;

  drawCloud(ctx, shadowX, shadowY, cloudWidth, cloudHeight, shadowColor);
  drawCloud(ctx, cloudX, cloudY, cloudWidth, cloudHeight, cloudColor);
  drawText(ctx, textColor, textSize, textFamily, text, cloudWidth, marginLeft, marginTop);
  drawHisto(ctx, times, names, histoHeight, indentation, columnWidth, x0ForStart);
};

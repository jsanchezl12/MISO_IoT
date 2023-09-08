/*
 Highcharts JS v9.2.2 (2021-08-24)

 ColorAxis module

 (c) 2012-2021 Pawel Potaczek

 License: www.highcharts.com/license
*/
'use strict';(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/color-axis",["highcharts"],function(m){b(m);b.Highcharts=m;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function m(b,l,n,x){b.hasOwnProperty(l)||(b[l]=x.apply(null,n))}b=b?b._modules:{};m(b,"Mixins/ColorSeries.js",[],function(){return{colorPointMixin:{setVisible:function(b){var l=this,g=b?"show":"hide";
l.visible=l.options.visible=!!b;["graphic","dataLabel"].forEach(function(b){if(l[b])l[b][g]()});this.series.buildKDTree()}},colorSeriesMixin:{optionalAxis:"colorAxis",translateColors:function(){var b=this,l=this.options.nullColor,n=this.colorAxis,x=this.colorKey;(this.data.length?this.data:this.points).forEach(function(g){var q=g.getNestedProperty(x);(q=g.options.color||(g.isNull||null===g.value?l:n&&"undefined"!==typeof q?n.toColor(q,g):g.color||b.color))&&g.color!==q&&(g.color=q,"point"===b.options.legendType&&
g.legendItem&&b.chart.legend.colorizeItem(g,g.visible))})}}}});m(b,"Core/Axis/Color/ColorAxisComposition.js",[b["Core/Color/Color.js"],b["Mixins/ColorSeries.js"],b["Core/Utilities.js"]],function(b,l,n){var g=b.parse,m=l.colorPointMixin,q=l.colorSeriesMixin,r=n.addEvent,u=n.extend,D=n.merge,y=n.pick,E=n.splat,v;(function(b){function l(){var c=this,a=this.options;this.colorAxis=[];a.colorAxis&&(a.colorAxis=E(a.colorAxis),a.colorAxis.forEach(function(a,d){a.index=d;new A(c,a)}))}function n(a){var c=
this,d=function(d){d=a.allItems.indexOf(d);-1!==d&&(c.destroyItem(a.allItems[d]),a.allItems.splice(d,1))},k=[],h,f;(this.chart.colorAxis||[]).forEach(function(a){(h=a.options)&&h.showInLegend&&(h.dataClasses&&h.visible?k=k.concat(a.getDataClassLegendSymbols()):h.visible&&k.push(a),a.series.forEach(function(a){if(!a.options.showInLegend||h.dataClasses)"point"===a.options.legendType?a.points.forEach(function(a){d(a)}):d(a)}))});for(f=k.length;f--;)a.allItems.unshift(k[f])}function t(a){a.visible&&a.item.legendColor&&
a.item.legendSymbol.attr({fill:a.item.legendColor})}function H(){var a=this.chart.colorAxis;a&&a.forEach(function(a,c,d){a.update({},d)})}function e(){(this.chart.colorAxis&&this.chart.colorAxis.length||this.colorAttribs)&&this.translateColors()}function c(){var a=this.axisTypes;a?-1===a.indexOf("colorAxis")&&a.push("colorAxis"):this.axisTypes=["colorAxis"]}function a(a){var c=a.prototype.createAxis;a.prototype.createAxis=function(a,d){if("colorAxis"!==a)return c.apply(this,arguments);var k=new A(this,
D(d.axis,{index:this[a].length,isX:!1}));this.isDirtyLegend=!0;this.axes.forEach(function(a){a.series=[]});this.series.forEach(function(a){a.bindAxes();a.isDirtyData=!0});y(d.redraw,!0)&&this.redraw(d.animation);return k}}function k(){this.elem.attr("fill",g(this.start).tweenTo(g(this.end),this.pos),void 0,!0)}function d(){this.elem.attr("stroke",g(this.start).tweenTo(g(this.end),this.pos),void 0,!0)}var f=[],A;b.compose=function(b,p,g,z,w){A||(A=b);-1===f.indexOf(p)&&(f.push(p),b=p.prototype,b.collectionsWithUpdate.push("colorAxis"),
b.collectionsWithInit.colorAxis=[b.addColorAxis],r(p,"afterGetAxes",l),a(p));-1===f.indexOf(g)&&(f.push(g),p=g.prototype,p.fillSetter=k,p.strokeSetter=d);-1===f.indexOf(z)&&(f.push(z),r(z,"afterGetAllItems",n),r(z,"afterColorizeItem",t),r(z,"afterUpdate",H));-1===f.indexOf(w)&&(f.push(w),u(w.prototype,q),u(w.prototype.pointClass.prototype,m),r(w,"afterTranslate",e),r(w,"bindAxes",c))}})(v||(v={}));return v});m(b,"Core/Axis/Color/ColorAxisDefaults.js",[b["Core/Color/Palette.js"]],function(b){return{lineWidth:0,
minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},width:.01,color:b.neutralColor40},labels:{overflow:"justify",rotation:0},minColor:b.highlightColor10,maxColor:b.highlightColor100,tickLength:5,showInLegend:!0}});m(b,"Core/Axis/Color/ColorAxis.js",[b["Core/Axis/Axis.js"],b["Core/Color/Color.js"],b["Core/Axis/Color/ColorAxisComposition.js"],b["Core/Axis/Color/ColorAxisDefaults.js"],b["Core/Globals.js"],b["Core/Legend/LegendSymbol.js"],
b["Core/Series/SeriesRegistry.js"],b["Core/Utilities.js"]],function(b,l,n,m,C,q,r,u){var g=this&&this.__extends||function(){var b=function(e,c){b=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])};return b(e,c)};return function(e,c){function a(){this.constructor=e}b(e,c);e.prototype=null===c?Object.create(c):(a.prototype=c.prototype,new a)}}(),y=l.parse,x=C.noop,v=r.series,F=u.extend,G=u.isNumber,B=u.merge,
t=u.pick;l=function(b){function e(c,a){var k=b.call(this,c,a)||this;k.beforePadding=!1;k.chart=void 0;k.coll="colorAxis";k.dataClasses=void 0;k.legendItem=void 0;k.legendItems=void 0;k.name="";k.options=void 0;k.stops=void 0;k.visible=!0;k.init(c,a);return k}g(e,b);e.compose=function(c,a,b,d){n.compose(e,c,a,b,d)};e.prototype.init=function(c,a){var k=c.options.legend||{},d=a.layout?"vertical"!==a.layout:"vertical"!==k.layout,f=a.visible;k=B(e.defaultColorAxisOptions,a,{showEmpty:!1,title:null,visible:k.enabled&&
!1!==f});this.coll="colorAxis";this.side=a.side||d?2:1;this.reversed=a.reversed||!d;this.opposite=!d;b.prototype.init.call(this,c,k);this.userOptions.visible=f;a.dataClasses&&this.initDataClasses(a);this.initStops();this.horiz=d;this.zoomEnabled=!1};e.prototype.initDataClasses=function(c){var a=this.chart,b=this.options,d=c.dataClasses.length,f,e=0,h=a.options.chart.colorCount;this.dataClasses=f=[];this.legendItems=[];(c.dataClasses||[]).forEach(function(c,k){c=B(c);f.push(c);if(a.styledMode||!c.color)"category"===
b.dataClassColor?(a.styledMode||(k=a.options.colors,h=k.length,c.color=k[e]),c.colorIndex=e,e++,e===h&&(e=0)):c.color=y(b.minColor).tweenTo(y(b.maxColor),2>d?.5:k/(d-1))})};e.prototype.hasData=function(){return!!(this.tickPositions||[]).length};e.prototype.setTickPositions=function(){if(!this.dataClasses)return b.prototype.setTickPositions.call(this)};e.prototype.initStops=function(){this.stops=this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];this.stops.forEach(function(c){c.color=
y(c[1])})};e.prototype.setOptions=function(c){b.prototype.setOptions.call(this,c);this.options.crosshair=this.options.marker};e.prototype.setAxisSize=function(){var c=this.legendSymbol,a=this.chart,b=a.options.legend||{},d,f;c?(this.left=b=c.attr("x"),this.top=d=c.attr("y"),this.width=f=c.attr("width"),this.height=c=c.attr("height"),this.right=a.chartWidth-b-f,this.bottom=a.chartHeight-d-c,this.len=this.horiz?f:c,this.pos=this.horiz?b:d):this.len=(this.horiz?b.symbolWidth:b.symbolHeight)||e.defaultLegendLength};
e.prototype.normalizedValue=function(c){this.logarithmic&&(c=this.logarithmic.log2lin(c));return 1-(this.max-c)/(this.max-this.min||1)};e.prototype.toColor=function(c,a){var b=this.dataClasses,d=this.stops,f;if(b)for(f=b.length;f--;){var e=b[f];var h=e.from;d=e.to;if(("undefined"===typeof h||c>=h)&&("undefined"===typeof d||c<=d)){var g=e.color;a&&(a.dataClass=f,a.colorIndex=e.colorIndex);break}}else{c=this.normalizedValue(c);for(f=d.length;f--&&!(c>d[f][0]););h=d[f]||d[f+1];d=d[f+1]||h;c=1-(d[0]-
c)/(d[0]-h[0]||1);g=h.color.tweenTo(d.color,c)}return g};e.prototype.getOffset=function(){var c=this.legendGroup,a=this.chart.axisOffset[this.side];c&&(this.axisParent=c,b.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=a)};e.prototype.setLegendColor=function(){var c=this.reversed,a=c?1:0;c=c?0:1;a=this.horiz?[a,0,c,0]:[0,c,0,a];this.legendColor={linearGradient:{x1:a[0],y1:a[1],x2:a[2],y2:a[3]},stops:this.stops}};
e.prototype.drawLegendSymbol=function(c,a){var b=c.padding,d=c.options,f=this.horiz,g=t(d.symbolWidth,f?e.defaultLegendLength:12),h=t(d.symbolHeight,f?12:e.defaultLegendLength),p=t(d.labelPadding,f?16:30);d=t(d.itemDistance,10);this.setLegendColor();a.legendSymbol=this.chart.renderer.rect(0,c.baseline-11,g,h).attr({zIndex:1}).add(a.legendGroup);this.legendItemWidth=g+b+(f?d:p);this.legendItemHeight=h+b+(f?p:0)};e.prototype.setState=function(c){this.series.forEach(function(a){a.setState(c)})};e.prototype.setVisible=
function(){};e.prototype.getSeriesExtremes=function(){var c=this.series,a=c.length,b;this.dataMin=Infinity;for(this.dataMax=-Infinity;a--;){var d=c[a];var f=d.colorKey=t(d.options.colorKey,d.colorKey,d.pointValKey,d.zoneAxis,"y");var e=d.pointArrayMap;var h=d[f+"Min"]&&d[f+"Max"];if(d[f+"Data"])var g=d[f+"Data"];else if(e){g=[];e=e.indexOf(f);var l=d.yData;if(0<=e&&l)for(b=0;b<l.length;b++)g.push(t(l[b][e],l[b]))}else g=d.yData;h?(d.minColorValue=d[f+"Min"],d.maxColorValue=d[f+"Max"]):(g=v.prototype.getExtremes.call(d,
g),d.minColorValue=g.dataMin,d.maxColorValue=g.dataMax);"undefined"!==typeof d.minColorValue&&(this.dataMin=Math.min(this.dataMin,d.minColorValue),this.dataMax=Math.max(this.dataMax,d.maxColorValue));h||v.prototype.applyExtremes.call(d)}};e.prototype.drawCrosshair=function(c,a){var e=a&&a.plotX,d=a&&a.plotY,f=this.pos,g=this.len;if(a){var h=this.toPixels(a.getNestedProperty(a.series.colorKey));h<f?h=f-2:h>f+g&&(h=f+g+2);a.plotX=h;a.plotY=this.len-h;b.prototype.drawCrosshair.call(this,c,a);a.plotX=
e;a.plotY=d;this.cross&&!this.cross.addedToColorAxis&&this.legendGroup&&(this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),this.cross.addedToColorAxis=!0,this.chart.styledMode||"object"!==typeof this.crosshair||this.cross.attr({fill:this.crosshair.color}))}};e.prototype.getPlotLinePath=function(c){var a=this.left,e=c.translatedValue,d=this.top;return G(e)?this.horiz?[["M",e-4,d-6],["L",e+4,d-6],["L",e,d],["Z"]]:[["M",a,e],["L",a-6,e+6],["L",a-6,e-6],["Z"]]:b.prototype.getPlotLinePath.call(this,
c)};e.prototype.update=function(c,a){var e=this.chart.legend;this.series.forEach(function(a){a.isDirtyData=!0});(c.dataClasses&&e.allItems||this.dataClasses)&&this.destroyItems();b.prototype.update.call(this,c,a);this.legendItem&&(this.setLegendColor(),e.colorizeItem(this,!0))};e.prototype.destroyItems=function(){var c=this.chart;this.legendItem?c.legend.destroyItem(this):this.legendItems&&this.legendItems.forEach(function(a){c.legend.destroyItem(a)});c.isDirtyLegend=!0};e.prototype.destroy=function(){this.chart.isDirtyLegend=
!0;this.destroyItems();b.prototype.destroy.apply(this,[].slice.call(arguments))};e.prototype.remove=function(c){this.destroyItems();b.prototype.remove.call(this,c)};e.prototype.getDataClassLegendSymbols=function(){var c=this,a=c.chart,b=c.legendItems,d=a.options.legend,e=d.valueDecimals,g=d.valueSuffix||"",h;b.length||c.dataClasses.forEach(function(d,f){var k=d.from,l=d.to,n=a.numberFormatter,m=!0;h="";"undefined"===typeof k?h="< ":"undefined"===typeof l&&(h="> ");"undefined"!==typeof k&&(h+=n(k,
e)+g);"undefined"!==typeof k&&"undefined"!==typeof l&&(h+=" - ");"undefined"!==typeof l&&(h+=n(l,e)+g);b.push(F({chart:a,name:h,options:{},drawLegendSymbol:q.drawRectangle,visible:!0,setState:x,isDataClass:!0,setVisible:function(){m=c.visible=!m;c.series.forEach(function(a){a.points.forEach(function(a){a.dataClass===f&&a.setVisible(m)})});a.legend.colorizeItem(this,m)}},d))});return b};e.defaultColorAxisOptions=m;e.defaultLegendLength=200;e.keepProps=["legendGroup","legendItemHeight","legendItemWidth",
"legendItem","legendSymbol"];return e}(b);Array.prototype.push.apply(b.keepProps,l.keepProps);"";return l});m(b,"masters/modules/coloraxis.src.js",[b["Core/Globals.js"],b["Core/Axis/Color/ColorAxis.js"]],function(b,l){b.ColorAxis=l;l.compose(b.Chart,b.Fx,b.Legend,b.Series)})});
//# sourceMappingURL=coloraxis.js.map
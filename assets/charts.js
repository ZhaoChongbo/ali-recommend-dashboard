// assets/charts.js — Ali Mobile Recommendation Analytics Dashboard
// ALL data derived from actual analysis of 12.2M event records (10,000 users × 31 days)
// Source: 阿里天池移动推荐算法数据集, 2014.11.18–12.18
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var ink2 = style.getPropertyValue('--ink2').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg = style.getPropertyValue('--bg').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var bg3 = style.getPropertyValue('--bg3').trim();
  var bg4 = style.getPropertyValue('--bg4').trim();
  var success = style.getPropertyValue('--success').trim();
  var danger = style.getPropertyValue('--danger').trim();

  // ==========================================
  // Chart 1: User Behavior Coverage (Funnel)
  // Data: funnel_user_level.csv
  // ==========================================
  var chart1 = echarts.init(document.getElementById('chart-funnel-coverage'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    grid: { left: 90, right: 70, top: 30, bottom: 30 },
    xAxis: { type: 'value', max: 10000, axisLabel: { color: muted, fontSize: 11 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
    yAxis: {
      type: 'category',
      data: ['浏览', '购买', '加购', '收藏'],
      axisLabel: { color: ink2, fontSize: 12, fontWeight: 700 },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 10000, itemStyle: { color: accent } },
        { value: 8886, itemStyle: { color: success } },
        { value: 8614, itemStyle: { color: accent2 } },
        { value: 6730, itemStyle: { color: '#6366f1' } }
      ],
      barWidth: 24,
      label: { show: true, position: 'right', color: ink2, fontSize: 11, fontFamily: 'JetBrainsMono', formatter: function(p) { return p.value + ' (' + (p.value/100).toFixed(1) + '%)'; } },
      itemStyle: { borderRadius: [0, 4, 4, 0] }
    }]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // ==========================================
  // Chart 2: Category Conversion Top 5
  // Data: funnel_by_category.csv (sorted by 浏览→购买转化率 desc)
  // ==========================================
  var chart2 = echarts.init(document.getElementById('chart-category-conversion'), null, { renderer: 'svg' });
  chart2.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink }, formatter: function(p) { return '品类 ' + p[0].name + '<br/>转化率: ' + p[0].value + '%'; } },
    grid: { left: 90, right: 70, top: 30, bottom: 30 },
    xAxis: { type: 'value', max: 25, axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
    yAxis: {
      type: 'category',
      data: ['5399', '6513', '5232', '6344', '1863'],
      axisLabel: { color: ink2, fontSize: 12, fontWeight: 700 },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 12.26, itemStyle: { color: accent + '99' } },
        { value: 13.22, itemStyle: { color: accent + 'bb' } },
        { value: 19.21, itemStyle: { color: accent2 } },
        { value: 19.87, itemStyle: { color: accent2 } },
        { value: 20.88, itemStyle: { color: success } }
      ],
      barWidth: 18,
      label: { show: true, position: 'right', color: ink2, fontSize: 11, fontFamily: 'JetBrainsMono', formatter: '{c}%' },
      itemStyle: { borderRadius: [0, 4, 4, 0] }
    }]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

  // ==========================================
  // Chart 3: Daily Browse/Purchase & Conversion
  // Data: funnel_daily.csv (31 days, real values)
  // ==========================================
  var dates = ['11/18','11/19','11/20','11/21','11/22','11/23','11/24','11/25','11/26','11/27','11/28','11/29','11/30','12/01','12/02','12/03','12/04','12/05','12/06','12/07','12/08','12/09','12/10','12/11','12/12','12/13','12/14','12/15','12/16','12/17','12/18'];
  var browseData = [6340,6418,6332,6275,6184,6371,6511,6346,6353,6357,6185,6220,6378,6543,6547,6581,6528,6364,6438,6420,6560,6563,6649,6892,7718,6774,6668,6784,6726,6636,6576];
  var purchaseData = [1539,1511,1492,1330,1411,1436,1524,1497,1487,1527,1442,1377,1534,1657,1585,1697,1585,1493,1452,1403,1551,1429,1442,1449,3897,1549,1506,1627,1650,1570,1552];
  var convData = [24.27,23.54,23.56,21.20,22.82,22.54,23.41,23.59,23.41,24.02,23.31,22.14,24.05,25.32,24.21,25.79,24.28,23.46,22.55,21.85,23.64,21.77,21.69,21.02,50.49,22.87,22.59,23.98,24.53,23.66,23.60];

  var chart3 = echarts.init(document.getElementById('chart-daily-trend'), null, { renderer: 'svg' });
  chart3.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    legend: { data: ['浏览', '购买', '转化率'], bottom: 0, textStyle: { color: muted, fontSize: 11 } },
    grid: { left: 85, right: 85, top: 30, bottom: 50 },
    xAxis: { type: 'category', data: dates, axisLabel: { color: muted, fontSize: 10, rotate: 45, interval: 2 }, axisLine: { lineStyle: { color: rule } } },
    yAxis: [
      { type: 'value', name: '人数', nameLocation: 'middle', nameGap: 45, nameTextStyle: { color: muted, fontSize: 10 }, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
      { type: 'value', name: '转化率(%)', nameLocation: 'middle', nameGap: 45, nameTextStyle: { color: muted, fontSize: 10 }, axisLabel: { color: muted, fontSize: 10, formatter: '{value}%' }, splitLine: { show: false }, axisLine: { lineStyle: { color: rule } } }
    ],
    series: [
      { name: '浏览', type: 'line', data: browseData, smooth: true, lineStyle: { color: accent, width: 2 }, itemStyle: { color: accent }, symbol: 'none', areaStyle: { color: 'rgba(59,130,246,0.08)' } },
      { name: '购买', type: 'line', data: purchaseData, smooth: true, lineStyle: { color: accent2, width: 2 }, itemStyle: { color: accent2 }, symbol: 'none' },
      { name: '转化率', type: 'line', yAxisIndex: 1, data: convData, smooth: true, lineStyle: { color: success, width: 2, type: 'dashed' }, itemStyle: { color: success }, symbol: 'circle', symbolSize: 4 },
      { type: 'line', data: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,7718,null,null,null,null,null,null], symbol: 'circle', symbolSize: 12, itemStyle: { color: 'transparent', borderColor: danger, borderWidth: 2 }, label: { show: true, position: 'top', formatter: '12.12 大促', color: danger, fontSize: 10, fontWeight: 700, distance: 10 }, lineStyle: { opacity: 0 } }
    ]
  });
  window.addEventListener('resize', function() { chart3.resize(); });

  // ==========================================
  // Chart 5: Category Scatter (浏览 vs 转化率)
  // Data: funnel_by_category.csv — real data, 8916 categories
  // Replaces fabricated user segment radar
  // ==========================================
  var chart5 = echarts.init(document.getElementById('chart-user-segment'), null, { renderer: 'svg' });
  chart5.setOption({
    animation: false,
    tooltip: { appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink }, formatter: function(p) { return '品类 ' + p.data[2] + '<br/>浏览: ' + p.data[0] + '<br/>转化率: ' + p.data[1] + '%'; } },
    grid: { left: 85, right: 30, top: 30, bottom: 30 },
    xAxis: { type: 'value', name: '浏览次数', nameTextStyle: { color: muted }, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
    yAxis: { type: 'value', name: '转化率(%)', nameTextStyle: { color: muted }, axisLabel: { color: muted, fontSize: 10, formatter: '{value}%' }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
    series: [{
      type: 'scatter',
      symbolSize: function(val) { return Math.max(3, Math.min(12, val[0] / 400)); },
      data: [
        [5995, 20.88, '1863', accent],
        [5617, 10.04, '13230', accent + '66'],
        [5497, 11.41, '5027', accent + '66'],
        [5310, 12.26, '5399', accent + '66'],
        [5281, 13.22, '6513', accent + '66'],
        [5277, 11.46, '5894', accent + '66'],
        [4967, 19.21, '5232', accent2],
        [4712, 12.42, '11279', accent + '66'],
        [4594, 5.62, '6000', muted],
        [4551, 9.07, '2825', muted],
        [4350, 5.94, '3007', muted],
        [4140, 8.19, '5455', muted],
        [3980, 7.52, '8293', muted],
        [3870, 8.83, '9031', muted],
        [3650, 6.37, '4388', muted]
      ],
      itemStyle: { opacity: 0.7 },
      label: { show: true, position: 'top', color: ink2, fontSize: 9, formatter: function(p) { return p.data[2]; }, minMargin: 2 }
    }, {
      type: 'scatter',
      symbolSize: 0,
      markLine: { silent: true, symbol: 'none', lineStyle: { color: rule, type: 'dashed', width: 1 }, label: { color: muted, fontSize: 10 }, data: [{ yAxis: 23.3, label: { formatter: '全品类均值: 23.3%' } }] }
    }]
  });
  window.addEventListener('resize', function() { chart5.resize(); });

  // ==========================================
  // Chart 6: Feature Importance
  // Data: feature_importance.csv (XGBoost)
  // ==========================================
  var featureNames = ['商品浏览数', '商品加购数', '有无交互', '商品热度', '用户-商品加购', '用户-商品浏览', '最近活跃天数', '是否加购过', '是否收藏过', '商品购买率'];
var featureVals = [0.1371, 0.1222, 0.1219, 0.1130, 0.0757, 0.0597, 0.0495, 0.0486, 0.0453, 0.0265];

  var chart6 = echarts.init(document.getElementById('chart-feature-importance'), null, { renderer: 'svg' });
  chart6.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink }, formatter: function(p) { return p[0].name + '<br/>重要性: ' + (p[0].value * 100).toFixed(2) + '%'; } },
    grid: { left: 130, right: 70, top: 30, bottom: 30 },
    xAxis: { type: 'value', axisLabel: { color: muted, fontSize: 10, formatter: function(v) { return (v * 100).toFixed(0) + '%'; } }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
    yAxis: { type: 'category', data: featureNames.reverse(), axisLabel: { color: ink2, fontSize: 10 }, axisLine: { lineStyle: { color: rule } }, inverse: true },
    series: [{
      type: 'bar',
      data: featureVals.reverse().map(function(v, i) {
        return { value: v, itemStyle: { color: i < 3 ? accent2 : accent + 'aa', borderRadius: [0, 4, 4, 0] } };
      }),
      barWidth: 16,
      label: { show: true, position: 'right', color: muted, fontSize: 10, fontFamily: 'JetBrainsMono', formatter: function(p) { return (p.value * 100).toFixed(1) + '%'; } }
    }]
  });
  window.addEventListener('resize', function() { chart6.resize(); });

  // ==========================================
  // Chart 7: Model Comparison (XGBoost vs LR)
  // Data: model_metrics.csv + cv_results.csv
  // ==========================================
  var chart7 = echarts.init(document.getElementById('chart-model-comparison'), null, { renderer: 'svg' });
  chart7.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    legend: { data: ['XGBoost', 'Logistic Regression'], bottom: 0, textStyle: { color: muted, fontSize: 11 } },
    grid: { left: 80, right: 30, top: 30, bottom: 48 },
    xAxis: { type: 'category', data: ['AUC', 'F1', 'AP'], axisLabel: { color: ink2, fontSize: 12, fontWeight: 700 }, axisLine: { lineStyle: { color: rule } } },
    yAxis: { type: 'value', min: 0.4, max: 1.0, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
    series: [
      { name: 'XGBoost', type: 'bar', data: [0.9465, 0.7475, 0.8621], barWidth: 24, itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: ink2, fontSize: 11, fontFamily: 'JetBrainsMono', formatter: '{c}' } },
{ name: 'Logistic Regression', type: 'bar', data: [0.8419, 0.4787, 0.5121], barWidth: 24, itemStyle: { color: muted, borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: muted, fontSize: 11, fontFamily: 'JetBrainsMono', formatter: '{c}' } }
    ]
  });
  window.addEventListener('resize', function() { chart7.resize(); });

  // ==========================================
  // Chart 8: Forest Plot (Causal ATE)
  // Data: causal_inference_results.csv
  // ==========================================
  (function() {
    var el = document.getElementById('chart-forest-plot');
    if (!el) return;
    var chart8 = echarts.init(el, null, { renderer: 'svg' });
    chart8.setOption({
      animation: false,
      tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink }, formatter: function(p) {
        var d = p[0].data; return d.name + '<br/>ATE: ' + d.value[1].toFixed(2) + 'pp<br/>95% CI: [' + d.value[0].toFixed(2) + ', ' + d.value[2].toFixed(2) + ']';
      }},
      grid: { left: 90, right: 50, top: 30, bottom: 30 },
      xAxis: { type: 'value', name: 'ATE (pp)', nameTextStyle: { color: muted }, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } }, min: -5, max: 15 },
      yAxis: { type: 'category', data: ['收藏→购买', '加购→购买'], axisLabel: { color: ink2, fontSize: 12, fontWeight: 700 }, axisLine: { lineStyle: { color: rule } } },
      series: [
        {
          type: 'custom',
          renderItem: function(params, api) {
            var catIdx = api.value(3);
            var y = api.coord([0, catIdx])[1];
            var xStart = api.coord([api.value(0), catIdx])[0];
            var xEnd = api.coord([api.value(2), catIdx])[0];
            var xMid = api.coord([api.value(1), catIdx])[0];
            var color = api.value(4) === 'sig' ? success : muted;
            return {
              type: 'group',
              children: [
                { type: 'rect', shape: { x: xStart, y: y - 8, width: xEnd - xStart, height: 16 }, style: { fill: color, opacity: 0.3 } },
                { type: 'circle', shape: { cx: xMid, cy: y, r: 5 }, style: { fill: color } },
                { type: 'line', shape: { x1: xStart, y1: y, x2: xEnd, y2: y }, style: { stroke: color, lineWidth: 2 } }
              ]
            };
          },
          data: [
            { name: '收藏→购买', value: [-0.49, 4.11, 8.82, 1, 'not_sig'] },
            { name: '加购→购买', value: [2.35, 6.76, 10.58, 0, 'sig'] }
          ]
        },
        { type: 'scatter', data: [[0, 0], [0, 1]], symbolSize: 0, markLine: { silent: true, symbol: 'none', lineStyle: { color: rule, type: 'dashed', width: 1 }, data: [{ xAxis: 0, label: { formatter: 'ATE=0', color: muted, fontSize: 10 } }] } }
      ]
    });
    window.addEventListener('resize', function() { chart8.resize(); });
  })();

  // ==========================================
  // Chart 9: Sensitivity Analysis (4 conditions)
  // Data: causal_inference_results.csv
  // ==========================================
  (function() {
    var el = document.getElementById('chart-sensitivity');
    if (!el) return;
    var chart9 = echarts.init(el, null, { renderer: 'svg' });
  chart9.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    grid: { left: 150, right: 50, top: 30, bottom: 30 },
    xAxis: { type: 'value', name: 'ATE (pp)', nameTextStyle: { color: muted }, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } }, min: 0, max: 14 },
    yAxis: { type: 'category', data: ['有放回(卡尺0.05)', '无放回(卡尺0.05)', '有放回(卡尺0.03)', '有放回(卡尺0.10)'], axisLabel: { color: ink2, fontSize: 10 }, axisLine: { lineStyle: { color: rule } } },
    series: [{
      type: 'bar',
      data: [6.76, 10.70, 6.76, 6.76],
      barWidth: 18,
      itemStyle: { color: accent, borderRadius: [0, 4, 4, 0] },
      label: { show: true, position: 'right', color: ink2, fontSize: 11, fontFamily: 'JetBrainsMono', formatter: '{c} pp' },
      markLine: { silent: true, symbol: 'none', lineStyle: { color: accent2, type: 'dashed', width: 1 }, label: { formatter: '主分析: 6.76pp', color: accent2, fontSize: 10 }, data: [{ xAxis: 6.76, name: '主分析' }] }
    }]
  });
  window.addEventListener('resize', function() { chart9.resize(); });
  })();

  // ==========================================
  // Chart 10: DAG (Causal Graph)
  // Based on real causal inference design
  // ==========================================
  (function() {
    var el = document.getElementById('chart-dag');
    if (!el) return;
    var chart10 = echarts.init(el, null, { renderer: 'svg' });
  chart10.setOption({
    animation: false,
    tooltip: { appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    series: [{
      type: 'graph',
      layout: 'force',
      force: { repulsion: 400, edgeLength: [120, 200], gravity: 0.1 },
      roam: false,
      draggable: false,
      data: [
        { name: '加购行为', symbolSize: 50, itemStyle: { color: accent2 }, label: { show: true, color: ink2, fontSize: 12, fontWeight: 700 } },
        { name: '收藏行为', symbolSize: 40, itemStyle: { color: '#6366f1' }, label: { show: true, color: ink2, fontSize: 11, fontWeight: 700 } },
        { name: '购买行为', symbolSize: 55, itemStyle: { color: success }, label: { show: true, color: ink2, fontSize: 12, fontWeight: 700 } },
        { name: '用户活跃度', symbolSize: 35, itemStyle: { color: muted }, label: { show: true, color: muted, fontSize: 10 } },
        { name: '商品热度', symbolSize: 35, itemStyle: { color: muted }, label: { show: true, color: muted, fontSize: 10 } },
        { name: '品类偏好', symbolSize: 35, itemStyle: { color: muted }, label: { show: true, color: muted, fontSize: 10 } },
        { name: '价格敏感度', symbolSize: 30, itemStyle: { color: '#334155' }, label: { show: true, color: '#475569', fontSize: 9 } }
      ],
      links: [
        { source: '加购行为', target: '购买行为', lineStyle: { color: accent2, width: 3, curveness: 0.1 } },
        { source: '收藏行为', target: '购买行为', lineStyle: { color: '#6366f1', width: 2, curveness: 0.1 } },
        { source: '用户活跃度', target: '加购行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '用户活跃度', target: '收藏行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '用户活跃度', target: '购买行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '商品热度', target: '加购行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '商品热度', target: '购买行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '品类偏好', target: '加购行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '品类偏好', target: '购买行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '价格敏感度', target: '购买行为', lineStyle: { color: '#334155', width: 1, type: 'dashed', curveness: 0.1 }, label: { show: true, formatter: '未观测', color: '#475569', fontSize: 8 } }
      ],
      lineStyle: { opacity: 0.8 },
      emphasis: { focus: 'adjacency', lineStyle: { width: 3 } }
    }]
  });
  window.addEventListener('resize', function() { chart10.resize(); });
  })();

  // ==========================================
  // Chart 11: Macro Periods Comparison (三阶段对比)
  // Data: funnel_daily.csv — real aggregation
  // ==========================================
  var chart11 = echarts.init(document.getElementById('chart-macro-periods'), null, { renderer: 'svg' });
  chart11.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    grid: { left: 85, right: 85, top: 30, bottom: 48 },
    xAxis: {
      type: 'category',
      data: ['蓄水期\n11.18-12.10', '爆发期\n12.11-12.13', '长尾期\n12.14-12.18'],
      axisLabel: { color: ink2, fontSize: 11, fontWeight: 700 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value', name: '人数', nameLocation: 'middle', nameGap: 45, nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } },
        axisLine: { lineStyle: { color: rule } }
      },
      {
        type: 'value', name: '转化率(%)', nameLocation: 'middle', nameGap: 45, nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: { color: muted, fontSize: 10, formatter: '{value}%' },
        splitLine: { show: false },
        axisLine: { lineStyle: { color: rule } },
        min: 0, max: 40
      }
    ],
    series: [
      {
        name: '日均浏览', type: 'bar', barWidth: 28, barGap: '30%',
        data: [
          { value: 6411, itemStyle: { color: accent } },
          { value: 7128, itemStyle: { color: accent2 } },
          { value: 6678, itemStyle: { color: '#6366f1' } }
        ],
        label: { show: true, position: 'top', color: ink2, fontSize: 10, formatter: '{c}' },
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '日均购买', type: 'bar', barWidth: 28,
        data: [
          { value: 1496, itemStyle: { color: '#1e40af' } },
          { value: 2298, itemStyle: { color: '#d97706' } },
          { value: 1581, itemStyle: { color: '#4338ca' } }
        ],
        label: { show: true, position: 'top', color: ink2, fontSize: 10, formatter: '{c}' },
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '转化率', type: 'line', yAxisIndex: 1,
        data: [23.3, 31.5, 23.7],
        lineStyle: { color: success, width: 3 },
        itemStyle: { color: success },
        symbol: 'circle', symbolSize: 10,
        label: { show: true, color: success, fontSize: 11, fontWeight: 700, formatter: '{c}%', distance: 12 }
      }
    ]
  });
  window.addEventListener('resize', function() { chart11.resize(); });

  // ==========================================
  // Chart 12: Weekly Behavior Pattern (周度模式)
  // Data: funnel_daily.csv — real aggregation by day of week
  // Note: 周五数据受12.12大促影响（12.12是周五），购买和转化率偏高
  // ==========================================
  var chart12 = echarts.init(document.getElementById('chart-weekly-pattern'), null, { renderer: 'svg' });
  chart12.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    grid: { left: 85, right: 85, top: 30, bottom: 56 },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel: { color: ink2, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value', name: '人数', nameLocation: 'middle', nameGap: 45, nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } },
        axisLine: { lineStyle: { color: rule } }
      },
      {
        type: 'value', name: '转化率(%)', nameLocation: 'middle', nameGap: 45, nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: { color: muted, fontSize: 10, formatter: '{value}%' },
        splitLine: { show: false },
        axisLine: { lineStyle: { color: rule } },
        min: 15, max: 35
      }
    ],
    series: [
      {
        name: '日均浏览', type: 'bar', barWidth: 16, barGap: '20%',
        data: [
          { value: 6600, itemStyle: { color: accent } },
          { value: 6504, itemStyle: { color: accent } },
          { value: 6527, itemStyle: { color: accent } },
          { value: 6537, itemStyle: { color: accent } },
          { value: 6636, itemStyle: { color: accent2 } },
          { value: 6404, itemStyle: { color: accent } },
          { value: 6459, itemStyle: { color: accent } }
        ],
        itemStyle: { borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: ink2, fontSize: 9, formatter: '{c}' }
      },
      {
        name: '日均购买', type: 'line', smooth: true,
        data: [1590, 1540, 1541, 1521, 2040, 1447, 1470],
        lineStyle: { color: success, width: 3 },
        itemStyle: { color: success },
        symbol: 'circle', symbolSize: 8,
        label: { show: true, color: success, fontSize: 10, formatter: '{c}' }
      },
      {
        name: '转化率', type: 'line', yAxisIndex: 1, smooth: true,
        data: [24.1, 23.7, 23.6, 23.3, 29.6, 22.6, 22.8],
        lineStyle: { color: danger, width: 2, type: 'dashed' },
        itemStyle: { color: danger },
        symbol: 'diamond', symbolSize: 8,
        label: { show: true, color: danger, fontSize: 10, formatter: '{c}%' }
      },
      {
        type: 'scatter', symbolSize: 0,
        data: [[4, 2040]],
        markPoint: { data: [{ coord: [4, 2040], value: '12.12\n大促', symbol: 'pin', symbolSize: 36, itemStyle: { color: danger }, label: { color: danger, fontSize: 9, fontWeight: 700 } }] }
      }
    ]
  });
  window.addEventListener('resize', function() { chart12.resize(); });

  // ==========================================
  // Chart 13: CV Fold Performance (5-fold CV)
  // Data: cv_results.csv
  // ==========================================
  (function() {
    var el = document.getElementById('chart-strategy-matrix');
    if (!el) return;
    var chart13 = echarts.init(el, null, { renderer: 'svg' });
  chart13.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    grid: { left: 80, right: 30, top: 30, bottom: 48 },
    legend: { data: ['AUC', 'F1', 'AP'], bottom: 0, textStyle: { color: muted, fontSize: 10 } },
    xAxis: { type: 'category', data: ['Fold 1', 'Fold 2', 'Fold 3', 'Fold 4', 'Fold 5', 'Mean'], axisLabel: { color: ink2, fontSize: 11 }, axisLine: { lineStyle: { color: rule } } },
    yAxis: { type: 'value', min: 0.7, max: 1.0, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
    series: [
      { name: 'AUC', type: 'line', data: [0.9464, 0.9446, 0.9484, 0.9382, 0.9549, 0.9465], lineStyle: { color: accent, width: 2.5 }, itemStyle: { color: accent }, symbol: 'circle', symbolSize: 8, label: { show: true, color: accent, fontSize: 10, formatter: function(p) { return p.value.toFixed(4); } } },
      { name: 'F1', type: 'line', data: [0.7509, 0.7531, 0.7426, 0.7317, 0.7594, 0.7475], lineStyle: { color: accent2, width: 2 }, itemStyle: { color: accent2 }, symbol: 'diamond', symbolSize: 8, label: { show: true, color: accent2, fontSize: 10, formatter: function(p) { return p.value.toFixed(4); } } },
      { name: 'AP', type: 'line', data: [0.8592, 0.8583, 0.8643, 0.8466, 0.8820, 0.8621], lineStyle: { color: success, width: 2, type: 'dashed' }, itemStyle: { color: success }, symbol: 'triangle', symbolSize: 8, label: { show: true, color: success, fontSize: 10, formatter: function(p) { return p.value.toFixed(4); } } }
    ]
  });
  window.addEventListener('resize', function() { chart13.resize(); });
  })();

  // ==========================================
  // Chart 14: PSM Matching Balance (SMD Love Plot)
  // Data: causal_inference_results.csv — 加购→购买, 卡尺0.05
  // ==========================================
  (function() {
    var el = document.getElementById('chart-psm-match');
    if (!el) return;
    var chart14 = echarts.init(el, null, { renderer: 'svg' });
    chart14.setOption({
      animation: false,
      tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink }, formatter: function(p) { return p[0].name + '<br/>匹配前 SMD: ' + p[0].data[0].toFixed(3) + '<br/>匹配后 SMD: ' + p[0].data[1].toFixed(3); } },
      legend: { data: ['匹配前', '匹配后'], bottom: 0, textStyle: { color: muted, fontSize: 11 } },
      grid: { left: 120, right: 30, top: 30, bottom: 48 },
      xAxis: { type: 'value', name: 'SMD', nameTextStyle: { color: muted }, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } }, min: 0, max: 0.5 },
      yAxis: { type: 'category', data: ['fav_days', 'browse_days', 'active_days'], axisLabel: { color: ink2, fontSize: 12, fontWeight: 700 }, axisLine: { lineStyle: { color: rule } } },
      series: [
        { name: '匹配前', type: 'bar', data: [[0.312, 0.042], [0.287, 0.038], [0.245, 0.031]], barWidth: 16, itemStyle: { color: danger + '99', borderRadius: [0, 4, 4, 0] }, label: { show: true, position: 'right', color: muted, fontSize: 10, fontFamily: 'JetBrainsMono', formatter: function(p) { return p.data[0].toFixed(3); } } },
        { name: '匹配后', type: 'bar', data: [[0.042, 0.042], [0.038, 0.038], [0.031, 0.031]], barWidth: 16, itemStyle: { color: success, borderRadius: [0, 4, 4, 0] }, label: { show: true, position: 'right', color: success, fontSize: 10, fontFamily: 'JetBrainsMono', formatter: function(p) { return p.data[0].toFixed(3); } } },
        { type: 'scatter', data: [[0.1, 0], [0.1, 1], [0.1, 2]], symbolSize: 0, markLine: { silent: true, symbol: 'none', lineStyle: { color: rule, type: 'dashed', width: 1 }, label: { color: muted, fontSize: 10, formatter: 'SMD=0.1' }, data: [{ xAxis: 0.1 }] } }
      ]
    });
    window.addEventListener('resize', function() { chart14.resize(); });
  })();

})();
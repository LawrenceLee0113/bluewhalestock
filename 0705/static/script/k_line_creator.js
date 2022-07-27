function splitData(rawData) {
    let categoryData = [];
    let values = [];
    let volumes = [];
    for (let i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i].splice(0, 1)[0]);
      values.push(rawData[i]);
      volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
    }
    return {
      categoryData: categoryData,
      values: values,
      volumes: volumes
    };
  }
function calculateMA(dayCount, data) {//MA線data
var result = [];
for (var i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
    result.push('-');
    continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
    sum += data.values[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(3));
}
return result;
}
class k_line {
    
    constructor(container_id,k_name,MAlines=[5,10,20,30]) {
        this.dom = document.getElementById(container_id);
        this.myChart = echarts.init(this.dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        this.k_name = k_name
        this.MAlines = MAlines
        this.app = {};
        this.option;
    
        this.upColor = '#00da3c';//綠棒
        this.downColor = '#ec0000';//紅棒

        this.row_data=["none"];
    }
    get_data(ROOT_PATH,data={}) {
        var row_data=[]
        $.ajax({
            type: "get",
            url: ROOT_PATH,
            data: data,
            async: false,
            dataType: "json",
            success: function (response) {
                console.log(response)
                row_data = response
            }
        });
        this.row_data = row_data
    }
    show_data({rawData=this.row_data,startValue=rawData.length - 240}) {
        console.log(rawData)
        var data = splitData(rawData);
        this.myChart.setOption(
            (this.option = {
                animation: false,
                color:[
                '#5470c6',
                 '#91cc75', 
                 '#fac858', 
                 '#ee6666', 
                 '#73c0de', 
                 '#3ba272', 
                 '#fc8452', 
                 '#9a60b4', 
                 '#ea7ccc'
                ],
                legend: {
                    bottom: 10,
                    left: 'center',
                    data: [this.k_name].concat(this.MAlines.map(x=>`MA${x}`))
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    textStyle: {
                        color: '#000'
                    },
                    position: function (pos, params, el, elRect, size) {
                        const obj = {
                            top: 10
                        };
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                        return obj;
                    }
                    // extraCssText: 'width: 170px'
                },
                axisPointer: {
                    link: [
                        {
                            xAxisIndex: 'all'
                        }
                    ],
                    label: {
                        backgroundColor: '#777'
                    }
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        brush: {
                            type: ['lineX', 'clear']
                        }
                    }
                },
                brush: {
                    xAxisIndex: 'all',
                    brushLink: 'all',
                    outOfBrush: {
                        colorAlpha: 0.1
                    }
                },
                visualMap: {
                    show: false,
                    seriesIndex: 5,
                    dimension: 2,
                    pieces: [
                        {
                            value: 1,
                            color: this.downColor
                        },
                        {
                            value: -1,
                            color: this.upColor
                        }
                    ]
                },
                grid: [
                    {
                        left: '10%',
                        right: '8%',
                        height: '50%'
                    },
                    {
                        left: '10%',
                        right: '8%',
                        top: '63%',
                        height: '16%'
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        data: data.categoryData,
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        splitLine: { show: false },
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            z: 100
                        }
                    },
                    {
                        type: 'category',
                        gridIndex: 1,
                        data: data.categoryData,
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        axisTick: { show: false },
                        splitLine: { show: false },
                        axisLabel: { show: false },
                        min: 'dataMin',
                        max: 'dataMax'
                    }
                ],
                yAxis: [
                    {
                        scale: true,
                        splitArea: {
                            show: true
                        }
                    },
                    {
                        scale: true,
                        gridIndex: 1,
                        splitNumber: 2,
                        axisLabel: { show: false },
                        axisLine: { show: false },
                        axisTick: { show: false },
                        splitLine: { show: false }
                    }
                ],
                dataZoom: [
                    {
                        type: 'inside',
                        xAxisIndex: [0, 1],
                        startValue: startValue,
                        end: 100
                    },
                    {
                        show: true,
                        xAxisIndex: [0, 1],
                        type: 'slider',
                        top: '85%',
                        start: 98,
                        end: 100
                    }
                ],
                series: [
                    {
                        name: this.k_name,
                        type: 'candlestick',
                        data: data.values,
                        itemStyle: {
                            color: this.upColor,
                            color0: this.downColor,
                            borderColor: undefined,
                            borderColor0: undefined
                        },
                        tooltip: {
                            formatter: function (param) {
                                param = param[0];
                                return [
                                    'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                                    'Open: ' + param.data[0] + '<br/>',
                                    'Close: ' + param.data[1] + '<br/>',
                                    'Lowest: ' + param.data[2] + '<br/>',
                                    'Highest: ' + param.data[3] + '<br/>'
                                ].join('');
                            }
                        }
                    },
                    {
                        name: 'Volume',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: data.volumes
                    }
                ].concat(this.MAlines.map(x =>
                    ({
                      name: `MA${x}`,
                      type: 'line',
                      // showSymbol:false,//線的點點
                      data: calculateMA(x, data),
                      smooth: true,
                      lineStyle: {
                        opacity: 0.5
                      }
                    })
                  ))
                // .push(this.MAline.map(x => ({
                //     name: `MA${x}`,
                //       type: 'line',
                //         // showSymbol:false,//線的點點
                //         data: calculateMA(x, data),
                //           smooth: true,
                //             lineStyle: {
                //       opacity: 0.5
                //     }
                //   })
                //   ))
            }),
            true
        );
        this.myChart.dispatchAction({
            type: 'brush',
            areas: [
                {
                    brushType: 'lineX',
                    coordRange: ['2016-06-02', '2016-06-20'],
                    xAxisIndex: 0
                }
            ]
        });
        if (this.option && typeof this.option === 'object') {
            this.myChart.setOption(this.option);
        }

        window.addEventListener('resize', this.myChart.resize);
    }
}
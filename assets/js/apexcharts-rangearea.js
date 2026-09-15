(function () {
    "use strict";

    /* basic range area chart */
    const basicoptions = {
        series: [
            {
                name: 'Temperatura em Nova York',
                data: [
                    {
                        x: 'Jan',
                        y: [-2, 4]
                    },
                    {
                        x: 'Fev',
                        y: [-1, 6]
                    },
                    {
                        x: 'Mar',
                        y: [3, 10]
                    },
                    {
                        x: 'Abr',
                        y: [8, 16]
                    },
                    {
                        x: 'Mai',
                        y: [13, 22]
                    },
                    {
                        x: 'Jun',
                        y: [18, 26]
                    },
                    {
                        x: 'Jul',
                        y: [21, 29]
                    },
                    {
                        x: 'Ago',
                        y: [21, 28]
                    },
                    {
                        x: 'Set',
                        y: [17, 24]
                    },
                    {
                        x: 'Out',
                        y: [11, 18]
                    },
                    {
                        x: 'Nov',
                        y: [6, 12]
                    },
                    {
                        x: 'Dez',
                        y: [1, 7]
                    }
                ]
            }
        ],
        chart: {
            height: 350,
            type: 'rangeArea'
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Temperatura em Nova York (ano todo)'
        },
        colors: ["#985ffd"],
        markers: {
            hover: {
                sizeOffset: 5
            }
        },
        dataLabels: {
            enabled: false
        },
        yaxis: {
            labels: {
                formatter: (val) => {
                    return val + '°C'
                }
            }
        }
    };
    const basicchart = new ApexCharts(document.querySelector("#rangearea-basic"), basicoptions);
    if(basicchart) basicchart.render();

    /* combo range area chart */
    const combooptions = {
        series: [
            {
                type: 'rangeArea',
                name: 'Faixa Equipe B',

                data: [
                    {
                        x: 'Jan',
                        y: [1100, 1900]
                    },
                    {
                        x: 'Fev',
                        y: [1200, 1800]
                    },
                    {
                        x: 'Mar',
                        y: [900, 2900]
                    },
                    {
                        x: 'Abr',
                        y: [1400, 2700]
                    },
                    {
                        x: 'Mai',
                        y: [2600, 3900]
                    },
                    {
                        x: 'Jun',
                        y: [500, 1700]
                    },
                    {
                        x: 'Jul',
                        y: [1900, 2300]
                    },
                    {
                        x: 'Ago',
                        y: [1000, 1500]
                    }
                ]
            },

            {
                type: 'rangeArea',
                name: 'Faixa Equipe A',
                data: [
                    {
                        x: 'Jan',
                        y: [3100, 3400]
                    },
                    {
                        x: 'Fev',
                        y: [4200, 5200]
                    },
                    {
                        x: 'Mar',
                        y: [3900, 4900]
                    },
                    {
                        x: 'Abr',
                        y: [3400, 3900]
                    },
                    {
                        x: 'Mai',
                        y: [5100, 5900]
                    },
                    {
                        x: 'Jun',
                        y: [5400, 6700]
                    },
                    {
                        x: 'Jul',
                        y: [4300, 4600]
                    },
                    {
                        x: 'Ago',
                        y: [2100, 2900]
                    }
                ]
            },

            {
                type: 'line',
                name: 'Mediana Equipe B',
                data: [
                    {
                        x: 'Jan',
                        y: 1500
                    },
                    {
                        x: 'Fev',
                        y: 1700
                    },
                    {
                        x: 'Mar',
                        y: 1900
                    },
                    {
                        x: 'Abr',
                        y: 2200
                    },
                    {
                        x: 'Mai',
                        y: 3000
                    },
                    {
                        x: 'Jun',
                        y: 1000
                    },
                    {
                        x: 'Jul',
                        y: 2100
                    },
                    {
                        x: 'Ago',
                        y: 1200
                    },
                    {
                        x: 'Set',
                        y: 1800
                    },
                    {
                        x: 'Out',
                        y: 2000
                    }
                ]
            },
            {
                type: 'line',
                name: 'Mediana Equipe A',
                data: [
                    {
                        x: 'Jan',
                        y: 3300
                    },
                    {
                        x: 'Fev',
                        y: 4900
                    },
                    {
                        x: 'Mar',
                        y: 4300
                    },
                    {
                        x: 'Abr',
                        y: 3700
                    },
                    {
                        x: 'Mai',
                        y: 5500
                    },
                    {
                        x: 'Jun',
                        y: 5900
                    },
                    {
                        x: 'Jul',
                        y: 4500
                    },
                    {
                        x: 'Ago',
                        y: 2400
                    },
                    {
                        x: 'Set',
                        y: 2100
                    },
                    {
                        x: 'Out',
                        y: 1500
                    }
                ]
            }
        ],
        chart: {
            height: 350,
            type: 'rangeArea',
            animations: {
                speed: 500
            }
        },
        colors: ['#985ffd', '#ff49cd', '#985ffd', '#ff49cd'],
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: [0.24, 0.24, 1, 1]
        },
        forecastDataPoints: {
            count: 2
        },
        stroke: {
            curve: 'straight',
            width: [0, 0, 2, 2]
        },
        legend: {
            show: true,
            customLegendItems: ['Equipe B', 'Equipe A'],
            inverseOrder: true
        },
        title: {
            text: 'Área de intervalo com previsão (combo)'
        },
        markers: {
            hover: {
                sizeOffset: 5
            }
        }
    };
    const combochart = new ApexCharts(document.querySelector("#rangearea-combo"), combooptions);
    if(combochart) combochart.render();

})();
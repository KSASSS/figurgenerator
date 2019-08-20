/** ASSS data */
export const indikatorURL = 'https://statistikk-test.ks.no/api/ConnectionInfo/Validmeasures?initialCatalog=ASSS%20data&cube=ASSS%20database';
export const figureBaseUrl = 'https://statistikk-test.ks.no/api/RegionInfo/DynamicData?initialCatalog=ASSS%20data&cube=ASSS%20database'

/** Kartdata */
//export const indikatorURL = 'https://statistikk-test.ks.no/api/ConnectionInfo/Validmeasures?'
//export const figureBaseUrl = 'https://statistikk-test.ks.no/api/RegionInfo/DynamicData?'

export const getMethod = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    }
}

export const regionInfo = [
    {
        name: 'Bergen',
        code: '1201'
    }, {
        name: 'Bærum',
        code: '0219'
    }, {
        name: 'Drammen',
        code: '0602'
    }, {
        name: 'Fredrikstad',
        code: '0106'
    }, {
        name: 'Kristiansand',
        code: '1001'
    }, {
        name: 'Oslo',
        code: '0301'
    }, {
        name: 'Sandnes',
        code: '1102'
    }, {
        name: 'Stavanger',
        code: '1103'
    }, {
        name: 'Tromsø',
        code: '1902'
    }, {
        name: 'Trondheim',
        code: '5001'
    }
]

export const validYears = [
    '2015',
    '2016',
    '2017',
    '2018',
    '2019'
]

export const drawerWidth = 240;

export const highchartsOptions = {
    chart: {
        type: '',
        width: 500,
    },
    title: {
        text: '',
        style: {
            fontSize: '15px'
        }
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        title: {
            text: '',
        }
    },
    series: {},
    credits: {
        enabled: true,
        text: 'ks.no',
        href: 'https://www.ks.no'
    },
    exporting: { 
        allowTable: false 
    },
};

export const highchartsPieOptions = {};

export const figureColors = [
    '#058DC7', 
    '#50B432', 
    '#ED561B', 
    '#DDDF00', 
    '#24CBE5', 
    '#64E572', 
    '#FF9655', 
    '#FFF263', 
    '#6AF9C4'
];
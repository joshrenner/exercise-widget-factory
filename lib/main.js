var $ = require('jquery')
var _ = require('lodash')
var bootstrap = require('twbs/bootstrap')
var Handlebars = require('handlebars/handlebars.runtime')
var template = require('./template.hbs!')
require('twbs/bootstrap/css/bootstrap.css!')

Handlebars.registerHelper('value', (key, obj) => {
    let v = '';
    if (key === 'hours_ago')
        v = `${obj[key]} <small>hours</small>`
    else if (key === 'minutes_ago')
        v = `${obj[key]} <small>minutes</small>`
    else if (key.endsWith('_widgets')) {
        v = obj.widgets[key.match(/^(.*?)(?=_)/)[0]]
    }
    else
        v = obj[key]
    return new Handlebars.SafeString(v)
});
Handlebars.registerHelper('column', (column) => {
    return new Handlebars.SafeString(`${column.replace(/_/g, ' ')}`)
});


const ogData = require('./widget-production-data.json!')
var data = ogData
const keys = getKeys(data)
var columns = []

function getKeys(d) {
    let r = []
    for (var prop in d[0]) {
        if(!d[0].hasOwnProperty(prop)) continue;
        if (typeof d[0][prop] === 'object') {
            for (var inProp in d[0][prop]) {
                r.push(`${inProp}_${prop}`)
            }
        }
        else {
            r.push(prop)
        }
    }
    return r
}
function addColumn(e) {
    let k = $(this).data('key')
    columns.push(k)
    render()
}
function deleteColumn(e) {
    let k = $(this).data('key')
    columns.splice(columns.indexOf(k), 1)
    render()
}
function editColumn(e) {
    let i = $(this).data('index')
    let k = $(this).data('key')
    columns.splice(i, 1, k)
    render()
}
function render() {
    let html = template({c: columns, d: data, k: keys})
    $('#grid').html(html)
    $('.delete-column').click(deleteColumn)
    $('.add-column').click(addColumn)
    $('.edit-column').click(editColumn)
}
function setFilter(e) {
    e.preventDefault();
    function isChoose(v) {
        return (v === 'choose')
    }
    let timeValue = parseInt($('#timeValue').val())
    let timeUnit = $('#timeUnit').val()
    let factory = $('#factory').val()
    if ((isChoose(timeUnit) || isNaN(timeValue)) && isChoose(factory)) return

    data = ogData
    if (!isNaN(timeValue) && !isChoose(timeUnit))
        data = _.filter(data, (o) => o[timeUnit] <= timeValue)
    if (!isChoose(factory))
        data = _.filter(data, (o) => o.factory === factory)
    render()
}
function clearFilter(e) {
    e.preventDefault()
    $('form input').val('')
    $('form select').prop('selectedIndex',0)
    data = ogData
    render()
}

render()
$('form').submit(setFilter).bind('reset', clearFilter)
$(document).ready(function() {
    $('#loader').fadeOut(function () {
        $('#content').fadeIn()
    })
});
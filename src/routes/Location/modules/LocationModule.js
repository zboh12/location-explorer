import { combineReducers } from 'redux'
import { CONSTANTS as constants } from './constants'

/**
 * Uploads json file of a participant's location data
 */
function uploadJson (filename) {
  return (dispatch) => {
    let trips = constants.DEMO_MAPPING[filename]['trips']
    let poiDict = constants.DEMO_MAPPING[filename]['poiDict']
    let labeledPoints = labelPoints(trips, poiDict)
    let labeledSegments = labelSegments(labeledPoints)
    dispatch({
      type: constants.LOCATION_DATA,
      payload: formatDataToScatterplot(
        labeledPoints
      )
    })
    dispatch({
      type: constants.PATH_DATA,
      payload: labeledSegments
    })
  }
}

/**
 * Aggregates points from all trips and label points with
 * the correct mode of transportation and address if the
 * point is a point of interest (poi)
 */
function labelPoints (trips, poiDict) {
  let allPoints = []
  trips.forEach(trip => {
    trip['points'].forEach((point, i) => {
      point['mode'] = trip['truth']
      if (i === 0 || i === trip['points'].length - 1) {
        if ('poiId' in point) {
          point['address'] = poiDict[point['poiId']]['address']
        }
      }
      allPoints.push(point)
    })
  })
  return allPoints
}

/**
 * Aggregates all segments and label them with mode, delta time, and delta distance.
 */
function labelSegments (labeledPoints) {
  let allSegments = []
  let currentPath = {'path': [], 'width': 3}
  let currentMode = ''
  labeledPoints.forEach((point, i) => {
    if (point['mode'] !== currentMode && currentPath['path'].length > 1) {
      let oldPoint = currentPath['path'][currentPath['path'].length - 1].slice()
      allSegments.push(Object.assign({}, currentPath))
      currentPath = {
        'path': [oldPoint],
        'color': constants.TRANSIT_COLOR_MAP[point['mode']],
        'width': 3,
        'label': 'Mode: ' + point['mode']
      }
      currentMode = point['mode']
    }
    currentPath['path'].push([point['longitude'], point['latitude']])
  })
  if (currentPath['path'].length > 0) {
    allSegments.push(currentPath)
  }
  return allSegments
}

/**
 * Formats data to be interpreted by Scatterplot layer
 */
function formatDataToScatterplot (data) {
  data = data.map(function (point) {
    return Object.assign({}, point, {
      'position': [point['longitude'], point['latitude']],
      'radius': 3,
      'color': ('address' in point) ? constants.COLORS[1] : constants.COLORS[0],
      'opacity': 0.5
    })
  })
  return data
}

function onChangeViewport (newViewport) {
  return (dispatch) => {
    dispatch({
      type: constants.CHANGE_VIEWPORT,
      payload: newViewport
    })
  }
}

/**
 * Data format:
 * [
 *   {
 *     path: [[-122.4, 37.7], [-122.5, 37.8], [-122.6, 37.85]],
 *     width: 1,
 *     color: [255, 0, 0]
 *   },
 *   ...
 * ]
 */

function onHover (info) {
  return (dispatch) => {
    if (info.object && info.pixel) {
      dispatch({
        type: constants.SET_HOVER_INFO,
        payload: Object.assign({},
          info.object,
          { 'pixel': info.pixel }
        )
      })
    } else {
      dispatch({
        type: constants.SET_HOVER_INFO,
        payload: null
      })
    }
  }
}

// Map viewport

function getInitialViewport () {
  return {
    width: 1000,
    height: 1200,
    longitude: -74.0059,
    latitude: 40.7128,
    zoom: 11,
    pitch: 0,
    bearing: 0,
    isDragging: false,
    startDragLngLat: [-73.979141, 40.717019]
  }
}

// reducers

function viewport (state = getInitialViewport(), action) {
  switch (action.type) {
    case constants.CHANGE_VIEWPORT:
      return action.payload
    default:
      return state
  }
}

function locationData (state = [], action) {
  switch (action.type) {
    case constants.LOCATION_DATA:
      return action.payload
    default:
      return state
  }
}

function pathData (state = [], action) {
  switch (action.type) {
    case constants.PATH_DATA:
      return action.payload
    default:
      return state
  }
}

function hoverInfo (state = null, action) {
  switch (action.type) {
    case constants.SET_HOVER_INFO:
      return action.payload
    default:
      return state
  }
}

export const actions = {
  onHover,
  onChangeViewport,
  uploadJson
}

export default combineReducers({
  locationData,
  viewport,
  hoverInfo,
  pathData
})

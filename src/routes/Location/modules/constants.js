import locationData1 from '../../../../data/12_5_17.json'
import locationData2 from '../../../../data/12_10_17.json'

export const CONSTANTS = {
  // location data
  LOCATION_DATA: 'LOCATION_DATA',
  PATH_DATA: 'PATH_DATA',
  CHANGE_VIEWPORT: 'CHANGE_VIEWPORT',
  FIND_PATHS: 'FIND_PATHS',
  HIDE_PATH: 'HIDE_PATH',
  SET_HOVER_INFO: 'SET_HOVER_INFO',
  // colors
  CLUSTER_COLOR: [255, 140, 0],
  COLORS: [[111, 187, 225], [229, 76, 76], [126, 10, 175], [63, 244, 117]],
  PATH_COLORS: [[255, 0, 0], [214, 111, 169], [178, 226, 127], [201, 127, 226]],
  TRANSIT_COLOR_MAP: {
    'stationary': [153, 0, 0],
    'walking': [0, 0, 230],
    'bicycling': [0, 204, 0],
    'transit': [255, 80, 80],
    'driving': [230, 230, 0],
    'invalid': [153, 153, 102],
  },
  DEMO_MAPPING: {
    'demo1': locationData1,
    'demo2': locationData2
  }
}

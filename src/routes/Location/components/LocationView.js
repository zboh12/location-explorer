import React from 'react'
import {
  Grid,
  Loader
} from 'semantic-ui-react'
import 'react-dates/lib/css/_datepicker.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map from './Map'
import ControlPanel from './ControlPanel'

require('../stylesheet/location.scss')

const LocationView = (props) => (
  <Grid
    columns={16}
    divided
  >
    <Grid.Row>
      <Grid.Column width={3}>
        <ControlPanel
          uploadJson={props.uploadJson}
        />
      </Grid.Column>
      <Grid.Column
        width={13}
        style={{
          paddingRight: 0
        }}
      >
        <Loader active={props.loading} inline='centered' />
        <Map
          viewport={Object.assign({}, props.viewport, { width: 900, height: 640 })}
          locationData={props.locationData}
          pathData={props.pathData}

          onChangeViewport={props.onChangeViewport}
          onHover={props.onHover}
          hoverInfo={props.hoverInfo}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default LocationView

LocationView.propTypes = {
  viewport: React.PropTypes.object,
  uploadJson: React.PropTypes.func,
  locationData: React.PropTypes.array,
  pathData: React.PropTypes.array,
  onHover: React.PropTypes.func
}

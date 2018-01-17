import React from 'react'
import DeckGL, { PathLayer, ScatterplotLayer } from 'deck.gl'
import MapGL from 'react-map-gl'

const MAPBOX_TOKEN = 'pk.eyJ1IjoieWRhaSIsImEiOiJjajN1aHl3aGkwMTBrMnFvNHN1djBzN2FvIn0.lK8o98Efn5-tQR0qcJiwvw'

function renderPopup (hoverInfo) {
  if (hoverInfo) {
    return (
      <div
        className='tooltip'
        style={{
          position: 'absolute',
          top: hoverInfo.pixel[1],
          left: hoverInfo.pixel[0]
        }}
      >
        {hoverInfo.address || hoverInfo.label}
      </div>
    )
  }
}

const Map = (props) => <div
  className='map-d3'
>
  {(props.viewport)
  ? (<MapGL
    {...props.viewport}
    onChangeViewport={(viewport) => props.onChangeViewport(viewport)}
    mapboxApiAccessToken={MAPBOX_TOKEN}
  >
    {renderPopup(props.hoverInfo)}
    <DeckGL
      {...props.viewport}
      layers={(props.locationData && props.locationData.length > 0)
        ? [new ScatterplotLayer({
          id: 'scatterplot-layer',
          data: props.locationData,
          radiusMinPixels: 5,
          radiusMaxPixels: 10,
          radiusScale: 10,
          pickable: true,
          onHover: data => props.onHover(data)
        })].concat([new PathLayer({
          id: 'line-layer',
          data: props.pathData,
          rounded: true,
          widthMinPixels: 3,
          widthMaxPixels: 3,
          pickable: true,
          onHover: data => props.onHover(data)
        })]) : []
      }
    />
  </MapGL>) : (<div />)
  }
</div>

export default Map

Map.propTypes = {
  locationData: React.PropTypes.array,
  viewport: React.PropTypes.object,
  onChangeViewport: React.PropTypes.func,
  pathData: React.PropTypes.array,
  hoverInfo: React.PropTypes.object,
  onHover: React.PropTypes.func,
}

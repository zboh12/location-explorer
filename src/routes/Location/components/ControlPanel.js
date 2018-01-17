import React from 'react'
import {
  Button
} from 'semantic-ui-react'

const ControlPanel = (props) => {
  return <div className='control-panel'>
    <span>Select a demo to view on the map</span>
    <br />
    <Button
      content='Demo 1'
      className='file-input'
      onClick={() =>
        props.uploadJson('demo1')
      }
    />
    <br />
    <Button
      content='Demo 2'
      className='file-input'
      onClick={() =>
        props.uploadJson('demo2')
      }
    />
  </div>
}

export default ControlPanel

ControlPanel.propTypes = {
  uploadJson: React.PropTypes.func
}

import React, { Component } from 'react'
import { MDCLinearProgress } from '@material/linear-progress';

export class LinearProgress extends Component {
    componentDidMount() {
        const ln = new MDCLinearProgress(this.element)
        this.props.events.on('LoginLinearProgressToggle', (t) => t ? ln.open() : ln.close())
    }
    render = () => (
        <div ref={ele => this.element = ele} className="mdc-linear-progress mdc-linear-progress--indeterminate">
            <div className="mdc-linear-progress__buffer">
                <div className="mdc-linear-progress__buffer-bar"></div>
                <div className="mdc-linear-progress__buffer-dots"></div>
            </div>
            <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
                <span className="mdc-linear-progress__bar-inner"></span>
            </div>
            <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
                <span className="mdc-linear-progress__bar-inner"></span>
            </div>
        </div>
    )
}
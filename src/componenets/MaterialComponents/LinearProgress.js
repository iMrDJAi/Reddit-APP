import React, { Component } from 'react'
import { MDCLinearProgress } from '@material/linear-progress';

export class LinearProgress extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        new MDCLinearProgress(this.element);
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
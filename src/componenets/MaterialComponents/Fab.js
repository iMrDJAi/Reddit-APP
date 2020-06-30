import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiPlus } from '@mdi/js'
import { MDCRipple } from '@material/ripple'

export class Fab extends Component {
    componentDidMount() {
        new MDCRipple(this.element);
    }
    render = () => (
        <button ref={elem => this.element = elem} className="mdc-fab" aria-label="Favorite">
            <div className="mdc-fab__ripple"></div>
            <span className="mdc-fab__icon"><Icon path={mdiPlus} size="24px" /></span>
        </button>
    )
}
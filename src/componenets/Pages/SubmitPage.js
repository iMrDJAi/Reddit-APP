import React, { Component } from 'react'
import { TopAppBarSubmit } from '../MaterialComponents/TopAppBarSubmit'
import {MDCTextField} from '@material/textfield'
import {MDCTextFieldCharacterCounter} from '@material/textfield/character-counter'
import MDEUltimate from 'mde-ultimate'
export class SubmitPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.update = this.update.bind(this)
    }
    async componentDidMount() {
        new MDCTextField(this.textField)
        new MDEUltimate(this.ta)
        const characterCounter = new MDCTextFieldCharacterCounter(this.counter)
        console.log(characterCounter)
    }
    render = () => (
        <div>
            <TopAppBarSubmit {...this.props} />
            <div className="mdc-layout-grid ContentContainer">
                <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12 InputsContainer">
                        <label ref={ele => this.textField = ele} className="mdc-text-field mdc-text-field--outlined"> 
                            <input type="text" className="mdc-text-field__input" maxLength="300" />
                            <span className="mdc-notched-outline">
                                <span className="mdc-notched-outline__leading"></span>
                                <span className="mdc-notched-outline__notch">
                                    <span className="mdc-floating-label" id="my-label-id">Title</span>
                                </span>
                                <span className="mdc-notched-outline__trailing"></span>
                            </span>
                        </label>
                        <div className="mdc-text-field-helper-line">
                            <div className="mdc-text-field-character-counter"></div>
                        </div>
                        <textarea ref={ele => this.ta = ele} placeholder="Text" maxLength="300000"></textarea>
                        <div ref={ele => this.counter = ele} className="mdc-text-field-helper-line">
                            <div className="mdc-text-field-character-counter">0 / 3000</div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .Home {
                    display: none;
                }
            `}</style>           
        </div>
    )
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data;
        return oldState;
    })
}
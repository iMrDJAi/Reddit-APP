import React, { Component } from 'react'
import { TopAppBarSubmit } from '../MaterialComponents/TopAppBarSubmit'
import {MDCTextField} from '@material/textfield';
export class SubmitPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.update = this.update.bind(this)
    }
    async componentDidMount() {
        new MDCTextField(this.textField);
    }
    render = () => (
        <>
            <TopAppBarSubmit />
            <div className="mdc-layout-grid ContentContainer">
                <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12 InputsContainer">
                        <label ref={ele => this.textField = ele} class="mdc-text-field mdc-text-field--outlined"> 
                            <input type="text" class="mdc-text-field__input" maxlength="100" />
                            <span class="mdc-notched-outline">
                                <span class="mdc-notched-outline__leading"></span>
                                <span class="mdc-notched-outline__notch">
                                    <span class="mdc-floating-label" id="my-label-id">Title</span>
                                </span>
                                <span class="mdc-notched-outline__trailing"></span>
                            </span>
                        </label>
                        <div class="mdc-text-field-helper-line">
                            <div class="mdc-text-field-character-counter"></div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .Home {
                    display: none;
                }
            `}</style>           
        </>
    )
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data;
        return oldState;
    })
}
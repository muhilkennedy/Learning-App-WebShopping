import React, { Component } from 'react'
import Carousel from './Carousel/Carousel';
import Kitchenitem from './kitchen-info/KitchenInfo';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Carousel />
                <Kitchenitem />
            </div>
        )
    }
}

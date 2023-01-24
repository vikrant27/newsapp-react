import React, { Component } from "react";

export default class Spinner extends Component{
    render() {
        return (
            <div className="text-center">
                <img className="my-3" alt="loading"/>
            </div>
        )
    }
}
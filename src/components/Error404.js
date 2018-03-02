import React, { Component } from 'react';
import CategorySidebar from './CategorySidebar'
import { connect } from 'react-redux'

class Error404 extends Component {

    render(){
        return(
            <div>
                <div class="error">404</div>
                <br /><br />
                <span class="info">Post not found</span>
                <img src="http://pa1.narvii.com/6740/bcbcfa3e427a23a496f506591394c910cd603556_00.gif" className="static" />

            </div>
        );
    }
}
export default connect()(Error404)
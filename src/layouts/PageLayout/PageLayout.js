import React from "react";
import {Menu} from "semantic-ui-react";
import PropTypes from "prop-types";
import "./PageLayout.scss";

export const PageLayout = (props) => (
    <div>
        <Menu
            className="navigation-menu"
        >
            <Menu.Item
                name='Home'
                onClick={() => props.router.push('/')}
            >
                Home
            </Menu.Item>

            <Menu.Item
                name='Location'
                onClick={() => props.router.push('/location')}
            >
                Location
            </Menu.Item>
        </Menu>
        {props.children}
    </div>
)
PageLayout.propTypes = {
    children: PropTypes.node,
}

export default PageLayout

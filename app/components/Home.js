import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';

export default class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className={styles.container}>
					<Link to="/browser">Browser</Link>
				</div>
			</div>
		);
	}
}

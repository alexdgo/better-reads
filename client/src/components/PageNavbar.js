import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import { logout } from './Login';
import '../style/PageNavbar.css';
import { Card, Button } from 'react-bootstrap';

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			bookName: '',
			navDivs: [],
		};
	}

	componentDidMount() {
		const pageList = ['home', 'recommendations', 'profile'];

		let navbarDivs = pageList.map((page, i) => {
			if (this.props.active === page) {
				return (
					<a className="nav-item nav-link active" key={i} href={'/' + page}>
						{page.charAt(0).toUpperCase() + page.substring(1, page.length)}
					</a>
				);
			} else {
				return (
					<a className="nav-item nav-link" key={i} href={'/' + page}>
						{page.charAt(0).toUpperCase() + page.substring(1, page.length)}
					</a>
				);
			}
		});

		this.setState({
			navDivs: navbarDivs,
		});
	}

	render() {
		return (
			<>
				<div className="PageNavbar p-2">
					<nav className="navbar navbar-expand-lg justify-content-center align-items-center">
						<h2 className="navbar-brand center">Better Reads</h2>
						<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
							<div className="navbar-nav">{this.state.navDivs}</div>
							<SearchBar />
							<Button
								className=""
								variant="outline-light"
								id="logoutButton"
								type="button"
								onClick={() => logout()}
							>
								Logout
							</Button>
						</div>
					</nav>
				</div>
				<SearchResult />
			</>
		);
	}
}

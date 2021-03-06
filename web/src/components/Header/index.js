import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/logo.svg';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Navigation, Profile } from './styles';

export default function Header() {
	const dispatch = useDispatch();
	const profile = useSelector(state => state.user.profile);
	function handleSingOut() {
		dispatch(signOut());
	}

	return (
		<Container>
			<Content>
				<nav>
					<img src={logo} alt="FastFeet" />
					<Navigation>
						<NavLink to="/deliveries">ENCOMENDAS</NavLink>
						<NavLink to="/sender">ENTREGADORES</NavLink>
						<NavLink to="/recipients">DESTINATÁRIOS</NavLink>
						<NavLink to="/problems">PROBLEMAS</NavLink>
					</Navigation>
				</nav>

				<aside>
					<Profile>
						<strong>{profile.name}</strong>
						<button type="button" onClick={handleSingOut}>
							sair do sistema
						</button>
					</Profile>
				</aside>
			</Content>
		</Container>
	);
}

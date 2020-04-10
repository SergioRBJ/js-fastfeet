import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';

import { IconButton } from '~/components/Button';
import { SearchInput } from '~/components/Form';
import HeaderList from '~/components/HeaderList';
import api from '~/services/api';
import history from '~/services/history';

import SenderItem from './SenderItem';
import { Container, Content, Grid, Button } from './styles';

export default function Sender() {
	const [senders, setSenders] = useState([]);
	const [page, setPage] = useState(1);

	async function loadSender() {
		const response = await api.get('/sender', {
			params: {
				page,
			},
		});

		setSenders(response.data);
	}

	useEffect(() => {
		loadSender();
	}, [page]); //eslint-disable-line

	async function handleSearchSender(e) {
		setPage(1);

		const response = await api.get('/sender', {
			params: {
				q: e.target.value,
				page,
			},
		});

		setSenders(response.data);
	}

	return (
		<Container>
			<Content>
				<HeaderList title="Gerenciando entregadores">
					<SearchInput
						onChange={handleSearchSender}
						type="text"
						placeholder="Buscar por entregadores"
					/>
					<IconButton
						Icon={MdAdd}
						title="CADASTRAR"
						action={() => history.push('/sender/form')}
						type="button"
					/>
				</HeaderList>

				<Grid>
					<section>
						<strong>ID</strong>
						<strong>Foto</strong>
						<strong>Nome</strong>
						<strong>Email</strong>
						<strong>Ações</strong>
					</section>
					{senders.map(sender => (
						<SenderItem
							key={sender.id}
							data={sender}
							updateSender={loadSender}
						/>
					))}
				</Grid>
				<section>
					<Button
						disabled={page === 1}
						onClick={() => setPage(page - 1)}
						type="button"
					>
						voltar
					</Button>
					<Button
						disabled={senders.length < 5}
						type="button"
						onClick={() => setPage(page + 1)}
					>
						proximo
					</Button>
				</section>
			</Content>
		</Container>
	);
}

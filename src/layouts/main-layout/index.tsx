import { Layout } from 'antd';
import React from 'react';
import './index.scss';
import { SearchIcon } from '../../icons';
import FloatButton from './components/float-button';
import Popup from './components/popup';

const { Header, Sider } = Layout;

export const MainLayout: React.FC = () => {
	return (
		<Layout className="min-h-[100vh]">
			<Sider
				className="custom-sider max-w-[285px] min-w-[285px]"
				style={{
					backgroundColor: 'rgba(51, 51, 51, 1)',
					borderRight: '1px solid rgba(242, 242, 242, 1)',
				}}
			/>

			<Layout style={{ backgroundColor: 'rgba(51, 51, 51, 1)' }}>
				<Header
					className="h-[58px] px-[26px] pb-[23px] pt-[19px] leading-none"
					style={{ backgroundColor: 'rgba(79, 79, 79, 1)' }}
				>
					<SearchIcon />
				</Header>

				<FloatButton />

				<Popup />
			</Layout>
		</Layout>
	);
};

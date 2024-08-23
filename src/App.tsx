import React from 'react';
import { MainLayout } from './layouts/main-layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<MainLayout />
		</QueryClientProvider>
	);
};

export default App;

import '@/styles/globals.css';
import { UserProvider } from '@/context/authContext';
import { ChatContextProivder } from '@/context/chatContext';

export default function App({ Component, pageProps }) {
	return (
		<UserProvider>
			<ChatContextProivder>
				<Component {...pageProps} />
			</ChatContextProivder>
		</UserProvider>
	);
}

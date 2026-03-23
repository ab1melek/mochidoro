import { UserProvider } from '@/app/context/UserContext';
import '@/app/globals.css';

export const metadata = {
  title: 'Mochidoro',
  description: 'Pomodoro timer with pet adoption gameplay',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
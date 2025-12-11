import { useNavigate } from 'react-router-dom';

import { Button } from '@components/atoms';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center space-y-6">
        <h1 className="text-5xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Welcome to OLX Clone
        </h1>

        <p className="text-gray-600 text-lg">
          Start your journey by creating an account or signing in
        </p>

        <div className="flex gap-4 justify-center pt-6">
          <Button variant="primary" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>

          <Button variant="outline" onClick={() => navigate('/signin')}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

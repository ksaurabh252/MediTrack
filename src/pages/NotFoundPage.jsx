
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button/Button';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">The page you&apos;re looking for doesn&apos;t exist</p>
      <Button as={Link} to="/" variant="primary">
        Return Home
      </Button>
    </div>
  );
}
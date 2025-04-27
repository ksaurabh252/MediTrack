
import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { useToast } from '../../hooks/useToast';

export default function ProfilePage() {
  // const [profile, setProfile] = useState({});
  const { showToast } = useToast();

  const handleSave = () => {

    showToast('Profile updated successfully', 'success');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">Personal Information</h2>
            <p className="text-gray-600">Manage your account details</p>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>

        </div>
      </Card>
    </div>
  );
}
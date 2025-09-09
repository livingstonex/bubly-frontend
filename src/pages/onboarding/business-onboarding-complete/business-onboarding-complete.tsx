import { CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router';

export function BusinessOnboardingComplete() {
  return (
    <div className="space-y-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Your Are Done!</CardTitle>
      </CardHeader>

      <div className="space-y-4">
        <p className="text-gray-700">
          Writing headlines for blog posts is as much an art as it is a science
          and probably warrants its own post, but for all advise is with what
          works for your great & amazing audience.
        </p>

        <Link to="#" className="font-medium text-purple-600 hover:underline">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

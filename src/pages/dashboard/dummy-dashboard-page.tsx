import CenteredLayout from '@/app/layout/centered-layout';

function DummyDashboardPage() {
  return (
    <CenteredLayout>
      <div className="flex flex-col items-center gap-5 w-full max-w-md px-4">
        <h1>Welcomed to the Dashboard!</h1>
        <h3>You made it!!!!</h3>
      </div>
    </CenteredLayout>
  );
}

export default DummyDashboardPage;

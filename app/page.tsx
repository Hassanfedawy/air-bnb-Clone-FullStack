// app/page.tsx
import getCurrentUser from "./Action/GetCurrentUser";
import GetListing from "./Action/GetListing"; // Adjust the path if needed
import EmptyState from "./Components/EmptyState"; // Assuming EmptyState is a client component
import ListingCard from "./Components/ListingCard";

export default async function Home(): Promise<JSX.Element> {
  // Fetch the listings directly within the server component
  const listings = await GetListing();
  const currentUser = await getCurrentUser();

  if (!listings || listings.length === 0) {
    return (
      <div>
        <EmptyState showReset />
      </div>
    );
  }

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {listings.map((listing: any) => (
        <ListingCard key={listing.id} currentUser={currentUser} data={listing} />
      ))}
    </div>
  );
}

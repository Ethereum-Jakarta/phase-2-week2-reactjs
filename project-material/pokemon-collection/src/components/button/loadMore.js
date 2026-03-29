export default function LoadMore({ num, setLimit, loading }) {
  const handleAddCard = () => {
    setLimit(num + 25)
  }

  return (
    <div id="load-more" onClick={handleAddCard}>
      {loading ? "Loading" : "Load More"}
    </div>
  )
}
